import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components';
import SubTitle from '../Title'
import { Button, Tooltip } from 'antd';
import { judgeUrlType } from '@/utils'
import Modal from '@/components/Modal'
function ListItem({ order, content, url, code }) {
  const [readModal, setReadModal] = useState(false);
  const [iframe, setIframe] = useState('');
  const uploadFun = (link, codeName) => {
    setReadModal(true)
    setIframe(link)
  }
  const ListItemContenRender = (conten: string) => {
    if (conten.length > 9) {
      return <Tooltip title={conten} placement="top" overlayInnerStyle={{ fontSize: 14 }}>
        <div className='content2'>{conten.substring(0, 9) + '...'}</div>
      </Tooltip>

    } else {
      return <div className='content2'>{conten}</div>
    }
  }
  return <ListItemRoot>
    <div >
      <div className='order'>{order}</div>
      <div className='content'>{ListItemContenRender(content)}</div>
      <Button
        style={{
          color: '#fff',
          background: "url('/signImgs/jr.png') no-repeat",
          backgroundSize: "100% 100%",
          border: 'none', width: '60px', height: '35px', marginLeft: '10px', marginRight: '10px'
        }}
        type='primary' onClick={() => uploadFun(url, code)}>{code}</Button>
    </div>
    {
      readModal && <Modal
        visible={readModal}
        onCancel={() => setReadModal(false)}
        footer={null}
        width={1200}
        height={800}
      >
        {
          judgeUrlType(iframe) === 'img' ? (
            <img style={{ width: '100%', height: "100%" }} src={iframe}></img>
          ) : (
            <iframe style={{ width: "100%", height: '100%' }} src={iframe} frameborder="0"></iframe>
          )
        }
      </Modal>
    }
  </ListItemRoot>
}

function Index({ dataList, name, url, code }) {
  return (
    <Root>
      <SubTitle title={'行业参考资料'}></SubTitle>
      <div className='listConten'>
        {
          dataList.map(i => {
            return <ListItem key={i.id} order={i.id} content={i[name]} url={i[url]} code={code} />
          })
        }
      </div>
    </Root>
  )
}

export default Index
const Root = styled.div`
width: 392px;
margin-top:18px;
.listConten{
  height: 150px;
  overflow: auto;
}
`
const ListItemRoot = styled.div`
color:#95C6EF;
font-size:16px;
margin-top:22px;
/* border-bottom:1px solid #EFF2F7; */
padding: 10px;
box-sizing: border-box;

/* padding-bottom:4px ; */
div{
  height: 25px;
  display: flex;
  align-items: center;
}
  .order{
    margin-left:10px;
  }
  .content{
    margin-left:10px;
    margin-right:40px ;
    min-width:160px;
  }
  .option{
     width: 58px;
      height: 25px;
      /* background: #006FC7; */
      border-radius: 5px;
      text-align:center;
      line-height: 25px;
      cursor:pointer
    /* div{
     
    } */
  }
`