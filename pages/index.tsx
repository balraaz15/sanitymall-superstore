import React from "react";
import { Footer, FooterBanner, HeroBanner, Product } from "../Components";
import { client } from "../lib/client";


const Home = ({ products, bannerData }: any) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {console.log(bannerData, products)}
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product: any) => <Product key={product?._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {products, bannerData}
  }
}

export default Home;
