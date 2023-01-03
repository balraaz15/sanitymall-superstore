import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'

const Product = ({ product: {image, name, slug, price} }: any) => {
  console.log("Image: ", image);
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img src={urlFor(image.length && image[0])} alt={name} width={250} height={250} className="product-image" />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product