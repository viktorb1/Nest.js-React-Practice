
import Image from "next/image";
import { usePathname, useParams } from 'next/navigation'
import { useState } from "react";
import constants from "@/constants"
// import { useEffect } from "react";
import { Product } from "@/models/product";
import Products from "./components/products";
import Details from "./components/details";

export default async function Code({params: {code}} : {params: {code: string}}) {
    // const params = useParams()
    let user = null;
    let products: Product[] = [];
    let quantities: { [product_id: number]: number; }[] = [];

    try {
      const data = await fetch(`${constants.endpoint}/links/${code}`)
      const jsonData = await data.json()
      user = jsonData.user;
      products = jsonData.products;
    } catch (e) {
      console.log("request failed")
      console.log(e)
    }


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
          <Products products={products} quantities={quantities}></Products>
        </ul>

      </div>
        <Details></Details>
    </div>
  </main></div>
  
  );
}
