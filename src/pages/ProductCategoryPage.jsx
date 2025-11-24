import React, { useEffect, useState } from "react";
import ProductGridPage from "../components/ProductGridPage";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Filter/Breadcrumb";
import FilterContainer from "../components/Filter/FilterContainer";
import FilterByCategories from "../components/Filter/FilterByCategories";
// === Import 3 file JS gốc ===
import { categoriesType } from "../data/categoriesType.js"
import { categories } from "../data/categories.js";
import { products } from "../data/products.js";
import { product2 } from "../data/product2.js";
const ProductCategoryPage = () => {
  const { category, subcategory } = useParams(); // 👈 Lấy param từ URL
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState(null);
  // console.log('category', category);


  const [filters, setFilters] = useState({
    sizes: [],
    brands: [],
    price: null
  });

  const isFiltering =
    (filters.sizes?.length > 0) ||
    (filters.brands?.length > 0) ||
    (filters.price && filters.price.min !== 0 );

  useEffect(() => {
    if (filters.reset) {
      setFilters({
        sizes: [],
        brands: [],
        price: null,
        isFiltering: false,
      });
      return;
    }

    // các cập nhật filter bình thường tại đây
  }, [filters]);
  // === Gom dữ liệu lại ===
  const dataNew = categoriesType.map((type) => {
    const relatedCategories = categories
      .filter((cat) => cat.categories_type_id === type.id)
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      }));

    return {
      id: type.id,
      categoriesType: type.name,
      slug: type.slug,
      description: type.description,
      categories: relatedCategories
    };
  });
  console.log('dataNew', dataNew);
  
  useEffect(() => {
    if (subcategory) {
      const categoryData = categories.find(item => item.slug === subcategory);
      setProducts(product2.filter(item => item.category_id === categoryData.id));
      setCategoryTitle(categories.find(item => item.slug === subcategory)?.name);
    } else {
      const categoryType = categoriesType.find(item => item.slug === category);
      const categorySub = categories.filter(item => item.categories_type_id === categoryType.id);
      setProducts(product2.filter(item => categorySub.some(c => c.id === item.category_id)));
      setCategoryTitle(categoryType.name);
    }
  }, [category, subcategory]);


  const handleFilterChange = (newFilter) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };
  const filteredProducts = products.filter((p) => {
    const matchSize =
      filters.sizes.length === 0 ||
      filters.sizes.some((s) => p.size?.split(",").includes(s));
    const matchBrand =
      filters.brands.length === 0 || filters.brands.includes(p.brand?.trim().toLowerCase());

    // console.log(filters.brands.includes(p.brand));
    const matchPrice =
      !filters.price ||
      (p.price >= filters.price.min && p.price <= filters.price.max);
    return matchSize && matchBrand && matchPrice;
  });
  console.log("isFiltering", isFiltering);

  // console.log("data new"+filteredProducts);

  return (
    <>
      <Breadcrumb category={category} subcategory={subcategory} />
      <div className="container flex ">
        <div className="md:flex inline-block w-auto bg-white h-full border-2 border-solid ">
          {/* <FilterByCategories data={dataFilter} /> */}
          <FilterContainer data={dataNew} products={products} onFilterChange={handleFilterChange} />
        </div>
        <div className="flex-1">
          <ProductGridPage
            title={categoryTitle}
            category={category}
            description={categoryTitle || ""}
            productData={isFiltering ? filteredProducts : products}
          />
        </div>
      </div>

    </>
  );
};

export default ProductCategoryPage;
