import React, { useState } from "react";
import { Table, Space, Button, Image,Tooltip,Drawer } from "antd";

import { FormOutlined, DeleteOutlined,EyeOutlined } from "@ant-design/icons";

// dataIndex	列数据在数据项中对应的路径，支持通过数组查询嵌套路径

// state = { visible: false, placement: 'left' };

export default function ArticleListContent(props) {
  let articleList = props.articleList;

  const [visible,setVisible] = useState(false)
  const [placement,setPlacement] = useState("left")
  const [look,setLook] = useState("")

  const columns = [
    {
      title: "文章标题",
      dataIndex: "articleTitle",
      key: "articleTitle",
      render: (text) => <a href={'https://www.aliyun.com/'}>{text}</a>,
    },
    {
      title: "文章描述",
      dataIndex: "articleDesc",
      key: "articleDesc",
    },
    // {
    //   title: "articleMarkedContent",
    //   dataIndex: "articleMarkedContent",
    //   key: "articleMarkedContent",
    // },
    {
      title: "文章封面",
      dataIndex: "articleImgUrl",
      key: "articleImgUrl",
      render: (articleImgUrl) => (
        <>
          <Image width={100} src={articleImgUrl}></Image>
        </>
      ),
    },
    {
      title: "更新时间",
      dataIndex: "date",
      key: "date",
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (tags) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip placement="top" title={'预览'}>
          <Button type="primary" shape="circle" icon={<EyeOutlined />} onClick={() => view(text,record)} />
          </Tooltip>
          <Tooltip placement="top" title={'修改'}>
          <Button type="primary" shape="circle" icon={<FormOutlined />} onClick={() =>props.update(text.key)}/>
          </Tooltip>
          <Tooltip placement="top" title={'删除'} onClick={() => props.deleteone(text.key)}>
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
          />
          </Tooltip>
        </Space>
      ),
    },
  ];

  let data = [];
  
  function view(text,record){
    console.log(text)
    console.log(record)
    setLook(text.articleMarkedContent)
    setVisible(true)
  }

  articleList.forEach((item) => {
    let key = item.primaryKey[0].value;
    let articleContent = item.attributes[0].columnValue;
    let articleDesc = item.attributes[1].columnValue;
    let articleImgUrl = item.attributes[2].columnValue;
    let articleMarkedContent = item.attributes[3].columnValue;
    let articleTitle = item.attributes[4].columnValue;
    let date = item.attributes[4].columnValue;
    data.push({
      key,
      articleContent,
      articleDesc,
      articleImgUrl,
      articleMarkedContent,
      articleTitle,
      date,
    });
  });

  const onClose = () => {
    setVisible(false)
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Drawer
          title={"文章内容"}
          placement={placement}
          closable={false}
          onClose={onClose}
          visible={visible}
          key={placement}
          width={800}
        >
          {/* 此处的show-html用的是写文章部分实时转义html时的样式 */}
           <div
            className="show-html"
            dangerouslySetInnerHTML={{ __html: look }}
          ></div>
        </Drawer>
    </div>
  );
}
