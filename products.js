// ============================================
//  SINKLY — Product Data Store
// ============================================

const STANDARD_COLORS = [
  { name: 'Silver', hex: '#9aa0a6' },
  { name: 'Gold',   hex: '#c9a84c' },
  { name: 'Black',  hex: '#1a1a1a' },
];

const SINKLY_PRODUCTS = [

  // ── BATHROOM SINKS — Vessel ─────────────────
  {
    id: 'bs-10001',
    name: 'Modern Square Vessel Sink',
    type: 'Square Vessel',
    category: 'Bathroom Sinks',
    page: 'bathroom-sinks.html',
    price: 107,
    salePrice: 71,
    variants: [
      {
        color: 'White', hex: '#f0ede8',
        sku: 'SINKLY10001',
        images: [
          'bathroom sinks/vessel 10001.png',
          'bathroom sinks/10001.png',
        ],
        features: []
      }
    ]
  },
  {
    id: 'bs-10002',
    name: 'Round Vessel Basin',
    type: 'Round Vessel',
    category: 'Bathroom Sinks',
    page: 'bathroom-sinks.html',
    price: 99,
    salePrice: null,
    variants: [
      {
        color: 'White', hex: '#f0ede8',
        sku: 'SINKLY10002',
        images: [
          'bathroom sinks/vessel 10002.png',
          'bathroom sinks/10002.png',
        ],
        features: []
      }
    ]
  },
  {
    id: 'bs-6050',
    name: 'Oval Vessel Bowl Sink',
    type: 'Oval Vessel',
    category: 'Bathroom Sinks',
    page: 'bathroom-sinks.html',
    price: 85,
    salePrice: null,
    variants: [
      {
        color: 'White', hex: '#f0ede8',
        sku: 'SINKLY6050',
        images: [
          'bathroom sinks/vessel bowl 6050.png',
          'bathroom sinks/6050.png',
        ],
        features: [
          'OD: 15-3/4″ × 6-3/4″',
          'ID: 15-3/4″ × 6-3/4″',
          'Color: White',
          'Overflow: Vitreous China',
        ]
      }
    ]
  },

  // ── BATHROOM SINKS — Oval Undermount ────────
  {
    id: 'bs-1310',
    name: 'Classic Oval Undermount Sink',
    type: 'Classic Oval Undermount',
    category: 'Bathroom Sinks',
    page: 'bathroom-sinks.html',
    price: 69,
    salePrice: null,
    variants: [
      {
        color: 'White', hex: '#f0ede8',
        sku: 'SINKLY1310',
        images: [
          'bathroom sinks/oval undermount 1310.png',
          'bathroom sinks/1310.png',
        ],
        features: []
      }
    ]
  },
  {
    id: 'bs-1714',
    name: 'Elongated Oval Undermount Sink',
    type: 'Elongated Oval Undermount',
    category: 'Bathroom Sinks',
    page: 'bathroom-sinks.html',
    price: 69,
    salePrice: null,
    variants: [
      {
        color: 'White', hex: '#f0ede8',
        sku: 'SINKLY1714',
        images: [
          'bathroom sinks/oval undermount 1714.png',
          'bathroom sinks/1714.png',
        ],
        features: [
          'OD: 19-1/2″ × 15-3/4″',
          'ID: 17-5/8″ × 14-3/8″',
          'Depth: 8-1/8″',
        ]
      }
    ]
  },

  // ── BATHROOM SINKS — Rectangular Undermount ─
  {
    id: 'bs-1611',
    name: 'Compact Rectangular Undermount Sink',
    type: 'Compact Rectangular Undermount',
    category: 'Bathroom Sinks',
    page: 'bathroom-sinks.html',
    price: 74,
    salePrice: null,
    variants: [
      {
        color: 'White', hex: '#f0ede8',
        sku: 'SINKLY1611',
        images: [
          'bathroom sinks/rectangle undermount 1611.png',
          'bathroom sinks/1611.png',
        ],
        features: [
          'OD: 18″ × 13″',
          'ID: 16″ × 11″',
          'Depth: 7″',
        ]
      }
    ]
  },
  {
    id: 'bs-1612',
    name: 'Slim Rectangular Undermount Sink',
    type: 'Slim Rectangular Undermount',
    category: 'Bathroom Sinks',
    page: 'bathroom-sinks.html',
    price: 74,
    salePrice: null,
    variants: [
      {
        color: 'White', hex: '#f0ede8',
        sku: 'SINKLY1612',
        images: [
          'bathroom sinks/rectangle undermount 1612.png',
          'bathroom sinks/1612.png',
        ],
        features: [
          'OD: 18″ × 14-3/8″ × 7-1/8″',
          'ID: 12″',
          'Depth: 7-1/8″',
        ]
      }
    ]
  },
  {
    id: 'bs-1813',
    name: 'Standard Rectangular Undermount Sink',
    type: 'Standard Rectangular Undermount',
    category: 'Bathroom Sinks',
    page: 'bathroom-sinks.html',
    price: 74,
    salePrice: null,
    variants: [
      {
        color: 'White', hex: '#f0ede8',
        sku: 'SINKLY1813',
        images: [
          'bathroom sinks/rectangle undermount 1813.png',
          'bathroom sinks/1813.png',
        ],
        features: [
          'OD: 20-1/8″ × 15″',
          'ID: 18-1/8″ × 13″',
          'Depth: 7-5/8″',
        ]
      }
    ]
  },
  {
    id: 'bs-1812',
    name: 'Deep Rectangular Undermount Sink',
    type: 'Deep Rectangular Undermount',
    category: 'Bathroom Sinks',
    page: 'bathroom-sinks.html',
    price: 74,
    salePrice: null,
    variants: [
      {
        color: 'White', hex: '#f0ede8',
        sku: 'SINKLY1812',
        images: [
          'bathroom sinks/rectangle undermount 1812.png',
          'bathroom sinks/1812.png',
        ],
        features: [
          'OD: 20-3/4″ × 14-5/8″',
          'ID: 18-1/2″ × 12-1/4″',
          'Depth: 8-1/4″',
        ]
      }
    ]
  },

  // ── BATHROOM SINKS — Drop-In ────────────────
  {
    id: 'bs-1011',
    name: 'Oval Self-Rimming Drop-In Sink',
    type: 'Oval Drop-In',
    category: 'Bathroom Sinks',
    page: 'bathroom-sinks.html',
    price: 79,
    salePrice: null,
    variants: [
      {
        color: 'White', hex: '#f0ede8',
        sku: 'SINKLY1011',
        images: [
          'bathroom sinks/top mount 1011.png',
          'bathroom sinks/1011.png',
        ],
        features: [
          'OD: 20-1/2″ × 17-7/8″',
          'ID: 20-1/2″ × 17-1/8″',
          'Color: White',
          'Depth: 7-1/2″',
        ]
      }
    ]
  },

  // ── KITCHEN SINKS — Farmhouse ───────────────
  {
    id: 'ks-s4105', name: 'Farmhouse Apron-Front Sink', type: 'Farmhouse Apron-Front',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 279, salePrice: null,
    variants: [{ color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYS4105', images: ['kitchen sinks/S4105.png'], features: ['Handmade Sink — 304 Stainless Steel', '16 or 18 Gauge', 'OD: 33″ × 20-1/2″ × 10″', '9″ Apron Front', 'ID: 30″ × 20″', 'Depth: 10″/10″'] }]
  },

  // ── KITCHEN SINKS — Single Bowl (multi-color) ─
  {
    id: 'ks-s3219', name: 'Single Bowl Undermount Sink', type: 'Single Bowl | 32×19',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 264, salePrice: 176,
    variants: [
      { color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYSS3219', images: ['kitchen sinks/SS3219.png'], features: ['Handmade Sink — 304 Stainless Steel', '16 Gauge', 'OD: 32″ × 19″', 'ID: 30″ × 17″', 'Depth: 10″'] },
      { color: 'Gold',            hex: '#c9a84c', sku: 'SINKLYGS3219', images: ['kitchen sinks/G3S219.png'], features: ['Handmade Sink — 304 Stainless Steel', '16 Gauge', 'OD: 32″ × 19″', 'ID: 30″ × 17″', 'Depth: 10″'] },
      { color: 'Black',           hex: '#1a1a1a', sku: 'SINKLYBS3219', images: ['kitchen sinks/BS3219.png'], features: ['Handmade Sink — 304 Stainless Steel', '16 Gauge', 'OD: 32″ × 19″', 'ID: 30″ × 17″', 'Depth: 10″'] },
    ]
  },

  // ── KITCHEN SINKS — Single Bowl (stainless only) ─
  {
    id: 'ks-s2318', name: 'Compact Single Bowl Sink', type: 'Single Bowl | 23×18',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 169, salePrice: null,
    variants: [{ color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYS2318', images: ['kitchen sinks/S2318.png'], features: ['Handmade Sink — 304 Stainless Steel', '16 or 18 Gauge', 'OD: 23″ × 18″ × 9″', 'ID: 21″ × 16″', 'Depth: 9″/9″'] }]
  },
  {
    id: 'ks-s2903', name: 'Extra-Deep Single Bowl Sink', type: 'Single Bowl | Extra Deep',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 169, salePrice: null,
    variants: [{ color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYS2903', images: ['kitchen sinks/S2903.png'], features: ['Handmade Sink — 304 Stainless Steel', '18 Gauge', 'OD: 22″ × 17″', 'ID: 20″ × 15″', 'Depth: 12″'] }]
  },
  {
    id: 'ks-ss3018', name: 'Single Bowl Sink — 30 Inch', type: 'Single Bowl | 30×18',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 199, salePrice: null,
    variants: [{ color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYSS3018', images: ['kitchen sinks/SS3018.png'], features: ['Handmade Sink — 304 Stainless Steel', '16 & 18 Gauge', 'OD: 30″ × 18″ × 9″', 'ID: 28″ × 16″', 'Depth: 9″'] }]
  },
  {
    id: 'ks-ss3218', name: 'Single Bowl Sink — 32 Inch', type: 'Single Bowl | 32×18',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 199, salePrice: null,
    variants: [{ color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYSS3218', images: ['kitchen sinks/SS3218.png'], features: ['Handmade Sink — 304 Stainless Steel', '18 Gauge', 'OD: 32″ × 18″', 'ID: 30″ × 16″', 'Depth: 10″'] }]
  },

  // ── KITCHEN SINKS — Double Bowl (multi-color) ─
  {
    id: 'ks-d3219', name: 'Double Bowl Undermount Sink', type: 'Double Bowl | 32×19',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 229, salePrice: null,
    variants: [
      { color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYSD3219', images: ['kitchen sinks/SD3219.png'], features: ['Handmade Sink — 304 Stainless Steel', '16 Gauge', 'OD: 32″ × 19″', 'ID: 30″ × 17″', 'Depth: 10″'] },
      { color: 'Gold',            hex: '#c9a84c', sku: 'SINKLYGD3219', images: ['kitchen sinks/GD3219.png'], features: ['Handmade Sink — 304 Stainless Steel', '16 Gauge', 'OD: 32″ × 19″', 'ID: 30″ × 17″', 'Depth: 10″'] },
      { color: 'Black',           hex: '#1a1a1a', sku: 'SINKLYBD3219', images: ['kitchen sinks/BD3219.png'], features: ['Handmade Sink — 304 Stainless Steel', '16 Gauge', 'OD: 32″ × 19″', 'ID: 30″ × 17″', 'Depth: 10″'] },
    ]
  },
  {
    id: 'ks-td3120', name: 'Double Bowl Drop-In Sink', type: 'Double Bowl Drop-In',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 229, salePrice: null,
    variants: [
      { color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYSTD3120', images: ['kitchen sinks/STD3120.png'], features: ['Handmade Sink — 304 Stainless Steel', 'Drop-In Top-Mount Installation', '3 Pre-Drilled Faucet Holes'] },
      { color: 'Gold',            hex: '#c9a84c', sku: 'SINKLYGTD3120', images: ['kitchen sinks/GTD3120.png'], features: ['Handmade Sink — 304 Stainless Steel', 'Drop-In Top-Mount Installation', '3 Pre-Drilled Faucet Holes'] },
      { color: 'Black',           hex: '#1a1a1a', sku: 'SINKLYBTD3120', images: ['kitchen sinks/BTD3120.png'], features: ['Handmade Sink — 304 Stainless Steel', 'Drop-In Top-Mount Installation', '3 Pre-Drilled Faucet Holes'] },
    ]
  },

  // ── KITCHEN SINKS — Double Bowl (stainless only) ─
  {
    id: 'ks-d2918', name: 'Double Bowl Sink — 29 Inch', type: 'Double Bowl | 29×18',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 210, salePrice: null,
    variants: [{ color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYSD2918', images: ['kitchen sinks/SD2918.png'], features: ['Handmade Sink — 304 Stainless Steel', '16 Gauge', 'OD: 29″ × 18″', 'ID: 27″ × 16″', 'Depth: 9″'] }]
  },
  {
    id: 'ks-d3018', name: 'Equal Double Bowl Sink', type: 'Equal Double Bowl | 30×18',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 210, salePrice: null,
    variants: [{ color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYSD3018', images: ['kitchen sinks/SD3018.png'], features: ['Handmade Sink — 304 Stainless Steel', '16 & 18 Gauge', 'OD: 30″ × 18″ × 9″', 'ID: 13-1/2″ × 16″ each basin', 'Depth: 9″'] }]
  },
  {
    id: 'ks-d3118', name: 'Double Bowl Sink — 31 Inch', type: 'Double Bowl | 31×18',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 210, salePrice: null,
    variants: [{ color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYSD3118', images: ['kitchen sinks/SD3118.png'], features: ['Handmade Sink — 304 Stainless Steel', '18 Gauge', 'OD: 31″ × 18″', 'ID: 29″ × 16″', 'Depth: 9″'] }]
  },
  {
    id: 'ks-d3240', name: 'Large Double Bowl Sink', type: 'Double Bowl | Large',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 210, salePrice: null,
    variants: [{ color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYD3240', images: ['kitchen sinks/D3240.png'], features: ['Handmade Sink — 304 Stainless Steel'] }]
  },
  {
    id: 'ks-d3260', name: 'Oversized Double Bowl Sink', type: 'Double Bowl | 32×19',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 210, salePrice: null,
    variants: [{ color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYD3260', images: ['kitchen sinks/D3260.png'], features: ['Handmade Sink — 304 Stainless Steel', '16 Gauge', 'OD: 32″ × 19″', 'ID: 30″ × 17″', 'Depth: 10″'] }]
  },

  // ── KITCHEN SINKS — Workstation ─────────────
  {
    id: 'ks-workstation', name: 'Workstation Kitchen Sink', type: 'Workstation | 32×20',
    category: 'Kitchen Sinks', page: 'kitchen-sinks.html', price: 395, salePrice: 263,
    variants: [
      { color: 'Stainless Steel', hex: '#8b9aab', sku: 'SINKLYS20001', images: ['kitchen sinks/workstation S20001.png'], features: ['Handmade Sink — 304 Stainless Steel', 'Built-In Ledge for Accessories', 'Includes Cutting Board & Roll-Up Mat', '16 Gauge', 'OD: 32″ × 20″', 'Depth: 10″'] },
      { color: 'Gold',            hex: '#c9a84c', sku: 'SINKLYG20002', images: ['kitchen sinks/workstation G20002.png'], features: ['Handmade Sink — 304 Stainless Steel', 'Built-In Ledge for Accessories', 'Includes Cutting Board & Roll-Up Mat', '16 Gauge', 'OD: 32″ × 20″', 'Depth: 10″'] },
      { color: 'Black',           hex: '#1a1a1a', sku: 'SINKLYB20003', images: ['kitchen sinks/workstation B20003.png'], features: ['Handmade Sink — 304 Stainless Steel', 'Built-In Ledge for Accessories', 'Includes Cutting Board & Roll-Up Mat', '16 Gauge', 'OD: 32″ × 20″', 'Depth: 10″'] },
    ]
  },

  // ── KITCHEN FAUCETS ────────────────────────

  {
    id: 'kf-40001', name: 'Gooseneck Pull-Down Kitchen Faucet', type: 'Gooseneck Pull-Down',
    category: 'Kitchen Faucets', page: 'kitchen-faucets.html', price: 89, salePrice: null,
    variants: [
      { color: 'Black', hex: '#1a1a1a', sku: 'SINKLYB40001', images: ['kitchen faucets/40001.png'], features: ['Pull-Down Spray Head', 'Single Handle', 'Height: 41cm', 'Spout Reach: 28cm', 'Base Width: 5cm', '1-Hole Installation', 'Plumbing Fixtures Included'] }
    ]
  },
  {
    id: 'kf-40002', name: 'Commercial Spring Kitchen Faucet', type: 'Commercial Spring',
    category: 'Kitchen Faucets', page: 'kitchen-faucets.html', price: 99, salePrice: null,
    variants: [
      { color: 'Black', hex: '#1a1a1a', sku: 'SINKLYB40002', images: ['kitchen faucets/40002.png'], features: ['360° Swivel', 'Dual Spray Modes', 'Commercial Spring Design', 'Height: 47cm', 'Spout Reach: 19cm', '1-Hole Installation', 'Plumbing Fixtures Included'] }
    ]
  },
  {
    id: 'kf-40003', name: 'L-Shape Single Handle Kitchen Faucet', type: 'L-Shape Single Handle',
    category: 'Kitchen Faucets', page: 'kitchen-faucets.html', price: 74, salePrice: null,
    variants: [
      { color: 'Silver', hex: '#9aa0a6', sku: 'SINKLYS40003', images: ['kitchen faucets/40003.png'], features: ['Single Handle', 'L-Shape Spout Design', 'Height: 350mm', 'Spout Reach: 270mm', '1-Hole Installation', 'Plumbing Fixtures Included'] }
    ]
  },
  {
    id: 'kf-40004', name: 'Tall Slim Kitchen Faucet', type: 'Single Handle',
    category: 'Kitchen Faucets', page: 'kitchen-faucets.html', price: 79, salePrice: null,
    variants: [
      { color: 'Silver', hex: '#9aa0a6', sku: 'SINKLYS40004', images: ['kitchen faucets/40004.png'], features: ['Single Handle', 'Weight: 2.5 kg', 'Dimensions: 57×7×28cm', '1-Hole Installation', 'Plumbing Fixtures Included'] }
    ]
  },
  {
    id: 'kf-40005', name: 'Modern Pull-Down Kitchen Faucet', type: 'Pull-Down',
    category: 'Kitchen Faucets', page: 'kitchen-faucets.html', price: 79, salePrice: null,
    variants: [
      { color: 'Silver', hex: '#9aa0a6', sku: 'SINKLYS40005', images: ['kitchen faucets/40005.png'], features: ['Pull-Down Spray Head', 'Single Handle', 'Height: 17.5″ (445mm)', 'Spout Reach: 8.86″ (225mm)', '1-Hole Installation', 'Plumbing Fixtures Included'] }
    ]
  },
  {
    id: 'kf-40006', name: 'Pull-Down Faucet with Deck Cover', type: 'Pull-Down with Deck Plate',
    category: 'Kitchen Faucets', page: 'kitchen-faucets.html', price: 69, salePrice: null,
    variants: [
      { color: 'Silver', hex: '#9aa0a6', sku: 'SINKLYS40006', images: ['kitchen faucets/40006.png'], features: ['Pull-Down Spray Head', 'Includes Deck Cover Plate', 'Single Handle', 'Height: 16″', 'Spout Height: 8″', 'Cover Deck: 10″', '1-Hole Installation', 'Plumbing Fixtures Included'] }
    ]
  },
  {
    id: 'kf-40007', name: 'Matte Black Pull-Down Faucet', type: 'Pull-Down with Deck Plate',
    category: 'Kitchen Faucets', page: 'kitchen-faucets.html', price: 80, salePrice: null,
    variants: [
      { color: 'Black', hex: '#1a1a1a', sku: 'SINKLYB40007', images: ['kitchen faucets/40007.png'], features: ['Pull-Down Spray Head', 'Includes Deck Cover Plate', 'Single Handle', 'Height: 16.14″ (410mm)', 'Spout Reach: 9.1″ (230mm)', 'Base Width: 2.17″ (55mm)', '1-Hole Installation', 'Plumbing Fixtures Included'] }
    ]
  },
  {
    id: 'kf-40008', name: 'Square Handle Pull-Down Faucet', type: 'Square Handle Pull-Down',
    category: 'Kitchen Faucets', page: 'kitchen-faucets.html', price: 85, salePrice: null,
    variants: [
      { color: 'Black', hex: '#1a1a1a', sku: 'SINKLYB40008', images: ['kitchen faucets/40008.png'], features: ['Pull-Down Spray Head', 'Square Handle Design', 'Single Handle', 'Height: 41cm', 'Spout Reach: 24cm', 'Base: 3.5cm', '1-Hole Installation', 'Plumbing Fixtures Included'] }
    ]
  },
  {
    id: 'kf-40009', name: 'Single Handle Pull-Down Faucet', type: 'Single Handle Pull-Down',
    category: 'Kitchen Faucets', page: 'kitchen-faucets.html', price: 75, salePrice: null,
    variants: [
      { color: 'Silver', hex: '#9aa0a6', sku: 'SINKLYS40009', images: ['kitchen faucets/40009.png'], features: ['Pull-Down Spray Head', 'Includes Deck Cover Plate', 'Single Handle', 'Height: 15.3″', 'Spout Reach: 8.3″', 'Cover Deck: 9.7″', '1-Hole Installation', 'Plumbing Fixtures Included'] }
    ]
  },
  {
    id: 'kf-40010', name: 'Compact Pull-Down Kitchen Faucet', type: 'Compact Pull-Down',
    category: 'Kitchen Faucets', page: 'kitchen-faucets.html', price: 90, salePrice: null,
    variants: [
      { color: 'Black', hex: '#1a1a1a', sku: 'SINKLYB40010', images: ['kitchen faucets/40010.png'], features: ['Pull-Down Spray Head', 'Single Handle', 'Height: 385mm', 'Spout Reach: 185mm', 'Base Height: 170mm', '1-Hole Installation', 'Plumbing Fixtures Included'] }
    ]
  },

  // ── BATHROOM FAUCETS ───────────────────────

  // 30001 — Pull-out single handle
  {
    id: 'bf-30001', name: 'Pull-Out Bathroom Faucet', type: 'Pull-Out',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 69, salePrice: null,
    variants: [{ color: 'Silver', hex: '#9aa0a6', sku: 'SINKLY30001', images: ['bathroom faucets/30001.png'], features: ['Pull-Out Extendable Spray', 'Single Handle', 'Height: 7″', 'Spout Reach: 4.4″', '1-Hole Installation', 'Plumbing Fixtures Included'] }]
  },

  // 30002 — Waterfall single handle (tall)
  {
    id: 'bf-30002', name: 'Waterfall Single-Handle Faucet', type: 'Waterfall',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 65, salePrice: null,
    variants: [{ color: 'Silver', hex: '#9aa0a6', sku: 'SINKLY30002', images: ['bathroom faucets/30002.png'], features: ['Waterfall Spout', 'Single Handle', 'Height: 11″', 'Spout Reach: 5.35″', '1-Hole Installation', 'Plumbing Fixtures Included'] }]
  },

  // 30003 — No specs
  {
    id: 'bf-30003', name: 'Sleek Basin Faucet', type: 'Single Handle',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 49, salePrice: null,
    variants: [{ color: 'Silver', hex: '#9aa0a6', sku: 'SINKLY30003', images: ['bathroom faucets/30003.png'], features: ['Single Handle', '1-Hole Installation', 'Plumbing Fixtures Included'] }]
  },

  // 30004 — Round base, height 7"
  {
    id: 'bf-30004', name: 'Round Base Basin Faucet', type: 'Single Handle',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 49, salePrice: null,
    variants: [{ color: 'Silver', hex: '#9aa0a6', sku: 'SINKLY30004', images: ['bathroom faucets/30004.png'], features: ['Single Handle', 'Height: 7″', 'Base Width: 2″', '1-Hole Installation', 'Plumbing Fixtures Included'] }]
  },

  // 30005 — Tall spout, vessel
  {
    id: 'bf-30005', name: 'Tall Vessel Faucet', type: 'Vessel',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 59, salePrice: null,
    variants: [{ color: 'Silver', hex: '#9aa0a6', sku: 'SINKLY30005', images: ['bathroom faucets/30005.png'], features: ['Single Handle', 'Vessel Sink Compatible', 'Spout Height: 10″', 'Faucet Centers: 2″', 'Plumbing Fixtures Included'] }]
  },

  // 30006 — H59 brass, pull-out capable
  {
    id: 'bf-30006', name: 'Brass Single-Handle Faucet', type: 'Single Handle',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 65, salePrice: null,
    variants: [{ color: 'Silver', hex: '#9aa0a6', sku: 'SINKLY30006', images: ['bathroom faucets/30006.png'], features: ['H59 Brass Body', 'Single Handle', '1-Hole Installation', 'Plumbing Fixtures Included'] }]
  },

  // 30007 — Wall-mount, tall
  {
    id: 'bf-30007', name: 'Wall-Mount Bathroom Faucet', type: 'Wall-Mount',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 79, salePrice: null,
    variants: [{ color: 'Silver', hex: '#9aa0a6', sku: 'SINKLY30007', images: ['bathroom faucets/30007.png'], features: ['Wall-Mount Installation', 'Single Handle', 'Overall Height: 17-1/8″', 'Spout Height: 11-7/8″', 'Plumbing Fixtures Included'] }]
  },

  // 30008 — No specs
  {
    id: 'bf-30008', name: 'Modern Single-Handle Faucet', type: 'Single Handle',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 49, salePrice: null,
    variants: [{ color: 'Rose Gold', hex: '#c4956a', sku: 'SINKLY30008', images: ['bathroom faucets/30008.png'], features: ['Single Handle', '1-Hole Installation', 'Plumbing Fixtures Included'] }]
  },

  // 30009 — No specs
  {
    id: 'bf-30009', name: 'Minimalist Basin Faucet', type: 'Single Handle',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 49, salePrice: null,
    variants: [{ color: 'Silver', hex: '#9aa0a6', sku: 'SINKLY30009', images: ['bathroom faucets/30009.png'], features: ['Single Handle', '1-Hole Installation', 'Plumbing Fixtures Included'] }]
  },

  // 30010 — Vessel with deck plate
  {
    id: 'bf-30010', name: 'Deck-Plate Vessel Faucet', type: 'Vessel',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 65, salePrice: null,
    variants: [{ color: 'Silver', hex: '#9aa0a6', sku: 'SINKLY30010', images: ['bathroom faucets/30010.png'], features: ['Vessel Sink Compatible', 'Includes Deck Plate', 'Single Handle', 'Height: 6.5″', 'Width: 5.67″', '1 or 3-Hole Installation', 'Plumbing Fixtures Included'] }]
  },

  // 30011 — No specs
  {
    id: 'bf-30011', name: 'Curved Spout Faucet', type: 'Single Handle',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 49, salePrice: null,
    variants: [{ color: 'Silver', hex: '#9aa0a6', sku: 'SINKLY30011', images: ['bathroom faucets/30011.png'], features: ['Single Handle', '1-Hole Installation', 'Plumbing Fixtures Included'] }]
  },

  // 30012 — No specs
  {
    id: 'bf-30012', name: 'Contemporary Basin Faucet', type: 'Single Handle',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 49, salePrice: null,
    variants: [{ color: 'Silver', hex: '#9aa0a6', sku: 'SINKLY30012', images: ['bathroom faucets/30012.png'], features: ['Single Handle', '1-Hole Installation', 'Plumbing Fixtures Included'] }]
  },

  // 30013 — 4" centerset, single handle
  {
    id: 'bf-30013', name: 'Centerset Single-Handle Faucet', type: 'Centerset',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 65, salePrice: null,
    variants: [{ color: 'Silver', hex: '#9aa0a6', sku: 'SINKLY30013', images: ['bathroom faucets/30013.png'], features: ['Single Handle', '4″ Centerset', '3-Hole Installation', 'Plumbing Fixtures Included'] }]
  },

  // 30014 — Touchless motion sensor
  {
    id: 'bf-30014', name: 'Touchless Motion Sensor Faucet', type: 'Touchless',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 79, salePrice: null,
    variants: [{ color: 'Silver', hex: '#9aa0a6', sku: 'SINKLY30014', images: ['bathroom faucets/30014.png'], features: ['Touchless Motion Sensor', 'Hands-Free Operation', 'Height: 7.32″', 'Spout Reach: 0.95″', '1-Hole Installation', 'Plumbing Fixtures Included'] }]
  },

  // 30015 — No specs
  {
    id: 'bf-30015', name: 'Angular Single-Handle Faucet', type: 'Single Handle',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 49, salePrice: null,
    variants: [{ color: 'White', hex: '#f0ede8', sku: 'SINKLY30015', images: ['bathroom faucets/30015.png'], features: ['Single Handle', '1-Hole Installation', 'Plumbing Fixtures Included'] }]
  },

  // 30016 — Arc waterfall vessel (Black + Brushed Nickel)
  {
    id: 'bf-30016', name: 'Arc Vessel Faucet', type: 'Vessel',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 65, salePrice: null,
    variants: [
      { color: 'Matte Black',    hex: '#1a1a1a', sku: 'SINKLYB30016', images: ['bathroom faucets/B30016.png'], features: ['Waterfall Arc Spout', 'Vessel Sink Compatible', 'Single Handle', 'Spout Reach: 3.07″', '1-Hole Installation', 'Plumbing Fixtures Included'] },
      { color: 'Silver', hex: '#9aa0a6', sku: 'SINKLYS30016', images: ['bathroom faucets/S30016.png'], features: ['Waterfall Arc Spout', 'Vessel Sink Compatible', 'Single Handle', 'Spout Reach: 3.07″', '1-Hole Installation', 'Plumbing Fixtures Included'] },
    ]
  },

  // 30017 — Widespread two-handle (Black + Brushed Nickel) — ON SALE
  {
    id: 'bf-30017', name: 'Widespread Two-Handle Faucet', type: 'Widespread',
    category: 'Bathroom Faucets', page: 'bathroom-faucets.html', price: 90, salePrice: 60,
    variants: [
      { color: 'Matte Black',    hex: '#1a1a1a', sku: 'SINKLYB30017', images: ['bathroom faucets/B30017.png'], features: ['Two Handle', '3-Hole Installation', 'Height: 5-3/4″', 'Spread: 6-1/4″', 'Overall Width: 11-5/8″', 'Plumbing Fixtures Included'] },
      { color: 'Silver', hex: '#9aa0a6', sku: 'SINKLYS30017', images: ['bathroom faucets/S30017.png'], features: ['Two Handle', '3-Hole Installation', 'Height: 5-3/4″', 'Spread: 6-1/4″', 'Overall Width: 11-5/8″', 'Plumbing Fixtures Included'] },
    ]
  },
];
