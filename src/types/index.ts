export interface Product {
  id: string;
  name: string;
  category: string;
  colors: string[];
  price: number;
  currency: string;
  slug: string;
  image?: string;
}

export interface LookItem {
  number: string;
  name: string;
  color: string;
  price: number;
}

export interface Testimonial {
  quote: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Collection {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaHref: string;
}

export interface Chapter {
  season: string;
  description: string;
}
