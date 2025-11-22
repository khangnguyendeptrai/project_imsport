import React, { useEffect, useState } from "react";
import ProductGridPage from "../components/ProductGridPage";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Filter/Breadcrumb";
import { dataNew } from "../data/dataNew";
import FilterContainer from "../components/Filter/FilterContainer";
import FilterByCategories from "../components/Filter/FilterByCategories";
// === Import 3 file JS gốc ===
import { categoriesType } from "../data/categoriesType.js"
import { categories } from "../data/categories.js";
import { products } from "../data/products.js";
import { product2 } from "../data/product2.js";
const ProductCategoryPage = () => {
  const { category } = useParams(); // 👈 Lấy param từ URL
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
        products: product2.filter((p) => p.category_id === cat.id)
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
  const data = []
  let categorieTitle = ''
  let selectedPage = dataNew.find(item => item.slug === category);
  if (selectedPage) {
    categorieTitle = selectedPage.categoriesType
    selectedPage.categories.forEach(item => {
      item.products.forEach(product => {
        data.push(product);
      });
    });

  } else {
    selectedPage = dataNew.find(item => {
      item.categories.forEach(item => {
        if (item.slug === category) {
          categorieTitle = item.name
          item.products.forEach(product => {
            data.push(product);
          });
        }
      });
    });
  }
  // console.log('data', data);
  // console.log('selectedPage', selectedPage);

  const handleFilterChange = (newFilter) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };
  const filteredProducts = data.filter((p) => {
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
  console.log(isFiltering);

  // console.log("data new"+filteredProducts);

  return (
    <>
      <Breadcrumb data={dataNew} />
      <div className="container flex ">
        <div className="md:flex inline-block w-auto bg-white h-full border-2 border-solid ">
          {/* <FilterByCategories data={dataFilter} /> */}
          <FilterContainer data={dataNew} onFilterChange={handleFilterChange} />
        </div>
        <div className="flex-1">
          <ProductGridPage
            title={data.categoriesType}
            category={category}
            description={selectedPage?.description || ""}
            productData={isFiltering ? filteredProducts : data}
          />
        </div>
      </div>

    </>
  );
};

export default ProductCategoryPage;
