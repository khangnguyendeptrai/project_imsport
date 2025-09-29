import { useState } from "react";

import { useNavigate } from "react-router-dom";
import logo from '../assets/images/logo.png';
import vnFlag from '../assets/images/vn.png';
import ukFlag from '../assets/images/eng.png';

export default function Header() {
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [cartCount] = useState(3); // số lượng sản phẩm trong giỏ hàng
    const navigate = useNavigate();

    return (
        <header className="w-full shadow-sm border-b bg-white  items-center justify-between">
            <div className="mx-4 px-4 flex flex-row items-center justify-between  h-20">
                <div className="items-center justify-between relative ">
                    {/* Logo */}
                    <div className="flex-shrink-0 mr-0">
                        <img src={logo} alt="Logo" className="h-8 w-auto cursor-pointer" onClick={() => navigate('/')} />
                    </div>
                </div>

                {/* Moble */}




                <div className=" items-center justify-between relative  ">
                    <ul className="flex space-x-4 items-center">
                        <li className="flex items-center border rounded-md overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-3 py-2 outline-none w-full"
                            />
                            <i className="fa fa-search px-3 text-gray-500 hover:text-orange-500 cursor-pointer"></i>
                        </li>
                        <li>
                            <a href="#" className="hover:text-orange-500">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li><a href="#" className="hover:text-orange-500">
                          
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">{cartCount}</span>
                            
                        </a></li>
                        <li><span>
                            <img src={vnFlag} alt="Vietnamese" className="h-5 w-auto inline mr-2" />
                            <img src={ukFlag} alt="English" className="h-5 w-auto inline" />
                        </span>
                        </li>
                    </ul>
                </div>

            </div>



        </header>
    );
}
