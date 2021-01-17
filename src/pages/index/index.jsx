/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable import/first */
import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from "antd";
import { BookOutlined, AppstoreOutlined } from "@ant-design/icons";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import Imgstore from "../imgstore/";
import Welcome from "../welcome/";
import AddArticle from '../addarticle'
import ArticleList from '../articlelist'
import PersonNav from '../personNav'
import PersonSwiper from '../personSwiper'
import PersonHello from '../personHello'

import "./index.css";

export default function Index(props) {
  const [collapsed, setCollapsed] = useState(true);
  const [level1, setLevel1] = useState("User");
  const [level2, setLevel2] = useState("welcome");

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  useEffect(() => {
    let key1 = localStorage.getItem("key1")
    let key2 = localStorage.getItem("key2")
    setLevel1(key1);
    setLevel2(key2);
    if (key2) {
      props.history.push("/index/" + key2);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleSubMenu = (e) => {
    console.log(e);
    setLevel1(e.keyPath[1]);
    setLevel2(e.keyPath[0]);
    localStorage.setItem("key1", e.keyPath[1]);
    localStorage.setItem("key2", e.keyPath[0]);
    props.history.push("/index/" + e.key);
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          theme="light"
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["welcome"]}
            mode="inline"
            theme="light"
          >
            <SubMenu
              key="store"
              icon={<AppstoreOutlined />}
              title="store"
              onClick={handleSubMenu}
            >
              <Menu.Item key="welcome">首页</Menu.Item>
              <Menu.Item key="imgStore">图片存储</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="Article"
              icon={<BookOutlined />}
              title="Article"
              onClick={handleSubMenu}
            >
              <Menu.Item key="addarticle">添加文章</Menu.Item>
              <Menu.Item key="articlelist">管理文章</Menu.Item>
            </SubMenu>
            <SubMenu
              key="Person"
              icon={<BookOutlined />}
              title="EditorPerson"
              onClick={handleSubMenu}
            >
              <Menu.Item key="personNav">顶部导航栏</Menu.Item>
              <Menu.Item key="personSwiper">轮播页</Menu.Item>
              <Menu.Item key="personHello">打招呼</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>{level1}</Breadcrumb.Item>
              <Breadcrumb.Item>{level2}</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 570 }}
            >
              <Route path="/index/imgstore" exact component={Imgstore} />
              <Route path="/index/welcome" exact component={Welcome} />
              <Route path="/index/addarticle" exact component={AddArticle} />
              <Route path="/index/articlelist" exact component={ArticleList} />
              <Route path="/index/personNav" exact component={PersonNav} />
              <Route path="/index/personSwiper" exact component={PersonSwiper} />
              <Route path="/index/personHello" exact component={PersonHello} />
              <Route path="/index/" exact component={Welcome} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            跌倒的小黄瓜 ©2020 Created by React+antd
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
