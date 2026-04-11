// ============================================
//  SINKLY — Category Page Product Renderer
// ============================================

function renderProductGrid(category) {
  const grid = document.getElementById('productGrid');
  if (!grid || typeof SINKLY_PRODUCTS === 'undefined') return;

  const products = SINKLY_PRODUCTS.filter(p => p.category === category);
  if (products.length === 0) {
    grid.innerHTML = '<p style="padding:40px;color:var(--taupe-dk)">No products found.</p>';
    return;
  }

  grid.innerHTML = products.map(p => {
    // Support both variants (new) and colors (old)
    const hasVariants = p.variants && p.variants.length > 0;
    const swatches = hasVariants
      ? p.variants.map((v, i) => `<span class="color-swatch${i === 0 ? ' active' : ''}" style="background:${v.hex};" title="${v.color}" data-color="${v.color}"></span>`).join('')
      : (p.colors || []).map((c, i) => `<span class="color-swatch${i === 0 ? ' active' : ''}" style="background:${c.hex};" title="${c.name}" data-color="${c.name}"></span>`).join('');

    // Use plain image (index 1) for card; fall back to index 0 if only one image
    const variantImgs = hasVariants ? p.variants[0].images : null;
    const firstImg = variantImgs ? (variantImgs[1] || variantImgs[0]) : null;
    const imgHTML = firstImg
      ? `<img src="${firstImg}" alt="${p.name}" style="width:100%;height:100%;object-fit:contain;padding:16px;box-sizing:border-box;" />`
      : '';

    const priceHTML = p.salePrice
      ? `<span class="price" style="color:var(--navy);">$${p.salePrice.toFixed(2)}</span><span class="price-original" style="margin-left:6px;">$${p.price.toFixed(2)}</span>`
      : `<span class="price" style="color:var(--navy);">$${p.price.toFixed(2)}</span>`;

    return `
      <div class="product-card product-card--light" data-product-id="${p.id}" data-variant-idx="0">
        <a href="product.html?id=${p.id}" class="product-card__img-link">
          <div class="product-card__img${firstImg ? ' product-card__img--photo' : ' placeholder-img'}">
            ${imgHTML}
            ${p.salePrice ? '<span class="sale-badge" style="position:absolute;top:10px;left:10px;z-index:1;">Sale</span>' : ''}
          </div>
        </a>
        <div class="product-card__body">
          <p class="product-card__label" style="color:var(--taupe-dk);">${p.type || p.category}</p>
          <a href="product.html?id=${p.id}" style="text-decoration:none;">
            <h4 style="color:var(--navy);">${p.name}</h4>
          </a>
          ${swatches ? `<div class="color-swatches">${swatches}</div>` : ''}
          <div class="product-card__footer">
            <div>${priceHTML}</div>
            <button class="btn btn--small">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
