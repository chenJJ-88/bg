import React from 'react';
import { useEffect, useState, useRef } from 'react';
import request from '@/utils/request';
import { styled } from 'styled-components';
import RulesModal from './RulesModal'
import Modal from '@/components/Modal';

export default function Index() {
  const domOne = useRef()
  const domTwo = useRef()
  const domThree = useRef()
  const [info, setInfo] = useState()
  const [oneLevel, setOneLevel] = useState()
  const [oneIndex, setOneIndex] = useState(0)
  const [twoLevel, setTwoLevel] = useState()
  const [twoIndex, setTwoIndex] = useState(0)
  const [ruleModal, setRuleModal] = useState(false)
  const [threeStart, setThreeStart] = useState('')
  const [indexTableModal, setIndexTableModal] = useState(false)

  useEffect(() => {
    request(
      '/api/keeper-data-sign/hallSignIndex/indexTree',
      {
        method: 'GET'
      }
    ).then(res => {
      if (res && res.data) {
        setInfo(res.data)
        oneLevelClick(res.data?.childList[0])
      }
    });
  }, [])

  useEffect(() => {
    let canvasEle: any = document.getElementById('canvas')
    let ctx = canvasEle.getContext('2d')
    ctx.clearRect(0, 0, 1825, 68);
    ctx.beginPath();
    ctx.strokeStyle = '#2472C5'
    ctx.lineWidth = 2
    if (domOne.current?.childNodes && domOne.current?.childNodes.length > 0) {
      domOne.current?.childNodes.forEach(item => {
        ctx.moveTo(912.5, 0)
        ctx.lineTo(item.offsetLeft + item.offsetWidth / 2, 68)
        ctx.stroke()
      })
    }
    ctx.closePath();
  }, [info])

  useEffect(() => {
    const canvasEle: any = document.getElementById('canvas1')
    const ctx = canvasEle.getContext('2d')
    ctx.clearRect(0, 0, 1825, 68);
    ctx.beginPath();

    ctx.strokeStyle = '#2472C5'
    ctx.lineWidth = 2
    if (domOne.current?.childNodes && domOne.current?.childNodes.length > 0) {
      const startDom = domOne.current?.childNodes[oneIndex]
      if (startDom) {
        const start = startDom.offsetLeft + startDom.offsetWidth / 2
        ctx.moveTo(start, 0)
        ctx.lineTo(start, 34)
        ctx.stroke()
        if (domTwo.current?.childNodes && domTwo.current?.childNodes.length > 0) {
          domTwo.current?.childNodes.forEach(item => {
            ctx.moveTo(item.offsetLeft + item.offsetWidth / 2, 34)
            ctx.lineTo(item.offsetLeft + item.offsetWidth / 2, 68)
            ctx.stroke()
          })
          ctx.moveTo(domTwo.current?.childNodes[0].offsetLeft + domTwo.current?.childNodes[0].offsetWidth / 2, 34)
          ctx.lineTo(domTwo.current?.childNodes[domTwo.current?.childNodes.length - 1].offsetLeft + domTwo.current?.childNodes[domTwo.current?.childNodes.length - 1].offsetWidth / 2, 34)
          ctx.stroke()
        }
      }
    }
    ctx.closePath();

  }, [oneLevel])

  useEffect(() => {
    let canvasEle = document.getElementById('canvas2')
    let ctx = canvasEle.getContext('2d')
    ctx.clearRect(0, 0, 1825, 68);
    ctx.beginPath();
    ctx.strokeStyle = '#2472C5'
    ctx.lineWidth = 2
    if (domTwo.current?.childNodes && domTwo.current?.childNodes.length > 0) {
      const startDom = domTwo.current?.childNodes[twoIndex]
      if (startDom) {
        const start = startDom.offsetLeft + startDom.offsetWidth / 2
        let a = start - domThree.current.offsetWidth / 2
        if (a > 1825 - domThree.current.offsetWidth) {
          a = 1825 - domThree.current.offsetWidth
        }
        if (a < 0) {
          a = 0
        }
        setThreeStart(a)

        ctx.moveTo(start, 0)
        ctx.lineTo(start, 34)
        ctx.stroke()
        if (domThree.current?.childNodes && domThree.current?.childNodes.length > 0) {
          domThree.current?.childNodes.forEach((item, index) => {
            let x = item.offsetLeft + item.offsetWidth / 2 + a
            if (index == 0 && start < x) {
              x = start
            }
            if (index == domThree.current?.childNodes.length - 1 && x < start) {
              x = start
            }
            ctx.moveTo(x, 34)
            ctx.lineTo(x, 68)
            ctx.stroke()
          })
          let lx = domThree.current?.childNodes[0].offsetLeft + domThree.current?.childNodes[0].offsetWidth / 2 + a
          if (start < lx) {
            lx = start
          }
          ctx.moveTo(lx, 34)
          let ed = domThree.current?.childNodes[domThree.current?.childNodes.length - 1].offsetLeft + domThree.current?.childNodes[domThree.current?.childNodes.length - 1].offsetWidth / 2 + a
          if (start > ed) {
            ed = start
          }
          ctx.lineTo(ed, 34)
          ctx.stroke()
        }
      }
    }
    ctx.closePath();
  }, [twoLevel])


  const oneLevelClick = (info) => {
    setOneLevel(info)
    setTwoLevel(info?.childList[0])
    setOneIndex(0)
    setTwoIndex(0)
  }
  return <WrapRoot>
    <div className='indexRule' onClick={() => {
      setRuleModal(true)
    }}>指数构建规则</div>

    <div className='hd'>
      <div>
        <span className='ts'>{info?.score}</span><span>分</span>
      </div>
      <div>{info?.name}</div>
    </div>
    <canvas id="canvas" width={'1825px'} height={'68px'} className='cv1'></canvas>
    <div className='block' style={{ marginTop: 22 }} ref={domOne}>
      {
        info?.childList?.map((item, index) => {
          return <div className={oneLevel?.name == item.name ? 'smlb sel' : 'smlb'}
            onClick={() => {
              oneLevelClick(item)
              setOneIndex(index)
            }}
            style={{ cursor: 'pointer' }}
            key={item.code}
          >
            <div title={item.name}>{item.name}</div>
            <div><span>{item.score}</span>分</div>
            <div>权重：<span>{item.quality}%</span></div>
          </div>
        })
      }
    </div>
    <canvas id="canvas1" width={'1825px'} height={'68px'} className='cav'></canvas>
    <div className='block' ref={domTwo}>
      {
        oneLevel?.childList.map((item, index) => {
          return <div className={twoLevel?.name == item.name ? 'smlb sel' : 'smlb'}
            onClick={() => {
              setTwoLevel('')
              setTwoLevel(item)
              setTwoIndex(index)
            }}
            key={item.code}
          >
            <div title={item.name}>{item.name}</div>
            <div><span>{item.score}</span>分</div>
            <div>权重:<span>{item.quality}%</span></div>
          </div>
        })
      }
    </div>
    <canvas id="canvas2" width={'1825px'} height={'68px'} className='cav'></canvas>
    <div className='block'>
      <div className='blockt' ref={domThree} style={{ position: 'absolute', left: threeStart }}>
        {
          twoLevel ? twoLevel?.childList.map(item => {
            return <div className='smlb' key={item.code} onClick={() => setIndexTableModal(item)}>
              <div title={item.name}>{item.name}</div>
              <div><span>{item.score}</span>分</div>
              <div>权重:<span>{item.quality}%</span></div>
            </div>
          })
            : ''
        }
      </div>
    </div>
    {
      ruleModal && <RulesModal
        ruleModal={ruleModal}
        setRuleModal={setRuleModal}
      ></RulesModal>
    }

    {
      indexTableModal && <Modal
        title={indexTableModal?.name}
        visible={indexTableModal ? true : false}
        onCancel={() => setIndexTableModal(false)}
        width={1400}
        height={800}
      >
        <img style={{ width: '100%' }} src="/signImgs/indexTable1.png" alt="" />
      </Modal>
    }
  </WrapRoot>
}

const WrapRoot = styled.div`
  position: absolute;
  width: 1825px;
  height: 825px;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
  .indexRule{
    position: absolute;
    right: 10px;
    font-size: 24px;
    color:#fff;
    width: 180px;
    line-height: 46px;
    background:url('/signImgs/jr.png') no-repeat;
    background-size:100% 100%;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
  }
  .hd{
    margin: 0 auto;
    width: 292px;
    height: 290px;
    background-image: url('/signImgs/circle.png');
    background-size: 100% 100%;
    font-size: 24px;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
    padding-top: 65px;
    .ts{
      font-size: 68px;
      font-weight: bold;
      color: #FFFFFF;
    }
  }
  .cv1{
    position: absolute;
    top: 245px;
  }
  .cav{
    margin-bottom: -5px;
  }
  .block{
    position: relative;
    width: 100%;
    height: 122px;
    display: flex;
    justify-content: center;
  }
  .blockt{
    max-width: 100%;
    height: 122px;
    display: flex;
  }
  .smlb{
    position: relative;
    width: 244px;
    height: 122px;
    margin: 0 12px;
    background-image: url('/signImgs/fk.png');
    background-size: 100% 100%;
    font-size: 18px;
    font-weight: 400;
    color: #9FD1F4;
    cursor: pointer;
    &>div:nth-child(1){
      position: absolute;
      top: 23px;
      left: 17px;
      right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &>div:nth-child(2){
      position: absolute;
      left: 15px;
      bottom: 18px;
      width: 90px;
      text-align: center;
      span{
        font-size: 40px;
        font-weight: bold;
        color: #FFFFFF;
      }
    }
    &>div:nth-child(3){
      position: absolute;
      right: 12px;
      bottom: 28px;
      span{
        font-size: 24px;
        font-weight: bold;
        color: #FFFFFF;
        background: linear-gradient(180deg, #00FF00 0%, #FFFFFF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .sel{
    background-image: url('/signImgs/selfk.png');
    background-size: 100% 100%;
  }
`