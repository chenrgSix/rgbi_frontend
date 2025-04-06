declare namespace API {
  type addDocumentParams = {
    knowledgeAddDocumentRequest: KnowledgeAddDocumentRequest;
  };

  type AiModel = {
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
    isDelete?: number;
    enable?: boolean;
    free?: boolean;
  };

  type AiModelAddRequest = {
    /** 模型名称 */
    name?: string;
    /** 模型类型:text,image,embedding,multimodal */
    type?: string;
    /** 配置 */
    setting?: string;
    /** 备注 */
    remark?: string;
    /** 平台：Ollama、OpenAI、Claude... */
    platform?: string;
    /** 最大输入token */
    maxInputTokens?: number;
    /** 最大输出token */
    maxOutputTokens?: number;
    /** 是否免费 */
    isFree?: number;
    /** 是否启用 */
    isEnable?: number;
  };

  type AiModelQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    userId?: number;
    name?: string;
    type?: string;
    platform?: string;
    isFree?: number;
    isEnable?: number;
  };

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

  type BaseResponseDocumentInfoVO = {
    code?: number;
    data?: DocumentInfoVO;
    message?: string;
  };

  type BaseResponseKnowledgeBaseVO = {
    code?: number;
    data?: KnowledgeBaseVO;
    message?: string;
  };

  type BaseResponseListKnowledgeBaseVO = {
    code?: number;
    data?: KnowledgeBaseVO[];
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

  type BaseResponsePageAiModel = {
    code?: number;
    data?: PageAiModel;
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

  type BaseResponsePageKnowledgeBaseVO = {
    code?: number;
    data?: PageKnowledgeBaseVO;
    message?: string;
  };

  type BaseResponsePageKnowledgeDocumentVO = {
    code?: number;
    data?: PageKnowledgeDocumentVO;
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
    kbIds?: number[];
    content?: string;
  };

  type deleteDocumentParams = {
    docId: number;
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
    kbIds?: number[];
    chatTitle?: string;
    createTime?: string;
  };

  type DialoguesVO = {
    id?: number;
    userId?: number;
    kbSimples?: KBSimpleVO[];
    chatContent?: string;
    chatTitle?: string;
    createTime?: string;
    updateTime?: string;
  };

  type DocumentChunk = {
    id?: string;
    vector?: number[];
    text?: string;
    metadata?: Record<string, any>;
  };

  type DocumentInfoVO = {
    chunks?: DocumentChunk[];
    id?: number;
    fileId?: number;
    docType?: string;
    createTime?: string;
    updateTime?: string;
    pages?: number;
    size?: number;
    current?: number;
    total?: number;
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

  type getKnowledgeBaseByIdParams = {
    id: number;
  };

  type getUserByIdParams = {
    id: number;
  };

  type getUserVOByIdParams = {
    id: number;
  };

  type KBSimpleVO = {
    id?: number;
    title?: string;
  };

  type KnowledgeAddDocumentRequest = {
    kbId?: number;
  };

  type KnowledgeBaseAddRequest = {
    title?: string;
    remark?: string;
    isPublic?: number;
    ingestMaxSegment?: number;
    ingestMaxOverlap?: number;
  };

  type KnowledgeBaseQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    title?: string;
    ingestModelName?: string;
  };

  type KnowledgeBaseVO = {
    id?: number;
    userId?: number;
    title?: string;
    remark?: string;
    isPublic?: number;
    docNum?: number;
    ingestMaxSegment?: number;
    ingestMaxOverlap?: number;
    ingestModelName?: string;
    createTime?: string;
    updateTime?: string;
  };

  type KnowledgeDocumentQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    kbId?: number;
    status?: number;
  };

  type KnowledgeDocumentVO = {
    id?: number;
    kbId?: number;
    userId?: number;
    fileId?: number;
    docType?: string;
    status?: number;
    createTime?: string;
    updateTime?: string;
    displayName?: string;
    fileSize?: number;
  };

  type LLMModelVo = {
    modelId?: number;
    modelName?: string;
    modelPlatform?: string;
    isFree?: number;
    isEnable?: number;
  };

  type loadDocumentParams = {
    docId: number;
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

  type PageAiModel = {
    records?: AiModel[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageAiModel;
    searchCount?: PageAiModel;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
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

  type PageKnowledgeBaseVO = {
    records?: KnowledgeBaseVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageKnowledgeBaseVO;
    searchCount?: PageKnowledgeBaseVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageKnowledgeDocumentVO = {
    records?: KnowledgeDocumentVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageKnowledgeDocumentVO;
    searchCount?: PageKnowledgeDocumentVO;
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
