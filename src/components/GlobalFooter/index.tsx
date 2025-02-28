import React from "react";
import "./index.css";

/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="global-footer">
            <div>© {currentYear} rg智能平台</div>
            <div>
                <a href="#" target="_blank">
                    作者：czr
                </a>
            </div>
        </div>
    );
}