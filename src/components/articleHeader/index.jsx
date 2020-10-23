import React from "react";
import { Row, Col } from "antd";
import { Input, Button } from "antd";
import { FormOutlined } from "@ant-design/icons";
import "./index.css";

export default function ArticleHeader(props) {
    // const [articleTitle,setArticleTitle] = useState("defalye")
  return (
    <div className="article-header">
      <Row>
        <Col span={22}>
          <Input
            placeholder="输入文章标题~~"
            prefix={<FormOutlined />}
            className="article-header"
            onChange={(e) =>props.setArticleTitle(e.target.value)}
            value={props.articleTitle}
          />
        </Col>
        <Col span={2}>
          <Button type="primary" style={{height:35}} onClick={props.submit}>发布</Button>
        </Col>
      </Row>
    </div>
  );
}
