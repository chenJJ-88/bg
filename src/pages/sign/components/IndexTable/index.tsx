// 指标列表
import React, { useState, useEffect, useRef } from 'react';
import { request } from 'utils';
import { styled } from 'styled-components';
import { Tooltip } from 'antd';
const IndedexTable = ({ data }) => {
  const [positiveList, setPositiveList] = useState([]); //正面清单
  const [negativeList, setNegativeList] = useState([]); //负面清单
  const [eventList, setEventList] = useState([]); //事件处置
  const [oneVoteVetoList, setOneVoteVetoList] = useState([]); //一票否决
  const [allScore, setallScore] = useState({});
  const tllltipRef = useRef();
  const colorMap = {
    中: '#f8a700',
    差: '#ff5353'
  };
  useEffect(() => {
    if (data.id) {
      request('/api/screen/cityIndex/getPostiveList', {
        method: 'GET',
        params: {
          index_id: data.id
        }
      }).then(res => {
        if (res.data.length > 0) {
          setPositiveList(res.data);
        }
      });
      //负面清单
      request('/api/screen/cityIndex/getNegativeList', {
        method: 'GET',
        params: {
          index_id: data.id
        }
      }).then(res => {
        if (res.data.length > 0) {
          setNegativeList(res.data);
        }
      });
      //事件处置
      request('/api/screen/sign/abcd', {
        method: 'GET',
        params: {
          index_id: data.id
        }
      }).then(res => {
        if (res.data.length > 0) {
          setEventList(res.data);
        }
      });
      // 一票否决
      request('/api/screen/cityIndex/veto', {
        method: 'GET',
        params: {
          index_id: data.id
        }
      }).then(res => {
        if (res.data.length > 0) {
          setOneVoteVetoList(res.data);
        }
      });

      request('/api/screen/cityIndex/actualScore', {
        method: 'GET',
        params: {
          index_id: data.id
        }
      }).then(res => {
        if (res.success) {
          setallScore(res.data);
        }
      });
    }
  }, [data.id]);

  return (
    <IndedexTableStyle ref={tllltipRef}>
      {positiveList.length ? (
        <div className="tableBox">
          <div
            style={{
              marginBottom: 30,
              fontSize: 50,
              fontFamily: 'Alibaba-PuHuiTi-Regular'
            }}
          >
            指标类型：正面清单（权重{Number(positiveList[0].quality) * 100}%）
            <span>【实际得分{allScore.postion}】</span>
          </div>
          <table cellSpacing="0">
            <thead>
              <tr>
                <td>指标名称</td>
                <td>计分细则</td>
                <td>满分</td>
                <td>扣分</td>
                <td>得分</td>
                <td>得分异常关注</td>
                <td>业务数据更新周期</td>
                <td>数据接入周期</td>
                <td>数据来源</td>
              </tr>
            </thead>
            <tbody>
              {positiveList?.map(item => {
                return (
                  <tr key={item}>
                    {/* 指标名称 */}
                    <td
                      style={{
                        width: '290px'
                      }}
                    >
                      <div className="cneter">{item.name}</div>
                    </td>
                    {/* 计分细则 */}
                    <td
                      style={{
                        width: '400px'
                      }}
                    >
                      <Tooltip
                        getPopupContainer={() => tllltipRef.current}
                        autoAdjustOverflow={true}
                        color="#16243d"
                        arrow={true}
                        overlayClassName="overlayClassName"
                        title={item.calc_show}
                      >
                        <div className="cneter" ref={tllltipRef}>
                          {item.calc_expression}
                        </div>
                      </Tooltip>
                    </td>
                    {/* 满分 */}
                    <td
                      style={{
                        width: '150px'
                      }}
                    >
                      <div className="center">{item.total_score}</div>
                    </td>

                    {/*扣分  */}
                    <td
                      style={{
                        width: '150px'
                      }}
                    >
                      <div className="center">{item.differen}</div>
                    </td>
                    {/* 得分 */}

                    <td
                      style={{
                        width: '150px',
                        textAlign: 'center'
                      }}
                    >
                      <Tooltip
                        getPopupContainer={() => tllltipRef.current}
                        autoAdjustOverflow={true}
                        color="#16243d"
                        arrow={true}
                        overlayClassName="overlayClassName"
                        title={item.calc_show2}
                      >
                        <div className="cneter">{item.score}</div>
                      </Tooltip>
                    </td>
                    {/* 得分异常关注 */}
                    <td
                      style={{
                        width: '180px'
                      }}
                    >
                      {item.type === '中' || item.type === '差' ? (
                        <Tooltip
                          getPopupContainer={() => tllltipRef.current}
                          autoAdjustOverflow={true}
                          color="#16243d"
                          arrow={true}
                          overlayClassName="overlayClassName"
                          title={item.point_show}
                        >
                          <div
                            style={{ color: colorMap[item.type] }}
                            className="cneter"
                          >
                            {item.type}
                          </div>
                        </Tooltip>
                      ) : (
                        <div
                          style={{ color: colorMap[item.type] }}
                          className="cneter"
                        >
                          {item.type}
                        </div>
                      )}
                    </td>
                    {/* 业务数据更新周期 */}
                    <td
                      style={{
                        width: '220px',
                        textAlign: 'center'
                      }}
                    >
                      <div className="cneter">{item.dict_value}</div>
                    </td>
                    {/* 数据接入周期 */}
                    <td
                      style={{
                        width: '220px',
                        textAlign: 'center'
                      }}
                    >
                      <div className="cneter">{item.update_times}</div>
                    </td>
                    {/*数据来源  */}
                    <td
                      style={{
                        width: '220px',
                        textAlign: 'center'
                      }}
                    >
                      <div className="cneter">{item.data_source}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ''
      )}
      {negativeList.length ? (
        <div className="tableBox">
          <div
            style={{
              marginBottom: 30,
              fontSize: 50,
              fontFamily: 'Alibaba-PuHuiTi-Regular'
            }}
          >
            指标类型：负面清单（权重{Number(negativeList[0].quality) * 100}%）
            <span>【实际得分{allScore.negative}】</span>
          </div>
          <table cellSpacing="0">
            <thead>
              <tr>
                <td>指标名称</td>
                <td>计分细则</td>
                <td>满分</td>
                <td>扣分</td>
                <td>得分</td>
                <td>得分异常关注</td>
                <td>业务数据更新周期</td>
                <td>数据接入周期</td>
                <td>数据来源</td>
              </tr>
            </thead>
            <tbody>
              {negativeList?.map(item => {
                return (
                  <tr key={item}>
                    {/* 指标名称 */}
                    <td
                      style={{
                        width: '290px'
                      }}
                    >
                      <div className="cneter">{item.name}</div>
                    </td>
                    {/* 计分细则 */}
                    <td
                      style={{
                        width: '400px'
                      }}
                    >
                      <Tooltip
                        getPopupContainer={() => tllltipRef.current}
                        autoAdjustOverflow={true}
                        color="#16243d"
                        arrow={true}
                        // defaultOpen={true}
                        overlayClassName="overlayClassName"
                        title={item.calc_show}
                      >
                        <div className="cneter">{item.calc_expression}</div>
                      </Tooltip>
                    </td>
                    {/* 满分 */}
                    <td
                      style={{
                        width: '150px'
                      }}
                    >
                      <div className="center">{item.total_score}</div>
                    </td>

                    {/* 扣分 */}
                    <td
                      style={{
                        width: '150px',
                        textAlign: 'center'
                      }}
                    >
                      <Tooltip
                        getPopupContainer={() => tllltipRef.current}
                        autoAdjustOverflow={true}
                        color="#16243d"
                        arrow={true}
                        overlayClassName="overlayClassName"
                        title={item.calc_show2}
                      >
                        <div className="cneter">{item.score}</div>
                      </Tooltip>
                    </td>

                    {/* 得分 */}
                    <td
                      style={{
                        width: '150px'
                      }}
                    >
                      <div className="center">{item.differen}</div>
                    </td>
                    {/* 得分异常关注 */}
                    <td
                      style={{
                        width: '180px'
                      }}
                    >
                      {item.type === '中' || item.type === '差' ? (
                        <Tooltip
                          getPopupContainer={() => tllltipRef.current}
                          autoAdjustOverflow={true}
                          color="#16243d"
                          arrow={true}
                          overlayClassName="overlayClassName"
                          title={item.point_show}
                        >
                          <div
                            style={{ color: colorMap[item.type] }}
                            className="cneter"
                          >
                            {item.type}
                          </div>
                        </Tooltip>
                      ) : (
                        <div
                          style={{ color: colorMap[item.type] }}
                          className="cneter"
                        >
                          {item.type}
                        </div>
                      )}
                    </td>
                    {/* 业务数据更新周期	 */}
                    <td
                      style={{
                        width: '220px',
                        textAlign: 'center'
                      }}
                    >
                      <div className="cneter">{item.dict_value}</div>
                    </td>
                    {/* 数据接入周期 */}
                    <td
                      style={{
                        width: '220px',
                        textAlign: 'center'
                      }}
                    >
                      <div className="cneter">{item.update_times}</div>
                    </td>
                    {/* 数据来源 */}
                    <td
                      style={{
                        width: '220px',
                        textAlign: 'center'
                      }}
                    >
                      <div className="cneter">{item.data_source}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ''
      )}
      {eventList.length ? (
        <div className="tableBox">
          <div
            style={{
              marginBottom: 30,
              fontSize: 50,
              fontFamily: 'Alibaba-PuHuiTi-Regular'
            }}
          >
            指标类型：事件处置（权重{Number(eventList[0].quality) * 100}%）
            <span>【实际得分{allScore.event}】</span>
          </div>
          <table cellSpacing="0">
            <thead>
              <tr>
                <td>指标名称</td>
                <td>计分细则</td>
                <td>满分</td>
                <td>扣分</td>
                <td>得分</td>
                <td>得分异常关注</td>
                <td>业务数据更新周期</td>
                <td>数据接入周期</td>
                <td>数据来源</td>
              </tr>
            </thead>
            <tbody>
              {eventList?.map(item => {
                return (
                  <tr key={item}>
                    {/* 指标名称 */}
                    <td
                      style={{
                        width: '290px'
                      }}
                    >
                      <div className="cneter">{item.name}</div>
                    </td>
                    {/* 计分细则 */}
                    <td
                      style={{
                        width: '400px'
                      }}
                    >
                      <Tooltip
                        autoAdjustOverflow={true}
                        getPopupContainer={() => tllltipRef.current}
                        color="#16243d"
                        overlayClassName="overlayClassName"
                        title={item.calc_show}
                      >
                        <div className="cneter">{item.calc_expression}</div>
                      </Tooltip>
                    </td>
                    {/* 满分 */}
                    <td
                      style={{
                        width: '150px'
                      }}
                    >
                      <div className="center">{item.total_score}</div>
                    </td>
                    {/* 扣分 */}

                    <td
                      style={{
                        width: '150px'
                      }}
                    >
                      <div className="center">{item.differen}</div>
                    </td>

                    {/* 得分 */}

                    <td
                      style={{
                        width: '150px'
                      }}
                    >
                      <Tooltip
                        autoAdjustOverflow={true}
                        getPopupContainer={() => tllltipRef.current}
                        color="#16243d"
                        overlayClassName="overlayClassName"
                        title={item.calc_show2}
                      >
                        <div className="cneter">{item.score}</div>
                      </Tooltip>
                    </td>
                    {/*得分异常关注*/}
                    <td
                      style={{
                        width: '180px'
                      }}
                    >
                      {item.type === '中' || item.type === '差' ? (
                        <Tooltip
                          autoAdjustOverflow={true}
                          getPopupContainer={() => tllltipRef.current}
                          color="#16243d"
                          overlayClassName="overlayClassName"
                          title={item.point_show}
                        >
                          <div
                            style={{ color: colorMap[item.type] }}
                            className="center"
                          >
                            {item.type}
                          </div>
                        </Tooltip>
                      ) : (
                        <div
                          style={{ color: colorMap[item.type] }}
                          className="center"
                        >
                          {item.type}
                        </div>
                      )}
                    </td>
                    {/* 业务数据更新周期*/}
                    <td
                      style={{
                        width: '220px',
                        textAlign: 'center'
                      }}
                    >
                      <div className="cneter">{item.dict_value}</div>
                    </td>
                    {/* 数据接入周期 */}
                    <td
                      style={{
                        width: '220px',
                        textAlign: 'center'
                      }}
                    >
                      <div className="cneter">{item.update_times}</div>
                    </td>
                    {/* 数据来源 */}
                    <td
                      style={{
                        width: '220px',
                        textAlign: 'center'
                      }}
                    >
                      <div className="cneter">{item.data_source}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ''
      )}
      {oneVoteVetoList.length ? (
        <div className="tableBox">
          <div
            style={{
              marginBottom: 30,
              fontSize: 50,
              fontFamily: 'Alibaba-PuHuiTi-Regular'
            }}
          >
            指标类型：一票否决
            <span>【{allScore.veto}】</span>
          </div>
          <table cellSpacing="0">
            <thead>
              <tr>
                <td>指标名称</td>
                <td>计分细则</td>
                <td>满分</td>
                <td>扣分</td>
                <td>得分</td>
                <td>得分异常关注</td>
                <td>业务数据更新周期</td>
                <td>数据接入周期</td>
                <td>数据来源</td>
              </tr>
            </thead>
            <tbody>
              {oneVoteVetoList?.map(item => {
                return (
                  <tr key={item}>
                    {/*  指标名称*/}
                    <td
                      style={{
                        width: '290px',
                        overflow: 'hidden'
                      }}
                    >
                      <div className="cneter">{item.index_name}</div>
                    </td>
                    {/* 计分细则 */}
                    <td
                      style={{
                        width: '400px',
                        overflow: 'hidden'
                      }}
                    >
                      <Tooltip
                        autoAdjustOverflow={true}
                        getPopupContainer={() => tllltipRef.current}
                        color="#16243d"
                        overlayClassName="overlayClassName"
                        title={item.calc_show}
                      >
                        <div className="cneter">{item.scoring_rules}</div>
                      </Tooltip>
                    </td>
                    {/* 满分 */}
                    <td
                      style={{
                        width: '150px'
                      }}
                    >
                      <div className="center">{item.total_score}</div>
                    </td>

                    {/* 扣分 */}
                    <td
                      style={{
                        width: '150px',
                        textAlign: 'center'
                      }}
                    >
                      <Tooltip
                        autoAdjustOverflow={true}
                        getPopupContainer={() => tllltipRef.current}
                        color="#16243d"
                        overlayClassName="overlayClassName"
                        title={item.calc_show2}
                      >
                        <div className="cneter">{item.num}</div>
                      </Tooltip>
                    </td>
                    {/* 得分 */}
                    <td
                      style={{
                        width: '150px'
                      }}
                    >
                      <div className="center">{item.differen}</div>
                    </td>

                    {/*得分异常关注  */}
                    <td
                      style={{
                        width: '180px'
                      }}
                    >
                      {item.type === '中' || item.type === '差' ? (
                        <Tooltip
                          autoAdjustOverflow={true}
                          getPopupContainer={() => tllltipRef.current}
                          color="#16243d"
                          overlayClassName="overlayClassName"
                          title={item.type}
                        >
                          <div
                            style={{ color: colorMap[item.type] }}
                            className="center"
                          >
                            {item.type}
                          </div>
                        </Tooltip>
                      ) : (
                        <div
                          style={{ color: colorMap[item.type] }}
                          className="center"
                        >
                          {item.type}
                        </div>
                      )}
                    </td>
                    {/* 业务数据更新周期	 */}
                    <td
                      style={{
                        width: '220px',
                        textAlign: 'center'
                      }}
                    >
                      <div className="cneter">{item.dict_value}</div>
                    </td>
                    {/* 数据接入周期 */}
                    <td
                      style={{
                        width: '220px',
                        textAlign: 'center'
                      }}
                    >
                      <div className="cneter">{item.update_times}</div>
                    </td>
                    {/* 数据来源 */}
                    <td
                      style={{
                        width: '220px',
                        textAlign: 'center'
                      }}
                    >
                      <div className="cneter">{item.data_source}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ''
      )}
    </IndedexTableStyle>
  );
};

export default IndedexTable;

const IndedexTableStyle = styled.div`
  .btn {
    display: inline-block;
    width: 310px;
    height: 80px;
    text-align: center;
    border: 1px solid #a1d9ff;
    border-radius: 10px;
    background-color: #273c5b;
    margin-bottom: 10px;
    margin-left: 10px;
    color: #a1d9ff;
    cursor: pointer;
  }
  .tableBox {
    /* border: 1px solid; */
    text-align: left;
    font-size: 48px;
    font-family: 'Alibaba-PuHuiTi-Regular';
    padding: 20px;
    padding-left: 0;
    padding-right: 0;
    transition: all 0.5s;
    /* margin: 0; */
    margin-bottom: 30px;
    & > p {
      box-sizing: border-box;
      color: #a1d9ff;
      margin-bottom: 30px;
      text-align: left;
    }
    & > table {
      border: 3px solid #24a6ff;
      overflow: auto;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      /* overflow: hidden; */
      color: white;
      text-align: center;

      &:hover {
        cursor: default;
      }
      thead {
        color: #a1d9ff;
        /* border: none; */
        border-bottom: 3px solid #24a6ff;
        text-align: center;
        /* font-size: 48px; */
        height: 120px;
        /* background-image: linear-gradient(to bottom, #2f3d52 0%, #1c3b68 100%); */
        background: linear-gradient(0deg, #2f3d52 0%, #1c3b68 100%);
        tr {
          font-size: 48px;
          background: transparent;
          font-family: 'Alibaba-PuHuiTi-Medium';
          td {
            font-family: 'Alibaba-PuHuiTi-Medium';
          }
        }
      }
      tbody {
        tr {
          /* font-size: 38px; */
          font-family: 'Alibaba-PuHuiTi-Regular';
          font-size: 46px;
          /* border: none; */
          /* border-bottom: 3px solid #77a6d1; */
          background: transparent;
          &:hover {
            background: rgba(29, 113, 255, 0.08) !important;
            box-shadow: inset 0px 0px 50px #25a6ff !important;
            transition: all 0.2s;
          }
        }
        .cneter {
          /* overflow-wrap: break-word; */
          font-family: 'Alibaba-PuHuiTi-Regular';
          height: 100%;
          min-height: 100px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          word-wrap: normal;
          overflow-wrap: anywhere;
        }
      }
      td {
        font-family: 'Alibaba-PuHuiTi-Regular';
        border: 3px solid #77a6d1;
        padding: 5px;
      }
    }
    thead,
    tbody,
    tfoot {
      vertical-align: middle;
    } /* add this rule*/
    td,
    th,
    tr {
      vertical-align: inherit;
    } /* add this rule */
  }
  .overlayClassName {
    text-align: center;
    min-width: 800px;
    min-height: 100px;
    font-size: 48px;

    .ant-tooltip-inner {
      padding: 20px;
      box-sizing: border-box;
      /* background: linear-gradient(-90deg, #1f3858 0%, #17243d 100%); */
      background: #303133 !important;
      border-radius: 14px;
      font-size: 54px;
      font-family: 'Alibaba-PuHuiTi-Regular';
      /* font-weight: 300; */
      color: #ffffff;
      line-height: 60px;
      padding: 20px 0;
      padding-left: 30px;
      position: relative;
      /* font-weight: bold; */
      letter-spacing: 5px;
      /* &::before {
          content: '';
          display: block;
          position: absolute;
          left: 3px;
          height: 100%;
          width: 6px;
          background-color: #68a7fc;
          top: 0;
        } */
    }
  }
`;
