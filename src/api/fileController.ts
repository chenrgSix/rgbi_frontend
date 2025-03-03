// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 此处后端没有提供注释 POST /common/upload */
export async function uploadFile(body: {}, options?: { [key: string]: any }) {
  return request<API.BaseResponseString>("/common/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /common/upload/minio */
export async function uploadFileMinio(
  body: {},
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseString>("/common/upload/minio", {
    method: "POST",
    data: body,
    ...(options || {}),
  });
}
