export interface Product {
  id: number;
  name: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  image: string;
  qty: number | null;
  max_qty_allowed: number;
  gallery: { id: number; link: string }[];
  category: {
    name: {
      [key: string]: string;
    };
    id: number;
    image: string;
    slug: string;
  };
  slug: string;
  price: string;
  sale: boolean;
  discount: number | null;
  options: PRODUCT_OPTION[];
  prep_time: string;
  allow_upload: boolean;
  allow_side_notes: boolean;
}
export type PRODUCT_OPTION = {
  id: number;
  select_type: "single" | "multiple";
  max_picks: number | undefined;
  name: {
    [key: string]: string;
  };
  required: boolean;
  values: OPTION_VALUE[];
};

export type OPTION_VALUE = {
  id: number;
  name: {
    [key: string]: string;
  };
  price: string;
  qty: number | null;
  sku: string;
};
