import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Layout from '@/layout';
const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
function RootRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}


export default RootRoutes;