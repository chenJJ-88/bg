import React, { useState } from 'react';
import { styled } from 'styled-components';

import IndicatorSource from './IndicatorSource';
import Construct from './Construct'
import IndexSourceTable from './IndexSourceTable'
import 'moment/locale/zh-cn';
import Center from './center'
import DailyPaperModal from './DailyPaperModal'
export default function Index() {
  // const history = useHistory();
  const [dailyPaperModal, setDailyPaperModal] = useState(false)
  const openDailyPaperModal = () => {
    setDailyPaperModal(true)
  }
  return <WrapRoot>
    <div className='bck' onClick={() => {
      // history.push('/')
    }}>返回门户</div>
    <div className='leftBox'>
      <IndicatorSource></IndicatorSource>
      <Construct></Construct>
    </div>
    <Center />
    <div className='rightBox'>
      <div className='dailyPaper' onClick={() => openDailyPaperModal()}>体征指数研判日报</div>
      <IndexSourceTable></IndexSourceTable>
    </div>
    {dailyPaperModal && <DailyPaperModal
      dailyPaperModal={dailyPaperModal}
      setDailyPaperModal={setDailyPaperModal}
    ></DailyPaperModal>}
  </WrapRoot>
}

const WrapRoot = styled.div`
  position: relative;
  width: 3480px;
  height: 1044px;
  background-image: url('/signImgs/bg.png');
  background-size: 100% 100%; 
  display: flex;
  justify-content: space-between;
  .bck{
    position: absolute;
    top: 20px;
    right: 100px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    z-index: 99;
  }
  .leftBox{
    width: 830px;
    height: 100%;
    padding:127px 92px 60px 47px;
    box-sizing: border-box;
  }
  .rightBox{
    width: 750px;
    height: 100%;
    padding:100px 20px 60px 10px;
    box-sizing: border-box;
    .dailyPaper{
      width: 203px;
      height: 46px;
      background: url('/signImgs/dailyPaper.png') no-repeat;
      background-size: 100% 100%; 
      cursor: pointer;
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 33px;
      text-shadow: 0px 2px 1px rgba(92,175,238,0.77);
      text-align:center;
      line-height:46px;
      position: absolute;
      top:90px;
      right:10px;
    }
  }
`