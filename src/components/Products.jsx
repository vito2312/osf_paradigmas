import React from "react";
import styles from "../styles/products.module.css";

const ProductsPage = ({ products }) => {
  return (
    <div className={styles.container}>
      <h1>Productos</h1>
      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
