import React, { useState, useEffect } from 'react';
import request from '@/utils/request';
function Index() {
  const [pageParams, setPageParams] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })
  useEffect(() => {
    request('/api/keeper-data-sign/hallSignIndex/indexWarningList', {
      method: 'POST',
      params: {
        ...pageParams
      }
    }).then(res => {
      console.log(res);

    }).catch(e => {
      console.log(e, '-------------------');

    })
  }, [])
  return (
    <div>这里是Login</div>
  )
}
export default Index; 
