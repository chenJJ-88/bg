import React from 'react';
import { Modal } from 'antd';
import { styled } from 'styled-components';
interface ModalProps {
  title?: string
  visible: boolean
  onCancel: (prs: boolean) => void
  children: any
  height?: number
  width?: number
  getContainert?: string
  icon?: string
  extra?: string | HTMLElement
}
export default function Index({
  title = '详情',
  visible,
  onCancel,
  children,
  height = 650,
  width = 1000,
  getContainert = '#root',
  icon = '/signImgs/modalTitle.png',
  extra
}: ModalProps) {
  const modalProps = {
    open: visible,
    onCancel,
    width: `${width}px`,
    footer: null,
  };
  return (
    <ModalStyle
      {...modalProps}
      height={height}
      width={width}
      destroyOnClose
      closable={false}
      icon={icon}
    >
      <div className="custom-header">
        <div className="custom-header-left">
          <span className="titleIcon"></span>
          <span className="title">{title}</span>
          {extra}
        </div>
        <span className="custom-header-close" onClick={onCancel}>
          <img src="/signImgs/close.png" style={{ width: '36px', height: '36px' }} alt="" />
        </span>
      </div>
      <div className="custom-body">{children}</div>
    </ModalStyle>
  );
}

const ModalStyle: any = styled(Modal)`
  // 修改默认样式
  .ant-modal-wrap {
    position: absolute !important;
  }
  .ant-modal-content {
    background-color: transparent;
  }
  .ant-modal-body {
    height: ${(p) => p.height}px;
    max-height: ${(p) => p.height}px;
    padding: 10px 24px;
    background: rgba(3, 25, 49, 0.89);
    border: 1px solid #2962a0;
    border-top: 1px solid #2483ea;
    border-radius: 3px;
    box-shadow: 0px 5px 27px 0px rgba(8, 26, 50, 0.51);
  }
  // 自定义样式
  .custom-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    line-height: 50px;
    text-align: left;
    background-size: 80% auto;
    border-bottom: 1px solid #2d68a8;
    .custom-header-left {
      display: flex;
      align-items: center;
      height: 100%;
      .titleIcon {
        display: inline-block;
        width: 45px;
        height: 45px;
        background:url('${(p) => p.icon}') ;
      }
      .title {
        color: #d0deee;
        font-weight: 500;
        font-size: 20px;

      }
    }
    .custom-header-close {
      width: 50px;
      height: 50px;
      color: #d0deee;
      font-weight: 400;
      font-size: 24px;
      font-family: Source Han Sans CN;
      text-align: center;
      text-shadow: 0px 5px 16px #2483ea;
      cursor: pointer;
      &:hover {
         transform: scale(1.1);
      }
    }
  }
  .custom-body {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 70px);
    padding: 9px;
    overflow-x: hidden;
    overflow-y: auto !important;
    color: white !important;
    .ant-row,h2,h3{
      color: #fff ;
    }
    /*里面的代码可以根据自己需求去进行更改*/
    /* 设置滚动条的样式 */
    &::-webkit-scrollbar {
      width: 8px !important;
      background: transparent !important;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      background: #00a8ff !important;
      border-radius: 10px !important;
    }

    .line-title {
      color: #fff;
    }

  }
  .jr{
    width: 110px;
    height: 46px;
    line-height: 46px;
    font-size: 18px;
    font-weight: 500;
    color: #FFFFFF;
    text-align: center;
    cursor: pointer;
    background-image: url('/signImgs/jr.png');
    background-size: 100% 100%;
  }
`;
