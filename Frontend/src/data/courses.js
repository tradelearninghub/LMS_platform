// Mock course data — will be replaced with Supabase queries later
export const MOCK_COURSES = [
  {
    id: "c1",
    title: "Mastering Price Action",
    cover_image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    video_title: "Trading Without Indicators",
    description:
      "Learn to read raw market data and trade naked charts. This course covers candlestick psychology, support and resistance, supply and demand zones, and building a systematic price action edge.",
    curriculum: `Module 1 — Anatomy of a Candlestick
Module 2 — Market Structure & Trends
Module 3 — Supply & Demand Zones
Module 4 — Advanced Chart Patterns
Module 5 — Liquidity & Stop Hunts
Module 6 — Building Your Trading Plan`,
    price: 4999,
    locked_urls: [
      { title: "Module 1 — Anatomy of a Candlestick", url: "https://drive.google.com/file/d/TRADE1/view" },
      { title: "Module 2 — Market Structure & Trends", url: "https://drive.google.com/file/d/TRADE2/view" },
      { title: "Module 3 — Supply & Demand Zones", url: "https://drive.google.com/file/d/TRADE3/view" },
      { title: "Module 4 — Advanced Chart Patterns", url: "https://drive.google.com/file/d/TRADE4/view" },
      { title: "Module 5 — Liquidity & Stop Hunts", url: "https://drive.google.com/file/d/TRADE5/view" },
      { title: "Module 6 — Building Your Trading Plan", url: "https://drive.google.com/file/d/TRADE6/view" },
    ],
    created_at: "2025-12-01T10:00:00Z",
  },
  {
    id: "c2",
    title: "Advanced Options Strategies",
    cover_image_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
    video_title: "Options Trading Masterclass",
    description:
      "Go beyond buying basic calls and puts. Master the Greeks, volatility trading, vertical spreads, iron condors, and portfolio hedging strategies used by institutional traders.",
    curriculum: `Module 1 — Understanding Option Greeks
Module 2 — Implied Volatility Secrets
Module 3 — Vertical & Calendar Spreads
Module 4 — Iron Condors & Butterflies
Module 5 — Hedging Strategies
Module 6 — Managing Option Greeks in a Portfolio`,
    price: 6499,
    locked_urls: [
      { title: "Module 1 — Understanding Option Greeks", url: "https://drive.google.com/file/d/OPT1/view" },
      { title: "Module 2 — Implied Volatility Secrets", url: "https://drive.google.com/file/d/OPT2/view" },
      { title: "Module 3 — Vertical & Calendar Spreads", url: "https://drive.google.com/file/d/OPT3/view" },
      { title: "Module 4 — Iron Condors & Butterflies", url: "https://drive.google.com/file/d/OPT4/view" },
      { title: "Module 5 — Hedging Strategies", url: "https://drive.google.com/file/d/OPT5/view" },
      { title: "Module 6 — Managing Option Greeks", url: "https://drive.google.com/file/d/OPT6/view" },
    ],
    created_at: "2025-11-15T10:00:00Z",
  },
  {
    id: "c3",
    title: "Algorithmic Trading Foundations",
    cover_image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    video_title: "Automate Your Edge",
    description:
      "Learn to backtest and deploy automated trading strategies. Covers Python for finance, connecting to exchange APIs, risk management algorithms, and deploying bots to the cloud.",
    curriculum: `Module 1 — Python for Quantitative Finance
Module 2 — Data Gathering & Preprocessing
Module 3 — Backtesting Infrastructure
Module 4 — Statistical Arbitrage
Module 5 — Connecting to Broker APIs
Module 6 — Cloud Deployment & Monitoring`,
    price: 8999,
    locked_urls: [
      { title: "Module 1 — Python for Quant Finance", url: "https://drive.google.com/file/d/ALGO1/view" },
      { title: "Module 2 — Data Gathering", url: "https://drive.google.com/file/d/ALGO2/view" },
      { title: "Module 3 — Backtesting Infrastructure", url: "https://drive.google.com/file/d/ALGO3/view" },
      { title: "Module 4 — Statistical Arbitrage", url: "https://drive.google.com/file/d/ALGO4/view" },
      { title: "Module 5 — Broker APIs", url: "https://drive.google.com/file/d/ALGO5/view" },
      { title: "Module 6 — Cloud Deployment", url: "https://drive.google.com/file/d/ALGO6/view" },
    ],
    created_at: "2026-01-10T10:00:00Z",
  },
  {
    id: "c4",
    title: "Trading Psychology & Risk",
    cover_image_url: "https://images.unsplash.com/photo-1620300976110-38446b7a54fa?w=800&q=80",
    video_title: "Mastering the Mental Game",
    description:
      "The hardest part of trading is yourself. Learn professional risk management, position sizing, emotional control techniques, and how to maintain discipline during drawdowns.",
    curriculum: `Module 1 — The Psychology of Winning
Module 2 — Fear, Greed, and FOMO
Module 3 — Mathematical Position Sizing
Module 4 — Journaling & Reviewing Trades
Module 5 — Handling Drawdowns
Module 6 — Developing Unbreakable Discipline`,
    price: 2999,
    locked_urls: [
      { title: "Module 1 — The Psychology of Winning", url: "https://drive.google.com/file/d/PSYCH1/view" },
      { title: "Module 2 — Fear, Greed, and FOMO", url: "https://drive.google.com/file/d/PSYCH2/view" },
      { title: "Module 3 — Mathematical Position Sizing", url: "https://drive.google.com/file/d/PSYCH3/view" },
      { title: "Module 4 — Journaling Trades", url: "https://drive.google.com/file/d/PSYCH4/view" },
      { title: "Module 5 — Handling Drawdowns", url: "https://drive.google.com/file/d/PSYCH5/view" },
      { title: "Module 6 — Unbreakable Discipline", url: "https://drive.google.com/file/d/PSYCH6/view" },
    ],
    created_at: "2026-02-20T10:00:00Z",
  },
];

// Mock purchased course IDs — will be replaced with Supabase query later
export const MOCK_PURCHASED_IDS = ["c2"];
