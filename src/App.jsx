import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import "./App.css";

import FilterContainer from './components/Filter/FilterContainer';
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* 🔹 Dùng layout chính */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {/* <Route path='filter' element={<FilterContainer />} /> */}
          <Route path="/:category" element={<ProductCategoryPage />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
