import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { Eye, EyeOff, Mail, User } from "lucide-react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import { TErrorService, TUser } from "../../constant/types";
import { toastOption } from "../../lib";
import {
  TAuthCredentials,
  resolver,
} from "../../validator/auth-signup-validator";
import { useForm } from "react-hook-form";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAddressContext } from "../../context/AddressContextProvider";

function SignUp() {
  const [view, setView] = useState(true);
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useNavigate();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = useRef<null | HTMLInputElement>(null);
  const [restCode, setRestCode] = useState("");
  const { setLoad, load } = useAddressContext();
  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm<TAuthCredentials>({
    resolver,
  });

  const GoogleSignUp = async (email: string, name: string, avatar: string) => {
    try {
      const data = JSON.stringify({
        email,
        avatar,
        name,
      });
      const url = BASE_URL + "/auth/google-sign-up";
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      if (res.data?.success) {
        const user = res.data.user as TUser;
        setAuthUser(user);
        window.localStorage.setItem("user", JSON.stringify(user));
        const option = toastOption("success", "sign up successfly" + user.name);
        toast(option);
        router("/");
        setLoad(!load);
      } else {
        const error_message = "Sign up failed";
        const option = toastOption("error", error_message);
        toast(option);
      }
    } catch (error: any) {
      const error_message = error?.responce?.data?.error || "Sign up failed";
      const option = toastOption("error", error_message);
      toast(option);
    }
  };

  const VerficationEmail = async (email?: string) => {
    const url = BASE_URL + "/auth/ver-sign";
    if (!restCode || !email) return;
    const data = JSON.stringify({ email, restCode });
    try {
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      if (res.data?.success) {
        onClose();
        const user = res.data.user as TUser;
        setAuthUser(user);
        window.localStorage.setItem("user", JSON.stringify(user));
        const option = toastOption("success", "sign up is successful");
        toast(option);
        setLoad(!load);
        router("/");
      } else {
        const option = toastOption("error", "sign up is failed");
        toast(option);
      }
    } catch (error: any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error);
      toast(option);
    }
  };

  const SignUpHandler = async ({ email, password, name }: TAuthCredentials) => {
    const url = BASE_URL + "/auth/sign-up";
    const data = JSON.stringify({ email, password, name });
    setLoading(true);
    try {
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      const Object_data = res.data;

      if (Object_data?.success) {
        onOpen();
      } else {
        const error_message =
          Object_data.error?.message || " لم تنجح في إنشاء حساب";
        const option = toastOption("error", error_message);
        toast(option);
      }
    } catch (error: any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error);
      toast(option);
    }
    setLoading(false);
  };
  return (
    <form
      dir="rtl"
      className="flex flex-col gap-y-4 p-2 px-3 rounded-md border min-w-[350px]  shadow-lg md:w-[450px] text-gray-500"
      onSubmit={handleSubmit(SignUpHandler)}
    >
      <h1 className="font-serif text-center text-black text-2xl">إنشاء حساب</h1>
      <div className="flex flex-col gap-y-1 ">
        <label htmlFor="name">الأسم</label>
        <InputGroup>
          <InputLeftElement>
            <User />
          </InputLeftElement>
          <Input
            type="text"
            id="name"
            placeholder="أدخل الأسم..."
            {...register("name")}
          />
        </InputGroup>
        {errors.name && (
          <p className="text-sm italic text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-y-1 ">
        <label htmlFor="email">البريد</label>
        <InputGroup>
          <InputLeftElement>
            <Mail />
          </InputLeftElement>
          <Input
            type="email"
            id="email"
            placeholder="أدخل بريد ..."
            {...register("email")}
          />
        </InputGroup>
        {errors.email && (
          <p className="text-sm italic text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="password">كلمة السر</label>
        <InputGroup>
          <InputLeftElement>
            {view ? (
              <Eye className="cursor-pointer" onClick={() => setView(!view)} />
            ) : (
              <EyeOff
                className="cursor-pointer"
                onClick={() => setView(!view)}
              />
            )}
          </InputLeftElement>
          <Input
            type={!view ? "text" : "password"}
            id="password"
            placeholder=" أدخل كلمة السر..."
            {...register("password")}
          />
        </InputGroup>
        {errors.password && (
          <p className="text-sm italic text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>
      <GoogleLogin
        width={"100%"}
        onSuccess={(credentialResponse) => {
          if (!credentialResponse?.credential) return;
          const info = jwtDecode<{
            email: string;
            name: string;
            picture: string;
          }>(credentialResponse.credential);
          GoogleSignUp(info.email, info.name, info.picture);
        }}
        onError={() => {
          const err = "google auth failed";
          const option = toastOption("error", err);
          toast(option);
        }}
      />
      <>
        <Button
          bg={"#dcb140"}
          _hover={{
            backgroundColor: "#F9C349",
          }}
          width={"100%"}
          isLoading={loading}
          type="submit"
          color={"white"}
        >
          إنشاء
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
          <ModalOverlay />
          <ModalContent>
            <div className="p-4 flex flex-col gap-y-4">
              <h1 className="text-2xl font-serif">إرسال رقم</h1>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="rest-code" className="font-serif text-xl">
                  الرقم
                </label>
                <Input
                  type="number"
                  id="rest-code"
                  name="rest-code"
                  placeholder="000000"
                  onChange={(e) => setRestCode(e.currentTarget.value)}
                />
              </div>
              <p
                className="text-blue-500 cursor-pointer"
                onClick={() =>
                  SignUpHandler({
                    email: getValues("email"),
                    password: getValues("password"),
                    name: getValues("name"),
                  })
                }
              >
                {loading ? "...loading" : "resend code to email"}
              </p>
              <Button
                bg={"#dcb140"}
                _hover={{
                  backgroundColor: "#F9C349",
                }}
                width={"100%"}
                color={"white"}
                onClick={() => {
                  VerficationEmail(getValues("email"));
                }}
              >
                إرسال
              </Button>
            </div>
          </ModalContent>
        </Modal>
      </>
      <hr />
      <div className="flex justify-center items-end gap-x-1">
        <p>لديك حساب? </p>
        <Link to={"/auth/sign-in"} className="text-yellow-500">
          تسجيل الدخول
        </Link>
      </div>
    </form>
  );
}

export default SignUp;
