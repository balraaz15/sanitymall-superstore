import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../Components";
import { useStateContext } from "../../context/StateContext";
import { client, urlFor } from "../../lib/client";

const ProductDetail = ({
  product,
  products,
}: any) => {
  const { name, image, details, price } = product;
  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, setQty, checkInCart, addToCart }: any = useStateContext();

  useEffect(() => {
    setQty(1);
  }, [setQty, name])

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image.length && image[index])}
              alt={name}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item: any, i: number) => (
              <img
                key={i}
                src={urlFor(item)}
                alt={name + i}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>20</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price * qty}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />{" "}
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />{" "}
              </span>
            </p>
          </div>

          <div className="buttons">
            {checkInCart ? (
              <button type="button" className="add-to-cart" onClick={() => addToCart(product, qty)}>
                Add To Cart
              </button>
            ) : (
              <button type="button" className="add-to-cart">
                In Cart
              </button>
            )}
            <button type="button" className="buy-now">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You might also like:</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((item: any) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);
  const paths = products.map((product: any) => ({
    params: {
      slug: product?.slug?.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }: any) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetail;
