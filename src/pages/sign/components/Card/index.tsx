import React from 'react'
import { styled } from 'styled-components'
type Iprops = {
  text: string
  item: any
  onCardClick: (prs: any) => void
}
function Index({ text, item, onCardClick }: Iprops) {
  return (
    <Root onClick={() => onCardClick(item)} title={text}>
      {
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
    overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`