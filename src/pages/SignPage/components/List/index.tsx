import React, { useState } from 'react'
import SubTitle from '../SubTitle'
import { Button } from 'antd'
import { judgeUrlType } from '@/utils'
import Modal from '@/components/Modal'
function ListItem({ order, content, url, code }: any) {
  const [readModal, setReadModal] = useState(false);
  const [iframe, setIframe] = useState('');
  const uploadFun = (link: string, codeName: string) => {
    setReadModal(true)
    setIframe(link)
  }

  return <div className='text-[#95C6EF] text-[16px] p-[10px] box-border'>
    <div className='h-[25px] flex items-center'>
      <div className=' ml-[10px]'>{order}</div>
      <div className='ml-[10px] w-[240px] truncate'>{content}</div>
      <Button
        className="text-white bg-[url('/signImgs/jr.png')] hover:bg-[transparent] bg-no-repeat bg-cover w-[60px] h-[35px] ml-[10px] mr-[10px] border-none"
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
  </div>
}
export default function Index({ dataList, name, url, code, title }: { title?: string, dataList: any, name: string, url: string, code: string }) {
  return (
    <div className='w-[392px] mt-[18px]'>
      <SubTitle title='行业参考资料'></SubTitle>
      <div className='h-[150px] overflow-y-auto'>
        {
          dataList.map((i: any) => {
            return <ListItem key={i.id} order={i.id} content={i[name]} url={i[url]} code={code} />
          })
        }
      </div>
    </div>
  )
}
