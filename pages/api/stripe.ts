import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2020-08-27",
  typescript: true,
});

console.log("Stripe::", stripe);

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const params: any = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1MNAMpGcsOxxKWBFaKCqMp5b" },
          { shipping_rate: "shr_1MNAONGcsOxxKWBF8pA2CUBq" },
          { shipping_rate: "shr_1MNANSGcsOxxKWBFZe69qyHh" },
        ],
        line_items: req?.body?.cartItems?.map((item: any) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/gv0tt2kt/production/"
            )
            .replace("-jpg", ".jpg");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item?.quantity || 1,
          };
        }),
        success_url: `${req.headers.origin}/payment_success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
