'use client'
import {Avatar, Button, Card, List, message, Result} from 'antd';
import ReactECharts from 'echarts-for-react';
import Search from "antd/es/input/Search";
import {listMyChartByPage, retryGenChart} from "@/api/chartController";
import {Component, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
// import {listMyChartByPageUsingPost, retryGenChartUsingPost} from "@/services/rgbi/chartController";
/**
 * 我的图表页面
 * @constructor
 */
class ErrorBoundary extends Component<{ errorMessage: string }, { hasError: boolean }>  {
  constructor(props: { errorMessage: string; children?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // 可以在这里记录错误信息
    console.error('Component error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="图表生成失败"
          subTitle={this.props.errorMessage}
        />
      );
    }

    // 正确处理类型，确保 children 属性存在
    const { children } = this.props as unknown as { children: React.ReactNode };
    return children;
  }
}
const MyChartPage: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc',

  };

  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });

  const currentUser = useSelector((state: RootState) => state.loginUser);
  const [chartList, setChartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      // const res = await listMyChartByPageUsingPost(searchParams);
      const res = await listMyChartByPage(searchParams);
      if (res.data) {
        setChartList(res.data?.records ?? []);
        setTotal(res.data.total ?? 0);
        // 隐藏图表的 title
        if (res.data.records) {
          res.data.records.forEach(data => {
            if(data.status==='succeed'){
              const chartOption = JSON.parse(data.genChart ?? '{}');
              chartOption.title = undefined;
              data.genChart = JSON.stringify(chartOption);
            }
          })
        }
      } else {
        message.error('获取我的图表失败');
      }
    } catch (e: any) {
      message.error('获取我的图表失败，' + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  const retryGen = async (id: number) => {
    const retryChart: API.ChartRetryRequest = {
      id,
    };
    // const res = await retryGenChartUsingPost(retryChart);
    const res = await retryGenChart(retryChart);
    if (!res?.data) {
      message.error('重新生成失败');
    } else {
      message.success('重新生成成功');
    }
  };

  return (
    <div className="my-chart-page">
      <div>
        <Search placeholder="请输入图表名称" enterButton loading={loading} onSearch={(value) => {
          // 设置搜索条件
          setSearchParams({
            ...initSearchParams,
            name: value,
          })
        }}/>
      </div>
      <div className="margin-16" />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
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
        loading={loading}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              title={item.name}
              extra={<Button onClick={() => retryGen(item.id as number)}>重新生成</Button>}
            >
              <List.Item.Meta
                avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
                title={item.name}
                description={item.chartType ? '图表类型：' + item.chartType : undefined}
              />
              <>
                {
                  item.status === 'wait' && <>
                    <Result
                      status="warning"
                      title="待生成"
                      subTitle={item.execMessage ?? '当前图表生成队列繁忙，请耐心等候'}
                    />
                  </>
                }
                {
                  item.status === 'running' && <>
                    <Result
                      status="info"
                      title="图表生成中"
                      subTitle={item.execMessage}
                    />
                  </>
                }
                {
                  item.status === 'succeed' && <>

                    <ErrorBoundary errorMessage={item.execMessage}>
                      {(() => {
                        try {
                          const chartOption = item.genChart && JSON.parse(item.genChart);
                          return(
                            <>
                              <div style={{ marginBottom: 16 }} />
                              <p>{'分析目标：' + item.goal}</p>
                              <p>{'分析结论：' + item.genResult}</p>
                              <div style={{ marginBottom: 16 }} />
                              <ReactECharts option={chartOption} />
                            </>
                          );
                        } catch (error) {
                          console.error('Error parsing genChart JSON:无法读取图表内容');
                          return (
                            <Result
                              status="error"
                              title="图表生成失败"
                              subTitle={item.execMessage}
                            />
                          );
                        }
                      })()}
                    </ErrorBoundary>
                  </>
                }
                {
                  item.status === 'failed' && <>
                    <Result
                      status="error"
                      title="图表生成失败"
                      subTitle={item.execMessage}
                    />
                  </>
                }
              </>

            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};


export default MyChartPage;
