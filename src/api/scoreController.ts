// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 此处后端没有提供注释 POST /score/checkIn */
export async function checkIn(options?: { [key: string]: any }) {
  return request<API.BaseResponseString>("/score/checkIn", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /score/get */
export async function getUserById1(options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>("/score/get", {
    method: "GET",
    ...(options || {}),
  });
}
