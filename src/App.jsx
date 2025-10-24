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

          {/* 🔹 Các trang danh mục */}
          <Route path="men" element={<ProductCategoryPage category="men" />} />
          <Route path="women" element={<ProductCategoryPage category="women" />} />
          <Route path="watch" element={<ProductCategoryPage category="watch" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
