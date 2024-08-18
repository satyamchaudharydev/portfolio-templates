"use client"

import {  getCart, getProducts } from "@/app/action"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import ProductCard from "./product/ProductCard"
// import ProductCard from "./product/ProductCard"

export default function ProductList(){
    const  {data, error, isFetched} = useQuery({
        queryKey: ["product"], queryFn: getProducts
    })
    const  {data: cartData} = useQuery({
        queryKey: ["cartAll"], queryFn: getCart
    })
    const client = useQueryClient()
    client.setQueryData(["cartData"], cartData)
    console.log(cartData, "Cart data", data)

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


