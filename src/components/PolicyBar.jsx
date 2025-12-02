import React from 'react';
import "../styles/components/PolicyBar.scss";
import { FaCar, FaSyncAlt, FaHeadset } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const PolicyBar = () => {
  const { t } = useTranslation();

  const policies = [
    {
      icon: FaCar,
      line1: t('policyBar.freeShipping'),
    },
    {
      icon: FaSyncAlt,
      line1: t('policyBar.return7Days'),
    },
    {
      icon: FaHeadset,
      line1: t('policyBar.experienceInStore'),
    },
  ];

  return (
    <div className="policy-bar-container">
      {policies.map((policy, index) => {
        const Icon = policy.icon;

        return (
          <div key={index} className="policy-item">
            <div className="policy-icon">
              <Icon />
            </div>
            <div className="policy-text">
              <span className="text-line1">{policy.line1}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PolicyBar;
