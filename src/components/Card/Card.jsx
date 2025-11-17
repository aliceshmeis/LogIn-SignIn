import React from 'react';
import styles from './Card.module.scss';

const Card = ({ 
  children, 
  title,
  subtitle,
  variant = 'default',
  padding = 'medium',
  shadow = true,
  className = '',
  ...props 
}) => {
  const cardClass = `
    ${styles.card} 
    ${styles[variant]} 
    ${styles[`padding-${padding}`]} 
    ${shadow ? styles.shadow : ''}
    ${className}
  `.trim();

  return (
    <div className={cardClass} {...props}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Card;