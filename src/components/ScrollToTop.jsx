import React, { useEffect, useState, useCallback } from 'react';
import '../styles/components/ScrollToTop.scss';

// Hàm easing: mượt, tự nhiên (nhanh lúc đầu, chậm dần về cuối)
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Theo dõi vị trí scroll để hiện/ẩn nút
  const handleScroll = useCallback(() => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(y > 300);
  }, []);

  useEffect(() => {
    handleScroll(); // kiểm tra ngay khi load trang
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Hàm cuộn lên đầu trang
  const scrollToTop = useCallback(() => {
    const startPosition = window.pageYOffset || document.documentElement.scrollTop || 0;
    const startTime = performance.now();
    const duration = 600; // 0.6s -> mượt, không quá chậm

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress); // áp dụng easing
      const nextY = Math.max(0, Math.round(startPosition * (1 - eased)));
      window.scrollTo({ top: nextY, left: 0, behavior: 'auto' });
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, []);

  if (!isVisible) return null;

  return (
    <button aria-label="Scroll to top" className="scroll-to-top-btn" onClick={scrollToTop}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollToTop;
