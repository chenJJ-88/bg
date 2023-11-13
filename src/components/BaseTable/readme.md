## baseTable

```tsx
// import React, { useState } from 'react';
// import { BaseTable } from 'components';

const Page = () => {
  const [tableData, setDataTable] = useState([]);

  const onTableRow = record => {
    return {
      onClick: () => {
        console.log(record);
      }
    };
  };

  //   表格列配置;
  const columns = [
    {
      title: '工单标题',
      dataIndex: 'title',
      width: 200,
      tips:true
    },
    {
      title: '一级分类',
      dataIndex: 'typeLevel1',
      width: 100
    },
    {
      title: '受理时间',
      dataIndex: 'startDate',
      width: 150
    },
    {
      title: '工单状态',
      dataIndex: 'status',
      width: 100,
      formater: text => 111
    }
  ];

  return (
    <BaseTable
      dataSource={tableData}
      columns={columns}
  
      height={800}
      onRow={onTableRow}
    />
  );
};
```
