import React, { useEffect, useState } from "react";

import ImgUpload from "../../components/imgupload";
import ImgList from "../../components/ImgList";
import ImgLine from '../../components/imgLine'

import axios from '../../utils/request'

export default function Imgstroe() {
  const [look, setLook] = useState(false);
  const [count,setCount] = useState(0)

  useEffect(()=>{
    axios.get('/users/count').then(res => {
      console.log(res.data.results)
      setCount(res.data.results)
    })
  },[])

  function getCount(){
    axios.get('/users/count').then(res => {
      setCount(res.data.results)
    })
  }

  function change(){
    setLook(!look)
    getCount()
  }
  return (
    <div>
      <ImgUpload getCount={getCount}></ImgUpload>
      <ImgLine look={look} change={change} count={count}></ImgLine>
      {look&&<ImgList getCount={getCount}></ImgList>}
      
    </div>
  );
}
