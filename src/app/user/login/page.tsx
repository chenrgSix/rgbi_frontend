"use client";

import React from "react";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-form";
import { message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AppDispatch } from "@/stores";
import { setLoginUser } from "@/stores/loginUser";
import { useDispatch } from "react-redux";
import "./index.css";
import {userLogin} from "@/api/userController";

/**
 * 用户登录页面
 * @param props
 */
const UserLoginPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * 提交
   * @param values
   */
  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userLogin(values);
      if (res.data) {
        message.success("登录成功！");
        // 保存用户登录态
        dispatch(setLoginUser(res.data));
        router.replace("/");
        form.resetFields();
      }
    } catch (e) {
      message.error('登录失败，' + e?.message);
    }
  };

  return (
      <div id="userLoginPage">
        {/*<LoginForm<API.UserAddRequest>*/}
        <LoginForm<API.UserLoginRequest>
            form={form}
            logo={
              <Image src="/assets/logo.svg" alt="RG智能平台" width={44} height={44} />
            }
            title="RG智能平台 - 用户登录"
            subTitle="啥也不知道的平台"
            onFinish={doSubmit}
            submitter={{
              searchConfig: {
                submitText: "登录",
              },
            }}
        >
          <ProFormText
              name="userAccount"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined />,
              }}
              placeholder={"请输入用户账号"}
              rules={[
                {
                  required: true,
                  message: "请输入用户账号!",
                },
              ]}
          />
          <ProFormText.Password
              name="userPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
              }}
              placeholder={"请输入密码"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
          />
          <div
              style={{
                marginBlockEnd: 24,
                textAlign: "end",
              }}
          >
            还没有账号？
            <Link prefetch={false} href={"/user/register"}>
              去注册
            </Link>
          </div>
        </LoginForm>
      </div>
  );
};

export default UserLoginPage;
