import React, { useState } from "react";
import { Layout, message,Spin } from "antd";

import "./index.css";
import ArticleHeader from "../articleHeader";
import ArticleContent from "../articleContent";
import ArticleFooter from "../articleFooter";

import axios from "../../utils/article";

const { Header, Footer, Content } = Layout;

export default function ArticleListUpdate(props) {
  const id = props.updatearticle.primaryKey[0].value;
  const [articleTitle, setArticleTitle] = useState(
    props.updatearticle.attributes[4].columnValue
  );
  const [articleContent, setArticleContent] = useState(
    props.updatearticle.attributes[0].columnValue
  );
  const [articleMarkedContent, setArticleMarkContent] = useState(
    props.updatearticle.attributes[3].columnValue
  );
  const [articleDesc, setArticleArticleDesc] = useState(
    props.updatearticle.attributes[1].columnValue
  );
  const [articleImgUrl, setArticleArticleImgUrl] = useState(
    props.updatearticle.attributes[2].columnValue
  );

  const [isLoading, setIsLoadding] = useState(false); //是否显示加载

  function submit() {
    //   let date =Date.now()
    let date = new Date().toLocaleDateString();
    const data = {
      id,
      articleTitle,
      articleContent,
      articleMarkedContent,
      articleDesc,
      articleImgUrl,
      date,
    };

    console.log(data);
    setIsLoadding(true)
    axios.post("/update", data).then((res) => {
      console.log(res);
      setArticleTitle("");
      setArticleContent("");
      setArticleMarkContent("");
      setArticleArticleDesc("");
      setArticleArticleImgUrl("");
      message.success("发布成功");
      props.onClose()
      props.getList()
      setIsLoadding(false)
    });
  }

  return (
    <>
      <Layout>
        <Header className="my-layout-header">
          <ArticleHeader
            setArticleTitle={setArticleTitle}
            articleTitle={articleTitle}
            submit={submit}
          />
        </Header>
        <Content className="my-layout-content">
          <ArticleContent
            setArticleContent={setArticleContent}
            articleContent={articleContent}
            setArticleMarkContent={setArticleMarkContent}
            articleMarkedContent={articleMarkedContent}
          />
        </Content>
        <Footer className="my-layout-footer">
          <ArticleFooter
            setArticleArticleDesc={setArticleArticleDesc}
            articleDesc={articleDesc}
            setArticleArticleImgUrl={setArticleArticleImgUrl}
            articleImgUrl={articleImgUrl}
          />
        </Footer>
      </Layout>
      {isLoading&&<Spin className="demo-loading" />}
    </>
  );
}
