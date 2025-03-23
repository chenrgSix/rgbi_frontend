'use client'
import {
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    UserOutlined,
    FileDoneOutlined,
    DatabaseOutlined, CalendarOutlined
} from '@ant-design/icons';
import {Avatar, Button, Card, Col, Divider, Form, Input, List, message, Modal, Radio, Row, Typography} from 'antd';
import React, {useEffect, useState} from "react";
import {addKnowledgeBase, listKnowledgeBaseByPage} from "@/api/knowledgeBaseController";
import Search from "antd/es/input/Search";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import KnowledgeBaseAddRequest = API.KnowledgeBaseAddRequest;
import { useRouter } from "next/navigation";

const { Title } = Typography;

const KnowledgeBase: React.FC = () => {
    const initSearchParams = {
        current: 1,
        pageSize: 8,
        sortField: 'createTime',
        sortOrder: 'desc',
    };
    const router = useRouter();
    const currentUser = useSelector((state: RootState) => state.loginUser);
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useState<API.KnowledgeBaseQueryRequest>({ ...initSearchParams });
    const [total, setTotal] = useState<number>(0);
    const [openCreateForm, setOpenCreateForm] = useState(false);
    const [knowledgeBaseList, setKnowledgeBaseList] = useState<API.KnowledgeBaseVO[]>([]);
    const showCreateForm=()=>{
        setOpenCreateForm(true);
    }
    const onCreate = async (values: KnowledgeBaseAddRequest) => {
        console.log('Received values of form: ', values);
        const resp=await addKnowledgeBase(values);
        setOpenCreateForm(false);
        if (resp?.data){
            await loadData()
        }
    };
    const onDel=(item)=>{
        const kbId = item.id
        console.log("删除",kbId)
    }
    const isMaster =(item)=>{
        return item.userId===currentUser?.id
    }
    const navigateToAbout =  (kbId) => {
        router.push('/knowledge/dataset?kbId='+kbId);
        // router.replace('/about', { scroll: false });
    };
    const loadData=async ()=>{
        try {
            // const res = await listMyChartByPageUsingPost(searchParams);
            const res = await listKnowledgeBaseByPage(initSearchParams);
            console.log(res.data);
            if (res.data) {
                setTotal(res.data.total ?? 0);
                setKnowledgeBaseList(res.data?.records ?? []);
            } else {
                message.error('获取我的图表失败');
            }
        } catch (e) {
            message.error('获取我的图表失败，' + e?.message);
        }
    };
    useEffect(() => {
        loadData();
    }, [searchParams]);
    return (
        <div className="knowledge-base">
            <Row>
                <Col span={12}>
                    <>
                        <Title>欢迎回来  {currentUser.userName} ❤</Title>
                        <Title level={5}>RAG  让你的文档开口说话</Title>
                    </>
                </Col>
                <Col span={6}><Search placeholder="请输入知识库名称" enterButton="查询" size="large" /></Col>
                <Col span={1} />
                <Col span={5} >
                    <Button className="ml-[32px]" type="primary" size="large" onClick={showCreateForm}  icon={<PlusOutlined />} >
                    新建知识库
                    </Button>
                </Col>
            </Row>
            <Modal
                open={openCreateForm}
                title="新建知识库"
                okText="提交"
                cancelText="取消"
                okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
                onCancel={() => setOpenCreateForm(false)}
                destroyOnClose
                modalRender={(dom) => (
                    <Form
                        layout="vertical"
                        form={form}
                        name="form_in_modal"
                        initialValues={{ modifier: 'public' }}
                        clearOnDestroy
                        onFinish={(values) => onCreate(values)}
                    >
                        {dom}
                    </Form>
                )}
            >
                <Form.Item
                    name="title"
                    label="名称"
                    rules={[{ required: true, message: '请输入标题' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="remark"
                    label="备注"
                    rules={[{ required: true, message: '描述一下这个知识库吧！' }]}
                >
                    <Input type="textarea" defaultValue="" />
                </Form.Item>
                <Form.Item name="isPublic" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="1">公开</Radio>
                        <Radio value="0">私有</Radio>
                    </Radio.Group>
                </Form.Item>
            </Modal>

            <br/>
            <List
                grid={{ gutter: 16, column: 4 }}
                pagination={{
                    onChange: (page, pageSize) => {
                        setSearchParams({
                            ...searchParams,
                            current: page,
                            pageSize,
                        })
                    },
                    current: searchParams.current,
                    pageSize: searchParams.pageSize,
                    total: total,
                }}
                dataSource={knowledgeBaseList}
                renderItem={(item) => (
                    <List.Item>
                        <Card className="min-w-[200px]"
                              hoverable={true}
                              onClick={() => {navigateToAbout(item.id)}}
                              title={<Avatar src={isMaster(item) ? currentUser?.userAvatar : undefined}
                                             icon={item.userId !== currentUser.id ? <UserOutlined/> : undefined}/>}
                              extra={<Button disabled={!isMaster(item)} icon={<DeleteOutlined/>} onClick={() => {
                                  onDel(item)
                              }}/>}
                        >
                            <Card.Meta
                                // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                                // avatar={<Avatar icon={item.userId==currentUser.id?currentUser?.userAvatar:<UserOutlined />}  />}
                                title={item.title + (item.isPublic === 0 ? "（私有）" : "（公开）")}
                                description={
                                    <>
                                        <div className="min-h-[100px]">
                                            <p>{item.remark}</p>
                                        </div>
                                        <p><FileDoneOutlined/> {item.docNum} 文档</p>
                                        <p><CalendarOutlined/> {item.createTime}</p>
                                        <br/>
                                    </>
                                }
                            />
                        </Card>
                    </List.Item>

                )}
            />
        </div>

    );
};

export default KnowledgeBase;