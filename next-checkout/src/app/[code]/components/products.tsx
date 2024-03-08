"use client";

import { Product } from "@/models/product";
import React, { useEffect, useState } from "react";

const Products = ({
  products,
  quantities,
  setQuantities,
}: {
  products: Product[];
  quantities: { [product_id: number]: number };
  setQuantities: (q: { [product_id: number]: number }) => void;
}) => {
  useEffect(() => {
    setQuantities(
      products.reduce((acc, p) => {
        acc[p.id] = 0;
        return acc;
      }, {} as { [product_id: number]: number })
    );
  }, [products, setQuantities]);

  const change = (id: number, quantity: number) => {
    setQuantities({
        ...quantities,
        [id]: quantity,
    });
  };
  

  const total = () => {
    return Object.keys(quantities).reduce((s, productId) => {
      const product = products.find((p) => p.id === Number(productId));
      const quantity = quantities[Number(productId)];

      if (product && !isNaN(quantity)) {
        return s + product.price * quantity;
      }

      return s;
    }, 0);
  };

  return (
    <>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">{product.title}</h6>
                <small className="text-body-secondary">
                  {product.description}
                </small>
              </div>
              <span className="text-body-secondary">${product.price}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm items-center flex">
              <div>
                <h6 className="my-0">Quantity</h6>
              </div>
              <input
                type="number"
                defaultValue={0}
                min="0"
                className="text-body-secondary form-control"
                style={{ width: "65px" }}
                onChange={(e) => change(product.id, parseInt(e.target.value))}
              />
            </li>
          </div>
        );
      })}
      <li className="list-group-item d-flex justify-content-between">
        <span>Total (USD)</span>
        <strong>${total()}</strong>
      </li>
    </>
  );
};

export default Products;
