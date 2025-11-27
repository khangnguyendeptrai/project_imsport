import React, { useEffect, useMemo, useState } from "react";
import ProductGridPage from "../components/ProductGridPage";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Filter/Breadcrumb";
import FilterContainer from "../components/Filter/FilterContainer";
import CategoryTypeAPI from "../service/CategoryTypeAPI.js";
import CategoriesAPI from "../service/CategoriesAPI.js";
import ProductAPI from "../service/ProductAPI.js";

const PRICE_MIN = 0;
const PRICE_MAX = 20_000_000;

const ProductCategoryPage = () => {
  const { category, subcategory } = useParams();

  const [products, setProducts] = useState([]);          // dữ liệu gốc
  const [filteredData, setFilteredData] = useState([]);  // dữ liệu sau filter
  const [categoryTitle, setCategoryTitle] = useState(null);
  const [categoryDescription, setCategoryDescription] = useState(null);

  const [categoriesType, setCategoriesType] = useState([]); // ⬅️ THÊM
  const [categories, setCategories] = useState([]);         // ⬅️ THÊM
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
  const dataNew = useMemo(() => {
    return categoriesType.map((type) => {
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
  }, [categoriesType, categories]);


  // ==== Load sản phẩm theo category/subcategory ====
  useEffect(() => {
    const loadData = async () => {
      try {
        const typeRes = await CategoryTypeAPI.getCategoryType();
        const catRes = await CategoriesAPI.getCategory();
        const productRes = await ProductAPI.getProducts();

        const categoryTypes = typeRes || [];
        const categories = catRes || [];
        const productList = productRes || [];
        setCategoriesType(typeRes);
        setCategories(catRes);
        // Tìm loại chính theo slug: /do-nam
        const currentType = categoryTypes.find((t) => t.slug === category);

        if (!currentType) return;

        setCategoryDescription(currentType.description);

        if (subcategory) {
          // Nếu URL dạng /do-nam/giay → tìm category con
          const currentCategory = categories.find(
            (c) => c.slug === subcategory
          );

          if (!currentCategory) return;

          const list = productList.filter(
            (p) => p.category_id === currentCategory.id
          );

          setProducts(list);
          setFilteredData(list);
          setCategoryTitle(currentCategory.name);
        } else {
          // Không có subcategory → load toàn bộ sản phẩm /do-nam
          const categoryChildren = categories.filter(
            (c) => c.categories_type_id === currentType.id
          );

          const list = productList.filter((p) =>
            categoryChildren.some((child) => p.category_id === child.id)
          );

          setProducts(list);
          setFilteredData(list);
          setCategoryTitle(currentType.name);
        }
      } catch (err) {
        console.error("Load category page error:", err);
      }
    };

    loadData();

    setFilters({ sizes: [], brands: [], price: null });
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
            description={categoryDescription || ""}
            productData={filteredData}  // luôn lấy filteredData
          />
        </div>
      </div>
    </>
  );
};

export default ProductCategoryPage;
