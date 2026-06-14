// ============================================
//  SINKLY — Main Script
// ============================================

// ── STICKY HEADER ───────────────────────────
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ── MOBILE NAV TOGGLE ───────────────────────
const navToggle = document.getElementById('navToggle');
const mobileNav  = document.getElementById('mobileNav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    const [s1, s2, s3] = navToggle.querySelectorAll('span');
    if (isOpen) {
      s1.style.transform = 'translateY(6.5px) rotate(45deg)';
      s2.style.opacity   = '0';
      s3.style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      [s1, s2, s3].forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// ── HEADER DOM CLEANUP ──────────────────────
// Remove account button, simplify CAD, wire cart to cart.html
document.addEventListener('DOMContentLoaded', () => {

  // Remove account button
  const accountBtn = document.querySelector('.icon-btn[aria-label="Account"]');
  if (accountBtn) accountBtn.remove();

  // Replace region dropdown with plain CAD text
  const regionBtn = document.querySelector('.region-btn');
  if (regionBtn) {
    const label = document.createElement('span');
    label.className = 'region-label';
    label.textContent = '$ CAD';
    regionBtn.replaceWith(label);
  }

  // Wire cart button → cart.html
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.style.cursor = 'pointer';
    cartBtn.addEventListener('click', () => { window.location.href = 'cart.html'; });
  }

  // Update cart badge from localStorage
  updateCartBadge();

  // Init search overlay
  initSearch();

  // If on cart page, render cart
  if (document.getElementById('cart-items-container')) {
    renderCartPage();
  }
});

// Re-render cart when user navigates back from Stripe (bfcache restore)
window.addEventListener('pageshow', (e) => {
  if (e.persisted && document.getElementById('cart-items-container')) {
    renderCartPage();
  }
});

// ── CART SYSTEM ─────────────────────────────

const CART_KEY = 'sinkly_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// addToCart(productId, variantIdx)
// Cart item: { cartKey, productId, variantIdx, qty }
// cartKey = variant SKU (e.g. 'SINKLYGD3219') — guarantees Gold ≠ Silver in cart
function addIntegratedSinkToCart(sizeId, sizeLabel, slab, bowlType, price, deliveryType) {
  const cartKey = sizeId + '-' + Date.now();
  const cart = getCart();
  cart.push({
    cartKey,
    productId: sizeId,
    variantIdx: 0,
    qty: 1,
    _isIntegrated: true,
    _slab: slab,
    _bowlType: bowlType,
    _size: sizeLabel,
    _price: price,
    _name: 'Integrated Stone Sink — ' + sizeLabel,
    _integratedDelivery: deliveryType,
  });
  saveCart(cart);
  showCartToast('Integrated Stone Sink — ' + sizeLabel);
}

function addToCart(productId, variantIdx) {
  variantIdx = (variantIdx === undefined || variantIdx === null) ? 0 : parseInt(variantIdx, 10);
  if (!productId || typeof SINKLY_PRODUCTS === 'undefined') return;
  const product = SINKLY_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const variant  = product.variants ? product.variants[variantIdx] : null;
  const cartKey  = variant ? variant.sku : productId;

  const cart     = getCart();
  const existing = cart.find(item => item.cartKey === cartKey);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ cartKey, productId, variantIdx, qty: 1 });
  }
  saveCart(cart);

  const label = variant && product.variants.length > 1
    ? `${product.name} — ${variant.color}`
    : product.name;
  showCartToast(label);
}

function removeFromCart(cartKey) {
  saveCart(getCart().filter(item => (item.cartKey || item.id) !== cartKey));
}

function setQty(cartKey, qty) {
  const cart = getCart();
  const item = cart.find(i => (i.cartKey || i.id) === cartKey);
  if (!item) return;
  if (qty < 1) { removeFromCart(cartKey); return; }
  item.qty = qty;
  saveCart(cart);
}

function getVariantEffectivePrice(p, variantIdx) {
  const v = p.variants?.[variantIdx ?? 0];
  if (v && 'price' in v) return 'salePrice' in v ? (v.salePrice ?? v.price) : v.price;
  return p.salePrice ?? p.price;
}

function getCartTotal() {
  if (typeof SINKLY_PRODUCTS === 'undefined') return 0;
  return getCart().reduce((sum, item) => {
    const pid = item.productId || item.id;
    const p   = SINKLY_PRODUCTS.find(x => x.id === pid);
    if (!p) return sum + ((item._price || 0) * item.qty);
    return sum + getVariantEffectivePrice(p, item.variantIdx ?? 0) * item.qty;
  }, 0);
}

function updateCartBadge() {
  const badge = document.querySelector('.cart-count');
  if (!badge) return;
  const total = getCart().reduce((sum, i) => sum + i.qty, 0);
  badge.textContent = total;
  badge.style.display = total === 0 ? 'none' : 'flex';
}

// Toast notification on add to cart
function showCartToast(name) {
  let toast = document.getElementById('cart-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = `"${name}" added to cart`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── ADD TO CART — event delegation ──────────
// Works on any page: reads product info from card DOM
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn--small, .btn--add-cart');
  if (!btn) return;
  const card = btn.closest('[data-product-id]');
  if (card) {
    const variantIdx = parseInt(card.dataset.variantIdx || '0', 10);
    addToCart(card.dataset.productId, variantIdx);
    return;
  }
});

// ── SHIPPING STATE ───────────────────────────
let cartFulfillment = 'delivery';
let cartRegion      = 'gta';
let cartExpress     = false;
let cartPhone       = '';

const SHIPPING_RATES = {
  gta:     { standard: 25,  express: 60  },
  ontario: { standard: 49,  express: 99  },
  canada:  { standard: 79,  express: 149 },
};
const FAUCET_SHIPPING_RATES = {
  gta:     { standard: 12,  express: 22  },
  ontario: { standard: 16,  express: 32  },
  canada:  { standard: 22,  express: 45  },
};
const FREE_SHIP_THRESHOLD = 500;

function cartHasSink() {
  if (typeof SINKLY_PRODUCTS === 'undefined') return false;
  return getCart().some(item => {
    const pid = item.productId || item.id;
    return pid.startsWith('ks-') || pid.startsWith('bs-');
  });
}

function getActiveRates() {
  return cartHasSink() ? SHIPPING_RATES[cartRegion] : FAUCET_SHIPPING_RATES[cartRegion];
}

function getShippingFee(subtotal) {
  if (cartFulfillment === 'pickup') return 0;
  const rates = getActiveRates();
  if (cartExpress) return rates.express;
  if (subtotal >= FREE_SHIP_THRESHOLD) return 0;
  return rates.standard;
}

// ── CART PAGE RENDERER ───────────────────────
function renderCartPage() {
  const container = document.getElementById('cart-items-container');
  const summaryEl = document.getElementById('cart-summary');
  const emptyEl   = document.getElementById('cart-empty');
  const cart = getCart();

  if (cart.length === 0) {
    container.style.display = 'none';
    summaryEl.style.display = 'none';
    emptyEl.style.display   = 'block';
    return;
  }

  emptyEl.style.display = 'none';
  container.style.display = 'block';
  summaryEl.style.display = 'block';

  container.innerHTML = cart.map(item => {
    const key      = item.cartKey || item.id;
    const pid      = item.productId || item.id;
    const p        = typeof SINKLY_PRODUCTS !== 'undefined' ? SINKLY_PRODUCTS.find(x => x.id === pid) : null;
    const variant  = p && p.variants ? p.variants[item.variantIdx ?? 0] : null;
    const name     = item._name || (p ? p.name : 'Product');
    const category = item._isIntegrated ? 'Integrated Sinks' : (p ? p.category : '');
    const color    = item._isIntegrated ? null : ((variant && p && p.variants.length > 1) ? variant.color : null);
    const sku      = item._isIntegrated ? null : (variant ? variant.sku : null);
    const imgSrc   = item._isIntegrated ? null : (variant && variant.images && variant.images[0] ? variant.images[0] : null);
    const price    = item._isIntegrated ? item._price : (p ? getVariantEffectivePrice(p, item.variantIdx ?? 0) : (item._price || 0));
    const subtotal = (price * item.qty).toFixed(2);
    const integratedDetails = item._isIntegrated
      ? `<p class="cart-item__sku">${item._slab} · ${item._bowlType} · ${item._integratedDelivery === 'pickup' ? 'Pickup' : 'GTA Delivery'}</p>`
      : '';

    return `
      <div class="cart-item" data-id="${key}">
        <div class="cart-item__img${imgSrc ? ' cart-item__img--photo' : ' placeholder-img'}">
          ${imgSrc ? `<img src="${imgSrc}" alt="${name}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;">` : ''}
        </div>
        <div class="cart-item__info">
          <p class="cart-item__category">${category}${color ? ` — ${color}` : ''}</p>
          <h4 class="cart-item__name">${name}</h4>
          ${integratedDetails}
          ${sku ? `<p class="cart-item__sku">SKU: ${sku}</p>` : ''}
          <p class="cart-item__price">$${price.toFixed(2)} CAD</p>
        </div>
        <div class="cart-item__controls">
          <button class="qty-btn" onclick="changeQty('${key}', -1)">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${key}', 1)">+</button>
        </div>
        <div class="cart-item__subtotal">$${subtotal}</div>
        <button class="cart-item__remove" onclick="removeItem('${key}')" aria-label="Remove">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `;
  }).join('');

  renderCartSummary();
}

function renderCartSummary() {
  const summaryEl = document.getElementById('cart-summary');
  if (!summaryEl) return;

  const cart = getCart();
  const hasIntegratedDelivery = cart.some(i => i._isIntegrated && i._integratedDelivery === 'delivery');
  const integratedDeliveryFee = hasIntegratedDelivery ? 350 : 0;
  const hasRegularItems = cart.some(i => !i._isIntegrated);

  const subtotal        = getCartTotal();
  const fee             = hasRegularItems ? getShippingFee(subtotal) : 0;
  const total           = subtotal + fee + integratedDeliveryFee;
  const isFreeStandard  = hasRegularItems && cartFulfillment === 'delivery' && !cartExpress && subtotal >= FREE_SHIP_THRESHOLD;

  const activeRates     = getActiveRates();
  const shippingDisplay = cartFulfillment === 'pickup'
    ? 'Free — Pickup'
    : isFreeStandard
      ? '<span class="free-ship">Free</span>'
      : `$${fee.toFixed(2)} CAD`;

  let fulfillmentHtml = '';
  if (hasRegularItems) {
    const pickupOrDelivery = cartFulfillment === 'pickup'
      ? `<div class="pickup-section">
          <label class="pickup-label">Phone number — we'll text you when it's ready</label>
          <input type="tel" id="pickup-phone" class="pickup-phone" placeholder="e.g. 647-555-0123" value="${cartPhone}" oninput="cartPhone=this.value">
        </div>`
      : `<div class="delivery-section">
          <select id="delivery-region" class="delivery-select" onchange="setRegion(this.value)">
            <option value="gta"     ${cartRegion === 'gta'     ? 'selected' : ''}>GTA — Local Delivery</option>
            <option value="ontario" ${cartRegion === 'ontario' ? 'selected' : ''}>Ontario, outside GTA</option>
            <option value="canada"  ${cartRegion === 'canada'  ? 'selected' : ''}>Rest of Canada</option>
          </select>
          <div class="fulfillment-toggle" style="margin-top:8px;">
            <label class="fulfillment-opt${!cartExpress ? ' fulfillment-opt--active' : ''}">
              <input type="radio" name="speed" value="standard" ${!cartExpress ? 'checked' : ''} onchange="setExpress(false)">
              <div class="fulfillment-opt__text">
                <span class="fulfillment-opt__label">Standard</span>
                <span class="fulfillment-opt__sub">4–10 business days &middot; ${isFreeStandard ? 'Free' : '$' + activeRates.standard}</span>
              </div>
            </label>
            <label class="fulfillment-opt${cartExpress ? ' fulfillment-opt--active' : ''}">
              <input type="radio" name="speed" value="express" ${cartExpress ? 'checked' : ''} onchange="setExpress(true)">
              <div class="fulfillment-opt__text">
                <span class="fulfillment-opt__label">Express</span>
                <span class="fulfillment-opt__sub">2–3 business days &middot; $${activeRates.express} &middot; Full carrier rate</span>
              </div>
            </label>
          </div>
          ${isFreeStandard ? '<p class="ship-note ship-note--green">Free standard shipping applied!</p>' : (!cartExpress && subtotal < FREE_SHIP_THRESHOLD ? '<p class="ship-note">Add <strong>$' + (FREE_SHIP_THRESHOLD - subtotal).toFixed(2) + '</strong> more for free standard shipping</p>' : '')}
        </div>`;

    fulfillmentHtml = `
      <div class="fulfillment-toggle">
        <label class="fulfillment-opt${cartFulfillment === 'pickup' ? ' fulfillment-opt--active' : ''}">
          <input type="radio" name="fulfillment" value="pickup" ${cartFulfillment === 'pickup' ? 'checked' : ''} onchange="setFulfillment('pickup')">
          <div class="fulfillment-opt__text">
            <span class="fulfillment-opt__label">Pickup</span>
            <span class="fulfillment-opt__sub">Ready in 1–2 business days &middot; Free</span>
          </div>
        </label>
        <label class="fulfillment-opt${cartFulfillment === 'delivery' ? ' fulfillment-opt--active' : ''}">
          <input type="radio" name="fulfillment" value="delivery" ${cartFulfillment === 'delivery' ? 'checked' : ''} onchange="setFulfillment('delivery')">
          <div class="fulfillment-opt__text">
            <span class="fulfillment-opt__label">Delivery</span>
            <span class="fulfillment-opt__sub">Canada-wide shipping</span>
          </div>
        </label>
      </div>
      ${pickupOrDelivery}
      <div class="cart-summary__row"><span>Shipping</span><span>${shippingDisplay}</span></div>
    `;
  }

  summaryEl.innerHTML = `
    <div class="cart-summary__row"><span>Subtotal</span><span>$${subtotal.toFixed(2)} CAD</span></div>
    ${hasIntegratedDelivery ? '<div class="cart-summary__row"><span>Integrated Sink Delivery — GTA</span><span>$350.00 CAD</span></div>' : ''}
    ${fulfillmentHtml}
    <div class="cart-summary__row cart-summary__total"><span>Total</span><span>$${total.toFixed(2)} CAD</span></div>
    <button class="btn btn--primary" id="checkoutBtn" style="width:100%;text-align:center;margin-top:20px;">Proceed to Checkout</button>
    <p id="checkout-error" style="color:#c0392b;font-size:0.82rem;margin-top:10px;display:none;text-align:center;"></p>
    <a href="shop.html" class="cart-continue">← Continue Shopping</a>
  `;

  document.getElementById('checkoutBtn').addEventListener('click', startCheckout);
}

function setFulfillment(val) { cartFulfillment = val; renderCartSummary(); }
function setRegion(val)      { cartRegion = val;      renderCartSummary(); }
function setExpress(val)     { cartExpress = val;     renderCartSummary(); }

// ── STRIPE CHECKOUT ──────────────────────────
async function startCheckout() {
  const btn   = document.getElementById('checkoutBtn');
  const errEl = document.getElementById('checkout-error');
  if (!btn) return;

  if (cartFulfillment === 'pickup' && cartPhone.trim().length < 7) {
    if (errEl) { errEl.textContent = 'Please enter your phone number so we can notify you when your order is ready.'; errEl.style.display = 'block'; }
    document.getElementById('pickup-phone')?.focus();
    return;
  }

  btn.textContent = 'Redirecting…';
  btn.disabled = true;
  if (errEl) errEl.style.display = 'none';

  const cart = getCart();
  const items = cart.map(item => {
    const pid     = item.productId || item.id;
    const p       = typeof SINKLY_PRODUCTS !== 'undefined' ? SINKLY_PRODUCTS.find(x => x.id === pid) : null;
    const variant = p && p.variants ? p.variants[item.variantIdx ?? 0] : null;
    const base = {
      productId:    pid,
      variantIdx:   item.variantIdx ?? 0,
      variantColor: variant ? variant.color : null,
      variantSku:   variant ? variant.sku   : null,
      qty:          item.qty,
    };
    if (item._isIntegrated) {
      base.isIntegrated        = true;
      base.integratedDelivery  = item._integratedDelivery;
      base.integratedDescription = item._size + ' · ' + item._slab + ' · ' + item._bowlType;
    }
    return base;
  });

  try {
    const res = await fetch('/.netlify/functions/create-checkout', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ items, fulfillment: cartFulfillment, region: cartRegion, express: cartExpress, phone: cartPhone }),
    });

    const data = await res.json();

    if (!res.ok || !data.url) {
      throw new Error(data.error || 'Something went wrong. Please try again.');
    }

    window.location.href = data.url;
  } catch (err) {
    btn.textContent = 'Proceed to Checkout';
    btn.disabled    = false;
    if (errEl) {
      errEl.textContent = err.message;
      errEl.style.display = 'block';
    }
  }
}

// Cart page helpers (called from onclick in rendered HTML)
function changeQty(key, delta) {
  const cart = getCart();
  const item = cart.find(i => (i.cartKey || i.id) === key);
  if (!item) return;
  const newQty = item.qty + delta;
  if (newQty < 1) { removeItem(key); return; }
  item.qty = newQty;
  saveCart(cart);
  renderCartPage();
}

function removeItem(key) {
  removeFromCart(key);
  renderCartPage();
}

// ── SEARCH OVERLAY ───────────────────────────
function initSearch() {
  // Inject overlay into page
  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  overlay.innerHTML = `
    <div class="search-overlay__inner">
      <div class="search-box">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input id="searchInput" type="search" placeholder="Search products…" autocomplete="off" />
        <button id="searchClose" class="search-close" aria-label="Close search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div id="searchResults" class="search-results"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const input   = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  const closeBtn = document.getElementById('searchClose');

  // Open search
  const searchBtn = document.querySelector('.icon-btn[aria-label="Search"]');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      overlay.classList.add('open');
      setTimeout(() => input.focus(), 80);
    });
  }

  // Close search
  function closeSearch() {
    overlay.classList.remove('open');
    input.value = '';
    results.innerHTML = '';
  }

  closeBtn.addEventListener('click', closeSearch);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeSearch();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
  });

  // Live search
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();

    if (!q) { results.innerHTML = ''; return; }

    if (typeof SINKLY_PRODUCTS === 'undefined') {
      results.innerHTML = '<p class="search-empty">Product data not loaded.</p>';
      return;
    }

    const matches = SINKLY_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      results.innerHTML = `<p class="search-empty">No results for "<strong>${input.value}</strong>"</p>`;
      return;
    }

    results.innerHTML = matches.map(p => {
      const displayPrice = p.salePrice
        ? `<span class="search-price">$${p.salePrice.toFixed(2)}</span> <span class="search-price-orig">$${p.price.toFixed(2)}</span>`
        : `<span class="search-price">$${p.price.toFixed(2)}</span>`;
      const badge = p.salePrice ? '<span class="search-badge">Sale</span>' : '';
      const imgSrc = p.variants && p.variants[0] && p.variants[0].images && p.variants[0].images[0]
        ? p.variants[0].images[0] : null;
      return `
        <a href="product.html?id=${p.id}" class="search-result">
          <div class="search-result__img${imgSrc ? '' : ' placeholder-img'}">
            ${imgSrc ? `<img src="${imgSrc}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">` : ''}
          </div>
          <div class="search-result__info">
            <p class="search-result__category">${p.category}</p>
            <p class="search-result__name">${p.name} ${badge}</p>
            <p>${displayPrice} <span class="search-result__cad">CAD</span></p>
          </div>
          <svg class="search-result__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
      `;
    }).join('');
  });
}
