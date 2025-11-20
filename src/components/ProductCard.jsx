import React from 'react';
import styles from './ProductCard.module.scss';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image || 'https://via.placeholder.com/300x200?text=Product'} 
          alt={product.name}
          className={styles.image}
        />
        {product.badge && (
          <span className={styles.badge}>{product.badge}</span>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        
        <div className={styles.details}>
          <div className={styles.category}>
            <span className={styles.categoryIcon}>📦</span>
            {product.category}
          </div>
          {product.stock && (
            <div className={styles.stock}>
              <span className={styles.stockDot}></span>
              {product.stock} in stock
            </div>
          )}
        </div>
        
        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.priceLabel}>Price</span>
            <span className={styles.priceValue}>${product.price}</span>
          </div>
          <button 
            className={styles.addButton}
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;