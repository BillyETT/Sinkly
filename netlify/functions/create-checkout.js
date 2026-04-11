const Stripe = require('stripe');

// ── Authoritative price catalog (server-side) ──────────────────────────────
// Prices in CAD cents. salePrice = null means no sale.
const PRODUCT_CATALOG = {
  // Bathroom Sinks
  'bs-10001': { name: 'Modern Square Vessel Sink',             price: 27900, salePrice: 22300 },
  'bs-10002': { name: 'Round Vessel Basin',                    price: 29900, salePrice: null  },
  'bs-6050':  { name: 'Oval Vessel Bowl Sink',                 price: 24900, salePrice: null  },
  'bs-1310':  { name: 'Classic Oval Undermount Sink',          price: 21900, salePrice: null  },
  'bs-1714':  { name: 'Elongated Oval Undermount Sink',        price: 25900, salePrice: null  },
  'bs-1611':  { name: 'Compact Rectangular Undermount Sink',   price: 18900, salePrice: null  },
  'bs-1612':  { name: 'Slim Rectangular Undermount Sink',      price: 20900, salePrice: null  },
  'bs-1813':  { name: 'Standard Rectangular Undermount Sink',  price: 22900, salePrice: null  },
  'bs-1812':  { name: 'Deep Rectangular Undermount Sink',      price: 23900, salePrice: null  },
  'bs-1011':  { name: 'Oval Self-Rimming Drop-In Sink',        price: 19900, salePrice: null  },
  // Kitchen Sinks
  'ks-s4105':       { name: 'Farmhouse Apron-Front Sink',        price: 54900, salePrice: null  },
  'ks-s3219':       { name: 'Single Bowl Undermount Sink',        price: 44900, salePrice: 35900 },
  'ks-s2318':       { name: 'Compact Single Bowl Sink',           price: 29900, salePrice: null  },
  'ks-s2903':       { name: 'Extra-Deep Single Bowl Sink',        price: 32900, salePrice: null  },
  'ks-ss3018':      { name: 'Single Bowl Sink — 30 Inch',         price: 34900, salePrice: null  },
  'ks-ss3218':      { name: 'Single Bowl Sink — 32 Inch',         price: 36900, salePrice: null  },
  'ks-d3219':       { name: 'Double Bowl Undermount Sink',        price: 49900, salePrice: null  },
  'ks-td3120':      { name: 'Double Bowl Drop-In Sink',           price: 46900, salePrice: null  },
  'ks-d2918':       { name: 'Double Bowl Sink — 29 Inch',         price: 39900, salePrice: null  },
  'ks-d3018':       { name: 'Equal Double Bowl Sink',             price: 41900, salePrice: null  },
  'ks-d3118':       { name: 'Double Bowl Sink — 31 Inch',         price: 42900, salePrice: null  },
  'ks-d3240':       { name: 'Large Double Bowl Sink',             price: 44900, salePrice: null  },
  'ks-d3260':       { name: 'Oversized Double Bowl Sink',         price: 47900, salePrice: null  },
  'ks-workstation': { name: 'Workstation Kitchen Sink',           price: 64900, salePrice: 51900 },
  // Kitchen Faucets
  'kf-40001': { name: 'Gooseneck Pull-Down Kitchen Faucet',    price: 19900, salePrice: null },
  'kf-40002': { name: 'Commercial Spring Kitchen Faucet',      price: 34900, salePrice: null },
  'kf-40003': { name: 'L-Shape Single Handle Kitchen Faucet',  price: 22900, salePrice: null },
  'kf-40004': { name: 'Tall Slim Kitchen Faucet',              price: 18900, salePrice: null },
  'kf-40005': { name: 'Modern Pull-Down Kitchen Faucet',       price: 18900, salePrice: null },
  'kf-40006': { name: 'Pull-Down Faucet with Deck Cover',      price: 20900, salePrice: null },
  'kf-40007': { name: 'Matte Black Pull-Down Faucet',          price: 21900, salePrice: null },
  'kf-40008': { name: 'Square Handle Pull-Down Faucet',        price: 19900, salePrice: null },
  'kf-40009': { name: 'Single Handle Pull-Down Faucet',        price: 17900, salePrice: null },
  'kf-40010': { name: 'Compact Pull-Down Kitchen Faucet',      price: 16900, salePrice: null },
  // Bathroom Faucets
  'bf-30001': { name: 'Pull-Out Bathroom Faucet',              price: 14900, salePrice: null  },
  'bf-30002': { name: 'Waterfall Single-Handle Faucet',        price: 17900, salePrice: null  },
  'bf-30003': { name: 'Sleek Basin Faucet',                    price: 13900, salePrice: null  },
  'bf-30004': { name: 'Round Base Basin Faucet',               price: 13900, salePrice: null  },
  'bf-30005': { name: 'Tall Vessel Faucet',                    price: 15900, salePrice: null  },
  'bf-30006': { name: 'Brass Single-Handle Faucet',            price: 16900, salePrice: null  },
  'bf-30007': { name: 'Wall-Mount Bathroom Faucet',            price: 25900, salePrice: null  },
  'bf-30008': { name: 'Modern Single-Handle Faucet',           price: 14900, salePrice: null  },
  'bf-30009': { name: 'Minimalist Basin Faucet',               price: 14900, salePrice: null  },
  'bf-30010': { name: 'Deck-Plate Vessel Faucet',              price: 18900, salePrice: null  },
  'bf-30011': { name: 'Curved Spout Faucet',                   price: 14900, salePrice: null  },
  'bf-30012': { name: 'Contemporary Basin Faucet',             price: 14900, salePrice: null  },
  'bf-30013': { name: 'Centerset Single-Handle Faucet',        price: 16900, salePrice: null  },
  'bf-30014': { name: 'Touchless Motion Sensor Faucet',        price: 29900, salePrice: null  },
  'bf-30015': { name: 'Angular Single-Handle Faucet',          price: 14900, salePrice: null  },
  'bf-30016': { name: 'Arc Vessel Faucet',                     price: 17900, salePrice: null  },
  'bf-30017': { name: 'Widespread Two-Handle Faucet',          price: 24900, salePrice: 19900 },
};

const FREE_SHIPPING_THRESHOLD = 30000; // $300.00 CAD in cents
const SHIPPING_COST            =  1500; // $15.00 CAD in cents

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const { items } = body;
  if (!Array.isArray(items) || items.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Cart is empty' }) };
  }

  // Build line items using server-side prices (client cannot manipulate these)
  const lineItems = [];
  let subtotalCents = 0;

  for (const item of items) {
    const product = PRODUCT_CATALOG[item.productId];
    if (!product) continue;

    const unitAmount = product.salePrice ?? product.price;
    subtotalCents += unitAmount * item.qty;

    lineItems.push({
      price_data: {
        currency: 'cad',
        product_data: {
          name: product.name,
          ...(item.variantColor ? { description: item.variantColor } : {}),
        },
        unit_amount: unitAmount,
      },
      quantity: item.qty,
    });
  }

  if (lineItems.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'No valid products in cart' }) };
  }

  // Add shipping as a line item if below free threshold
  if (subtotalCents < FREE_SHIPPING_THRESHOLD) {
    lineItems.push({
      price_data: {
        currency: 'cad',
        product_data: { name: 'Shipping — Canada-wide' },
        unit_amount: SHIPPING_COST,
      },
      quantity: 1,
    });
  }

  const origin = event.headers.origin || event.headers.referer || 'https://sinkly.ca';
  const base   = origin.replace(/\/$/, '');

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${base}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${base}/cart.html`,
      shipping_address_collection: {
        allowed_countries: ['CA'],
      },
      metadata: {
        source: 'sinkly.ca',
      },
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Stripe error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Payment session could not be created. Please try again.' }),
    };
  }
};
