import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "gv0tt2kt",
  dataset: "production",
  apiVersion: "2022-12-28",
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
});

const builder: any = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
