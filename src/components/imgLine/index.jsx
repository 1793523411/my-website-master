import React from "react";
import { Divider } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

export default function ImgLine(props) {
  return (
    <>
      <Divider orientation="left">
        <span>图片列表（{props.count}） </span>
        {!props.look ? (
          <span onClick={props.change} className="click">
            <EyeInvisibleOutlined />
          </span>
        ) : (
          <span>
            <span onClick={props.change} className="click">
              <EyeOutlined />
            </span>
            {/* <span> </span>
            <span onClick={updateList} className="click">
              <SyncOutlined />
            </span> */}
          </span>
        )}
      </Divider>
    </>
  );
}
