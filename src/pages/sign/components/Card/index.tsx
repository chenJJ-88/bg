import React from 'react'
import { styled } from 'styled-components'
import { Tooltip } from 'antd'
function Index({ text, item, onCardClick }) {
  return (
    <Root onClick={() => onCardClick(item)}>
      {
        text.length > 8 ?
          <Tooltip title={text} overlayInnerStyle={{ fontSize: 16 }}>
            {text.substring(0, 8) + '...'}
          </Tooltip> :
          text
      }
    </Root>
  )
}

export default Index
const Root = styled.div`
 width: 194px;
 height: 96px;
 background: url('/signImgs/box.png');
 color:  #B4FEFF;
 font-size:18px;
  text-align: center;
  line-height: 96px;
  margin-right:5px;
  margin-bottom:16px;
  cursor: pointer;
`