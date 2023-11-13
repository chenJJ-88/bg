import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Button } from 'antd'
import Title from '../components/Title'
import BaseTable from '../../../components/BaseTable'
import ListTable from './ListTable'
import DealTable from './DealTable'
function Index() {
  const [btnType, setBtnType] = useState(1)
  return (
    <Root>
      <Title title={'体征指标来源'}></Title>
      <header>
        <div className='btnBox'>
          <div style={{ transform: btnType === 1 ? 'scale(1.1)' : 'scale(1)' }}
            onClick={() => setBtnType(1)}>指数告警列表</div>
          <div
            style={{ transform: btnType === 2 ? 'scale(1.1)' : 'scale(1)' }}
            onClick={() => setBtnType(2)}>体征调度事件处置</div>
        </div>
        <div className='rules'>
          {/* 自动调度规则》 */}
        </div>
      </header>
      <div className='tableBox'>
        {
          btnType === 1 ? <ListTable></ListTable> : <DealTable></DealTable>
        }
      </div>

    </Root>
  )
}

export default Index
const Root = styled.div`
  header{
    width: 100%;
    height:40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top:20px;
    .btnBox{
      display: flex;
      justify-content: flex-start;
      padding-left:10px;
      div{
        color:#fff;
        text-align: center;
        line-height: 40px;
        font-size:18px;
        background:url('/signImgs/jr.png') no-repeat;
        background-size:100% 100%;
        cursor: pointer;
      }
      >:nth-child(1){
        margin-right:10px;
        width: 156px;
        height: 40px;
        margin-left:5px;
      }
      >:nth-child(2){
        margin-right:10px;
        width: 184px;
        height: 40px;
        margin-left:5px;
      }
    }
    .rules{
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FF9C00;
        line-height: 26px;
        cursor: pointer;
    }
  }
`