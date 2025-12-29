import type { Metadata } from "next";

/* =====================
   GLOBAL CONFIG
===================== */

export const SITE_CONFIG = {
  name: "LuxeWatches",
  url: "https://luxewatches.com",
  description:
    "Luxury Swiss watches and premium timepieces crafted for elegance and precision.",
  ogImage: "/og/default.png",
  twitterHandle: "@luxewatches",
};

/* =====================
   BASE SEO (USED EVERYWHERE)
===================== */

type BaseSEO = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

/* =====================
   CORE BUILDER
===================== */

function buildBaseSEO({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: BaseSEO): Metadata {
  const seoTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.name;

  const seoDescription = description || SITE_CONFIG.description;

  const seoImage = image || SITE_CONFIG.ogImage;

  return {
    title: seoTitle,
    description: seoDescription,

    metadataBase: new URL(SITE_CONFIG.url),

    alternates: {
      canonical: `${SITE_CONFIG.url}${path}`,
    },

    robots: {
      index: !noIndex,
      follow: !noIndex,
    },

    openGraph: {
      type: "website",
      siteName: SITE_CONFIG.name,
      title: seoTitle,
      description: seoDescription,
      url: `${SITE_CONFIG.url}${path}`,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: SITE_CONFIG.twitterHandle,
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
    },
  };
}

/* =====================
   PAGE SEO
===================== */

export function pageSEO(props: BaseSEO): Metadata {
  return buildBaseSEO(props);
}

/* =====================
   PRODUCT SEO
===================== */

type ProductSEO = BaseSEO & {
  price?: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock";
};

export function productSEO({
  title,
  description,
  path,
  image,
  noIndex,
}: ProductSEO): Metadata {
  return buildBaseSEO({
    title,
    description,
    path,
    image,
    noIndex,
  });
}

/* =====================
   CATEGORY / COLLECTION SEO
===================== */

export function categorySEO(props: BaseSEO): Metadata {
  return buildBaseSEO(props);
}

/* =====================
   NO INDEX SEO (LOGIN, CART)
===================== */

export function noIndexSEO(): Metadata {
  return buildBaseSEO({
    noIndex: true,
  });
}
