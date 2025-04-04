"use client";
import {Button, Card, Col, Row, Space, Statistic, Typography} from "antd";
import {AreaChartOutlined, DatabaseOutlined, RobotOutlined} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', padding: '1rem', paddingBottom: '1rem', background: 'linear-gradient(to bottom, white, #f9fafb)' }}>
      {/* 头部区域 */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-18 gap-20">
        <div className="max-w-2xl">
          <Title level={1} style={{ marginBottom: 24, fontSize: '2.5rem', fontWeight: 600, background: 'linear-gradient(to right, #1890ff, #722ed1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>RG智能数据平台</Title>
          <Paragraph style={{ fontSize: 18, marginBottom: 32, lineHeight: 1.8, color: '#555' }}>
            一站式智能BI解决方案，让数据分析变得简单高效。通过AI驱动的图表生成、智能对话和知识库管理，
            帮助您快速从数据中获取洞察，做出更明智的决策。
          </Paragraph>
          <Space size="large" className="space-x-4">
            <Link href="/chart/gen">
              <Button type="primary" size="large" icon={<AreaChartOutlined />} style={{ borderRadius: '6px', height: '44px', padding: '0 24px' }}>开始分析</Button>
            </Link>
            <Link href="/ai/chat">
              <Button size="large" icon={<RobotOutlined />} style={{ borderRadius: '6px', height: '44px', padding: '0 24px' }}>AI对话</Button>
            </Link>
          </Space>
        </div>
        <div className="flex-shrink-0">
          <Image 
            src="/assets/logo.svg" 
            alt="RG智能数据平台" 
            width={320} 
            height={320} 
            className="drop-shadow-xl" 
            style={{ animation: 'pulse 3s infinite ease-in-out', filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))' }}
          />
        </div>
      </div>

      {/* 统计数据 */}
      <Row gutter={[32, 32]} className="mb-24">
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="h-full shadow-md hover:shadow-lg transition-all duration-300" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Statistic 
              title={<span style={{ fontSize: '16px', fontWeight: 500 }}>智能分析</span>} 
              value={1000} 
              suffix="+" 
              valueStyle={{ color: '#1890ff', fontSize: '28px', fontWeight: 600 }}
            />
            <Paragraph className="mt-3 text-gray-500">已生成图表数量</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="h-full shadow-md hover:shadow-lg transition-all duration-300" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Statistic 
              title={<span style={{ fontSize: '16px', fontWeight: 500 }}>知识库</span>} 
              value={50} 
              suffix="+" 
              valueStyle={{ color: '#52c41a', fontSize: '28px', fontWeight: 600 }}
            />
            <Paragraph className="mt-3 text-gray-500">知识库数量</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="h-full shadow-md hover:shadow-lg transition-all duration-300" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Statistic 
              title={<span style={{ fontSize: '16px', fontWeight: 500 }}>AI对话</span>} 
              value={5000} 
              suffix="+" 
              valueStyle={{ color: '#722ed1', fontSize: '28px', fontWeight: 600 }}
            />
            <Paragraph className="mt-3 text-gray-500">智能对话次数</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="h-full shadow-md hover:shadow-lg transition-all duration-300" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Statistic 
              title={<span style={{ fontSize: '16px', fontWeight: 500 }}>用户满意度</span>} 
              value={98.7} 
              suffix="%" 
              precision={1} 
              valueStyle={{ color: '#fa8c16', fontSize: '28px', fontWeight: 600 }}
            />
            <Paragraph className="mt-3 text-gray-500">用户好评率</Paragraph>
          </Card>
        </Col>
      </Row>

      {/* 功能模块 */}
      <Title level={2} className="mb-16 text-center" style={{ position: 'relative', display: 'inline-block', left: '50%', transform: 'translateX(-50%)', paddingBottom: '10px' }}>
        <span style={{ background: 'linear-gradient(to right, #1890ff, #722ed1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>核心功能</span>
        <div style={{ position: 'absolute', bottom: 0, left: '25%', width: '50%', height: '3px', background: 'linear-gradient(to right, #1890ff, #722ed1)' }}></div>
      </Title>
      <Row gutter={[48, 48]} className="mb-24">
        <Col xs={24} md={8}>
          <Card 
            hoverable 
            className="h-full transform transition-all duration-300 hover:translate-y-[-5px]" 
            style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
            cover={
              <div className="flex justify-center items-center py-8 bg-[#1890ff0f]">
                <AreaChartOutlined style={{ fontSize: 72, color: '#1890ff' }} />
              </div>
            }
          >
            <Card.Meta 
              title={<span style={{ fontSize: '18px', fontWeight: 600 }}>智能图表分析</span>} 
              description={<span style={{ fontSize: '14px', lineHeight: 1.6, display: 'block', marginTop: '8px' }}>上传CSV数据，AI自动生成多种图表，一键解读数据趋势和规律，让数据分析变得简单高效。</span>} 
            />
            <div className="mt-6">
              <Link href="/chart/gen">
                <Button type="primary" ghost style={{ borderRadius: '6px', width: '100%' }}>立即体验</Button>
              </Link>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card 
            hoverable 
            className="h-full transform transition-all duration-300 hover:translate-y-[-5px]" 
            style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
            cover={
              <div className="flex justify-center items-center py-8 bg-[#52c41a0f]">
                <DatabaseOutlined style={{ fontSize: 72, color: '#52c41a' }} />
              </div>
            }
          >
            <Card.Meta 
              title={<span style={{ fontSize: '18px', fontWeight: 600 }}>知识库管理</span>} 
              description={<span style={{ fontSize: '14px', lineHeight: 1.6, display: 'block', marginTop: '8px' }}>构建企业专属知识库，沉淀业务数据和经验，支持智能检索和问答，提升团队协作效率。</span>} 
            />
            <div className="mt-6">
              <Link href="/knowledge/base">
                <Button type="primary" ghost style={{ borderRadius: '6px', width: '100%', borderColor: '#52c41a', color: '#52c41a' }}>立即体验</Button>
              </Link>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card 
            hoverable 
            className="h-full transform transition-all duration-300 hover:translate-y-[-5px]" 
            style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
            cover={
              <div className="flex justify-center items-center py-8 bg-[#722ed10f]">
                <RobotOutlined style={{ fontSize: 72, color: '#722ed1' }} />
              </div>
            }
          >
            <Card.Meta 
              title={<span style={{ fontSize: '18px', fontWeight: 600 }}>AI智能对话</span>} 
              description={<span style={{ fontSize: '14px', lineHeight: 1.6, display: 'block', marginTop: '8px' }}>基于大语言模型的智能对话系统，可以回答业务问题、生成报告、提供数据分析建议。</span>} 
            />
            <div className="mt-6">
              <Link href="/ai/chat">
                <Button type="primary" ghost style={{ borderRadius: '6px', width: '100%', borderColor: '#722ed1', color: '#722ed1' }}>立即体验</Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 底部CTA */}
      <div className="text-center py-20 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50" style={{ borderRadius: '16px', boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.05)' }}>
        <Title level={3} style={{ marginBottom: '16px', background: 'linear-gradient(to right, #1890ff, #722ed1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>开始您的智能数据之旅</Title>
        <Paragraph className="mb-8" style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto 24px', color: '#555' }}>体验AI驱动的数据分析，让决策更智能、更高效</Paragraph>
        <Link href="/chart/gen">
          <Button type="primary" size="large" style={{ borderRadius: '6px', height: '48px', padding: '0 32px', boxShadow: '0 4px 12px rgba(24, 144, 255, 0.15)' }}>立即开始</Button>
        </Link>
      </div>
    </div>
  );
}
