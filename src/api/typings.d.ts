declare namespace API {
  type AiModelUpdateRequest = {
    id?: number;
    name?: string;
    type?: string;
    setting?: string;
    remark?: string;
    platform?: string;
    maxInputTokens?: number;
    maxOutputTokens?: number;
    isFree?: number;
    isEnable?: number;
  };

  type AiModelVO = {
    id?: number;
    userId?: number;
    name?: string;
    type?: string;
    setting?: string;
    remark?: string;
    platform?: string;
    maxInputTokens?: number;
    maxOutputTokens?: number;
    isFree?: number;
    isEnable?: number;
    createTime?: string;
    updateTime?: string;
  };

  type BaseResponseAiModelVO = {
    code?: number;
    data?: AiModelVO;
    message?: string;
  };

  type BaseResponseBiResponse = {
    code?: number;
    data?: BiResponse;
    message?: string;
  };

  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChart = {
    code?: number;
    data?: Chart;
    message?: string;
  };

  type BaseResponseDialoguesVO = {
    code?: number;
    data?: DialoguesVO;
    message?: string;
  };

  type BaseResponseListLLMModelVo = {
    code?: number;
    data?: LLMModelVo[];
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageChart = {
    code?: number;
    data?: PageChart;
    message?: string;
  };

  type BaseResponsePageDialogueSummaryVO = {
    code?: number;
    data?: PageDialogueSummaryVO;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponseScoreVO = {
    code?: number;
    data?: ScoreVO;
    message?: string;
  };

  type BaseResponseString = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BiResponse = {
    genChart?: string;
    genResult?: string;
    chartId?: number;
  };

  type Chart = {
    id?: number;
    goal?: string;
    name?: string;
    chartData?: string;
    chartType?: string;
    genChart?: string;
    genResult?: string;
    status?: string;
    execMessage?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ChartAddRequest = {
    name?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
  };

  type ChartEditRequest = {
    name?: string;
    id?: number;
    goal?: string;
    chartData?: string;
    chartType?: string;
  };

  type ChartQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    name?: string;
    id?: number;
    goal?: string;
    userId?: number;
    chartType?: string;
  };

  type ChartRetryRequest = {
    id?: number;
  };

  type ChartUpdateRequest = {
    name?: string;
    id?: number;
    goal?: string;
    chartData?: string;
    chartType?: string;
    genChart?: string;
    genResult?: string;
    userId?: number;
  };

  type ChatRequest = {
    modelName?: string;
    memoryId?: number;
    content?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type DialoguesQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type DialogueSummaryVO = {
    id?: number;
    chatTitle?: string;
    createTime?: string;
  };

  type DialoguesVO = {
    id?: number;
    userId?: number;
    chatContent?: string;
    chatTitle?: string;
    createTime?: string;
    updateTime?: string;
  };

  type genChartBuAiAsyncMqParams = {
    genChartByAiRequest: GenChartByAiRequest;
  };

  type genChartBuAiAsyncParams = {
    genChartByAiRequest: GenChartByAiRequest;
  };

  type GenChartByAiRequest = {
    name?: string;
    goal?: string;
    chartType?: string;
    loginUser?: User;
  };

  type getAiModelByIdParams = {
    modelId: number;
  };

  type getChartByIdParams = {
    id: number;
  };

  type getDialogueByIdParams = {
    memoryId: number;
  };

  type getUserByIdParams = {
    id: number;
  };

  type getUserVOByIdParams = {
    id: number;
  };

  type LLMModelVo = {
    modelId?: number;
    modelName?: string;
    modelPlatform?: string;
    isFree?: number;
    isEnable?: number;
  };

  type LoginUserVO = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageChart = {
    records?: Chart[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageChart;
    searchCount?: PageChart;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageDialogueSummaryVO = {
    records?: DialogueSummaryVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageDialogueSummaryVO;
    searchCount?: PageDialogueSummaryVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageSysConfigVO = {
    records?: SysConfigVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageSysConfigVO;
    searchCount?: PageSysConfigVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUser = {
    records?: User[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUser;
    searchCount?: PageUser;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUserVO;
    searchCount?: PageUserVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type ScoreVO = {
    scoreTotal?: number;
    isSign?: number;
  };

  type SseEmitter = {
    timeout?: number;
  };

  type SysConfigQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type SysConfigUpdateRequest = {
    name?: string;
    value?: string;
  };

  type SysConfigVO = {
    name?: string;
    value?: string;
  };

  type User = {
    id?: number;
    userAccount?: string;
    userPassword?: string;
    userName?: string;
    userAvatar?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
    admin?: boolean;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };

  type UserUpdateMyRequest = {
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
  };
}
