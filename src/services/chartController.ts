// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";


/** 此处后端没有提供注释 POST /chart/gen/async/mq */
export async function genChartBuAiAsyncMq(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.genChartBuAiAsyncMqParams,
  body: {},
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
          ele,
          typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });
  return request<API.BaseResponseBiResponse>("/chart/gen/async/mq", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      ...params,
    },
    data: formData,
    ...(options || {}),
  });
}
