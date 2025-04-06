"use client";

import { useState, useEffect } from 'react';
import {Table, Card, Button, Modal, Form, Input, message, Space, Tag, Select} from 'antd';
import {addAiModel, listAiModelByPage, updateAiModel} from '@/api/aiModelController';

export default function ModelManage() {
  const [modelList, setModelList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentModel, setCurrentModel] = useState(null);
  const [form] = Form.useForm();
  const [addModalVisible, setAddModalVisible] = useState(false);

  const fetchModelList = async () => {
    setLoading(true);
    try {
      const res = await listAiModelByPage({
        current: currentPage,
        pageSize,
      });
      if (res.data) {
        setModelList(res.data.records || []);
        setTotal(res.data.total || 0);
      } else {
        message.error(res.message || '获取模型列表失败');
      }
    } catch (error) {
      message.error('获取模型列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModelList();
  }, [currentPage, pageSize]);

  const handleEdit = (record) => {
    setCurrentModel(record);
    form.setFieldsValue(record);
    setEditModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const res = await updateAiModel({
        ...values,
        id: currentModel.id,
      });
      if (res.data) {
        message.success('更新成功');
        setEditModalVisible(false);
        fetchModelList();
      } else {
        message.error(res.message || '更新失败');
      }
    } catch (error) {
      message.error('更新失败');
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleAddSubmit = async () => {
    try {
      const values = await form.validateFields();
      const res = await addAiModel(values);
      if (res.data) {
        message.success('添加成功');
        setAddModalVisible(false);
        fetchModelList();
      } else {
        message.error(res.message || '添加失败');
      }
    } catch (error) {
      message.error('添加失败');
    }
  };

  const columns = [
    {
      title: '模型名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '模型类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '平台',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: '启用状态',
      dataIndex: 'isEnable',
      key: 'isEnable',
      render: (isEnable) => (
          <Space>
            <Tag color={isEnable===0?"error":"processing"}>{isEnable===0?"禁用":"启用"}</Tag>
          </Space>
      ),
    },
    {
      title: '是否免费',
      dataIndex: 'isFree',
      key: 'isFree',
      render: (isFree) => (
          <Space>
            <Tag color={isFree===0?"warning":"processing"}>{isFree===0?"收费":"免费"}</Tag>
          </Space>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',

    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="model-manage-container" style={{ padding: '24px' }}>
      <Card title="模型管理" bordered={false}>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={handleAdd}>新增模型</Button>
        </div>
        <Table
          columns={columns}
          dataSource={modelList}
          loading={loading}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>

      <Modal
        title="编辑模型"
        open={editModalVisible}
        onOk={handleSave}
        onCancel={() => setEditModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="模型名称"
            rules={[{ required: true, message: '请输入模型名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="模型类型"
            rules={[{ required: true, message: '请输入模型类型' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="platform"
            label="平台"
            rules={[{ required: true, message: '请输入平台' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isEnable"
            label="启用状态"
            rules={[{ required: true, message: '请选择启用状态' }]}
          >
            <Select
              options={[
                { value: 1, label: '启用' },
                { value: 0, label: '禁用' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="isFree"
            label="是否免费"
            rules={[{ required: true, message: '请选择是否免费' }]}
          >
            <Select
              options={[
                { value: 1, label: '免费' },
                { value: 0, label: '收费' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="remark"
            label="备注"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="新增模型"
        open={addModalVisible}
        onOk={handleAddSubmit}
        onCancel={() => setAddModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="模型名称"
            rules={[{ required: true, message: '请输入模型名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="模型类型"
            rules={[{ required: true, message: '请输入模型类型' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="platform"
            label="平台"
            rules={[{ required: true, message: '请输入平台' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isEnable"
            label="启用状态"
            rules={[{ required: true, message: '请选择启用状态' }]}
          >
            <Select
              options={[
                { value: 1, label: '启用' },
                { value: 0, label: '禁用' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="isFree"
            label="是否免费"
            rules={[{ required: true, message: '请选择是否免费' }]}
          >
            <Select
              options={[
                { value: 1, label: '免费' },
                { value: 0, label: '收费' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="remark"
            label="备注"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}