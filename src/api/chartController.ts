// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 此处后端没有提供注释 POST /chart/add */
export async function addChart(
  body: API.ChartAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong>("/chart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/delete */
export async function deleteChart(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/chart/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/edit */
export async function editChart(
  body: API.ChartEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/chart/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/gen/async */
export async function genChartBuAiAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.genChartBuAiAsyncParams,
  body: {},
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBiResponse>("/chart/gen/async", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ...params,
      genChartByAiRequest: undefined,
      ...params["genChartByAiRequest"],
    },
    data: body,
    ...(options || {}),
  });
}



/** 此处后端没有提供注释 POST /chart/gen/retry */
export async function retryGenChart(
  body: API.ChartRetryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBiResponse>("/chart/gen/retry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /chart/get */
export async function getChartById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartByIdParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseChart>("/chart/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/list/page */
export async function listChartByPage(
  body: API.ChartQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageChart>("/chart/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/list/page/vo */
export async function listChartByPageVo(
  body: API.ChartQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageChart>("/chart/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/my/list/page/vo */
export async function listMyChartByPage(
  body: API.ChartQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageChart>("/chart/my/list/page/vo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

