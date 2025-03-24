'use client'
import React, {useEffect, useState} from 'react';
import {Button, message, Modal, Space, Table, Tag, Tooltip} from 'antd';
import type { TableProps } from 'antd';
import {getDocumentInfo, listDocByPage} from "@/api/knowledgeBaseController";
import {DeleteOutlined, FormOutlined} from "@ant-design/icons";



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
    const [total, setTotal] = useState<number>(0);
    const [chunkTotal, setChunkTotal] = useState<number>(0);
    const [searchParams, setSearchParams] = useState<API.KnowledgeDocumentQueryRequest>({ ...initPageParams });
    const [searchChunkParams, setSearchChunkParams] = useState<API.KnowledgeDocumentQueryRequest>({ ...initChunkParams });

    const [knowledgeDocumentList, setKnowledgeDocumentList] = useState<API.KnowledgeDocumentVO[]>([]);
    const [docChunkList, setDocChunkList] = useState<API.DocumentChunk[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenChunkInfo, setIsModalOpenChunkInfo] = useState(false);
    const [chunkInfo, setChunkInfo] = useState("");
    const showModal = async (docId) => {
        // todo 查询数据
        await loadChunk({...searchChunkParams,id: docId})
        setIsModalOpen(true);
    };
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
            render: (item) => <><Button size="small" onClick={()=>{showModal(item.id)}} icon={<FormOutlined />}/> <Button icon={<DeleteOutlined />} size="small"/></>,
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
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChunkInfoOk = () => {
        setIsModalOpenChunkInfo(false);
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
        </div>
        )
};

export default KnowledgeDoc;