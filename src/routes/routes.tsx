import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '@/layout';
const routesMap = [
  { path: '/', component: lazy(() => import('@/pages/SignPage')) },
  { path: '/mapChart', component: lazy(() => import('@/pages/mapChart')) },
  // { path: '/', component: lazy(() => import('@/pages/Sign')) },
  // { path: '/', component: lazy(() => import('@/pages/manageSystem')) },
];

function RootRoutes() {
  return (

    <Routes>
      {
        routesMap.map((item: { path: string, component: any }) => {
          return <Route key={item.path} path={item.path} element={//使用lazy 加载route 时 ，需要使用Suspense包裹一下，因为 lazy 返回的是一个 Promise 对象，而不是组件
            <Suspense fallback={<div>Loading...</div>}>
              <item.component />
            </Suspense>}></Route>
        })
      }
    </Routes>

  );
}


export default RootRoutes;