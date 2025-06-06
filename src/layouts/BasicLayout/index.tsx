"use client";
import {GithubFilled, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {ProLayout} from "@ant-design/pro-components";
import {Dropdown, message} from "antd";
import React from "react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
// import GlobalFooter from "@/components/GlobalFooter";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import {setLoginUser} from "@/stores/loginUser";
import {DEFAULT_USER} from "@/constants/user";

import "./index.css";
import {menus} from "@/config/menu";
import {userLogoutNow} from "@/api/userController";


interface Props {
    children: React.ReactNode;
}

/**
 * 全局通用布局
 * @param children
 * @constructor
 */
export default function BasicLayout({children}: Props) {
    const pathname = usePathname();
    // 当前登录用户
    const loginUser = useSelector((state: RootState) => state.loginUser);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    /**
     * 用户注销
     */
    const userLogout = async () => {
        try {

            await userLogoutNow();

            message.success("已退出登录");
            dispatch(setLoginUser(DEFAULT_USER));
            router.push("/user/login");
        } catch (e) {
            message.error("操作失败，", e?.message);
        }
    };

    return (
        <div
            id="basicLayout"
            style={{
                height: "100vh",
                overflow: "auto",
            }}
        >

            <ProLayout
                title="rg智能平台"
                layout="top"
                logo={
                    <Image
                        src="/assets/logo.svg"
                        height={32}
                        width={32}
                        alt="rg智能平台 - czr"
                    />
                }
                location={{
                    pathname,
                }}
                avatarProps={{
                    src: loginUser?.userAvatar || "/assets/logo.svg",
                    size: "small",
                    title: loginUser?.userName || "rg智能平台",
                    render: (props, dom) => {
                        if (!loginUser?.id) {
                            return (
                                <div
                                    onClick={() => {
                                        router.push("/user/login");
                                    }}
                                >
                                    {dom}
                                </div>
                            );
                        }
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: "userCenter",
                                            icon: <UserOutlined/>,
                                            label: "个人中心",
                                        },
                                        {
                                            key: "logout",
                                            icon: <LogoutOutlined/>,
                                            label: "退出登录",
                                        },
                                    ],
                                    onClick: async (event: { key: React.Key }) => {
                                        const {key} = event;
                                        if (key === "logout") {
                                            console.log("退出")
                                            await userLogout();
                                        } else if (key === "userCenter") {
                                            router.push("/user/center");
                                        }
                                    },
                                }}
                            >
                                {dom}
                            </Dropdown>
                        );
                    },
                }}
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        // <SearchInput key="search" />,
                        <a
                            key="github"
                            href="https://github.com/chenrgSix/rgbi_backend"
                            target="_blank"
                        >
                            <GithubFilled key="GithubFilled"/>
                        </a>,
                    ];
                }}

                headerTitleRender={(logo, title, _) => {
                    return (
                        <a>
                            {logo}
                            {title}
                        </a>
                    );
                }}
                // 渲染底部栏
                // footerRender={() => {
                //     return <GlobalFooter/>;
                // }}
                onMenuHeaderClick={(e) => console.log(e)}
                // 定义有哪些菜单
                menuDataRender={() => {
                    return getAccessibleMenus(loginUser, menus);
                }}
                // 定义了菜单项如何渲染
                menuItemRender={(item, dom) => (
                    <Link href={item.path || "/"} target={item.target}>
                        {dom}
                    </Link>
                )}
            >
                {children}
            </ProLayout>
        </div>
    );

}