import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }: any) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.discount}</h1>
        <img
          src={urlFor(heroBanner.image)}
          alt="Camera"
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>{heroBanner.desc}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
