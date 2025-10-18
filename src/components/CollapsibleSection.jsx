import { useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSection = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className="mb-4">
            <div
                className="flex row items-center justify-between w-60 "

            >
                <h3 className="text-lg mb-2 font-bold">{title}</h3>
                {isOpen ? (
                    <MdOutlineKeyboardArrowUp className="text-3xl cursor-pointer" onClick={toggleSection} />
                ) : (
                    <MdOutlineKeyboardArrowDown className="text-3xl cursor-pointer" onClick={toggleSection} />
                )}
            </div>
            {isOpen && <div className="mt-2">{children}</div>}
        </div>
    )

}
export default CollapsibleSection;