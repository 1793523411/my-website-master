import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Table, Tag, Space } from "antd";
import axios from "../../utils/person";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 8 },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};



export default function PersonNav() {

    const [form] = Form.useForm();

  let initialValues = {
    logourl: "111",
    logolink: "111222",
  };

  const columns = [
    {
      title: "名字",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Menu名字",
      dataIndex: "menuname",
      key: "menuname",
    },
    {
      title: "链接",
      dataIndex: "href",
      key: "href",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "subMenu",
      key: "sub",
      dataIndex: "sub",
      width: "40vh",
      //   textWrap: 'word-break',
      //   ellipsis: true,
      render: (tags) => (
        <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                <a href={tag}>{tag}</a>
              </Tag>
            );
          })}
        </div>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => update(record)}>修改</Button>
          <Button onClick={() => del(record)}>删除</Button>
        </Space>
      ),
    },
  ];

  const update = (recode) => {
    setIsModalVisible(true);
    setIsModalVisible(true);
  };
  const del = (recode) => {
    console.log(recode);
  };

  const data = [
    {
      key: "1",
      name: "item0",
      menuname: "待定",
      href: "http://xsgzs.cn",
      sub: ["地址一", "http://mymaster.ygjie.icu/"],
    },
    {
      key: "2",
      name: "item1",
      menuname: "待定",
      href: "http://xsgzs.cn",
      sub: ["地址一", "http://mymaster.ygjie.icu/"],
    },
    {
      key: "3",
      name: "item2",
      menuname: "待定",
      href: "http://xsgzs.cn",
      sub: [
        "地址一",
        "http://mymaster.ygjie.icu/1",
        "地址二",
        "http://mymaster.ygjie.icu/2",
        "地址三",
        "http://mymaster.ygjie.icu/3",
      ],
    },
  ];

  const [initValues, setInitValues] = useState(initialValues);
  const [initValues2, setInitValues2] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
      axios.get('/getitem').then(res => {
          console.log(res)
      })
  })

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(initValues);
    axios.post("/updatelogo", values).then((res) => {
      console.log(res);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const add = (values) => {
    axios.post("/additem", values).then((res) => {
      console.log(res);
      setIsModalVisible(false);
    });
  };
  return (
    <div>
      <Form
        {...layout}
        name="basic"
        initialValues={initValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="网站logo" name="logourl">
          <Input />
        </Form.Item>

        <Form.Item label="网站logo链接" name="logolink">
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            更新⬆
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button onClick={showModal} type="primary">
            添加⬇这个
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="将添加如下form表单的item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout={{
            labelCol: { span: 0 },
            wrapperCol: { span: 0 },
          }}
          name="basic"
          form={form}
          onFinish={add}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="自item0递增" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Menu名字" name="menuname">
            <Input />
          </Form.Item>
          <Form.Item label="Menu链接" name="herf">
            <Input />
          </Form.Item>

          <Form.List
            name="subs"
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? "subMenu" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "请输入或删除",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="格式：名字 链接(中间用一个空格区分)"
                        style={{ width: "90%" }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "100%" }}
                    icon={<PlusOutlined />}
                  >
                    在尾部添加一个subMenu
                  </Button>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add("The head item", 0);
                    }}
                    style={{ width: "100%", marginTop: "20px" }}
                    icon={<PlusOutlined />}
                  >
                    在头部添加一个subMenu
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
