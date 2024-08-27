import {
  Avatar,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
  useToast,
} from "@chakra-ui/react";
import { TErrorService, TReview, TUser } from "../constant/types";
import { EllipsisVertical } from "lucide-react";
import StarRating from "react-star-ratings";
import { useEffect, useState } from "react";
import { BASE_URL, DEFAULT_HEADER } from "../constant";
import { useAuthContext } from "../context/AuthContextProvider";
import axios from "axios";
import UpdateReview from "./_modules/UpdateReview";
import { toastOption } from "../lib";

function ReviewItem({
  review,
  productId,
  load,
  setLoad,
}: {
  setLoad: (val: boolean) => void;
  load: boolean;
  review: TReview;
  productId: string;
}) {
  const [user, setUser] = useState<TUser | null>(null);
  const toast = useToast();
  const { authUser } = useAuthContext();
  const getUser = async () => {
    const url = BASE_URL + "/user/review-user/" + review.user;
    try {
      const res = await axios.get(url);
      if (res.data?.success) {
        setUser(res.data?.user);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteReview = async () => {
    if (!productId) return;
    if (authUser?._id != user?._id) return;
    const url = BASE_URL + "/review/delete-review/" + review._id;
    const data = JSON.stringify({ productId });
    try {
      const res = await axios.delete(url, { data, headers: DEFAULT_HEADER });
      if (res.data?.success) {
        const option = toastOption("success", "Success Delete review");
        toast(option);
        setLoad(!load);
      } else {
        const option = toastOption("error", "failed Delete review");
        toast(option);
        setLoad(!load);
      }
    } catch (error: any) {
      const err = error.response?.data as TErrorService;
      const option = toastOption("error", err.error);
      toast(option);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="flex flex-col gap-y-1  border rounded-md p-1 ">
      <div className="flex justify-between gap-x-2 items-center  ">
        <div className="flex items-center gap-x-2  ">
          <Avatar src={user?.avatar} />
          <div className="flex flex-col">
            <p>{user?.name}</p>
            <StarRating
              starDimension="15px"
              starSpacing="0.25px"
              starRatedColor="yellow"
              starHoverColor="yellow"
              rating={review.rate}
            />
          </div>
        </div>
        {authUser?._id == user?._id && (
          <>
            <Menu>
              <MenuButton>
                <EllipsisVertical />
              </MenuButton>
              <MenuList>
                <UpdateReview review={review} load={load} setLoad={setLoad} productId={productId}/>
                <MenuItem color={"red"} onClick={DeleteReview}>
                  حذف
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </div>
      <p>{review.content}</p>
    </div>
  );
}

export default ReviewItem;
