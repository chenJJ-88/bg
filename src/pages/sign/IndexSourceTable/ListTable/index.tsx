import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Form, Select, Input, DatePicker, Table, Button, Pagination, message } from 'antd'
import BaseTable from '@/components/BaseTable'
const { RangePicker } = DatePicker;
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import request from '@/utils/request';
import Modal from '../../../../components/Modal'
import moment from 'moment';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
function Index() {
  const [form] = Form.useForm()
  const [form2] = Form.useForm()
  const [dataList, setDataList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [recordData, setRecordData] = useState();
  const [pageParams, setPageParams] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })

  const columns = [
    {
      title: '警告日期',
      dataIndex: 'warningTime',
      // width: 100,
      tips: 'true'
    },
    {
      title: '三级指数',
      dataIndex: 'thirdIndex',
      // width: 100,
      tips: 'true'
    },
    {
      title: '得分',
      dataIndex: 'score',
      // width: 100,

    },
    {
      title: '等级',
      dataIndex: 'rate',
      // width: 100,

    },
    {
      title: '调度次数',
      dataIndex: 'schedulingTimes',
      // width: 100,

    },
    {
      title: '操作',
      dataIndex: 'option',
      formater: (text, record) => {
        return <Button type='link' onClick={() => openDispatch(record)}>发起调度</Button>
      }
    },

  ];
  const openDispatch = (record) => {
    setOpenModal(true)
    setRecordData(record)
  }
  const onChange = (value) => {
    setPageParams({
      current: value,
      pageSize: 10,
      total: pageParams.total
    })
    getTableData({
      current: value,
      pageSize: 10,
      total: pageParams.total
    })
  };
  const restFile = () => {
    form.resetFields()
    getTableData({
      current: 1,
      pageSize: 10,
      total: 0
    })
  }
  const onFinish = (value) => {
    let startDate = moment(value[0]).format('YYYY-MM-DD') || '';
    let endDate = moment(value[1]).format('YYYY-MM-DD') || '';
    getTableData(pageParams, startDate, endDate)
  }
  const onFinishDispatch = () => {
    form2.validateFields().then(value => {

      request(
        '/api/keeper-data-sign/hallSignIndex/initiateScheduling',
        {
          method: 'POST',
          body: {
            ...value,
            dealLimit: moment(value.dealLimit).format('YYYY-MM-DD'),
            code: recordData.indexCode
          }
        }
      ).then(res => {
        if (res.success) {
          message.success('调度成功')
          setOpenModal(false)
          form2.resetFields();
        }
      })
    })
  }

  const getTableData = async (page, startDate = '', endDate = '') => {
    let res = await request(

      `/api/keeper-data-sign/hallSignIndex/indexWarningList`,

      {
        method: 'POST',
        param: {
          size: page.pageSize,
          current: page.current,
          total: page.total,
          startDate: startDate ? startDate : '',
          endDate: endDate ? endDate : '',
        }
      }
    )

    if (res.success) {
      setDataList(res.data.records)
      setPageParams({
        current: res.data?.current,
        pageSize: res.data?.size,
        total: res.data?.total
      })
    }
  }
  useEffect(() => {
    getTableData(pageParams);
  }, [])
  return (
    <Root>
      <FormRoot>
        <Form
          onFinish={onFinish}
          layout="inline"
          form={form}>
          <Form.Item
            name="date"
            label="日期"
          >
            <RangePicker
              locale={locale}></RangePicker>
          </Form.Item>
          <Form.Item >
            <Button
              style={{
                background: "url('/signImgs/jr.png') no-repeat",
                backgroundSize: "100% 100%",
                border: 'none', width: '100px', height: '35px', marginLeft: '10px', marginRight: '10px'
              }}
              type='primary'
              htmlType='submit'>
              查询
            </Button>
            <Button
              style={{
                color: '#fff',
                background: "url('/signImgs/jr.png') no-repeat",
                backgroundSize: "100% 100%",
                border: 'none', width: '100px', height: '35px', marginLeft: '10px', marginRight: '10px'
              }}
              onClick={() => {
                restFile()
              }}>
              重置
            </Button>
          </Form.Item>
        </Form>

      </FormRoot>
      <BaseTable
        orderNum={true}
        columns={columns}
        dataSource={dataList}
        // onRow={onTableRow}
        height={830}
        trHeight={25}
        fontSize={16}
        isNoData={true}
      ></BaseTable>
      {dataList?.length && (
        <div className="PaginationBox">
          <Pagination
            showSizeChanger={false}
            {...pageParams}
            onChange={onChange}
          />
        </div>
      )}
      {
        openModal && <Modal
          height={400}
          title='体征调度'
          visible={openModal}
          onCancel={() => setOpenModal(false)}
          width={800}
        >
          <ModalRoot>
            <Form
              {...layout}
              // layout="inline"
              // onFinish={onFinishDispatch}
              form={form2}
            >

              <Form.Item name='content' label='调度内容'>
                <Input.TextArea></Input.TextArea>
              </Form.Item>
              <Form.Item name='deptName' label='调度单位'>
                <Input></Input>
              </Form.Item>
              <Form.Item name='dealLimit' label='处理时限'>
                <DatePicker locale={locale}></DatePicker>
              </Form.Item>
              {/* <Form.Item name={''} labelCol={{ span: 10 }} >
                <Button htmlType='submit' type='primary'>启动调度</Button>
              </Form.Item> */}
              <div style={{ width: '100%', textAlign: 'center' }}>
                <Button
                  style={{
                    color: '#fff',
                    background: "url('/signImgs/jr.png') no-repeat",
                    backgroundSize: "100% 100%",
                    border: 'none', width: '120px', height: '45px',
                  }}
                  htmlType='submit'
                  onClick={() => onFinishDispatch()}>启动调度</Button>
              </div>
            </Form>
          </ModalRoot>


        </Modal>
      }
    </Root>


  )
}

export default Index
const FormRoot = styled.div`
  margin-top:20px;
  .ant-form-item-label > label {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #cccfd4;
    height: 44px;
    line-height: 44px;
  }
   .ant-form-item-control-input-content
    > .ant-select-in-form-item
    > .ant-select-selector {
    height: 44px;
    color: #fff;
    background: rgba(16, 59, 97, 0.5);
    border: 1px solid #296090;
    border-radius: 6px;
    .ant-select-selection-item {
      line-height: 44px;
      /* line-height: 22px; */
    }
  }
  .selest {
    .ant-select-selection-item {
      /* line-height: 44px; */
      line-height: 22px !important;
    }
  }
  .ant-select-multiple .ant-select-selection-item-remove > .anticon {
    color: #fff;
    font-size: 16px;
  }
  .ant-input {
    background: rgba(16, 59, 97, 0.5);
    border: 1px solid #296090;
    border-radius: 6px;
    color: #fff;
  }
  .ant-select-in-form-item > .ant-select-arrow {
    color: #fff;
  }
  .ant-form-item-control-input-content > button {
    /* background: rgba(16, 59, 97, 0.5); */
    /* color: #fff; */
    margin-left: 10px;
  }

  .ant-select-multiple .ant-select-selection-item {
    background: none;
    border: none;
  }
  .ant-row, .ant-form-item{
    margin:0px !important; 
  }

  /* 日期 */
  .ant-picker-range{
     border: 1px solid #296090;
     width: 250px;
    background: #062841;
    .ant-picker-input{
      input{
      color:#fff  !important;
      }
    }
  }


`
const Root = styled.div`
    /* 分页 */
    .PaginationBox {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: right;
    align-items: center;
    .ant-pagination {
      font-size: 18px;
    }
  }
`

const ModalRoot = styled.div`
    .ant-form-item-label > label {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #cccfd4;
    height: 44px;
    line-height: 44px;
  }

    .ant-input {
    background: rgba(16, 59, 97, 0.5);
    border: 1px solid #296090;
    border-radius: 6px;
    color: #fff;
  }
  .ant-select-in-form-item > .ant-select-arrow {
    color: #fff;
  }
  .ant-form-item-control-input-content > button {
    /* background: rgba(16, 59, 97, 0.5); */
    /* color: #fff; */
    margin-left: 10px;
  }

  .ant-picker{
     border: 1px solid #296090;
     width: 250px;
    background: #062841;
    .ant-picker-input{
      input{
      color:#fff  !important;
      }
    }
  }
`