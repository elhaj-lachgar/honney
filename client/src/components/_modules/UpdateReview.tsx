import {
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  MenuItem,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import StarRatings from "react-star-ratings";
import {  TReview } from "../../constant/types";
import { BASE_URL, DEFAULT_HEADER } from "../../constant";
import { toastOption } from "../../lib";
import axios from "axios";

const emojis = ["😞", "😔", "😒", "😏", "😊"];

function UpdateReview({
  review,
  setLoad,
  load,
  productId
}: {
  review: TReview;
  setLoad: (vl: boolean) => void;
  load: boolean;
  productId : string
}) {
  const [rate, setRate] = useState(review.rate);
  const [content, setContent] = useState(review.content);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = useRef<null | HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const UpdateReview = async () => {
    const url = BASE_URL + "/review/update-review/" + review._id;
    if (rate == review.rate && content == review.content) {
      const option = toastOption("error", "rate and content are not changed");
      toast(option);
      return;
    }
    const data = JSON.stringify({ content, rate , productId });
    setLoading(true);
    try {
      const res = await axios.put(url, data, { headers: DEFAULT_HEADER });

      if (res.data?.success) {
        const option = toastOption("success", "successfully updating the review");
        toast(option);
        onClose();
        setLoad(!load);
      } else {
        const message = "Error updating failed";
        const option = toastOption("error", message);
        toast(option);
      }
    } catch (error: any) {

      const err = error.response?.data.error || "Error updating review" ;
      const option = toastOption("error", err );
      toast(option);
    }
    setLoading(false);
  };
  return (
    <>
      <MenuItem onClick={onOpen}>تعديل</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
        <ModalOverlay />
        <ModalContent>
          <div className="flex flex-col justify-center gap-y-3 p-2">
            <h1>Feed Back</h1>
            <div className="flex gap-x-2">
              <StarRatings
                changeRating={(rating) => setRate(rating)}
                starDimension="30px"
                starSpacing="0.25px"
                starRatedColor="yellow"
                starHoverColor="yellow"
                rating={rate}
              />
              <p className="text-2xl">{emojis[rate - 1]}</p>
            </div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.currentTarget.value)}
            />
            <Button
              colorScheme="blue"
              isLoading={loading}
              onClick={UpdateReview}
            >
              Save
            </Button>
          </div>
        </ModalContent>
      </Modal>{" "}
    </>
  );
}

export default UpdateReview;
