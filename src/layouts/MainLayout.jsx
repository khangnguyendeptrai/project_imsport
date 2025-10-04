import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/layouts/MainLayout.scss';
import MobileBottomPanel from "../components/MobileBottomPanel";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <ScrollToTop />
      <Footer />
       <MobileBottomPanel /> {/* Chỉ hiện khi mobile */}
    </div>
  );
};

export default MainLayout;
