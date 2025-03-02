// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 此处后端没有提供注释 GET /dialogues/chat */
export async function chat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseChatVO>("/dialogues/chat", {
    method: "GET",
    params: {
      ...params,
    },
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

/** 此处后端没有提供注释 GET /dialogues/chat/list */
export async function getChatList(options?: { [key: string]: any }) {
  return request<API.BaseResponseListDialogueSummaryVO>(
    "/dialogues/chat/list",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /dialogues/chat/steam */
export async function chatStream(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatStreamParams,
  options?: { [key: string]: any }
) {
  return request<API.SseEmitter>("/dialogues/chat/steam", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
