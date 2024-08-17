"use client"

import {  getProducts } from "@/app/action"
import { useQuery } from "@tanstack/react-query"
import ProductCard from "./product/ProductCard"
import { getCart } from "@/db/services/cart"

export default function ProductList(){
    const  {data, error, isFetched} = useQuery({
        queryKey: ["product"], queryFn: getProducts
    })

   
    if(error) {
        <h2>{error.message}</h2>
    }
    if(!data) return null
    return (
        data.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          ))
    )
}


