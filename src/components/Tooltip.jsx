import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Tooltip = ({ to, label, tooltip }) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseMove={(e) =>
        setPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
      }
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Link
        to={to}
        className="block text-center text-sm bg-[#673AB7] py-2.5 px-10 rounded-full text-white font-light md:normal-case"
      >
        {label}
      </Link>
      {show && (
        <span
          className="absolute bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity duration-100"
          style={{
            left: `${pos.x + 10}px`,
            top: `${pos.y + 20}px`,
          }}
        >
          {tooltip}
        </span>
      )}
    </div>
  )
}

export default Tooltip