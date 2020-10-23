import React, { useState, useEffect } from "react";
import { Layout, Drawer,Spin } from "antd";

import ArticleListContent from "../../components/articleListContent";
// import ArticleListHeader from "../../components/articleListHeader";
import ArticleListUpdate from "../../components/articleListUpdate";

//这里使用的className用的是addarticle里的样式，不需要再次引入既可生效，只要类名相同

import axios from "../../utils/article";

const { Header, Footer, Content } = Layout;
export default function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("left");
  const [updatearticle, setUpdateArticle] = useState();
  const [isLoading, setIsLoadding] = useState(false); //是否显示加载

  useEffect(() => {
    getList()
  }, []);

  function update(id) {
    setIsLoadding(true);
    console.log(id);
    setVisible(true);
    axios.get("/getone?id=" + id).then((res) => {
      // console.log(res);
      setUpdateArticle(res.data.data);
      setIsLoadding(false);
    });
  }

  function search(content) {
    console.log(content);
    axios.get('/search?content='+content).then(res => {
      console.log(res)
    }) 
  }

  function deleteone(id){
    setIsLoadding(true);
    console.log(id)
    axios.post('/delete',{id:id}).then(res =>{
      console.log(res)
      setIsLoadding(false);
      getList()
    })
  }

  const onClose = () => {
    setVisible(false);
    setUpdateArticle("")
  };

  function getList() {
    setIsLoadding(true);
    axios.get("/getall").then((res) => {
      // console.log(res.data.rows[0])
      setArticleList(res.data.rows);
      setIsLoadding(false);
    });
  }
  return (
    <div>
      <Layout>
        {/* <Header className="my-layout-header">
          <ArticleListHeader search={search} />
        </Header> */}
        <Content className="my-layout-header">
          <ArticleListContent articleList={articleList} update={update} deleteone={deleteone}/>
        </Content>
      </Layout>
      <Drawer
        title={"修改文章"}
        placement={placement}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={placement}
        width={1200}
      >
        {updatearticle && (
          <ArticleListUpdate
            updatearticle={updatearticle}
            onClose={onClose}
            getList={getList}
          />
        )}
      </Drawer>
      {isLoading && <Spin className="demo-loading" />}
    </div>
  );
}
