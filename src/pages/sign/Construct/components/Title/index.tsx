import React from 'react'
import { styled } from 'styled-components'
function Index({ title }) {
  return (
    <Root>
      <div>{title}</div>
    </Root>
  )
}

export default Index
const Root = styled.div`
  background: url('/signImgs/ttle2.png') no-repeat;
  width: 392px;
  height: 43px;
  position: relative;
  div{
    position: absolute;
    top:5px;
    left:45px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 24px;
  }
`