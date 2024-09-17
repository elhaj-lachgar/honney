import { useState } from "react";
import { TAddress, TErrorService } from "../constant/types";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import UpdateAddressModule from "./profile/UpdateAddress";
import { BASE_URL, DEFAULT_HEADER } from "../constant";
import axios from "axios";
import { toastOption } from "../lib";
import { EllipsisVertical } from "lucide-react";
import { useAuthContext } from "../context/AuthContextProvider";
function AddressItem({
  address,
  setLoad,
  load,
  isProfile,
  selectedAddress,
  setSelectedAddress,
}: {
  address: TAddress;
  setLoad: (vl: boolean) => void;
  load: boolean;
  isProfile: boolean;
  selectedAddress?: string;
  setSelectedAddress?: (vl: string) => void;
}) {
  const [delLoading, setDelLoading] = useState(false);
  const toast = useToast();
  const { authUser } = useAuthContext();

  const deleteAddres = async (addressId: string) => {
    const url = BASE_URL + "/address/" + addressId;
    setDelLoading(true);
    const data = JSON.stringify(authUser ? {} : { email: address.email });
    try {
      const res = await axios.delete(url, { data, headers: DEFAULT_HEADER });
      if (res.data?.success) {
        const option = toastOption("success", "address delete successful");
        toast(option);
        setLoad(!load);
      } else {
        const message = "Could not delete address";
        const option = toastOption("error", message);
        toast(option);
      }
    } catch (error: any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error);
      toast(option);
    }
    setDelLoading(false);
  };
  return (
    <div className="flex border items-center justify-between  gap-x-2 px-2 py-1 rounded-md cursor-pointer">
      <div className="flex items-center gap-x-2">
        {isProfile && (
          <input
            id="address"
            name="address"
            type="checkbox"
            className="w-4 h-4"
            value={address._id}
            onChange={(e) => {
              if (!setSelectedAddress) return;
              setSelectedAddress(e.currentTarget.value);
            }}
            checked={selectedAddress == address._id}
          />
        )}
        <label htmlFor="address" className="flex flex-col ">
          <h1>{address.city}</h1>
          <p>{address.codePostal || address.streat}</p>
        </label>
      </div>
      <Menu>
        <MenuButton>
          <EllipsisVertical />
        </MenuButton>
        <MenuList>
          <UpdateAddressModule
            setLoad={setLoad}
            load={load}
            address={address}
          />
          <MenuItem
            isDisabled={delLoading}
            color={"red"}
            onClick={() => deleteAddres(address._id)}
          >
            {delLoading ? "...loading" : " حذف"}
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default AddressItem;
