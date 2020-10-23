import React from 'react';
import { Input } from 'antd';


const { Search } = Input;

export default function ArticleListHeader(props){
    return (
        <div>
            <Search placeholder="搜索文章标题" onSearch={(e) =>props.search(e)} enterButton style={{width:400}} />
        </div>
    )
}