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
width: 783px;
height:50px;
background: url('/signImgs/title1.png') no-repeat;
margin-top: 20px;
position: relative;
div{
position: absolute;
top:13px;
left:85px;
font-size: 32px;
font-family: YouSheBiaoTiHei;
font-weight: 400;
color: #FFFFFF;
line-height: 23px;

background: linear-gradient(0deg, #0096FF 0%, #FFFFFD 69.3115234375%, #FFFFFD 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
`