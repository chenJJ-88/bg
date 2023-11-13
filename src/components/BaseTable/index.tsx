import React, { useMemo, useState, useEffect } from 'react';
// import Tpopover from '@/components/Tpopover';
import { Tooltip, Spin } from 'antd';
import TableWrap from './style.js';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

// 获取唯一识别符
const getRowUniqueId = (record, rowKey) => {
  //  instanceof Function
  if (rowKey instanceof Function) {
    return rowKey(record);
  }
  return record[rowKey];
};

// 单元格渲染
const CellRender = ({
  colItem,
  record,
  index,
  tips,
  width,
  toolfontSize = 12,
  onTd
}) => {
  const content = useMemo(() => {
    let text = record[colItem.dataIndex];
    if (colItem.formater) {
      text = colItem.formater(text, record, index);
    }

    let _content = text;
    if (colItem.render) {
      _content = colItem.render(_content, record, index);
    }

    return _content;
  }, []);

  const tdConfig = useMemo(() => {
    if (!onTd) {
      return {};
    }
    if (colItem.title == '操作') return {};
    const config = onTd(record, colItem);
    if (config.onClick) {
      config.className = ` ${config.className}  click`;
    }
    return config;
  }, [record, index, onTd]);
  return (
    <td
      key={colItem.key}
      width={colItem.width}
      className="cell"
      {...tdConfig}
      style={
        tips
          ? {
            // width: `${width}`,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
          : {}
      }
    >
      {tips ? (
        <Tooltip
          title={content}
          placement="top"
          overlayInnerStyle={{ fontSize: toolfontSize }}
        >
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {' '}
            {content}
          </div>
        </Tooltip>
      ) : (
        content
      )}
    </td>
  );
};

// 行渲染
const RowRender = ({
  record,
  index,
  colList,
  onRow,
  tips,
  selectedKeys,
  rowKey,
  trHeight,
  fontSize,
  onTd,
}) => {
  const rowConfig = useMemo(() => {
    if (!onRow) {
      return {};
    }
    const config = onRow(record, index);

    if (config.onClick) {
      config.className = ` ${config.className}  click`;
    }
    return config;
  }, [record, index, onRow]);
  const selectedRowClassName = selectedKeys?.includes(
    getRowUniqueId(record, rowKey)
  )
    ? 'selected_row'
    : '';
  return (
    <tr
      style={{ height: trHeight }}
      {...rowConfig}
      className={`row ${rowConfig.className} ${selectedRowClassName}`}
    >
      {colList.map(colItem => (
        <CellRender
          key={colItem.key || colItem.dataIndex}
          colItem={colItem}
          record={record}
          index={index}
          tips={colItem.tips}
          width={colItem.width}
          toolfontSize={fontSize}
          onTd={onTd}
        />
      ))}
    </tr>
  );
};

const getTop3ClassName = (num, isColor) => {
  const classMap = {
    1: 'num1',
    2: 'num2',
    3: 'num3'
  };

  if (!isColor) {
    return '';
  }

  return classMap[num];
};

const BaseTable = ({
  dataSource = [],
  columns = [],
  rowKey = record => JSON.stringify(record),
  orderNum = true,
  orderNumTop3 = true, // 排行前三颜色设置
  height = 500,
  onRow,
  onTd,
  headClassName = '',
  selectedKeys,
  fontSize = 12,
  trHeight = 44,
  isNoData = false,
  isCenter = false,
  spinning = false,
  tabActive
}) => {
  const [dataList, setDataList] = useState([]);

  // 重新设置数据列表
  useMemo(() => {
    const list = [];
    if (dataSource && dataSource.length) {
      dataSource?.forEach((e, i) => {
        list.push({ ...e, _orderNum: i + 1 });
      });
    }
    setDataList([...list]);
  }, [dataSource]);

  // 重新设置 列配置
  const colList = useMemo(() => {
    let list = columns || [];
    if (orderNum) {
      // 添加序号
      list = [
        {
          dataIndex: '_orderNum',
          title: '序号',
          width: 70,
          render: text => {
            return (
              <div className="order_num_box">
                <div
                  className={getTop3ClassName(text, orderNumTop3)}
                  style={{ fontSize: fontSize }}
                >
                  {text}
                </div>
              </div>
            );
          }
        }
      ].concat(list);
    }
    return list;
  }, [columns, orderNum]);

  // 排序
  const tableDataSorter = (key, upOrDown, sorterFn) => {
    const list = [...dataList];
    list.sort((a, b) => sorterFn(a[key], b[key], upOrDown));
    setDataList([...list]);
  };

  return (
    <TableWrap>
      <colgroup>
        <col />
      </colgroup>
      {/**  ------------ 表头 start ------   */}
      <thead
        className={`thead  ${headClassName}`}
        style={{ fontSize: `${fontSize}px` }}
      >
        <tr className="row" style={{ height: trHeight }}>
          {colList.map((item, index) => {
            const {
              key,
              dataIndex,
              title,
              formater,
              render,
              sorter,
              ...otherItemConfig
            } = item || {};
            return (
              <td key={key || dataIndex} {...otherItemConfig} className="cell">
                <div
                  className={
                    isCenter && index === 0
                      ? 'head_cell_content_center'
                      : 'head_cell_content'
                  }
                >
                  <span>{title}</span>
                  {sorter ? (
                    <div className="sorter-icon">
                      <CaretUpOutlined
                        className="up"
                        onClick={() => tableDataSorter(dataIndex, 'up', sorter)}
                      />
                      <CaretDownOutlined
                        className="down"
                        onClick={() =>
                          tableDataSorter(dataIndex, 'down', sorter)
                        }
                      />
                    </div>
                  ) : null}
                </div>
              </td>
            );
          })}
        </tr>
      </thead>
      {/**  ------------ 表头 end ------   */}
      {/**  ------------ 表内容 start ------   */}
      <Spin spinning={spinning} size="large" tip="加载中">
        <tbody
          className="tbody"
          style={{
            maxHeight: height !== 0 ? height - 44 : null,
            fontSize: `${fontSize}px`
          }}
        >
          {dataList.map((record, index) => {
            return (
              <RowRender
                key={getRowUniqueId(record, rowKey)}
                record={record}
                index={index}
                colList={colList}
                onRow={onRow}
                onTd={onTd}
                selectedKeys={selectedKeys}
                rowKey={rowKey}
                trHeight={trHeight}
                fontSize={fontSize}
                tabActive={tabActive}
              />
            );
          })}

          {isNoData && !dataList.length && !spinning ? (
            <div style={{ color: '#fff', marginTop: '5%' }}>暂无数据</div>
          ) : (
            ''
          )}
        </tbody>
      </Spin>
      {/**  ------------ 表内容 end ------   */}
    </TableWrap>
  );
};

export default BaseTable;
