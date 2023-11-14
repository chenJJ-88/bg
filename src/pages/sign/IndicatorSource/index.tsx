import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import Title from '../components/Title'
import TextArea from '../components/TextArea'
import Card from '../components/Card'
import Modal from '../../../components/Modal'
import Table from '../../../components/BaseTable'
import request from '@/utils/request';
function Index() {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState()
  const [dataSource, setDataSource] = useState([]);
  const [dataObj, setDataOb] = useState({})
  const columns = [
    {
      title: "序号",
      dataIndex: "index",
    },
    {
      title: "系统名称",
      dataIndex: "name",
    },
    {
      title: "接入状态",
      dataIndex: "type",
    },
    {
      title: "已接入数量",
      dataIndex: "number",
    },
    {
      title: "更新时间",
      dataIndex: "time",
    },
  ]
  const handleCardClick = (item) => {
    setTitle(item.deptName);
    setVisible(true);
  }
  useEffect(() => {
    request(
      // { url: api.indexSource, type: 'keeper-data-sign' },
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
          total: res?.data?.deptList?.length
        })
      }
    })
  }, [])
  return (
    <Root>
      <Title title={'体征指标来源 '}></Title>
      <TextArea text={`${dataObj.cityNum || ''}个市级部门，${dataObj.countyNum || ''}个区县级部门，${dataObj.streetNum || ''}个镇（街道）。共计${dataObj.total}个体征数据。`}></TextArea>
      <div className='cardArea'>
        {
          dataSource.map(item => {
            return <Card key={item.id} text={item.deptName} onCardClick={handleCardClick} item={item}></Card>
          })
        }
      </div>
      {
        visible && <Modal
          title={title}
          onCancel={() => setVisible(false)}
          visible={visible}>
          <Table fontSize={16} columns={columns} dataSource={[]}></Table>
        </Modal>
      }
    </Root>
  )
}

export default Index
const Root = styled.div`

 width: 799px;
 .cardArea{
  display: flex;
  flex-wrap: wrap;
  margin-top:18px;
  overflow: auto;
  height: 336px;
 }
  `

