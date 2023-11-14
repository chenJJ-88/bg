import React from 'react';
import { Layout } from 'antd'
import styled, { keyframes } from "styled-components";

const { Content } = Layout;
// 修改默认样式
const MyContent = styled(Content)`
    width: 3480px;
    height: 1044px;
    position: relative;
      border: 1px solid #000 !important;
`

export default ({ children }: { children: any }) => {
  return (
    <MyContent>
      {children}
    </MyContent>
  )
}