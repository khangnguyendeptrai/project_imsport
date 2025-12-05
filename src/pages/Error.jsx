import React from "react";
import { Link } from "react-router-dom"; // nếu bạn dùng react-router

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-extrabold text-red-500">404</h1>
      <p className="text-2xl md:text-3xl mt-4">
        Oops! Trang bạn đang tìm kiếm không tồn tại.
      </p>
      <p className="mt-2 text-gray-600">
        Có vẻ như bạn đã đi lạc đường.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default Error;
