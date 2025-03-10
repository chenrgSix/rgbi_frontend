// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 此处后端没有提供注释 POST /dialogues/chat/delete */
export async function deleteDialogueById(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/dialogues/chat/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /dialogues/chat/info */
export async function getDialogueById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDialogueByIdParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseDialoguesVO>("/dialogues/chat/info", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /dialogues/chat/list */
export async function getChatList(
  body: API.DialoguesQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageDialogueSummaryVO>(
    "/dialogues/chat/list",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}
