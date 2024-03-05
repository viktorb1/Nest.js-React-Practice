import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Products from './Products'
import { Product } from '../models/product'
import axios from 'axios'

const ProductsBackend = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get('products/backend')
        setProducts(data.data)
      }
    )();
  }, [])
  
  return (
    <Layout>
      <Products products={products} />
    </Layout>
  )
}

export default ProductsBackend