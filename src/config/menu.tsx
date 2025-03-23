import { MenuDataItem } from "@ant-design/pro-layout";
import ACCESS_ENUM from "@/access/accessEnum";


// 菜单列表
export const menus = [

    {
        path: "/",
        name: "主页",
        access: ACCESS_ENUM.USER
    },
    {
        path: "/knowledge/base",
        name: "知识库",
        access: ACCESS_ENUM.USER
    },
    {
        path: "/chart/gen",
        name: "智能分析",
        access: ACCESS_ENUM.USER
    },
    {
        path: "/chart/my",
        name: "我的图表",
        access: ACCESS_ENUM.USER
    },
    {
        path: "/ai/chat",
        name: "聊天",
        access: ACCESS_ENUM.USER
    },
    {
        path: "/user/manage",
        name: "个人信息",
        access: ACCESS_ENUM.USER
    },
] as MenuDataItem[];

// 根据全部路径查找菜单
export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
    return findMenuItemByPath(menus, path);
};

// 根据路径查找菜单（递归）
export const findMenuItemByPath = (
    menus: MenuDataItem[],
    path: string,
): MenuDataItem | null => {
    for (const menu of menus) {
        if (menu.path === path) {
            return menu;
        }
        if (menu.children) {
            const matchedMenuItem = findMenuItemByPath(menu.children, path);
            if (matchedMenuItem) {
                return matchedMenuItem;
            }
        }
    }
    return null;
};