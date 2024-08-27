export const DAMMY_DATA = [
  {
    id: 1,
    img: "/products/IMG (1).JPG",
    rating: 5,
    name: "العسل",
    price: 100,
    category: "العسل ومشتقاته",
  },
  {
    id: 2,
    img: "/products/IMG (2).JPG",
    rating: 3,
    name: "وصفات",
    price: 100,
    category: "وصفات",
  },
  {
    id: 3,
    img: "/products/IMG (3).JPG",
    rating: 4.5,
    price: 100,
    category: "تداوي وتجميل",
    name: "تداوي وتجميل",
  },
  {
    id: 4,
    img: "/products/IMG (4).JPG",
    rating: 4,
    name: "تداوي وتجميل",
    price: 100,
    category: "تداوي وتجميل",
  },
  {
    id: 5,
    img: "/products/IMG (5).JPG",
    rating: 5,
    name: "عروض",
    price: 100,
    category: "تداوي وتجميل",
  },
  {
    id: 6,
    img: "/products/IMG (6).JPG",
    rating: 3,
    name: "تداوي وتجميل",
    price: 200,
    category: "تداوي وتجميل",
  },
];

export const toastOption = (
  status: "error" | "success",
  description: string
) => {
  const position: "top" = "top";
  if (status === "error")
    return {
      status,
      duration: 3000,
      description,
      position,
    };
  else
    return {
      status,
      duration: 3000,
      description,
      position,
      colorScheme: "yellow",
    };
};

export const Address = [
  {
    id : "1",
    codePostal: 13100,
    city: "Bouznika",
    state: "CASA-STATE",
  },
];
