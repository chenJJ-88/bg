import React from 'react'
import { Table } from 'antd'
import { styled } from 'styled-components'
/**
 * @description 列表组件,基于antd table 封装的 可适用于大屏表格组件
 * @typedef {Object} IndexProps
 * @property {DataSourceItem[]} [dataSource] - 数据源
 * @property {ColumnItem[]} [columns] - 列配置
 * @property {number} [theadHeight=32] - 表头高度
 * @property {number} [theadFontSize=24] - 表头字体大小
 * @property {number} [tbodyCellHeight=32] - 单元格高度
 * @property {number} [tbodyCellFontSize=14] - 单元格字体大小
 * @property {PaginationConfig} [pagination] - 分页配置
 * @property {RowSelectionConfig} [rowSelection] - 单选 or 多选盒子配置
 * @property {Function} [onChangePage] - 页码改变时的回调函数
 */

interface DataSourceItem {
  dataSource: []
  columns: []
  theadHeight?: number
  theadFontSize?: number
  tbodyCellHeight?: number
  tbodyCellFontSize?: number
  pagination?: {}
  rowSelection?: {}
  onChangePage?: () => void
}
export default function Index({
  dataSource = [],
  columns = [],
  theadHeight = 32,
  theadFontSize = 24,
  tbodyCellHeight = 32,
  tbodyCellFontSize = 14,
  pagination = {},
  rowSelection = {},
  onChangePage

}: DataSourceItem) {

  return (
    <TableWarper
      rowSelection={{
        type: 'checkbox',

      }}
      pagination={{
        pageSize: 3,
        current: 1,
        total: 6,
        showTitle: false,
        onChange: () => {
          console.log(1);
        },
        ...pagination
      }}
      dataSource={dataSource}
      columns={columns}
      theadHeight={theadHeight}
      theadFontSize={theadFontSize}
      tbodyCellHeight={tbodyCellHeight}
      tbodyCellFontSize={tbodyCellFontSize}
    >

    </TableWarper>
  )
}
const TableWarper = styled<any>(Table)`

  width: 100%;
  .ant-table{
    background-color: transparent !important;
  }
  /* 表头样式 */
  .ant-table-thead{
    height: ${p => p.theadHeight}px;
    background: url('/imgs/列表-表头.png') no-repeat;
    background-size: 100% 100%;
    font-size: ${p => p.theadFontSize}px;
    .ant-table-cell{
      background: transparent !important;
      color: #00d8ff !important;
      &::before{
        display: none !important;
      }
    }
  }
  /* 取消 thead 中borerRadius */
  .ant-table-container table>thead>tr:first-child >*:first-child{
    border-top-left-radius: 0px !important;
  }
  .ant-table-container table>thead>tr:first-child >*:last-child{
    border-top-right-radius: 0px !important;
  }
   
  /* 表格样式 */
  .ant-table-tbody{
    .ant-table-cell-row-hover{
       background-color: transparent !important;
    }
    .ant-table-row{
      background: url('/imgs/列表-数据背景.png') no-repeat;
      background-size:100% 100% ;
      &:hover{
        background-color: rgba(0, 160, 233, 0.3) !important;
      }
    }
    .ant-table-cell{
      height: ${p => p.tbodyCellHeight}px !important;
      line-height: ${p => p.tbodyCellHeight}px;
      color: #fff;
      background-color: transparent !important;
      display: table-cell !important;
      padding: 0px !important;
      font-size: ${p => p.tbodyCellFontSize}px !important;
    }
    >tr{
      margin-top: 7px;
     
    }
    /* >tr:hover{
        background-color: rgba(0, 160, 233, 0.3) !important;
    } */
  }
  /* 删除th td 自带的border */
  .ant-table-tbody >tr >th, 
  .ant-table-tbody >tr >td,
  .ant-table-thead >tr>th, 
  .ant-table-thead >tr>td{
    border: none !important;
    /* margin-top: 10px; */
  } 
  /* 多选样式 */
  .ant-table-selection-column{
    width: 40px !important;
    .ant-checkbox-inner{
      background-color: transparent !important;
    }
  }
  /* 空状态样式 */
  .ant-table-placeholder{
    background-color: transparent !important;
    .ant-empty-description{
      color: #fff;
    }
  }
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  /* 分页器 */
  .ant-pagination .ant-pagination-item a{
    color: #fff;
  }
  
`