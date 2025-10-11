import React from 'react'

const ProductDetailPopup = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative animate-fadeIn">
                {/* Nút đóng */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                >
                    &times;
                </button>

                {/* Tiêu đề */}
                {title && <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>}

                {/* Nội dung */}
                <div>{children}</div>
            </div>
        </div>
    )
}

export default ProductDetailPopup