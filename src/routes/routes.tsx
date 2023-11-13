import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Layout from '@/layout';
const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Sign = lazy(() => import('@/pages/Sign'));
function RootRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Sign />} />
      </Routes>
    </Layout>
  );
}


export default RootRoutes;