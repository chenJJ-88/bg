import React from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom'
import dayjs from 'dayjs';
import { ConfigProvider } from 'antd';
import App from './App'
import './index.css'
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
const root = createRoot(document.getElementById("root")!);
root.render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <App />
    </Router>
  </ConfigProvider>

);