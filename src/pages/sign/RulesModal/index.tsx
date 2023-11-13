import React from 'react'
import Modal from '@/components/Modal';
import { styled } from 'styled-components'
import { Radio, Button } from 'antd';
const bottonMap = {
  '生态环境': '/signImgs/1.png',
  '经济运行': '/signImgs/2.png',
  '营商环境': '/signImgs/3.png',
  '民生稳定': '/signImgs/4.png',
  '城市安全': '/signImgs/5.png',
}
function Index({ ruleModal, setRuleModal }) {
  const [buttonState, setButtonState] = React.useState('生态环境')
  return (
    <div>
      <Modal
        visible={ruleModal}
        onCancel={() => setRuleModal(false)}
        width={1200}
        height={720}
        title='指数规则详情'
      >
        <Root >
          <div className='introduce'>
            城市运行指数建设意义: 对城市体征指标进行精细梳理，可量化的、综合性强的指标，构建了系统、科学、直观的城市运行指数。反映不同时期城市运行状态和管从纷繁复杂的指标中选取多项具有代表性、理效果，为城市运行管理与决策提供依据，确保城市运行安全、有序、高效;对提高城市运行保障、完善城市功能、提升城市品质具有重要的意义。
          </div>
          <div className='options'>

            {
              Object.keys(bottonMap).map(i =>
                <Button
                  style={{
                    transform: buttonState === i ? 'scale(1.2)' : 'scale(1)',
                    color: '#fff',
                    background: "url('/signImgs/jr.png') no-repeat",
                    backgroundSize: "100% 100%",
                    border: 'none', width: '100px', height: '35px', marginLeft: '10px', marginRight: '10px'
                  }}
                  type={i === buttonState ? 'primary' : 'default'}
                  onClick={() => setButtonState(i)}
                  key={i}
                >{i}</Button>)
            }

          </div>
          <div className='imgs'>
            <img src={bottonMap[buttonState]} alt="" />
          </div>
        </Root>
      </Modal>
    </div>
  )
}

export default Index
const Root = styled.div`
 .introduceintroduce{
      font-size:16px;
      text-indent:2em;  
  }
 .options {
      width: 100%;
     display:flex;
     justify-content:space-evenly;
     margin-top:20px;
  }
  .imgs{
    width: 100%;
    img{
      width: 100%;
    }
  }
` 