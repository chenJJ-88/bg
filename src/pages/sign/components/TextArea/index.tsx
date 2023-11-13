import React from 'react'
import { styled } from 'styled-components'
function Index({ text }) {
  return (
    <Root>{text}</Root>
  )
}

export default Index
const Root = styled.div`
  width: 780px;
  height: 55px;
  font-size: 17px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 24px;
  background: url('/signImgs/textAre.png') no-repeat;
  margin-top: 20px;
  text-align: left;
  line-height: 55px;
  padding-left:22px;
`