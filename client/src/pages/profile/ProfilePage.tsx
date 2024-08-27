import { CalendarClockIcon, Mail, User } from "lucide-react";
import ProfileBanner from "../../components/profile/ProfileBanner";
import AdressModule from "../../components/profile/AdressModule";
import { useAuthContext } from "../../context/AuthContextProvider";
import { BASE_URL } from "../../constant";
import axios from "axios";
import { toastOption } from "../../lib";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TAddress } from "../../constant/types";
import { Helmet } from "react-helmet";

function ProfilePage() {
  const { authUser } = useAuthContext();
  const toast = useToast();
  const [load, setLoad] = useState(false);
  const [addresses, setAdresses] = useState<TAddress[]>([]);
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
  };

  useEffect(() => {
    getAddresses();
  }, [load]);

  return (
    <>
      <Helmet>
        <title>{authUser?.name}</title>
        <meta name="description" content={`profile of ${authUser?.name}`} />
      </Helmet>
      <div className="w-full h-full flex flex-col ">
        <ProfileBanner avatar={authUser?.avatar} />
        <div className="flex p-5 flex-col gap-y-4 border m-5 mt-[94px] w-11/12 md:w-2/3 lg:w-1/2 shadow-md md:mt-[124px]  rounded-md ">
          <div className="flex items-center gap-x-2">
            <Mail className="p-1 size-8 bg-gray-200 rounded-md" />
            <p className="text-xl">{authUser?.email}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <User className="p-1 size-8 bg-gray-200 rounded-md" />
            <p className="text-xl">{authUser?.name}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <CalendarClockIcon className="p-1 size-8 bg-gray-200 rounded-md" />
            <p className="text-xl">{authUser?.createdAt.split("T")[0]}</p>
          </div>
        </div>
        <div className="flex px-5 py-2  flex-col gap-y-4 m-5  w-11/12 md:w-2/3 lg:w-1/2 border rounded-md shadow-md">
          <h1 className="text-2xl">العنوان</h1>
          <hr />
          <div className="min-h-[75px]">
            {addresses.map((adress) => (
              <div
                key={adress._id}
                className="flex border  gap-x-2 px-2 py-1 rounded-md cursor-pointer"
              >
                <div className="flex flex-col ">
                  <h1>{adress.city}</h1>
                  <p>{adress.codePostal}</p>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <AdressModule load={load} setLoad={setLoad} />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
