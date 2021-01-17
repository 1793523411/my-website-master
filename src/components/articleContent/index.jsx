import React, { useState } from "react";
import { Row, Col, Spin } from "antd";
import { Input } from "antd";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
// import "highlight.js/styles/atom-one-dark.css";
// import "highlight.js/styles/tomorrow.css";

import "./index.css";
const { TextArea } = Input;

export default function ArticleContent(props) {
  const [isLoading, setIsLoadding] = useState(false); //是否显示加载

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  const changeContent = (e) => {
    props.setArticleContent(e.target.value);
    markedContent();
  };
  const markedContent = () => {
    setIsLoadding(true);
    setTimeout(() => {
      let html = marked(props.articleContent);
      props.setArticleMarkContent(html);
      setIsLoadding(false);
    }, 300);
  };

  return (
    <div>
      <Row>
        <Col span={11} className="article-span">
          <TextArea
            showCount
            autoSize={{ minRows: 20 }}
            placeholder="使用markdown编写~~"
            onChange={changeContent}
            value={props.articleContent}
          />
        </Col>
        <Col span={12} className="article-span">
          <div
            className="show-html"
            dangerouslySetInnerHTML={{ __html: props.articleMarkedContent }}
          ></div>
          {/* <TextArea
            showCount
            autoSize={{ minRows: 20 }}
            disabled
            onChange={markedContent}
            // value={props.articleMarkedContent}
            dangerouslySetInnerHTML = {{__html:props.articleMarkedContent}}
            style={{backgroundColor:'#fff'}}
          /> */}
        </Col>
      </Row>
      {isLoading && <Spin className="demo-loading" />}
    </div>
  );
}
