import React, { useState } from "react";
import { Layout,message } from "antd";

import "./index.css";
import ArticleHeader from "../../components/articleHeader";
import ArticleContent from "../../components/articleContent";
import ArticleFooter from "../../components/articleFooter";

import axios from '../../utils/article'

const { Header, Footer, Content } = Layout;

export default function AddArticle() {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleMarkedContent, setArticleMarkContent] = useState("");
  const [articleDesc, setArticleArticleDesc] = useState("");
  const [articleImgUrl, setArticleArticleImgUrl] = useState("");

  function submit() {
    //   let date =Date.now()
    let date = new Date().toLocaleDateString();
    const data = {
      articleTitle,
      articleContent,
      articleMarkedContent,
      articleDesc,
      articleImgUrl,
      date,
    };

    console.log(data);
    axios.post('/add',data).then(res =>{
        console.log(res)
        setArticleTitle("")
        setArticleContent("")
        setArticleMarkContent("")
        setArticleArticleDesc("")
        setArticleArticleImgUrl("")
        message.success('发布成功');
    })
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
    </>
  );
}
