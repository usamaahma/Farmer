import React from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import "./contact.css";

const { TextArea } = Input;

const Contact = () => {
  const onFinish = (values) => {
    console.log("Contact Form Data:", values);
    message.success("Message sent successfully!");
    // API call ya email logic yahan add karein
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h2 className="contact-title">Get in Touch With Us</h2>
        <p className="contact-description">
          Whether you’re a farmer, supplier, or buyer — we’re here to help.
          Reach out to us using the form below.
        </p>
        <Form layout="vertical" onFinish={onFinish} className="contact-form">
          <Form.Item
            name="name"
            label="Your Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter your phone number" }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Enter your phone" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <TextArea rows={4} placeholder="Type your message here..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="contact-button">
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
