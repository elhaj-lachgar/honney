import { Button, Input, useToast } from "@chakra-ui/react";
import { useAuthContext } from "../../context/AuthContextProvider";
import ChangeAvatarModule from "../../components/profile/ChangeAvatarModule";
import { useEffect, useState } from "react";
import { toastOption } from "../../lib";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import { TErrorService, TUser } from "../../constant/types";
import axios from "axios";
import { Helmet } from "react-helmet";

function EditProfile() {
  const { authUser, setAuthUser } = useAuthContext();
  const [change, setChange] = useState(false);
  const [load, setLoad] = useState(false);
  const [name, setName] = useState(authUser?.name);
  const toast = useToast();
  useEffect(() => {
    getUser();
  }, [load]);

  const getUser = async () => {
    const url = `${BASE_URL}/user/get-user`;
    try {
      const res = await axios.get(url);
      const Object_data = res.data;
      if (Object_data.success) {
        const user = Object_data.user as TUser;
        setAuthUser(user);
        window.localStorage.setItem("user", JSON.stringify(user));
      } else {
        const option = toastOption("error", "خطاء في عملية");
        toast(option);
      }
    } catch (error:any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error || "خطأ أثناء العملية ");
      toast(option);
    }
  };

  const updateProfile = async () => {
    if (!name || name == authUser?.name) return;
    const url = BASE_URL + "/user/update-profile";
    const data = JSON.stringify({ name });
    try {
      const res = await axios.put(url, data, { headers: DEFAULT_HEADER });
      const Object_data = res.data;

      if (Object_data?.success) {
        const option = toastOption("success", "تم تغير الإسم");
        toast(option);
        setLoad(!load);
      } else {
        const option = toastOption("error", "خطأ في عملية");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "خطأ في عملية");
      toast(option);
    }
  };

  return (
    <>
      <Helmet>
        <title>{authUser?.name}</title>
        <meta name="description" content={`change profile of ${authUser?.name}`} />
      </Helmet>{" "}
      <div className="flex items-center w-full justify-center h-screen">
        <form className="p-4 flex flex-col w-11/12 gap-y-4 border rounded-md shadow-md md:w-[400px]">
          <h1 className="font-serif text-2xl">تغير الملف</h1>
          <div className="flex flex-col gap-y-1">
            <label>الاسم</label>
            <Input
              defaultValue={name}
              onChange={(e) => {
                const {
                  currentTarget: { value },
                } = e;
                if (value != authUser?.name) {
                  setChange(true);
                } else {
                  setChange(false);
                }
                setName(value);
              }}
            />
          </div>
          <ChangeAvatarModule setLoad={setLoad} load={load} />
          <Button
            disabled={!change}
            onClick={() => {
              if (!change) {
                const option = toastOption("error", "لم تغير الأسم");
                toast(option);
              } else {
                updateProfile();
              }
            }}
            cursor={change ? "pointer" : "not-allowed"}
            bg={"#dcb140"}
            _hover={{
              backgroundColor: "#F9C349",
            }}
            width={"100%"}
            color={"white"}
          >
            حفظ
          </Button>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
