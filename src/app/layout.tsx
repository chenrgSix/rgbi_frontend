"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useCallback, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/stores";

import AccessLayout from "@/access/AccessLayout";
import { setLoginUser } from "@/stores/loginUser";
import "./globals.css";
import {getLoginUser} from "@/api/userController";

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
    Readonly<{
        children: React.ReactNode;
    }>
> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    // 初始化全局用户状态
    const doInitLoginUser = useCallback(async () => {
        const res = await getLoginUser();
        if (res.data) {
            // 更新全局用户状态
            console.log(res.data);
            dispatch(setLoginUser(res.data));
        }else {

        }
    }, []);

    // 只执行一次
    useEffect(() => {
        doInitLoginUser();
    }, []);
    return children;
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh">
        <body>
        <AntdRegistry>
            <Provider store={store}>
                <InitLayout>
                    <BasicLayout>
                        <AccessLayout>{children}</AccessLayout>
                    </BasicLayout>
                </InitLayout>
            </Provider>
        </AntdRegistry>
        </body>
        </html>
    );
}