import React, { useState } from "react";
import { Input, Button, Row, Col,message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import "./index.css";
import PASSWORD from './password'

export default function LoginFrom(props) {
  const [password, setPassword] = useState("");

  const login = () => {
    //验证密码
    if(!password) {
      message.info({
        content:'还没输入密码哦~',
      });
      return
    }

    if(password!==PASSWORD){
      message.error({
        content:'密码错了哟~'
      })
      return
    }

    props.login();
  };

  return (
    <div className="loginFrom">
      <Row>
        <Col span={16}>
          <Input.Password
            placeholder="需要输入密码"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Col>
        <Col span={2}></Col>
        <Col span={4}>
          <Button ghost onClick={login}>
            进入
          </Button>
        </Col>
      </Row>
    </div>
  );
}
