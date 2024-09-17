import { CalendarClockIcon, Mail, MapPinOff, User } from "lucide-react";
import ProfileBanner from "../../components/profile/ProfileBanner";
import AdressModule from "../../components/profile/AdressModule";
import { useAuthContext } from "../../context/AuthContextProvider";
import { Skeleton} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import AddressItem from "../../components/AddressItem";
import { useAddressContext } from "../../context/AddressContextProvider";

function ProfilePage() {
  const { authUser } = useAuthContext();
  const { addresses, load, setLoad, loading } = useAddressContext();
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
          <div className="min-h-[75px] flex flex-col gap-y-2">
            {loading ? (
              <Skeleton w={"full"} h={"12"} borderRadius={"10px"} />
            ) : addresses.length > 0 ? (
              addresses.map((address) => (
                <AddressItem
                  key={address._id}
                  address={address}
                  load={load}
                  setLoad={setLoad}
                  isProfile={false}
                />
              ))
            ) : (
              <div className="flex items-center justify-center">
                <div className="flex flex-col gap-y-2 items-center">
                  <MapPinOff className="size-12 text-yellow-500" />
                  <p className="text-lg text-gray-600">
                    لا يوجد عنوان، المرجو إضافته{" "}
                  </p>
                </div>
              </div>
            )}
          </div>
          <hr />
          <AdressModule load={load} setLoad={setLoad} />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
