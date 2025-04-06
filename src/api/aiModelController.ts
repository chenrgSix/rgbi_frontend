// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 此处后端没有提供注释 POST /aimodel/add */
export async function addAiModel(
  body: API.AiModelAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong>("/aimodel/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /aimodel/chat/steam */
export async function chatStream(
  body: API.ChatRequest,
  options?: { [key: string]: any }
) {
  return request<API.SseEmitter>("/aimodel/chat/steam", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /aimodel/get/vo */
export async function getAiModelById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAiModelByIdParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseAiModelVO>("/aimodel/get/vo", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /aimodel/list/page */
export async function listAiModelByPage(
  body: API.AiModelQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageAiModel>("/aimodel/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /aimodel/llm/list */
export async function getSupportLlmModel(options?: { [key: string]: any }) {
  return request<API.BaseResponseListLLMModelVo>("/aimodel/llm/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /aimodel/update */
export async function updateAiModel(
  body: API.AiModelUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/aimodel/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
