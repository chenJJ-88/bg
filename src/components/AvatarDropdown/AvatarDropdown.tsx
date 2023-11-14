// import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import './index.less'
import { Spin } from 'antd';
import { stringify } from 'qs';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};
export type GlobalHeaderTextProps = {
  color: string;
};

export const AvatarName: React.FC<GlobalHeaderTextProps> = ({ color }) => {
  // const { initialState } = useModel('@@initialState');
  // const { currentUser } = initialState || {};
  return (
    <span className="anticon" style={{ color: color }}>
      你好，陈建军！
    </span>
  );
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {

  };
  // const actionClassName = useEmotionCss(({ token }) => {
  //   return {
  //     display: 'flex',
  //     height: '48px',
  //     marginLeft: 'auto',
  //     overflow: 'hidden',
  //     alignItems: 'center',
  //     padding: '0 8px',
  //     cursor: 'pointer',
  //     borderRadius: token.borderRadius,
  //     '&:hover': {
  //       backgroundColor: token.colorBgTextHover,
  //     },
  //   };
  // });
  // const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {

    },
    [],
  );


  const menuItems = [
    ...(menu
      ? [
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: '个人设置',
        },
        {
          key: 'password',
          icon: <UserOutlined />,
          label: '密码修改',
        },
        {
          type: 'divider' as const,
        },
      ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
