import React from 'react';
import '../styles/pages/About.scss';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="container mx-auto px-4 py-16">
        <div className="about-content">
          <h1 className="page-title">{t('about.title')}</h1>
          <p className="page-subtitle">
            {t('about.subtitle')}
          </p>
          
          <div className="about-sections">
            <section className="about-section">
              <h2>{t('about.missionTitle')}</h2>
              <p>
                {t('about.missionText')}
              </p>
            </section>

            <section className="about-section">
              <h2>{t('about.visionTitle')}</h2>
              <p>
                {t('about.visionText')}
              </p>
            </section>

            <section className="about-section">
              <h2>{t('about.coreTitle')}</h2>
              <ul>
                <li>{t('about.core1')}</li>
                <li>{t('about.core2')}</li>
                <li>{t('about.core3')}</li>
                <li>{t('about.core4')}</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
