import { createContext, useContext, useEffect, useState } from "react";
import { TProductService } from "../constant/types";
import { useToast } from "@chakra-ui/react";
import { toastOption } from "../lib";

type TProductContext = {
  product: TProductService;
  quantity: number;
};

type TCard = {
  products: TProductContext[];
  totalePrice: number;
};

type TCardContext = {
  card: TCard;
  addToCard: (product: TProductService) => void;
  deleteFromCard: (product: TProductService) => void;
  incrementCard: (product: TProductService) => void;
  decrementCard: (product: TProductService) => void;
  clearCard: () => void;
};

const initialContext: TCardContext = {
  card: {
    products: [],
    totalePrice: 0,
  },
  addToCard: () => {},
  decrementCard: () => {},
  deleteFromCard: () => {},
  incrementCard: () => {},
  clearCard: () => {},
};

const CardContext = createContext<TCardContext>(initialContext);

function CardContextProvider({ children }: { children: React.ReactNode }) {
  const [card, setCard] = useState<TCard>({ products: [], totalePrice: 0 });
  const toast = useToast();

  const addToCard = (product: TProductService ) => {
    const index = card.products.findIndex((p) => p.product._id == product._id);
    if (index <= -1) {
      const arr: TProductContext[] = [
        ...card.products,
        { product: product, quantity: 1 },
      ];
      const totalePrice = card.totalePrice + product.price;

      setCard({ products: arr, totalePrice });

      window.localStorage.setItem(
        "card",
        JSON.stringify({ products: arr, totalePrice })
      );
    } else {
      const arr = card.products;
      arr[index].quantity += 1;
      const totalePrice = card.totalePrice + card.products[index].product.price;

      setCard({ products: arr, totalePrice });

      window.localStorage.setItem(
        "card",
        JSON.stringify({ products: arr, totalePrice })
      );
    }
    const option = toastOption("success", `تمت ضافة${product.name} إلى السلة`);
    toast(option);
  };

  const deleteFromCard = (product: TProductService) => {
    const index = card.products.findIndex((p) => p.product._id == product._id);
    if (index <= -1) return;
    const arr = card.products;
    const deleteElement = arr.splice(index, 1);
    const totalePrice =
      card.totalePrice -
      deleteElement[0].product.price * deleteElement[0].quantity;
    setCard({ products: arr, totalePrice });

    window.localStorage.setItem(
      "card",
      JSON.stringify({ products: arr, totalePrice })
    );
  };

  const decrementCard = (product: TProductService) => {
    const index = card.products.findIndex((p) => p.product._id == product._id);
    if (index <= -1 || card.products[index].quantity <= 1) return;
    const arr = card.products;
    arr[index].quantity -= 1;
    const totalePrice = card.totalePrice - arr[index].product.price;
    setCard({ products: arr, totalePrice });

    window.localStorage.setItem(
      "card",
      JSON.stringify({ products: arr, totalePrice })
    );
  };

  const incrementCard = (product: TProductService) => {
    const index = card.products.findIndex((p) => p.product._id == product._id);
    if (index <= -1) return;
    const arr = card.products;
    arr[index].quantity += 1;
    const totalePrice = card.totalePrice + arr[index].product.price;
    setCard({ products: arr, totalePrice });

    window.localStorage.setItem(
      "card",
      JSON.stringify({ products: arr, totalePrice })
    );
  };

  const clearCard = () => {
    window.localStorage.removeItem("card");
    setCard({
      products: [],
      totalePrice: 0,
    });
  };

  useEffect(() => {
    if (!window.localStorage.getItem("card")) return;
    setCard(JSON.parse(window.localStorage.getItem("card") as string));
  }, []);
  return (
    <CardContext.Provider
      value={{
        addToCard,
        card,
        decrementCard,
        deleteFromCard,
        incrementCard,
        clearCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export default CardContextProvider;

export const useCardContext = () => useContext(CardContext);
