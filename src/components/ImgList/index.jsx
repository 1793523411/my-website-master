import React from "react";

import { List, message, Button, Spin, Divider, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import axios from "../../utils/request";

import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import VList from "react-virtualized/dist/commonjs/List";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";

import imgBaseUrl from "./baseUrl.js";

export default class ImgList extends React.Component {
  state = {
    data: [],
    loading: false,
  };

  loadedRowsMap = {};

  componentWillUnmount() {
    this.fetchData();
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = (callback) => {
    this.setState({
      loading: true,
    });
    axios({
      url: "/users/list",
      method: "get",
    }).then((res) => {
      this.setState({
        loading: false,
      });
      console.log(res);
      this.setState({
        data: res.data.results,
      });
    });
  };

  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }
    if (data.length > 19) {
      //   message.warning("Virtualized List loaded all");
      this.setState({
        loading: false,
      });
      return;
    }
    this.fetchData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  };

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index];

  delete = (key) => {
    console.log(key);
    axios.post("/users/remove", { key: key }).then((res) => {
      console.log(res);
      this.props.getCount();
      if (res.data.message === "success") {
        message.success("删除成功");
        this.fetchData();
      } else {
        message.success("删除失败");
      }
    });
  };

  confirm(key) {
    // console.log(e);
    this.delete(key);
  }

  cancel(e) {}

  renderItem = ({ index, key, style }) => {
    const { data } = this.state;
    const item = data[index];
    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          title={
            <a href={`${imgBaseUrl}/${item.Key}`} target="view_window">
              {imgBaseUrl}/{item.Key}
            </a>
          }
          description={(item.Size / 1048576).toFixed(2) + "M"}
        />
        <Popconfirm
          title="🤔你确定？"
          onConfirm={() => this.confirm(item.Key)}
          onCancel={this.cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            //   onClick={() => this.delete(item.Key)}
          />
        </Popconfirm>
      </List.Item>
    );
  };

  render() {
    const { data } = this.state;
    const vlist = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered,
      width,
    }) => (
      <VList
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={data.length}
        rowHeight={73}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    );
    const autoSize = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered,
    }) => (
      <AutoSizer disableHeight>
        {({ width }) =>
          vlist({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
            width,
          })
        }
      </AutoSizer>
    );
    const infiniteLoader = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
    }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={data.length}
      >
        {({ onRowsRendered }) =>
          autoSize({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
          })
        }
      </InfiniteLoader>
    );
    return (
      //   <Divider orientation="left">
      <List>
        {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
        {this.state.loading && <Spin className="demo-loading" />}
      </List>
      //   </Divider>
    );
  }
}

//!上面的是：滚动加载无限长列表，结合 react-virtualized 实现滚动加载无限长列表，带有虚拟化（virtualization）功能，能够提高数据量大时候长列表的性能。virtualized 是在大数据列表中应用的一种技术，主要是为了减少不可见区域不必要的渲染从而提高性能，特别是数据量在成千上万条效果尤为明显。

//!下面的是简单的列表
// import React, { useState, useEffect } from "react";
// import { List, Typography, Divider } from "antd";
// import {
//   EyeOutlined,
//   EyeInvisibleOutlined,
//   SyncOutlined,
// } from "@ant-design/icons";
// import imgBaseUrl from "./baseUrl.js";
// import axios from "../../utils/request";

// import "./index.css";

// export default function ImgList() {
//   const [look, setLook] = useState(false);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get("/users/list").then((res) => {
//       setData(res.data.results);
//       console.log(res.data.results);
//     });
//   }, []);

//   function updateList() {
//     axios.get("/users/list").then((res) => {
//       setData(res.data.results);
//       console.log(res.data.results);
//     });
//     // console.log("hahha");
//   }

//   return (
//     <>
//       <Divider orientation="left">
//         <span>图片列表 </span>
//           {!look ? (
//               <span onClick={() => setLook(!look)} className="click">
//             <EyeInvisibleOutlined />
//             </span>
//           ) : (
//             <span>
//               <span onClick={() => setLook(!look)} className="click">
//                 <EyeOutlined />
//               </span>
//               <span>  </span>
//               <span onClick={updateList} className="click">
//                 <SyncOutlined />
//               </span>
//             </span>
//           )}
//       </Divider>
//       {look && (
//         <List
//           size="small"
//           //   header={<div>Header</div>}
//           //   footer={<div>Footer</div>}
//           bordered
//           dataSource={data}
//           renderItem={(item) => (
//             <List.Item>
//               {imgBaseUrl}/{item.Key}
//             </List.Item>
//           )}
//         />
//       )}
//     </>
//   );
// }
