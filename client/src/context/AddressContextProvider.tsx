import React, { useContext, createContext, useState, useEffect } from "react";
import { TAddress } from "../constant/types";
import { BASE_URL, DEFAULT_HEADER } from "../constant";
import axios from "axios";
import { toastOption } from "../lib";
import { useToast } from "@chakra-ui/react";
import { useAuthContext } from "./AuthContextProvider";

type TAddressContext = {
  addresses: TAddress[];
  load: boolean;
  setLoad: (vl: boolean) => void;
  loading: boolean;
};

const AddressContext = createContext<TAddressContext>({
  addresses: [],
  load: false,
  setLoad: () => {},
  loading: true,
});

function AddressContextProvider({ children }: { children: React.ReactNode }) {
  const [addresses, setAdresses] = useState<TAddress[]>([]);
  const { authUser } = useAuthContext();
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const getAddresses = async () => {
    const url = `${BASE_URL}/address/get-address-auth`;

    try {
      const res = await axios.get(url);
      const Object_data = res.data;
      if (Object_data?.success) {
        setAdresses(Object_data.addresses);
      } else {
        const option = toastOption("error", "خطّأ في عملية");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "خطّأ في عملية");
      toast(option);
    }
    setLoading(false);
  };

  const getAddressNotAuth = async () => {
    const url = `${BASE_URL}/address/get-address-not-auth`;
    const addresses =
      (JSON.parse(
        window.localStorage.getItem("addresses") as string
      ) as string[]) || [];
    if (!addresses || addresses.length == 0) {
      setLoading(false);
      return;
    }
    const data = JSON.stringify({ addresses });
    try {
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      const Object_data = res.data;
      if (Object_data?.success) {
        setAdresses(Object_data.addresses);
      } else {
        const option = toastOption("error", "خطّأ في عملية");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "خطّأ في عملية");
      toast(option);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authUser) {
      getAddresses();
      return;
    }
    getAddressNotAuth();
  }, [load]);

  return (
    <AddressContext.Provider value={{ addresses, load, setLoad, loading }}>
      {children}
    </AddressContext.Provider>
  );
}

export default AddressContextProvider;

export const useAddressContext = () => useContext(AddressContext);
