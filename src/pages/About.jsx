import React from 'react';
import '../styles/pages/About.scss';

const About = () => {
  return (
    <div className="about-page">
      <div className="container mx-auto px-4 py-16">
        <div className="about-content">
          <h1 className="page-title">Về chúng tôi</h1>
          <p className="page-subtitle">
            Shopify - Nền tảng thương mại điện tử hàng đầu Việt Nam
          </p>
          
          <div className="about-sections">
            <section className="about-section">
              <h2>Sứ mệnh của chúng tôi</h2>
              <p>
                Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng cao 
                với giá cả hợp lý và dịch vụ khách hàng tuyệt vời.
              </p>
            </section>

            <section className="about-section">
              <h2>Tầm nhìn</h2>
              <p>
                Trở thành nền tảng thương mại điện tử hàng đầu tại Việt Nam, 
                kết nối người mua và người bán một cách hiệu quả và tin cậy.
              </p>
            </section>

            <section className="about-section">
              <h2>Giá trị cốt lõi</h2>
              <ul>
                <li>Chất lượng sản phẩm và dịch vụ</li>
                <li>Trải nghiệm khách hàng xuất sắc</li>
                <li>Minh bạch và tin cậy</li>
                <li>Đổi mới và phát triển liên tục</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
