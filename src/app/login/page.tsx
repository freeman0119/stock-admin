"use client";

import { useState } from "react";
import { Card, Form, Input, Button, App } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LoginForm {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const router = useRouter();

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message);
      }

      // 保存 token 和用户信息
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("userInfo", JSON.stringify(result.data.userInfo));
      message.success(result.message);
      router.push("/");
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "登录失败，请重试"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative">
      {/* 背景图层 */}
      <div className="absolute inset-0">
        <Image
          src="/images/login_bg.jpg"
          alt="Stock Market Background"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>

      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />

      {/* 内容层 */}
      <Card
        title="股票管理系统"
        className="w-full max-w-md shadow-2xl mx-4 z-10 bg-white/90 backdrop-blur-sm"
        styles={{
          header: {
            textAlign: "center",
            fontSize: "24px",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            background: "rgba(255,255,255,0.9)",
          },
        }}
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名！" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
