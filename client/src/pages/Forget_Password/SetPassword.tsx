import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  resolver,
  TSetPasswordCredentials,
} from "../../validator/set-password";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import axios from "axios";
import { useState } from "react";
import { toastOption } from "../../lib";

function SetPassword() {
  const router = useNavigate();
  const [passwordView, setPasswordView] = useState(true);
  const [confirmPasswordView, setConfirmPasswordView] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<TSetPasswordCredentials>({
    resolver,
  });

  const SetPassword = async (params: TSetPasswordCredentials) => {
    const url = BASE_URL + "/auth/set-password";
    const email = window.localStorage.getItem("set-email");
    const valid = confirmPassword == params.new_password;
    if (!valid) {
      setErrorConfirmPassword("confirm password is incorrect");
      return;
    }
    if (!email) return;
    const data = JSON.stringify({
      email,
      new_password: params.new_password,
      confirm_password: confirmPassword,
    });
    setLoading(true);
    try {
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      if (res.data.success) {
        const option = toastOption("success", res.data.message);
        toast(option);
        window.localStorage.removeItem("set-email");
        router("/auth/sign-in");
      } else {
        const message = "خطأ أثناء العملية ";
        const option = toastOption("error", message);
        toast(option);
      }
    } catch (error) {
      const message = "خطأ أثناء العملية ";
      const option = toastOption("error", message);
      toast(option);
    }
    setLoading(false);
    setErrorConfirmPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit(SetPassword)}
      className="p-3 border shadow-md w-11/12 mx-auto md:w-[350px] flex flex-col gap-y-4 rounded-md bg-white "
    >
      <h1 className="text-2xl font-serif">إرسال كلمة السر</h1>
      <div className="flex-col flex gap-y-1">
        <label htmlFor="new_password">كلمة سر الجديدة</label>
        <InputGroup>
          <InputLeftElement>
            {passwordView ? (
              <Eye
                className="cursor-pointer"
                onClick={() => setPasswordView(!passwordView)}
              />
            ) : (
              <EyeOff
                className="cursor-pointer"
                onClick={() => setPasswordView(!passwordView)}
              />
            )}
          </InputLeftElement>
          <Input
            type={!passwordView ? "text" : "password"}
            placeholder="أدخل كلمة سر الجديدة..."
            id="new_password"
            {...register("new_password")}
          />
        </InputGroup>
        {errors.new_password && (
          <p className="text-sm italic text-red-500">
            {errors.new_password.message}
          </p>
        )}
      </div>
      <div className="flex-col flex gap-y-1">
        <label htmlFor="confirm-password">تأكيد كلمة السر</label>
        <InputGroup>
          <InputLeftElement>
            {confirmPasswordView ? (
              <Eye
                className="cursor-pointer"
                onClick={() => setConfirmPasswordView(!confirmPasswordView)}
              />
            ) : (
              <EyeOff
                className="cursor-pointer"
                onClick={() => setConfirmPasswordView(!confirmPasswordView)}
              />
            )}
          </InputLeftElement>
          <Input
            type={!confirmPasswordView ? "text" : "password"}
            id="confirm-password"
            name="confirm-password"
            placeholder="أدخل تأكيد كلمة السر..."
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          />
        </InputGroup>
        {errorConfirmPassword && (
          <p className="text-sm italic text-red-500">{errorConfirmPassword}</p>
        )}
      </div>
      <Button
        bg={"#dcb140"}
        _hover={{
          backgroundColor: "#F9C349",
        }}
        width={"100%"}
        color={"white"}
        type="submit"
        isLoading={loading}
      >
        إرسال
      </Button>
    </form>
  );
}

export default SetPassword;
