import { Button, Input, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  resolver,
  TCheckRestCodeCredentials,
} from "../../validator/check-rest";
import { useForm } from "react-hook-form";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import axios from "axios";
import { toastOption } from "../../lib";
import { useState } from "react";
import { TErrorService } from "../../constant/types";

function SetConfirmNumber() {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const checkRestCode = async (params: TCheckRestCodeCredentials) => {
    const url = BASE_URL + "/auth/check-rest";
    const email = window.localStorage.getItem("set-email") as string;
    if (!email) return;

    const data = JSON.stringify({ restCode: params.restCode, email });
    try {
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      if (res.data.success) {
        const option = toastOption("success", res.data.message);
        toast(option);
        router("/forget-password/set-password");
      } else {
        const message = "Error handler ";
        const option = toastOption("error", message);
        toast(option);
      }
    } catch (error : any) {
      const err = error.response?.data as TErrorService 
      const option = toastOption("error", err.error);
      toast(option);
    }
  };

  const setEmail = async (email: string) => {
    const url = BASE_URL + "/auth/set-email";
    const data = JSON.stringify({ email });
    setLoading(true);
    try {
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      if (res.data.success) {
        window.localStorage.setItem("set-email", email);
        const option = toastOption("success", res.data.message);
        toast(option);
        router("/forget-password/rest-code");
      } else {
        const message = "error hanbande";
        const option = toastOption("error", message);
        toast(option);
      }
    } catch (error) {
      const message = "error hanbande";
      const option = toastOption("error", message);
      toast(option);
    }
    setLoading(false);
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TCheckRestCodeCredentials>({
    resolver,
  });
  return (
    <form
      onSubmit={handleSubmit(checkRestCode)}
      className="p-3 border shadow-md w-11/12 mx-auto md:w-[350px] flex flex-col gap-y-4 rounded-md bg-white "
    >
      <h1 className="text-2xl font-serif">إرسال رقم</h1>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="email" className="font-serif text-xl">
          الرقم
        </label>
        <Input type="number" placeholder="000000" {...register("restCode")} />
        {errors.restCode && (
          <p className="text-red-500 text-sm italic">
            {errors.restCode.message}
          </p>
        )}
      </div>

      <p
        className="text-blue-500 cursor-pointer"
        onClick={() => {
          const email = window.localStorage.getItem("set-email") as string;
          if (!email) return;
          setEmail(email);
        }}
      >
        {loading ? "...loading" : "resend rest code"}
      </p>
      <Button
        bg={"#dcb140"}
        _hover={{
          backgroundColor: "#F9C349",
        }}
        width={"100%"}
        color={"white"}
        type="submit"
      >
        إرسال
      </Button>
    </form>
  );
}

export default SetConfirmNumber;
