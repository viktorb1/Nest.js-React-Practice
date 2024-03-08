"use client"

import Image from "next/image";
import { usePathname, useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import constants from "@/constants"
// import { useEffect } from "react";
import { Product } from "@/models/product";
import Products from "./components/products";
import Details from "./components/details";
import { User } from "@/models/user";

export default function Code({params: {code}} : {params: {code: string}}) {
    // const params = useParams()
    const [user, setUser] = useState<User|null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<{ [product_id: number]: number; }>([]);

    useEffect(() => {
      (
        async () => {
          try {
            console.log()
            const data = await fetch(`${constants.endpoint}/links/${code}`, {method: 'GET', mode: 'cors'})
            const jsonData = await data.json()
            console.log(jsonData)
            setUser(jsonData.user);
            setProducts(jsonData.products) 
          } catch (e) {
            console.log("request failed")
            console.log(e)
          }
        }

      )();
    }, [code])



  return (
<div className="container">
  <main>
    <div className="py-5 text-center">
      <h2>Welcome</h2>
      <p className="lead">{user?.first_name} {user?.last_name} has invited you to buy these products!</p>
    </div>
    <div className="row g-5">
      <div className="col-md-5 col-lg-4 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Products</span>
          <span className="badge bg-primary rounded-pill">{products.length}</span>
        </h4>
        <ul className="list-group mb-3">
          <Products products={products} quantities={quantities} setQuantities={setQuantities}></Products>
        </ul>

      </div>
        <Details quantities={quantities} code={code}></Details>
    </div>
  </main></div>
  
  );
}
