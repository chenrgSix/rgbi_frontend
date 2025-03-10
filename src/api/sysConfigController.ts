// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 此处后端没有提供注释 POST /sys/search */
export async function listSysConfigByPage(
  body: API.SysConfigQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.PageSysConfigVO>("/sys/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /sys/update */
export async function updateConfig(
  body: API.SysConfigUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<any>("/sys/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
