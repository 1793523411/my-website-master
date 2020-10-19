/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable import/first */
import React, { useState } from "react";
import { Route } from "react-router-dom";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import Imgstore from "../imgstore/";
import Welcome from '../welcome/'

import './index.css'

export default function Index(props) {
  const [collapsed, setCollapsed] = useState(true);
  const [level1,setLevel1] = useState("User")
  const [level2,setLevel2] = useState("welcome")

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const handleSubMenu = (e) => {
    console.log(e)
    setLevel1(e.keyPath[1])
    setLevel2(e.keyPath[0])
    props.history.push('/index/'+e.key)
  }
 

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme="light" >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["welcome"]} mode="inline" theme="light">
            <SubMenu key="User" icon={<UserOutlined />} title="User" onClick={handleSubMenu}>
              <Menu.Item key="welcome">首页</Menu.Item>
              <Menu.Item key="imgStore">图片存储</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team" onClick={handleSubMenu}>
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
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
