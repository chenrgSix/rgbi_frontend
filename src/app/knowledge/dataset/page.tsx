'use client'
import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Space, Table, Tag, Tooltip, Typography, Upload} from 'antd';
import type { TableProps } from 'antd';
import {deleteDocument, getDocumentInfo, listDocByPage, loadDocument} from "@/api/knowledgeBaseController";
import {
    DeleteOutlined,
    FormOutlined,
    InboxOutlined,
    PlusOutlined,
    RightCircleOutlined,
    UploadOutlined
} from "@ant-design/icons";



//定义转换函数
function formatBytes(bytes: number): string {
    const KB = 1024;
    const MB = KB * 1024;

    if (bytes < MB) {
        return (bytes / KB).toFixed(2) + ' KB';
    } else {
        return (bytes / MB).toFixed(2) + ' MB';
    }
}

import { useSearchParams } from 'next/navigation'
import {useForm} from "antd/es/form/Form";
import {addDocument} from "@/services/knowledgeBaseController";

const { Title } = Typography;

const KnowledgeDoc: React.FC = () => {

    const initPageParams = {
        current: 1,
        pageSize: 8,
        kbId: useSearchParams().get('kbId'),
        sortField: 'createTime',
        sortOrder: 'desc',
    };
    const initChunkParams = {
        current: 1,
        pageSize: 5,
        kbId: useSearchParams().get('kbId'),
        sortField: 'createTime',
        sortOrder: 'desc',
    };
    const kbId = useSearchParams().get('kbId');
    const [total, setTotal] = useState<number>(0);
    const [chunkTotal, setChunkTotal] = useState<number>(0);
    const [searchParams, setSearchParams] = useState<API.KnowledgeDocumentQueryRequest>({ ...initPageParams });
    const [searchChunkParams, setSearchChunkParams] = useState<API.KnowledgeDocumentQueryRequest>({ ...initChunkParams });
    const [form] = useForm();
    const [knowledgeDocumentList, setKnowledgeDocumentList] = useState<API.KnowledgeDocumentVO[]>([]);
    const [docChunkList, setDocChunkList] = useState<API.DocumentChunk[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenChunkInfo, setIsModalOpenChunkInfo] = useState(false);
    const [isModalOpenUpload, setIsModalOpenUpload] = useState(false);
    const [chunkInfo, setChunkInfo] = useState("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const showModal = async (docId:number) => {
        await loadChunk({...searchChunkParams,id: docId})
        setIsModalOpen(true);
    };
    const delDoc = async (docId:number) => {
        await deleteDocument({
            "docId": docId,
        })
        await loadData()
    };
    const analyzeDoc = async (docId:number)=>{
        loadDocument({
            "docId": docId,
        })
        await loadData()
    }
    const loadChunk=async (args:API.KnowledgeDocumentQueryRequest)=>{
        setSearchChunkParams(args)
        const res = await getDocumentInfo(args)
        console.log(res)
        if (res.data) {
            setChunkTotal(res.data.total ?? 0);
            setDocChunkList(res?.data.chunks)
        } else {
            message.error('获取数据失败');
        }
    }
    //获取登录用户的登录信息
    const onFinish = async (values: any) => {
        console.log("进来了")
        console.log(values.file.file.originFileObj)
        // 避免重复提交
        if (submitting) {
            return;
        }
        setSubmitting(true);
        // 对接后端，上传数据
        const params = {
            ...values,
            kbId: kbId,
            file: undefined,
        };
        const form = new FormData()
        form.append("file", values.file.file.originFileObj)
        try {
            // const res = await genChartBuAiAsyncMqUsingPost(params, {}, values.file.file.originFileObj);
            // const res = await genChartBuAiAsyncMq(params, {}, values.file.file.originFileObj);

            // const res = await addDocument(params, {}, values.file.file.originFileObj);
            const res = await addDocument(params, {}, values.file.file.originFileObj);
            if (!res?.data) {
                message.error('上传失败');
            } else {
                loadData()
                message.success('上传成功');
            }
            console.log("提交")
        } catch (e: any) {
            message.error('上传失败，' + e.message);
        }
        setSubmitting(false);
    };
    const stateMapping = (key)=>{
        switch (key){
            case 0:
                return "未解析"
            case 1:
                return "解析中"
            case 2:
                return "已解析"
        }

    }
    const operate=(item)=>{return (<>
        {item.status==0?<Button size="small" onClick={()=>{analyzeDoc(item.id)}} icon={<RightCircleOutlined />}/>
            :<Button size="small" onClick={()=>{showModal(item.id)}} icon={<FormOutlined />}/>}
        <Button size="small" onClick={()=>{delDoc(item.id)}} icon={<DeleteOutlined />} />
    </>)}
    const fileColumns: TableProps['columns'] = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: '文件名',
            dataIndex: 'displayName',
            key: 'displayName',
        },
        {
            title: '类型',
            dataIndex: 'docType',
            key: 'docType',
        },
        {
            title: '文件大小',
            key: 'fileSize',
            dataIndex: 'fileSize',
            render: (fileSize) => {
                return formatBytes(fileSize);},
        },
        {
            title: '解析状态',
            key: 'status',
            dataIndex: 'status',
            render: (status) => {
                return stateMapping(status);},
        },
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
        },
        {
            title: '更新时间',
            key: 'updateTime',
            dataIndex: 'updateTime',
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (item) => operate(item),
        },
    ];

    const chunkColumns: TableProps['columns'] = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            width: "100"
        },
        {
            title: '向量文本片段',
            dataIndex: 'text',
            key: 'text',
            ellipsis: {
                showTitle: false,
            },
            render: (text) =>(
                <a onClick={()=>{setChunkInfo(text);
                    setIsModalOpenChunkInfo(true);
                    return null;}}>{text}</a>
            ),
        },

        {
            title: '向量结果',
            dataIndex: 'vector',
            key: 'vector',
            ellipsis: {
                showTitle: false,
            },
            render: (vector) =>(
                <a onClick={()=>{setChunkInfo(""+vector);
                    setIsModalOpenChunkInfo(true);
                    return null;}}>{vector}</a>
            ),
        },
        // {
        //     title: '操作',
        //     dataIndex: '',
        //     key: 'x',
        //     render: () => <><Button size="small" onClick={showModal} icon={<FormOutlined />}/> <Button icon={<DeleteOutlined />} size="small"/></>,
        // },
    ];
    const showUpLoadForm =() =>{
        setIsModalOpenUpload(true)
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChunkInfoOk = () => {
        setIsModalOpenChunkInfo(false);
    };
    const handleUploadOk = () => {
        form.submit()
        setIsModalOpenUpload(false);
    };
    const handleUploadCancel = () => {
        setIsModalOpenUpload(false);
    };

    const handleChunkInfoCancel = () => {
        setIsModalOpenChunkInfo(false);
    };
    const loadData=async ()=>{
        try {
            // const res = await listMyChartByPageUsingPost(searchParams);
            const res = await listDocByPage(initPageParams);
            console.log(res.data);
            if (res.data) {
                setTotal(res.data.total ?? 0);
                setKnowledgeDocumentList(res.data?.records ?? []);
            } else {
                message.error('获取数据失败');
            }
        } catch (e) {
            message.error('获取数据失败，' + e?.message);
        }
    };
    useEffect(() => {
        loadData();
    }, [searchParams]);

    return (
        <div className="knowledge-dataset">
            <Row>
                <Col span={12}>
                    <>
                        <Title level={3}>🤖上传知识文档，解析过后即可享受知识问答❤</Title>
                    </>
                </Col>
                <Col span={9} />
                <Col span={3} >
                    <Button onClick={showUpLoadForm} icon={<UploadOutlined />} >上传文档</Button>
                </Col>
            </Row>
            <Table columns={fileColumns}
                   dataSource={knowledgeDocumentList ?? []}
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
            />
            <Modal width="auto" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Table
                    dataSource={docChunkList}
                    columns={chunkColumns}
                    pagination={{
                        onChange: (page, pageSize) => {
                            console.log(page)
                            console.log(pageSize)
                            loadChunk({
                                ...searchChunkParams,
                                current: page,
                                pageSize,
                            })
                        },
                        current: searchChunkParams?.current,
                        pageSize: searchChunkParams?.pageSize,
                        total: chunkTotal,
                    }}
                />
            </Modal>
            <Modal title="详细信息" width="auto" open={isModalOpenChunkInfo} onOk={handleChunkInfoOk} onCancel={handleChunkInfoCancel}>
                <p>{chunkInfo}</p>
            </Modal>
            <Modal title="上传文件"
                   open={isModalOpenUpload}
                   onOk={handleUploadOk}
                   onCancel={handleUploadCancel}

            >
              <Form
                    labelAlign="right"
                    form={form}
                    onFinish={onFinish}
                    initialValues={{}}
                >
                    <Form.Item name="file" >
                        {/*<Upload name="file" maxCount={1}>*/}
                        {/*    <Button icon={<UploadOutlined />}>上传文档</Button>*/}
                        {/*</Upload>*/}
                        <Upload.Dragger name="file" maxCount={1}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">点击上传或者拖拽文档到当前区域</p>
                            <p className="ant-upload-hint">注意！！！请确保是文档格式</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
        )
};

export default KnowledgeDoc;