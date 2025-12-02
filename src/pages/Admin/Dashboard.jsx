import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Package,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Filter,
} from "lucide-react";
import ProductAPI from "../../service/ProductAPI";
import CategoryAPI from "../../service/CategoriesAPI";
import { Link } from "react-router-dom";

const summaryCards = [
  {
    label: "Tổng sản phẩm",
    value: "248",
    change: "+12% so với tháng trước",
    icon: Package,
    accent: "from-blue-500/10 to-blue-500/5 border-blue-200",
  },
  {
    label: "Sản phẩm sắp hết",
    value: "18",
    change: "Cần nhập kho",
    icon: AlertTriangle,
    accent: "from-amber-500/10 to-amber-500/5 border-amber-200",
  },
  {
    label: "Doanh thu tháng",
    value: "1.24 tỷ ₫",
    change: "+8.4% tăng trưởng",
    icon: TrendingUp,
    accent: "from-emerald-500/10 to-emerald-500/5 border-emerald-200",
  },
  {
    label: "Sản phẩm chờ duyệt",
    value: "6",
    change: "Cần kiểm tra nội dung",
    icon: Sparkles,
    accent: "from-purple-500/10 to-purple-500/5 border-purple-200",
  },
];



export default function Dashboard() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await ProductAPI.getProducts()
            setProducts(response)
            const categoriesResponse = await CategoryAPI.getCategory()
            setCategories(categoriesResponse)
        }
        fetchProducts()
    }, [])
    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')
        .replace(/\s/g, '')         // xóa toàn bộ khoảng trắng bình thường
        .replace(/\u00A0/g, '')  + ' VNĐ';
    }
  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Control center</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900">Quản lí sản phẩm</h1>
            <p className="mt-3 text-slate-500">
              Nắm bắt tình trạng tồn kho, doanh thu và kiểm duyệt sản phẩm trong một bảng điều khiển
              trực quan.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
              <Filter size={18} />
              Bộ lọc nâng cao
            </button>
            <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(59,130,246,.35)] transition hover:-translate-y-0.5">
              <Plus size={18} />
              Thêm sản phẩm
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className={`rounded-3xl border ${card.accent} bg-white p-5 text-slate-900 shadow-xl`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {card.label}
                  </div>
                  <span className="rounded-2xl bg-slate-100 p-2 text-slate-600 shadow-inner">
                    <Icon size={20} />
                  </span>
                </div>
                <div className="mt-6 text-4xl font-bold text-slate-900">{card.value}</div>
                <p className="mt-2 text-sm text-slate-500">{card.change}</p>
              </div>
            );
          })}
        </div>

        {/* Filter + Search */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, SKU..."
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none">
                <option>Tất cả danh mục</option>
                <option>Áo</option>
                <option>Quần</option>
                <option>Giày</option>
                <option>Phụ kiện</option>
              </select>
              <div className="flex gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1">
                {["Tất cả", "Đang bán", "Chờ duyệt", "Ẩn"].map((item, index) => (
                  <button
                    key={item}
                    className={`rounded-2xl px-4 py-2 text-xs font-semibold uppercase tracking-wide ${
                      index === 0 ? "bg-white text-slate-900 shadow" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl">
          <div className="grid grid-cols-12 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <div className="col-span-4">Sản phẩm</div>
            <div className="col-span-2">Danh mục</div>
            <div className="col-span-2">Giá</div>
            <div className="col-span-2">Tồn kho</div>
            <div className="col-span-2 text-right">Thao tác</div>
          </div>
          <div className="divide-y divide-slate-100">
            {products.map((product) => {

                return(
              <div
                key={product.id}
                className="grid grid-cols-12 items-center px-6 py-5 text-sm text-slate-600 transition hover:bg-slate-50"
              >
                <div className="col-span-4 px-2 flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-14 w-14 rounded-2xl object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{product.name}</p>
                  </div>
                </div>
                <div className="col-span-2 font-medium text-slate-600">{categories.find(category => category.id === product.category_id)?.name}</div>
                <div className="col-span-2 font-semibold text-slate-900">{formatPrice(product.price)}</div>
                <div className="col-span-2 text-slate-500">
                  <span className="text-base font-bold text-slate-900">{product.variations.reduce((acc, variation) => acc + variation.quantity, 0)}</span> sản phẩm
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Link to={`/admin/products/${product.id}`} className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-blue-200 hover:text-blue-600">
                    <Pencil size={16} />
                  </Link>
                  <Link to={`/admin/products/${product.id}`} className="rounded-2xl border border-slate-200 bg-white p-2 text-rose-500 transition hover:border-rose-200 hover:text-rose-600">
                    <Trash2 size={16} />
                  </Link>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}