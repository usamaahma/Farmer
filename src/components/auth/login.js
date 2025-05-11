import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import { auth } from "../../utils/axios";

const Login = () => {
  const onFinish = async (values) => {
    try {
      const response = await auth.post(`/login`, values);
      message.success("Account created successfully!");
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      message.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login to Your Account</h2>
        <Form
          name="login_form"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
