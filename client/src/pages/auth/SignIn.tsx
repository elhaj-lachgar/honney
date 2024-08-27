import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import { useAuthContext } from "../../context/AuthContextProvider";
import { TErrorService, TUser } from "../../constant/types";
import { toastOption } from "../../lib";
import { TAuthCredentials, resolver } from "../../validator/auth.validator";
import axios from "axios";
import { useForm } from "react-hook-form";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../../firebase";
function SignIn() {
  const [view, setView] = useState(true);
  const [loading , setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const toast = useToast();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TAuthCredentials>({
    resolver,
  });
  const router = useNavigate();

  const GoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    try {
      const result = await signInWithPopup(auth, provider);
      const data = JSON.stringify({ email: result.user.email  , name : result.user.displayName});
      const url = BASE_URL + "/auth/google-sign-in";
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      if (res.data?.success) {
        const user = res.data.user as TUser;
        setAuthUser(user);
        window.localStorage.setItem("user", JSON.stringify(user));
        const option = toastOption(
          "success",
          "نجحت في تسجيل الدخول يا" + user.name
        );
        toast(option);
        router("/");
      } else {
        const error_message = "خطأ في تسجيل الدخول";
        const option = toastOption("error", error_message);
        toast(option);
      }
    } catch (error : any) {
      const err = error.response?.data as TErrorService 
      const option = toastOption("error", err.error);
      toast(option);
    }
  };
  const SignHandler = async (formData: TAuthCredentials) => {
    const { email, password } = formData;
    const url = BASE_URL + "/auth/sign-in";
    const data = JSON.stringify({ email, password });
    setLoading(true);
    try {
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      const Object_data = res.data;

      if (Object_data?.success) {
        const user = Object_data.user as TUser;
        setAuthUser(user);
        window.localStorage.setItem("user", JSON.stringify(user));
        const option = toastOption(
          "success",
          "نجحت في تسجيل الدخول يا" + user.name
        );
        toast(option);
        router("/");
      } else {
        const error_message =
          Object_data.error?.message || "لم تنجح في تسجيل الدخول";
        const option = toastOption("error", error_message);
        toast(option);
      }
    } catch (error:any) {
      const err = error.response?.data as TErrorService 
      const option = toastOption("error", err.error);
      toast(option);
    }
    setLoading(false);
  };

  return (
    <form
      dir="rtl"
      className="flex flex-col gap-y-4 p-2 px-3 rounded-md border min-w-[350px]  shadow-lg md:w-[450px] text-gray-500"
      onSubmit={handleSubmit(SignHandler)}
    >
      <h1 className="font-serif text-center text-black text-2xl">
        تسجيل الدخول
      </h1>
      <div className="flex flex-col gap-y-1 ">
        <label htmlFor="email">البريد</label>
        <InputGroup>
          <InputLeftElement>
            <Mail />
          </InputLeftElement>
          <Input
            type="email"
            placeholder="أدخل بريد ..."
            {...register("email")}
          />
        </InputGroup>
        {errors.email && (
          <p className="text-red-500 text-sm italic">{errors.email.message}</p>
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
            placeholder=" أدخل كلمة السر..."
            {...register("password")}
          />
        </InputGroup>
        {errors.password && (
          <p className="text-red-500 text-sm italic">
            {errors.password?.message}
          </p>
        )}
      </div>
      <Link
        to={"/forget-password/set-email"}
        className="flex justify-end color"
      >
        نسيت كلمة السير
      </Link>
      <button
        className="flex items-center cursor-pointer gap-x-2  border p-1 rounded-md"
        onClick={(e) => {
          e.preventDefault();
          GoogleSignIn();
        }}
      >
        <img
          src="/icon/google.png"
          alt="google icon"
          className="w-7 h-7 border "
        />
        <h1>تسجيل ب Google</h1>
      </button>
      <Button
        bg={"#dcb140"}
        isLoading={loading}
        _hover={{
          backgroundColor: "#F9C349",
        }}
        width={"100%"}
        color={"white"}
        type="submit"
      >
        تسجيل
      </Button>
      <hr />
      <div className="flex justify-center items-end gap-x-1">
        <p> ليس لديك حساب ?</p>
        <Link to={"/auth/sign-up"} className="color">
          {" "}
          إنشاء حساب
        </Link>
      </div>
    </form>
  );
}

export default SignIn;
