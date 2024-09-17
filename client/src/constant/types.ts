export type TProduct = {
  id: number;
  img: string;
  rating: number;
  name: string;
  category: string;
  price: number;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  product_reviews_allwod: string[];
  userOrder: TOrder[];
};

export type TReview = {
  _id: string;
  user: TUser;
  content: string;
  rate: number;
};

export type TErrorService = {
  error: string;
  status: string;
};

export type TProductService = {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
  stock: number;
  description: string;
  subDescription: string;
  price: number;
  discountPrice?: number;
  currency: "USD" | "EUR" | "MAD";
  imageUrls: string[];
  discountPercentage: number;
  productQuantity: { _id: string; quantity: number; number: number }[];

  rating_info?: {
    five_star: number;
    four_star: number;
    one_star: number;
    three_star: number;
    two_star: number;
  };
  reviews: TReview[];
  productRate?: number;
};

export type TCategory = {
  _id: string;
  name: string;
  image: string;
};

export type TAddress = {
  _id: string;
  city: string;
  email: string;
  name: string;
  streat?: string;
  codePostal?: string;
  phone : string;
};

export type TOrder = {
  _id: string;
  address: TAddress;
  createdAt: string;
  currency: "MAD" | "USD";
  products: [
    {
      product: TProductService;
      quantity: number;
      productQuantity: { _id: string; quantity: number; number: number };
    }
  ];
  totalePrice: number;
  isDelaiverd: boolean;
  Delaiverd_At?: string;
};

export type TErrorValidator = [
  {
    type: string;
    msg: string;
    path: string;
    location: string;
  }
];


export type TBanner = {
  imageUrls: string[];
  _id: string;
};