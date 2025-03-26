'use client'
import {
    Attachments,
    Bubble,
    BubbleProps,
    Conversations,
    ConversationsProps,
    Prompts,
    Sender,
    useXAgent,
    useXChat,
} from '@ant-design/x';
import {Avatar, Badge, Button, Divider, Flex, type GetProp, Select, Space, Typography} from 'antd';
import React, {useEffect, useRef} from 'react';
import {
    CloudUploadOutlined,
    DeleteOutlined,
    FireOutlined,
    PaperClipOutlined,
    PlusOutlined,
    ReadOutlined,
} from '@ant-design/icons';
import {deleteDialogueById, getChatList, getDialogueById} from "@/api/dialoguesController";
import {getSupportLlmModel} from "@/api/aiModelController";
import markdownit from "markdown-it";
import {chatStreamFetch} from "@/services/aiModelController";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import dynamic from "next/dynamic";
import LLMModelVo = API.LLMModelVo;
import ChatRequest = API.ChatRequest;
import DialoguesQueryRequest = API.DialoguesQueryRequest;
import PageDialogueSummaryVO = API.PageDialogueSummaryVO;

const md = markdownit({html: true, breaks: true});
const renderMarkdown: BubbleProps['messageRender'] = (content) => (
    <Typography>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: used in demo */}
        <div dangerouslySetInnerHTML={{__html: md.render(content)}}/>
    </Typography>
);
const renderTitle = (icon: React.ReactElement, title: string) => (
    <Space align="start">
        {icon}
        <span>{title}</span>
    </Space>
);

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
    const delDialogues = useRef('');
    const [headerOpen, setHeaderOpen] = React.useState(false);
    const [selectedModel, setSelectedModel] = React.useState<string>('');
    const [modelList, setModelList] = React.useState<LLMModelVo[]>([]);
    const [activeKey, setActiveKey] = React.useState('0');
    const [userContent, setUserContent] = React.useState('');
    const abortRef = useRef(() => {
    });
    const [conversationsItems, setConversationsItems] = React.useState([
        {
            key: '0',
            label: '你想聊点啥?',
        },
    ]);
    const [attachedFiles, setAttachedFiles] = React.useState<GetProp<typeof Attachments, 'items'>>(
        [],
    );
    const handleFileChange: GetProp<typeof Attachments, 'onChange'> = (info) =>
        setAttachedFiles(info.fileList);

    const placeholderPromptsItems: GetProp<typeof Prompts, 'items'> = [
        {
            key: '1',
            label: renderTitle(<FireOutlined style={{color: '#FF4D4F'}}/>, '热问榜'),
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

    const chatReq = React.useRef<ChatRequest>({
        modelName: '',
        memoryId: undefined,
        content: ''
    });
    const chatQueryReq = React.useRef<DialoguesQueryRequest>({
        current: 1,
        pageSize: 15,
    });
    const chatData = React.useRef<PageDialogueSummaryVO>({
        records: [],
        total: 0,
        size: 0,
        current: 0
    });
    const AvatarComponent = ({src}) => (<Avatar src={src}/>);
    // ==================== Nodes ====================
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
                        ? {title: '将文件放到此处'}
                        : {
                            icon: <CloudUploadOutlined/>,
                            title: '上传文件',
                            description: '单击或拖动文件到此区域进行上传',
                        }
                }
            />
        </Sender.Header>
    );
    const attachmentsNode = (
        <Badge dot={attachedFiles.length > 0 && !headerOpen}>
            <Button type="text" icon={<PaperClipOutlined/>} onClick={() => setHeaderOpen(!headerOpen)}/>
        </Badge>
    );
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
    // ==================== Runtime ====================
    const [agent] = useXAgent({
        request: async ({message}, {onSuccess, onUpdate}) => {
            let temp = ''
            chatReq.current.content = message
            const response = await chatStreamFetch(chatReq.current);
            if (!response.ok) {
                console.error('Error sending message');
                return;
            }
            // 处理SSE流
            const reader = response?.body?.getReader();
            abortRef.current = () => {
                reader?.cancel();
            };
            const decoder = new TextDecoder('utf-8');
            if (reader) {
                while (true) {
                    const {value, done} = await reader.read();
                    if (done) {

                        break;
                    }
                    const chunk = decoder.decode(value, {stream: true});
                    // 假设每个事件都是以"\n\n"分隔的
                    const events = chunk.split('data:');
                    for (const event of events) {
                        if (event.trim() !== '') {
                            const data = JSON.parse(event);
                            temp += data.chatResponse
                            onUpdate(temp)
                            console.log("chatResponse:{}", temp)
                            chatReq.current.memoryId = data.id
                        }
                    }
                }
                onSuccess(temp);
            }
        },
    });
    const {onRequest, messages, setMessages} = useXChat({
        agent,
        requestFallback: "服务器开小差了哦",
        // 移除 streaming 属性，因为它不是 XChatConfig 类型的有效属性
    });
    const items: GetProp<typeof Bubble.List, 'items'> = messages.map(({id, message, status}) => ({
        key: id,
        className: "flex-1",
        messageRender: renderMarkdown,
        avatar: <AvatarComponent src={status === 'local' ? currentUser?.userAvatar : '/assets/logo.svg'}/>,
        role: status === 'local' ? 'local' : 'ai',
        content: message,
    }));
    const senderPromptsItems: GetProp<typeof Prompts, 'items'> = [
        {
            key: '1',
            description: '为什么',
            icon: <FireOutlined style={{color: '#FF4D4F'}}/>,
        },
        {
            key: '2',
            description: '然后呢',
            icon: <FireOutlined style={{color: '#1890FF'}}/>,
        },
        {
            key: '3',
            description: '还有吗',
            icon: <FireOutlined style={{color: '#1890FF'}}/>,
        },
        {
            key: '4',
            description: '怎么做',
            icon: <ReadOutlined style={{color: '#1890FF'}}/>,
        },
    ];
    const onPromptsItemClick: GetProp<typeof Prompts, 'onItemClick'> = (info) => {
        onRequest(info.data.description as string);
    };
    // ==================== Event ====================
    const onSubmit = async (nextContent: string) => {
        if (!nextContent) return;
        onRequest(nextContent);
        setUserContent('');
    };

    const placeholderNode = (
        <Space direction="vertical" size={16} className="pt-[32px]">

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
    const conversationMenuConfig: ConversationsProps['menu'] = (conversation) => ({
        items: [
            {
                label: '删除',
                key: conversation.key,
                icon: <DeleteOutlined/>,
                danger: true,
            },
        ],
        onClick: async (menuInfo) => {
            console.log(menuInfo)
            delDialogues.current = menuInfo.key
            await deleteDialogueById({
                id: menuInfo.key
            })
            setConversationsItems(conversationsItems.filter(item => item.key !== menuInfo.key))
        },
    });
    const onConversationClick: GetProp<typeof Conversations, 'onActiveChange'> = (key) => {
        setActiveKey(key);
    };
    const loadChatList = async () => {
        // 加载会话列表
        const resp = await getChatList(chatQueryReq.current)
        chatData.current = resp.data
        console.log(resp.data)
        const chatList = resp.data.records
        const items = chatList.map((item: { id: number; chatTitle: string; }) => ({
            key: item.id,
            label: item.chatTitle
        }))
        setConversationsItems(items);
    }
    const loadModelLLMList = async () => {
        // 加载模型列表
        const {data} = await getSupportLlmModel()
        setModelList(data)
        // 如果有模型数据，默认选择第一个
        if (data && data.length > 0) {
            console.log(data[0].modelName)
            setSelectedModel(data[0].modelName)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            await loadChatList()
            await loadModelLLMList()
        };
        fetchData();
    }, []);
    useEffect(() => {

        if (activeKey !== undefined && activeKey.length > 5 && delDialogues.current != activeKey) {
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

                }).filter(item => item.message != '');

                setMessages(chatContentList);
                return result.id
            };
            fetchData().then(nowMemoryId => {
                console.log("setMemoryId", nowMemoryId);
                chatReq.current.memoryId = nowMemoryId
                console.log("nowMemoryId", chatReq.current.memoryId);

            });
        } else {
            chatReq.current.memoryId = undefined
            setMessages([]);
        }
    }, [activeKey]);
    useEffect(() => {
        chatReq.current.modelName = selectedModel
        console.log("chatReq.current.modelName", chatReq.current.modelName)
    }, [selectedModel]);
    return (
        <>
            <Flex className="h-[82vh]" gap={12} style={{flexDirection: 'row'}}>
                {/* 模型选择器和对话列表 */}
                <Flex vertical style={{flex: '0 0 auto', paddingRight: '12px'}}>
                    <Button
                        onClick={onAddConversation}
                        type="primary"
                        className="w-[100%] pb-[10px]"
                        icon={<PlusOutlined/>}
                    >
                        开启新对话
                    </Button>
                    {/* 模型选择器 */}
                    <div style={{padding: '0 12px 0px 12px', marginBottom: '12px'}}>

                        <Select
                            showSearch
                            style={{width: '100%'}}
                            placeholder="选择AI模型"
                            value={selectedModel}
                            onChange={setSelectedModel}
                            optionFilterProp="label"
                            options={modelList?.map(model => ({
                                value: model.modelName,
                                label: model.modelName
                            }))}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                        />
                    </div>
                    {/* 对话列表 */}
                    <Conversations
                        style={{width: '100%'}} // 修改为100%以填满容器宽度
                        items={conversationsItems}
                        activeKey={activeKey}
                        menu={conversationMenuConfig}
                        onActiveChange={onConversationClick}
                    />
                </Flex>

                <Divider type="vertical" style={{height: 'auto'}}/> {/* 修改为auto以适应内容高度 */}

                <Flex vertical
                      style={{flex: 1}}
                      gap={8}>
                    <Bubble.List
                        style={{flex: 1}}
                        items={items.length > 0 ? items : [{content: placeholderNode, variant: 'borderless'}]}
                        roles={roles}
                    />
                    <Prompts  items={senderPromptsItems} onItemClick={onPromptsItemClick}
                    />
                    <Sender
                        value={userContent}
                        header={senderHeader}
                        onSubmit={onSubmit}
                        onChange={setUserContent}
                        prefix={attachmentsNode}
                        loading={agent.isRequesting()}
                        onCancel={() => abortRef.current()}
                        allowSpeech
                    />
                </Flex>
            </Flex>
        </>
    );
};
export default DynamicIndependent;