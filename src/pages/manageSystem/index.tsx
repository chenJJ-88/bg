import React, { useState } from 'react'
import { ProLayout, PageContainer, ProCard } from '@ant-design/pro-components'
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import defaultProps from './defaultProps';
import { AvatarDropdown } from '@/components/AvatarDropdown/AvatarDropdown';
import HeaderConten from '@/components/HeaderContent';
import themeToken from '@/theme'
import useStore from '@/store';
function Index() {
  const initialState = useStore(state => state.initialState)
  const [menuLoading, setMenuLoading] = useState(false)
  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');
  console.log(themeToken[initialState], '----');

  return (
    <ConfigProvider
      theme={{ token: themeToken[initialState] }}
      locale={zhCN}
    >
      <ProLayout
        title="Ant Design Pro"
        pageTitleRender={false}
        //   logo={
        // }
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          title: <div
            style={{ color: themeToken[initialState].header.colorHeaderTitle, background: themeToken[initialState].header.colorBgHeader }}
          >您好，陈建军</div>,
          size: 'large',
          render: (_, avatarChildren) => {
            console.log(avatarChildren, _);
            return <AvatarDropdown menu>{avatarChildren}</AvatarDropdown>;
          }

        }}
        {...defaultProps}
        loading={menuLoading}
        menuItemRender={(itemProps, defaultDom) => {
          return <div onClick={() => setPathname(itemProps.path || '/welcome')}
          >
            {defaultDom}
          </div>
        }}
        layout='mix'
        // headerContentRender={() => <HeaderConten />}
        location={{
          pathname,
        }}

        token={
          themeToken[initialState]
        }
      >
        <PageContainer>
          <ProCard
            style={{
              height: '80vh',
              // minHeight: 800,
            }}
          >

          </ProCard>
        </PageContainer>
      </ProLayout>

    </ConfigProvider>

  )
}

export default Index