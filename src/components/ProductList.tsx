"use client"

import { getProducts } from "@/app/action"
import { useQuery } from "@tanstack/react-query"
import ProductCard from "./product/ProductCard"

export default function ProductList(){
    const  {data, error, isFetched} = useQuery({
        queryKey: ["product"], queryFn: getProducts
    })
  
   

    if(error) {
        <h2>{error.message}</h2>
    }
   
    return (
        data?.map(product => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))
    )
}


