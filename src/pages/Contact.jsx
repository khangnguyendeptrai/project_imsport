import React from 'react';
import '../styles/pages/Contact.scss';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-content">
          <h1 className="page-title">Liên hệ với chúng tôi</h1>
          <p className="page-subtitle">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi!
          </p>

          <div className="contact-grid">
            <div className="contact-info">
              <h2>Thông tin liên hệ</h2>
              <div className="contact-items">
                <div className="contact-item">
                  <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h3>Điện thoại</h3>
                    <p>+84 123 456 789</p>
                  </div>
                </div>

                <div className="contact-item">
                  <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3>Email</h3>
                    <p>support@shopify.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3>Địa chỉ</h3>
                    <p>123 Đường ABC, Quận XYZ, TP.HCM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h2>Gửi tin nhắn</h2>
              <form className="form">
                <div className="form-group">
                  <label htmlFor="name">Họ và tên</label>
                  <input type="text" id="name" name="name" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Chủ đề</label>
                  <input type="text" id="subject" name="subject" required />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tin nhắn</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Gửi tin nhắn
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
