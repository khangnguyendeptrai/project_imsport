import React, { useEffect } from 'react';
import '../styles/pages/Home.scss';
import MainBanner from '../components/MainBanner';
import BrandBanner from '../components/BrandBanner';
import PolicyBar from '../components/PolicyBar';
import NewColleciton from '../components/NewColleciton';
import CollectionProduct from '../components/CollectionProduct';
import ProductsSection from '../components/ProductsSection';

const Home = () => {
  return (
    <>
      <MainBanner/>
      <BrandBanner/>
      <ProductsSection />
      <NewColleciton />
      <CollectionProduct />
      <PolicyBar />
    </>
  );
};

export default Home;