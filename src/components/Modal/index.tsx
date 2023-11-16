import React from 'react';

import ModalStyle from './style';
import ModalProps from './typing'
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


