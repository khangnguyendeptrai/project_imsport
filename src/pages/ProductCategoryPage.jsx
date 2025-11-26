import React, { useEffect, useMemo, useState } from "react";
import ProductGridPage from "../components/ProductGridPage";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Filter/Breadcrumb";
import FilterContainer from "../components/Filter/FilterContainer";

import { categoriesType } from "../data/categoriesType.js";
import { categories } from "../data/categories.js";
import { product2 } from "../data/product2.js";

const PRICE_MIN = 0;
const PRICE_MAX = 20_000_000;

const ProductCategoryPage = () => {
  const { category, subcategory } = useParams();

  const [products, setProducts] = useState([]);          // dữ liệu gốc
  const [filteredData, setFilteredData] = useState([]);  // dữ liệu sau filter
  const [categoryTitle, setCategoryTitle] = useState(null);

  const [filters, setFilters] = useState({
    sizes: [],
    brands: [],
    price: null,
  });

  const isFiltering =
    filters.sizes.length > 0 ||
    filters.brands.length > 0 ||
    (filters.price &&
      (filters.price.min > PRICE_MIN || filters.price.max < PRICE_MAX));

  // ==== Gom dữ liệu categories type & categories ====
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
      categories: relatedCategories,
    };
  });

  // ==== Load sản phẩm theo category/subcategory ====
  useEffect(() => {
    if (subcategory) {
      const categoryData = categories.find((item) => item.slug === subcategory);
      const list = product2.filter((item) => item.category_id === categoryData.id);

      setProducts(list);
      setFilteredData(list); // reset filter data
      setCategoryTitle(categoryData.name);
    } else {
      const categoryType = categoriesType.find((item) => item.slug === category);
      const categorySub = categories.filter(
        (item) => item.categories_type_id === categoryType.id
      );

      const list = product2.filter((item) =>
        categorySub.some((c) => c.id === item.category_id)
      );

      setProducts(list);
      setFilteredData(list);
      setCategoryTitle(categoryType.name);
    }

    // reset filter khi đổi trang category
    setFilters({
      sizes: [],
      brands: [],
      price: null,
    });
  }, [category, subcategory]);

  const handleFilterChange = (newFilter) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };

  const normalizedSelectedBrands = useMemo(
    () =>
      filters.brands.map((brand) => brand?.trim().toLowerCase()).filter(Boolean),
    [filters.brands]
  );

  // ==== Xử lý filter ====
  useEffect(() => {
    if (!isFiltering) {
      setFilteredData(products);
      return;
    }

    const result = products.filter((product) => {
      // --- SIZE ---
      const directSizes = product.size
        ? product.size.split(",").map((s) => s.trim())
        : [];

      const variationSizes =
        product.variations?.map((v) => v.size?.trim()).filter(Boolean) || [];

      const productSizes = Array.from(new Set([...directSizes, ...variationSizes]));

      const matchSize =
        filters.sizes.length === 0 ||
        productSizes.some((size) => filters.sizes.includes(size));

      // --- BRAND ---
      const productBrand = product.brand?.trim().toLowerCase();

      const matchBrand =
        normalizedSelectedBrands.length === 0 ||
        (productBrand && normalizedSelectedBrands.includes(productBrand));

      // --- PRICE ---
      const priceToCompare =
        typeof product.price === "number"
          ? product.price
          : Number(product.price) || 0;

      const minPrice = filters.price?.min ?? PRICE_MIN;
      const maxPrice = filters.price?.max ?? PRICE_MAX;

      const matchPrice =
        !filters.price ||
        (priceToCompare >= minPrice && priceToCompare <= maxPrice);

      return matchSize && matchBrand && matchPrice;
    });

    setFilteredData(result);
  }, [filters, products, normalizedSelectedBrands]);

  return (
    <>
      <Breadcrumb category={category} subcategory={subcategory} />

      <div className="container flex ">
        <div className="md:flex inline-block w-auto bg-white h-full border-2 border-solid ">
          <FilterContainer
            data={dataNew}
            products={filteredData}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="flex-1">
          <ProductGridPage
            title={categoryTitle}
            category={category}
            description={categoryTitle || ""}
            productData={filteredData}  // luôn lấy filteredData
          />
        </div>
      </div>
    </>
  );
};

export default ProductCategoryPage;
