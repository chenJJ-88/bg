import React from 'react';
import { styled } from 'styled-components';

const headHeight = 44;
const bodyRowHeight = 44;

const TableWrap = styled.table`
  /* .ant-tooltip-inner {
    min-width: 30px !important;
    font-size: 28px !important;
  } */
  position: relative;
  /* display: table; */
  width: 100%;
  padding-right: 5px;
  font-size: 14px;
  text-align: center;
  .head-over {
    background: #8B040A !important;
    /* opacity: 0.14; */
    color: #fff !important;
  }
  .over {
    background: #621b1b !important;
    /* opacity: 0.14; */
    color: #fff;
  }
  .head-ash {
    background: #5A5C5E !important;
    /* opacity: 0.14; */
    color: #fff !important;
  }
  .ash {
    background: #383B3F !important;
    /* opacity: 0.14; */
    color: #fff;
  }
  .lag {
    background: #7b6722 !important;
    /* opacity: 0.29; */
    color: #fff;
  }
  .thead {
    height: ${headHeight}px;
    color: #00d8ff;

    /* display: table-header-group; */
    /* background: url(/components/table_head.png) no-repeat; */
    background-size: 100% 100%;
    // background: #18274a;
    .cell {
      height: 100%;
      /* vertical-align: middle; */
      .head_cell_content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

      }
      .head_cell_content_center {
        display: flex;
        align-items: center;
        padding: 0 20px;
        width: 100%;
        height: 100%;

      }
      .sorter-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .up:hover,
        .down:hover {
          cursor: pointer;
          color: #fff;
        }
      }
    }
  }
  .tbody {
    .row {
      height: ${bodyRowHeight}px;
      margin-top: 7px;
      color: #fff;

      line-height: ${bodyRowHeight}px;

      background-color: rgba(0, 160, 233, 0.13);
      // background-size: 100% 100%;

      &.selected_row {
        box-shadow: 0 0 10px 0px rgba(0, 160, 233, 0.3);
      }

      &:hover {
        background-color: rgba(0, 160, 233, 0.3);
        // box-shadow: 0 0 20px rgba(0,160,233,0.3);
      }

      & > td::before,
      & > td::after {
        // 背景点点
        position: absolute;
        display: block;
        width: 4px;
        height: 4px;
        background-color: rgba(0, 160, 233);
      }
      & > td:first-child {
        position: relative;
        /* &::before {
          content: '';
          top: 0;
          left: 0;
        }
        &::after {
          content: '';
          bottom: 0;
          left: 0;
        } */
      }
      & > td:last-child {
        position: relative;
        /* &::before {
          content: '';
          top: 0;
          right: 0;
        }
        &::after {
          content: '';
          right: 0;
          bottom: 0;
        } */
      }
    }
    td > span {
      /* display: inline-block; */
      width: 100%;
    }
    .cell {
      min-height: ${bodyRowHeight}px;
      /* vertical-align: middle; */
      .order_num_box {
        /* position: relative;
        &::before {
          position: absolute;
          display: block;
          content: '';
          height: 23px;
          width: 23px;
          border: 1px solid #51e8fa;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        } */

        display: flex;
        align-items: center;
        justify-content: center;

        & > div {
          font-size: 18px;
          &.num1 {
            color: #fe3838;
          }
          &.num2 {
            color: #f66e4e;
          }
          &.num3 {
            color: #ffa31f;
          }
        }
      }
    }
  }
  .tfoot {
    /* display: table-footer-group; */
  }

  .row {
    /* display: table-row; */
  }

  .colgroup {
    /* display: table-column-group; */
  }
  .col {
    /* display: table-column; */
  }

  .cell {
    /* display: table-cell; */
  }
  .caption {
    /* display: table-caption; */
  }
  .ant-spin-nested-loading {
    min-height: 200px;
  }
  .ant-spin-text {
    font-size: 26px;
  }
  .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
    top: 65%;
  }
  .ant-spin-lg .ant-spin-dot {
    font-size: 50px;
  }
  tbody {
    display: block;
    overflow-y: scroll;
    /* height: calc(100% - ); */
    &::-webkit-scrollbar {
      // 滚动条整体样式
      width: 5px; // 高宽分别对应横竖滚动条的尺寸
      /* height: 100px; */
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: rgb(0 226 255);
      // 滚动条里面小方块
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgb(0 226 255);
    }
    &::-webkit-scrollbar-track {
      //   background: #051320;
      border-radius: 10px;
      // 滚动条里面轨道
      box-shadow: inset 0 0 5px rgb(0 226 255);
    }
  }
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  tbody tr {
  }

  .click {
    cursor: pointer;
  }
`;

export default TableWrap;