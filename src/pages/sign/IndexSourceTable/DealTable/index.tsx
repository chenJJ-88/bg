import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { Form, Select, Input, DatePicker, Table, Button, Pagination } from 'antd'
import BaseTable from '../../../../components/BaseTable'
const { RangePicker } = DatePicker;
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import request from '@/utils/request';
import moment from 'moment';
function Index() {
  const [form] = Form.useForm()
  const [dataList, setDataList] = useState([]);
  const [pageParams, setPageParams] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const columns = [


    {
      title: '调度时间',
      dataIndex: 'schedulingTime',
      // width: 100,
      tips: 'true'
    },

    {
      title: '事件编号',
      dataIndex: 'code',
      // width: 100,
      tips: 'true'
    },
    {
      title: '调度内容',
      dataIndex: 'content',
      // width: 100,
      tips: 'true'
    },
    {
      title: '调度部门',
      dataIndex: 'deptName',
      // width: 100,
      tips: 'true'
    },
    {
      title: '处置状态',
      dataIndex: 'disposalStatus',

    },
    {
      title: '超期状态',
      dataIndex: 'overStatus',

    },
    {
      title: '操作',
      dataIndex: 'option',
      formater: (text, record) => {
        return <Button type='link'>查看</Button>
      }
    },

  ];
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

  const getTableData = async (page, params = {}) => {
    let res = await request(
      { url: `/apSign/keeper-data-sign/hallSignIndex/dispatchEventList?size=${page.pageSize}&current=${page.current}`, type: '' },
      {
        method: 'POST',
        body: {
          disposalStatus: params.disposalStatus ? params.disposalStatus : '',
          overStatus: params.overStatus ? params.overStatus : '',
          startDate: params.startDate ? params.startDate : '',
          endDate: params.endDate ? params.endDate : '',
          keyword: params.keyword ? params.keyword : ''
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
    getTableData(pageParams)
  }, [])
  const onFinish = (value) => {
    let obj = {
      startDate: moment(value.date[0]).format('YYYY-MM-DD'),
      endDate: moment(value.date[1]).format('YYYY-MM-DD'),
      ...value
    }
    getTableData(pageParams, obj)
  }
  const restFile = () => {
    form.resetFields()
    getTableData({
      current: 1,
      pageSize: 10,
      total: 0
    })
  }
  return (
    <Root>
      <FormRoot>
        <Form
          layout="inline"
          onFinish={onFinish}
          form={form}>
          <Form.Item
            name="date"
            label="日期"
          >
            <RangePicker
              locale={locale}
            ></RangePicker>
          </Form.Item>
          <Form.Item
            name="disposalStatus"
            label="处置状态"
          >
            <Select defaultValue={''} placeholder={'请选择'} options={[
              {
                label: '全部',
                value: ''
              },
              {
                label: '处置中',
                value: '0'
              },
              {
                label: '已完结',
                value: '1'
              },
            ]}></Select>
          </Form.Item>
          <Form.Item
            name="overStatus"
            label="超期状态"
          >
            <Select defaultValue={''} placeholder={'请选择'} options={[
              {
                label: '全部',
                value: ''
              },
              {
                label: '未超期',
                value: '0'
              },
              {
                label: '已超期',
                value: '1'
              },
            ]}></Select>
          </Form.Item>
          <Form.Item
            name="keyword"
            label="关键字"
          >
            <Input placeholder='请输入'></Input>
          </Form.Item>

          <Form.Item >
            <Button
              style={{
                background: "url('/signImgs/jr.png') no-repeat",
                backgroundSize: "100% 100%",
                border: 'none', width: '100px', height: '35px', marginLeft: '10px', marginRight: '10px'
              }}
              type='primary' htmlType='submit'>
              查询
            </Button>
            <Button
              style={{
                color: '#fff',
                background: "url('/signImgs/jr.png') no-repeat",
                backgroundSize: "100% 100%",
                border: 'none', width: '100px', height: '35px', marginLeft: '10px', marginRight: '10px'
              }}
              onClick={() => restFile()}>
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

  .ant-row ,.ant-form-item{
    width: 296px !important;
      .ant-select-selector{
        background: #062841 !important;
        border: 1px solid #296090 !important;
        .ant-select-selection-item{
          color:#fff;
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