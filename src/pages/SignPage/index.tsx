import React, { useState, useEffect, useRef } from 'react';
import Title from './components/Title'
import TextArea from './components/TextArea'
import request from '@/utils/request';
import Card from './components/Card';
import List from './components/List'
interface DataType {
  id: React.Key;
  deptName: string;

}
let top = 0;
function Index() {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [dataObj, setDataOb] = useState({})
  const [startTime, setStartTime] = useState<boolean>(true)
  const refdom = useRef<HTMLDivElement>(null)
  useEffect(() => {
    request(
      '/api/keeper-data-sign/hallSignIndex/indexSource',
      {
        method: 'GET'
      }
    ).then(res => {
      if (res.success) {
        setDataSource(res?.data?.deptList)
        setDataOb({
          cityNum: res.data.cityNum, // 城市
          countyNum: res.data.countyNum,// 乡镇
          streetNum: res.data.streetNum,// 街道
          total: res.data.total
        })
      }
    })

  }, [])
  useEffect(() => {
    let timer: any = null;
    if (dataSource.length > 0) {
      if (refdom.current) {
        let dom: HTMLDivElement = refdom.current;
        // 有滚动空间
        if (startTime && dom?.scrollHeight >= dom?.clientHeight) {
          timer = setInterval(() => {
            if (dom?.scrollTop >= dom?.scrollHeight - dom?.clientHeight) {
              dom?.scrollTo(0, 0)
            } else {
              top += 1
              dom?.scrollTo(0, top)
            }
          }, 100)
        }
      }
    }
    return () => {
      clearInterval(timer)
    }
  }, [dataSource])


  const [data, setData] = useState({})
  useEffect(() => {
    request('/api/keeper-data-sign/hallSignIndex/constructionBasis', { method: 'GET' }).then(res => {
      if (res.success) {
        setData({
          industrystandard: res.data?.dataList,//行业规范
          algorithm: res.data?.algorithmList,//算法
          algorithmNum: res.data?.algorithmNum,//算法个数
          dataNum: res.data?.dataNum//规范个数
        })
      }
    }).catch(error => {
      console.log(error);
    })
  }, [])
  return (
    <div
      className='w-full h-full bg-transparent bg-no-repeat bg-cover bg-center'
      style={{ background: "url('/signImgs/bg.png')" }}
    >
      <div className='h-full w-[830px] box-border pt-[127px] pr-[92px] pb-[60px] pl-[47px]'>
        {/* 体征指标来源 */}
        <div className='w-[799px]'>
          <Title title='体征指标来源'></Title>
          <TextArea text={'32个市级部门，142个区县级部门，246个镇（街道），共计1578个体征数据。'}></TextArea>
          <div
            onMouseEnter={() => setStartTime(false)}
            onMouseLeave={() => setStartTime(true)}
            ref={refdom}
            className='flex flex-wrap h-[336px] mt-[18px] overflow-y-auto '>
            {
              dataSource.map(item => {
                return <Card key={item?.id} text={item?.deptName} item={item}></Card>
              })
            }
          </div>
        </div>
        {/*体征指数体系构建依据  */}
        <div className='w-[799px]'>

          <Title title='体征指数体系构建依据'></Title>
          <TextArea text='共参考27份国标和行标，使用了5类算法模型'></TextArea>
          <div className='flex justify-center items-center'>
            <List
              name={'dataName'}
              url={'dataUrl'}
              code={'查看'}
              dataList={data?.industrystandard || []}></List>
            <List
              dataList={data.algorithm || []}
              title={'指数算法'}
              name={'algorithmName'}
              url={'algorithmUrl'}
              code={'查看'}></List>
          </div>
        </div>
      </div>

    </div>

  )
}
export default Index; 
