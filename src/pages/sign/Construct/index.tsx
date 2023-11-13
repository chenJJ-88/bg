import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Title from '../components/Title'
import TextArea from '../components/TextArea'
import List from './components/List'
import request from '@/utils/request';
function Index() {
  const [data, setData] = useState({})
  useEffect(() => {
    request('/api/keeper-data-sign/hallSignIndex/constructionBasis', { method: 'GET' }).then(res => {
      if (res.success) {
        setData({
          industrystandard: res.data?.dataList,//行业规范
          algorithm: res.data?.algorithmList,//算法
          algorithmNum: res.data?.algorithmNum,//算法个数
          dataNum: res.data?.dataNum//规范个数
        })
      }
    }).catch(error => {
      console.log(error);
    })
  }, [])
  return (
    <Root>
      <Title title={'体征指数体系构建依据'}></Title>
      <TextArea text={`共参考${data.dataNum}份国标和行标，使用了${data.algorithmNum}类算法模型`}></TextArea>
      <div className='listBox'>
        <List
          dataList={data.industrystandard || []}
          name={'dataName'}
          url={'dataUrl'}
          code={'查看'}
        ></List>
        <List
          dataList={data.algorithm || []}
          name={'algorithmName'}
          url={'algorithmUrl'}
          code={'查看'}></List>
      </div>
    </Root>
  )
}

export default Index
const Root = styled.div`
  width: 799px;
  .listBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`