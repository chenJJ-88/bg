import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import BaseTable from '@/components/BaseTable';
import Modal from '@/components/Modal'
import { Form, DatePicker, Button } from 'antd';
const { RangePicker } = DatePicker;
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
// import moment from 'moment';
import dayjs from 'dayjs';
function Index({ dailyPaperModal, setDailyPaperModal }) {
  const [form] = Form.useForm()
  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
    },
    {
      title: '日报名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      dataIndex: 'option',
    },
  ]
  const onFinish = (value: any) => {
    let startDate = dayjs(value[0]).format('YYYY-MM-DD') || '';
    let endDate = dayjs(value[1]).format('YYYY-MM-DD') || '';
    // getTableData(pageParams, startDate, endDate)
  }
  return (
    <Modal
      title='  体征指数研判日报'
      onCancel={() => setDailyPaperModal(false)}
      visible={dailyPaperModal}>
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
              locale={locale}
            ></RangePicker>
          </Form.Item>
          <Form.Item >
            <Button type='primary' htmlType='submit'>
              查询
            </Button>
            <Button onClick={() => {
              form.resetFields()
            }}>
              重置
            </Button>
          </Form.Item>
        </Form>

      </FormRoot>
      <BaseTable
        height={830}
        trHeight={25}
        fontSize={16}
        isNoData={true}
        columns={columns}
        orderNum={true}
        dataSource={[]}></BaseTable>
    </Modal>
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