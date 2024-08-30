import { Button, Textarea, useToast } from "@chakra-ui/react";
import StarRating from "react-star-ratings";
import {
  resolver,
  TReviewCredentials,
} from "../validator/create-review-validator";
import { useForm } from "react-hook-form";
import { toastOption } from "../lib";
import { BASE_URL, DEFAULT_HEADER } from "../constant";
import { TErrorService } from "../constant/types";
import axios from "axios";
import { useState } from "react";
type TProps = {
  load: boolean;
  productId: string;
  setLoad: (vl: boolean) => void;
  value: boolean;
};

function CreateReviewComp({ load, setLoad, productId, value = false }: TProps) {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const toast = useToast();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TReviewCredentials>({
    resolver,
  });

  const CreateReviewHandler = async (params: TReviewCredentials) => {
    if (!value) {
      const option = toastOption("error", "يمكنك التعليق بعد توصلك بالمنتج");
      toast(option);
      return;
    }

    const url = BASE_URL + "/review/create-review";

    const data = JSON.stringify({
      rate: rating,
      content: params.content,
      productId,
    });

    setLoading(true);
    try {
      const res = await axios.post(url, data, { headers: DEFAULT_HEADER });
      if (res.data?.success) {
        const option = toastOption("success", "شكرا لمراجعتك");
        toast(option);
        setLoad(!load);
      } else {
        const option = toastOption("error", "فشل إنشاء المراجعة");
        toast(option);
      }
    } catch (error: any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error || "فشل إنشاء المراجعة");
      toast(option);
    }
    setLoading(false);
  };

  return (
    <>
      {value ? (
        <div className="flex flex-col gap-y-5 p-5 ">
          <h1>إضافة تقيم</h1>
          <form
            onSubmit={handleSubmit(CreateReviewHandler)}
            className="flex flex-col gap-y-3 "
          >
            <div className="flex items-center gap-x-2">
              النجوم :
              <div className="flex items-center">
                <StarRating
                  changeRating={(rating) => setRating(rating)}
                  starDimension="20px"
                  starSpacing="1px"
                  starRatedColor="yellow"
                  starHoverColor="yellow"
                  rating={rating}
                />
                {"     "}
                {rating} النجمة
              </div>
            </div>
            <div className="flex flex-col gap-y-0.5">
              <Textarea
                placeholder="نرحب بجميع أرائكم ..."
                {...register("content")}
              />
              {errors.content && (
                <p className="text-red-500 italic text-sm">
                  {errors.content.message}
                </p>
              )}
            </div>
            <Button
              isLoading={loading}
              bg={"#dcb140"}
              _hover={{
                backgroundColor: "#F9C349",
              }}
              color={"white"}
              type="submit"
            >
              نشر{" "}
            </Button>
          </form>
        </div>
      ) : (
        <p className="text-sm text-red-500 italic w-full text-center py-2">
          {"يمكنك التعليق بعد توصلك بالمنتج"}
        </p>
      )}
    </>
  );
}

export default CreateReviewComp;
