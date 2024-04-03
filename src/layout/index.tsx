import React from 'react';
import { Layout } from 'antd'

// 修改默认样式
export default ({ children }: { children: any }) => {
  return (
    <div>
      {children}
    </div>
  )
}