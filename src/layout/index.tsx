import React from 'react';
import { Layout } from 'antd'
import styled, { keyframes } from "styled-components";

const { Content } = Layout;
// 修改默认样式
const MyContent = styled(Content)`
    width: 100%;
    height: 100%;
    position: relative;
`

export default ({ children }: { children: any }) => {
  return (
    <MyContent>
      {children}
    </MyContent>
  )
}