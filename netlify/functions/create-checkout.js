const Stripe = require('stripe');

// ── Authoritative price catalog (server-side, CAD cents) ──────────────────
const PRODUCT_CATALOG = {
  // Bathroom Sinks
  'bs-10001': { name: 'Modern Square Vessel Sink',             price: 11100, salePrice:  8900 },
  'bs-10002': { name: 'Round Vessel Basin',                    price:  9900, salePrice:  null },
  'bs-6050':  { name: 'Oval Vessel Bowl Sink',                 price:  8500, salePrice:  null },
  'bs-1310':  { name: 'Classic Oval Undermount Sink',          price:  6900, salePrice:  null },
  'bs-1714':  { name: 'Elongated Oval Undermount Sink',        price:  6900, salePrice:  null },
  'bs-1611':  { name: 'Compact Rectangular Undermount Sink',   price:  7400, salePrice:  null },
  'bs-1612':  { name: 'Slim Rectangular Undermount Sink',      price:  7400, salePrice:  null },
  'bs-1813':  { name: 'Standard Rectangular Undermount Sink',  price:  7400, salePrice:  null },
  'bs-1812':  { name: 'Deep Rectangular Undermount Sink',      price:  7400, salePrice:  null },
  'bs-1011':  { name: 'Oval Self-Rimming Drop-In Sink',        price:  7900, salePrice:  null },
  // Kitchen Sinks
  'ks-s4105':       { name: 'Farmhouse Apron-Front Sink',      price: 27900, salePrice:  null  },
  'ks-s3219':       { name: 'Single Bowl Undermount Sink',      price: 24900, salePrice: 19900  },
  'ks-s2318':       { name: 'Compact Single Bowl Sink',         price: 16900, salePrice:  null  },
  'ks-s2903':       { name: 'Extra-Deep Single Bowl Sink',      price: 16900, salePrice:  null  },
  'ks-ss3018':      { name: 'Single Bowl Sink — 30 Inch',       price: 19900, salePrice:  null  },
  'ks-ss3218':      { name: 'Single Bowl Sink — 32 Inch',       price: 19900, salePrice:  null  },
  'ks-d3219':       { name: 'Double Bowl Undermount Sink',      price: 22900, salePrice:  null  },
  'ks-td3120':      { name: 'Double Bowl Drop-In Sink',         price: 22900, salePrice:  null  },
  'ks-d2918':       { name: 'Double Bowl Sink — 29 Inch',       price: 21000, salePrice:  null  },
  'ks-d3018':       { name: 'Equal Double Bowl Sink',           price: 21000, salePrice:  null  },
  'ks-d3118':       { name: 'Double Bowl Sink — 31 Inch',       price: 21000, salePrice:  null  },
  'ks-d3240':       { name: 'Large Double Bowl Sink',           price: 21000, salePrice:  null  },
  'ks-d3260':       { name: 'Oversized Double Bowl Sink',       price: 21000, salePrice:  null  },
  'ks-workstation': { name: 'Workstation Kitchen Sink',         price: 41100, salePrice: 32900  },
  // Integrated Stone Sinks
  'is-24': { name: 'Integrated Stone Sink — 24"', price:  85000, salePrice: null },
  'is-30': { name: 'Integrated Stone Sink — 30"', price:  96500, salePrice: null },
  'is-36': { name: 'Integrated Stone Sink — 36"', price: 105500, salePrice: null },
  'is-42': { name: 'Integrated Stone Sink — 42"', price: 114200, salePrice: null },
  'is-48': { name: 'Integrated Stone Sink — 48"', price: 119000, salePrice: null },
  'is-54': { name: 'Integrated Stone Sink — 54"', price: 123500, salePrice: null },
  'is-60': { name: 'Integrated Stone Sink — 60"', price: 135000, salePrice: null },
  'is-72': { name: 'Integrated Stone Sink — 72"', price: 149000, salePrice: null },
  // Kitchen Faucets
  'kf-40001': { name: 'Gooseneck Pull-Down Kitchen Faucet',    price:  8900, salePrice: null },
  'kf-40002': { name: 'Commercial Spring Kitchen Faucet',      price:  9900, salePrice: null },
  'kf-40003': { name: 'L-Shape Single Handle Kitchen Faucet',  price:  7400, salePrice: null },
  'kf-40004': { name: 'Tall Slim Kitchen Faucet',              price:  7900, salePrice: null },
  'kf-40005': { name: 'Modern Pull-Down Kitchen Faucet',       price:  7900, salePrice: null },
  'kf-40006': { name: 'Pull-Down Faucet with Deck Cover',      price:  6900, salePrice: null },
  'kf-40007': { name: 'Matte Black Pull-Down Faucet',          price:  8000, salePrice: null },
  'kf-40008': { name: 'Square Handle Pull-Down Faucet',        price:  8500, salePrice: null },
  'kf-40009': { name: 'Single Handle Pull-Down Faucet',        price:  7500, salePrice: null },
  'kf-40010': { name: 'Compact Pull-Down Kitchen Faucet',      price:  9000, salePrice: null },
  // Bathroom Faucets
  'bf-30001': { name: 'Pull-Out Bathroom Faucet',              price:  6900, salePrice: null },
  'bf-30002': { name: 'Waterfall Single-Handle Faucet',        price:  6500, salePrice: null },
  'bf-30003': { name: 'Sleek Basin Faucet',                    price:  4900, salePrice: null },
  'bf-30004': { name: 'Round Base Basin Faucet',               price:  4900, salePrice: null },
  'bf-30005': { name: 'Tall Vessel Faucet',                    price:  5900, salePrice: null },
  'bf-30006': { name: 'Brass Single-Handle Faucet',            price:  6500, salePrice: null },
  'bf-30007': { name: 'Wall-Mount Bathroom Faucet',            price:  7900, salePrice: null },
  'bf-30008': { name: 'Modern Single-Handle Faucet',           price:  4900, salePrice: null },
  'bf-30009': { name: 'Minimalist Basin Faucet',               price:  4900, salePrice: null },
  'bf-30010': { name: 'Deck-Plate Vessel Faucet',              price:  6500, salePrice: null },
  'bf-30011': { name: 'Curved Spout Faucet',                   price:  4900, salePrice: null },
  'bf-30012': { name: 'Contemporary Basin Faucet',             price:  4900, salePrice: null },
  'bf-30013': { name: 'Centerset Single-Handle Faucet',        price:  6500, salePrice: null },
  'bf-30014': { name: 'Touchless Motion Sensor Faucet',        price:  7900, salePrice: null },
  'bf-30015': { name: 'Angular Single-Handle Faucet',          price:  4900, salePrice: null },
  'bf-30016': { name: 'Arc Vessel Faucet',                     price:  6500, salePrice: null },
  'bf-30017': { name: 'Widespread Two-Handle Faucet',          price:  9000, salePrice: 6000 },
};

// ── Per-variant price overrides (SKU → CAD cents) ─────────────────────────
const VARIANT_PRICES = {
  'SINKLYSS3219':  { price: 19900, salePrice: null  },
  'SINKLYGS3219':  { price: 22000, salePrice: null  },
  'SINKLYBS3219':  { price: 24900, salePrice: 19900 },
  'SINKLYSD3219':  { price: 21000, salePrice: null  },
  'SINKLYGD3219':  { price: 22900, salePrice: null  },
  'SINKLYBD3219':  { price: 22900, salePrice: null  },
  'SINKLYSTD3120': { price: 21000, salePrice: null  },
  'SINKLYGTD3120': { price: 22900, salePrice: null  },
  'SINKLYBTD3120': { price: 22900, salePrice: null  },
  'SINKLYS20001':  { price: 31000, salePrice: null  },
  'SINKLYG20002':  { price: 41100, salePrice: 32900 },
  'SINKLYB20003':  { price: 32900, salePrice: null  },
};

// ── Shipping rates (CAD cents, server-side authoritative) ──────────────────
const SINK_SHIPPING_RATES = {
  gta:     { standard: 2500,  express: 6000  },
  ontario: { standard: 4900,  express: 9900  },
  canada:  { standard: 7900,  express: 14900 },
};
const FAUCET_SHIPPING_RATES = {
  gta:     { standard: 1200,  express: 2200  },
  ontario: { standard: 1600,  express: 3200  },
  canada:  { standard: 2200,  express: 4500  },
};
const FREE_SHIP_THRESHOLD = 50000; // $500 CAD

function calcShippingCents(subtotal, fulfillment, region, express, hasSink) {
  if (fulfillment === 'pickup') return 0;
  const table = hasSink ? SINK_SHIPPING_RATES : FAUCET_SHIPPING_RATES;
  const rates = table[region] || table.canada;
  if (express) return rates.express;
  if (subtotal >= FREE_SHIP_THRESHOLD) return 0;
  return rates.standard;
}

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

  const { items, fulfillment = 'delivery', region = 'canada', express = false, phone = '' } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Cart is empty' }) };
  }

  // Build line items using server-side prices
  const lineItems = [];
  let subtotalCents = 0;

  for (const item of items) {
    const product = PRODUCT_CATALOG[item.productId];
    if (!product) continue;

    const variantPricing = item.variantSku ? VARIANT_PRICES[item.variantSku] : null;
    const pricing        = variantPricing || product;
    const unitAmount     = pricing.salePrice ?? pricing.price;
    subtotalCents += unitAmount * item.qty;

    const descriptionParts = [];
    if (item.integratedDescription) descriptionParts.push(item.integratedDescription);
    else if (item.variantColor) descriptionParts.push(item.variantColor);

    lineItems.push({
      price_data: {
        currency: 'cad',
        product_data: {
          name: product.name,
          ...(descriptionParts.length ? { description: descriptionParts.join(' · ') } : {}),
        },
        unit_amount: unitAmount,
      },
      quantity: item.qty,
    });
  }

  if (lineItems.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'No valid products in cart' }) };
  }

  // Integrated sink delivery — $350 flat GTA fee
  const hasIntegratedDelivery = items.some(i => i.isIntegrated && i.integratedDelivery === 'delivery');
  if (hasIntegratedDelivery) {
    lineItems.push({
      price_data: {
        currency: 'cad',
        product_data: { name: 'Integrated Sink Delivery — GTA' },
        unit_amount: 35000,
      },
      quantity: 1,
    });
  }

  // Add shipping line item for regular products (server-side validated)
  const safeRegion    = SINK_SHIPPING_RATES[region] ? region : 'canada';
  const hasSink       = items.some(i => !i.isIntegrated && i.productId && (i.productId.startsWith('ks-') || i.productId.startsWith('bs-')));
  const hasRegularItems = items.some(i => !i.isIntegrated);
  const shippingCents = hasRegularItems ? calcShippingCents(subtotalCents, fulfillment, safeRegion, express, hasSink) : 0;

  if (shippingCents > 0) {
    const regionLabels = { gta: 'GTA — Local Delivery', ontario: 'Ontario', canada: 'Canada-wide' };
    const speedLabel   = express ? 'Express (2–3 business days)' : 'Standard (4–10 business days)';
    const shippingName = fulfillment === 'pickup'
      ? 'Pickup'
      : `Shipping — ${regionLabels[safeRegion]} · ${speedLabel}`;

    lineItems.push({
      price_data: {
        currency: 'cad',
        product_data: { name: shippingName },
        unit_amount: shippingCents,
      },
      quantity: 1,
    });
  }

  // Build metadata for Stripe dashboard
  const metadata = {
    source: 'sinkly.ca',
    fulfillment,
  };

  if (fulfillment === 'pickup') {
    metadata.pickup_phone  = phone || 'not provided';
    metadata.pickup_note   = 'Customer will pick up — notify via text when ready';
  } else {
    metadata.delivery_region  = safeRegion;
    metadata.delivery_speed   = express ? 'express' : 'standard';
    metadata.shipping_cost    = `$${(shippingCents / 100).toFixed(2)} CAD`;
    metadata.free_shipping    = shippingCents === 0 ? 'yes' : 'no';
  }

  const origin = event.headers.origin || event.headers.referer || 'https://sinkly.ca';
  const base   = origin.replace(/\/$/, '');

  try {
    const sessionParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${base}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${base}/cart.html`,
      metadata,
    };

    // Only collect shipping address for delivery orders
    if (fulfillment !== 'pickup') {
      sessionParams.shipping_address_collection = { allowed_countries: ['CA'] };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

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
