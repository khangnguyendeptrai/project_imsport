import React, { useEffect, useRef, useState } from "react";
import "../styles/components/CategoryDescription.scss";

const CategoryDescription = ({ description }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (descRef.current) {
        if (isMobile) {
          setIsOverflowing(false);
          setShowFullDesc(true);
        } else {
          setIsOverflowing(descRef.current.scrollHeight > 400);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [description]);

  useEffect(() => {
    const handleScroll = () => {
      setShowReadMoreButton(window.scrollY >= 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDesc = () => setShowFullDesc(!showFullDesc);

  return (
    description && (
      <div
        className={`category-description ${
          showFullDesc ? "expanded" : "collapsed"
        }`}
      >
        <div
          ref={descRef}
          className="category-description__content"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {isOverflowing && showReadMoreButton && (
          <div className="read-more">
            <button onClick={toggleDesc}>
              {showFullDesc ? "Thu gọn ▲" : "Đọc thêm ▼"}
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default CategoryDescription;
