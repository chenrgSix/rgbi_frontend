// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 此处后端没有提供注释 POST /knowledge/add */
export async function addKnowledgeBase(
  body: API.KnowledgeBaseAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/knowledge/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /knowledge/doc/delete */
export async function deleteDocument(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDocumentParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/knowledge/doc/delete", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /knowledge/doc/info */
export async function getDocumentInfo(
  body: API.KnowledgeDocumentQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseDocumentInfoVO>("/knowledge/doc/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /knowledge/doc/load */
export async function loadDocument(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loadDocumentParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/knowledge/doc/load", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /knowledge/doc/page */
export async function listDocByPage(
  body: API.KnowledgeDocumentQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageKnowledgeDocumentVO>(
    "/knowledge/doc/page",
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

/** 此处后端没有提供注释 POST /knowledge/doc/upload */
export async function addDocument(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addDocumentParams,
  body: {},
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/knowledge/doc/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ...params,
      knowledgeAddDocumentRequest: undefined,
      ...params["knowledgeAddDocumentRequest"],
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /knowledge/get */
export async function getKnowledgeBaseById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getKnowledgeBaseByIdParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseKnowledgeBaseVO>("/knowledge/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /knowledge/get/selectable */
export async function getSelectableKnowledgeBaseByUserId(options?: {
  [key: string]: any;
}) {
  return request<API.BaseResponseListKnowledgeBaseVO>(
    "/knowledge/get/selectable",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /knowledge/list/page */
export async function listKnowledgeBaseByPage(
  body: API.KnowledgeBaseQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageKnowledgeBaseVO>("/knowledge/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
