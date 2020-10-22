import React from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const props = {
  name: "file",
  accept:"image/*",
  multiple: true,
  showUploadList:false,
  action: "http://websitcosimg.ygjie.icu/upload/",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} 文件上传成功`);
      // p.getCount()
    } else if (status === "error") {
      message.error(`${info.file.name} 文件上传失败`);
    }
  },
  onPreview(info){
    console.log(info)
  },
  onRemove(info){
    console.log(info)
  }
};

export default function ImgUpload() {
  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          点击上传图片
        </p>
        <p className="ant-upload-hint">
          支持拖拽上传，单个上传，多个上传
        </p>
      </Dragger>
    </div>
  );
}
