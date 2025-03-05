'use client'
import {
    Attachments,
    Bubble,
    BubbleProps,
    Conversations,
    Prompts,
    Sender,
    useXAgent,
    useXChat,
} from '@ant-design/x';
import {createStyles} from 'antd-style';
import React, {useEffect} from 'react';

import {CloudUploadOutlined, FireOutlined, PaperClipOutlined, PlusOutlined, ReadOutlined,} from '@ant-design/icons';
import {Avatar, Badge, Button, type GetProp, Space, Typography} from 'antd';

import markdownit from 'markdown-it';
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import {getChatList, getDialogueById} from "@/api/dialoguesController";
import {chatStreamFetch} from "@/api/aiChat/dialoguesController";
import dynamic from "next/dynamic";

const md = markdownit({ html: true, breaks: true });


const renderTitle = (icon: React.ReactElement, title: string) => (
    <Space align="start">
        {icon}
        <span>{title}</span>
    </Space>
);


const renderMarkdown: BubbleProps['messageRender'] = (content) => (
    <Typography>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: used in demo */}
        <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
    </Typography>
);
const useStyle = createStyles(({ token, css }) => {
    return {
        layout: css`
      width: 100%;
      min-width: 1000px;
      height: 100%;
      border-radius: ${token.borderRadius}px;
      display: flex;
      background: ${token.colorBgContainer};
      margin: 0; /* 确保没有外边距 */
      padding: 0; /* 确保没有内边距 */
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
      .ant-prompts {
        color: ${token.colorText};
      }
    `,
        menu: css`
      background: ${token.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
    `,
        conversations: css`
      padding: 0 12px;
      flex: 1;
      overflow-y: auto;
    `,
    //  
    messages: css`
        flex: 1;
        overflow-y: auto; /* 添加垂直滚动 */
        max-height: calc(90vh - 200px); /* 限制最大高度，根据实际布局调整 */
        //height: 100%;; /* 限制最大高度，根据实际布局调整 */
        /* 隐藏滚动条但保留滚动功能 */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */

        /* 隐藏WebKit浏览器的滚动条 */
        &::-webkit-scrollbar {
            display: none;
            width: 0;
            background: transparent;
        }
    `,

    chat: css`
      height: 100%;
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: ${token.paddingLG}px;
      gap: 16px;
      overflow: hidden; /* 防止整体出现滚动条 */
    `,
    placeholder: css`
      padding-top: 32px;
    `,
        sender: css`
      box-shadow: ${token.boxShadow};
    `,
        logo: css`
      display: flex;
      height: 72px;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;

      img {
        width: 24px;
        height: 24px;
        display: inline-block;
      }

      span {
        display: inline-block;
        margin: 0 8px;
        font-weight: bold;
        color: ${token.colorText};
        font-size: 16px;
      }
    `,
        addBtn: css`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      width: calc(100% - 24px);
      margin: 0 12px 24px 12px;
    `,

    };
});
const AvatarComponent = ({ src }) => (<Avatar src={src} />);

const placeholderPromptsItems: GetProp<typeof Prompts, 'items'> = [
    {
        key: '1',
        label: renderTitle(<FireOutlined style={{ color: '#FF4D4F' }} />, '热问榜'),
        description: '你对什么感兴趣？',
        children: [
            {
                key: '1-1',
                description: `为什么我长得这么帅?`,
            },
            {
                key: '1-2',
                description: `为什么我这么聪明?`,
            },
            {
                key: '1-3',
                description: `选土豆还是选地瓜?`,
            },
        ],
    },
];

const senderPromptsItems: GetProp<typeof Prompts, 'items'> = [
    {
        key: '1',
        description: '为什么',
        icon: <FireOutlined style={{ color: '#FF4D4F' }} />,
    },
    {
        key: '2',
        description: '然后呢',
        icon: <FireOutlined style={{ color: '#1890FF' }} />,
    },
    {
        key: '3',
        description: '还有吗',
        icon: <FireOutlined style={{ color: '#1890FF' }} />,
    },
    {
        key: '4',
        description: '怎么做',
        icon: <ReadOutlined style={{ color: '#1890FF' }} />,
    },
];

const DynamicIndependent = dynamic(() => Promise.resolve(Independent), {
    ssr: false,
});

const Independent: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.loginUser);
    const roles: GetProp<typeof Bubble.List, 'roles'> = {
        ai: {
            placement: 'start',
            styles: {
                content: {
                    borderRadius: 16,
                },
            },
        },
        local: {
            placement: 'end',
            variant: 'shadow',
        },
    };
    // ==================== Style ====================
    const { styles } = useStyle();

    // ==================== State ====================
    const [headerOpen, setHeaderOpen] = React.useState(false);

    const [userContent, setUserContent] = React.useState('');
    const memoryId = React.useRef<number>(0);
    const [conversationsItems, setConversationsItems] = React.useState([
        {
            key: '0',
            label: '你想聊点啥?',
        },
    ]);

    const [activeKey, setActiveKey] = React.useState('0');

    const [attachedFiles, setAttachedFiles] = React.useState<GetProp<typeof Attachments, 'items'>>(
        [],
    );

    // ==================== Runtime ====================
    const [agent] = useXAgent({
        request: async ({ message }, { onSuccess, onUpdate }) => {
            let temp = ''
            const response = await chatStreamFetch({
                memoryId: memoryId.current===0?undefined:memoryId.current,
                content: message,
            });
            if (!response.ok) {
                console.error('Error sending message');
                return;
            }
            // 处理SSE流
            const reader = response?.body?.getReader();
            const decoder = new TextDecoder('utf-8');
            if (reader){
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) {

                        break;
                    }
                    const chunk = decoder.decode(value, { stream: true });
                    // 假设每个事件都是以"\n\n"分隔的
                    const events = chunk.split('data:');
                    for (const event of events) {
                        if (event.trim() !== '') {
                            const data = JSON.parse(event);
                            temp+=data.chatResponse
                            onUpdate(temp)
                            console.log("chatResponse:{}",temp)
                            memoryId.current= data.id
                        }
                    }
                }
                onSuccess(temp);
            }

            //

        },
    });

    const { onRequest, messages, setMessages } = useXChat({
        agent,
        requestFallback: "服务器开小差了哦",
        // 移除 streaming 属性，因为它不是 XChatConfig 类型的有效属性
    });

    useEffect(() => {
        if (activeKey !== undefined && activeKey.length > 5) {
            console.log("setMessages ", messages);
            const fetchData = async () => {
                const resp = await getDialogueById({
                    'memoryId': activeKey
                })
                const result = resp.data;
                const chatContent = JSON.parse(result.chatContent)

                const chatContentList = chatContent.map((item, index) => {
                    if (item?.toolExecutionRequests === undefined && item?.toolName === undefined) {
                        console.log(item);
                        // 添加检查以确保 item.contents 和 item.text 不是 undefined
                        const message = item.type === "USER" && item.contents && item.contents.length > 0 ? item.contents[0].text : (item.text || "默认消息");
                        return {
                            id: `msg${index}`,
                            message: message,
                            status: item.type === "USER" ? "local" : "success"
                        };
                    }
                    return {
                        id: `msg${index}`,
                        message: "",
                        status: item.type === "USER" ? "local" : "success"
                    };

                }).filter(item =>item.message!='');

                setMessages(chatContentList);
                return result.id
            };
            fetchData().then(nowMemoryId => {
                console.log("setMemoryId",nowMemoryId);
                memoryId.current=nowMemoryId
                console.log("nowMemoryId",memoryId);

            });
        }else {
            memoryId.current=0;
            setMessages([]);
        }
    }, [activeKey]);
    useEffect(() => {
        const fetchData = async () => {
            const resp = await getChatList()
            const chatList = resp.data
            const items= chatList.map((item: { id: number; chatTitle: string; })=>({
                key: item.id,
                label: item.chatTitle
            }))
            setConversationsItems(items);
        };
        fetchData();
    }, []);
    // ==================== Event ====================
    const onSubmit = async (nextContent: string) => {
        if (!nextContent) return;
        onRequest(nextContent);
        setUserContent('');
    };

    const onPromptsItemClick: GetProp<typeof Prompts, 'onItemClick'> = (info) => {
        onRequest(info.data.description as string);
    };

    const onAddConversation = () => {

        setConversationsItems([
            {
                key: '0',
                label: `开启新对话`,
            },
            ...conversationsItems,
        ]);
        setActiveKey(`${conversationsItems.length}`);
    };

    const onConversationClick: GetProp<typeof Conversations, 'onActiveChange'> = (key) => {
        console.log('onActiveChange===============', key);
        setActiveKey(key);
    };

    const handleFileChange: GetProp<typeof Attachments, 'onChange'> = (info) =>
        setAttachedFiles(info.fileList);

    // ==================== Nodes ====================
    const placeholderNode = (
        <Space direction="vertical" size={16} className={styles.placeholder}>

            <Prompts
                title="你好吗，有什么想询问的吗?"
                items={placeholderPromptsItems}

                styles={{
                    list: {
                        width: '100%',
                    },
                    item: {
                        flex: 1,
                    },
                }}
                onItemClick={onPromptsItemClick}
            />
        </Space>
    );

    const items: GetProp<typeof Bubble.List, 'items'> = messages.map(({ id, message, status }) => ({
        key: id,
        // loading: status === 'loading',
        messageRender: renderMarkdown,
        avatar: <AvatarComponent src={  status ==='local'? currentUser?.userAvatar: '/assets/logo.svg'}/>,
        role: status === 'local' ? 'local' : 'ai',
        content: message,
    }));

    const attachmentsNode = (
        <Badge dot={attachedFiles.length > 0 && !headerOpen}>
            <Button type="text" icon={<PaperClipOutlined />} onClick={() => setHeaderOpen(!headerOpen)} />
        </Badge>
    );

    const senderHeader = (

        <Sender.Header
            title="附件"
            open={headerOpen}
            onOpenChange={setHeaderOpen}
            styles={{
                content: {
                    padding: 0,
                },
            }}
        >
            <Attachments
                beforeUpload={() => false}
                items={attachedFiles}
                onChange={handleFileChange}
                placeholder={(type) =>
                    type === 'drop'
                        ? { title: '将文件放到此处' }
                        : {
                            icon: <CloudUploadOutlined />,
                            title: '上传文件',
                            description: '单击或拖动文件到此区域进行上传',
                        }
                }
            />
        </Sender.Header>
    );



    // ==================== Render =================
    return (
        <div className={styles.layout}>
            <div className={styles.menu}>
                {/* 🌟 添加会话 */}
                <Button
                    onClick={onAddConversation}
                    type="link"
                    className={styles.addBtn}
                    icon={<PlusOutlined />}
                >
                    开启新对话
                </Button>
                {/* 🌟 会话管理 */}
                <Conversations
                    items={conversationsItems}
                    className={styles.conversations}
                    activeKey={activeKey}
                    onActiveChange={onConversationClick}
                />
            </div>
            <div className={styles.chat}>
                {/* 🌟 消息列表 */}
                <Bubble.List
                    items={items.length > 0 ? items : [{ content: placeholderNode, variant: 'borderless' }]}
                    roles={roles}
                    className={styles.messages}
                />
                {/* 🌟 提示词 */}
                <Prompts items={senderPromptsItems} onItemClick={onPromptsItemClick} />
                {/* 🌟 输入框 */}
                <Sender
                    value={userContent}
                    header={senderHeader}
                    onSubmit={onSubmit}
                    onChange={setUserContent}
                    prefix={attachmentsNode}
                    loading={agent.isRequesting()}
                    className={styles.sender}
                    allowSpeech
                />
            </div>
        </div>
    );
};

export default DynamicIndependent;