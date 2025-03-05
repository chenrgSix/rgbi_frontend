// @ts-ignore
/* eslint-disable */


/** 此处后端没有提供注释 GET /dialogues/chat/steam */
export async function chatStreamFetch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatStreamParams
) {
  return fetch('http://localhost:8101/api/dialogues/chat/steam', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    credentials: 'include', // 确保cookies被包含在请求中
  });
}
