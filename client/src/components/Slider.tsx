// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay   ,Controller} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { toastOption } from "../lib";
import { BASE_URL } from "../constant";
import axios from "axios";
import { Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type TBanner = {
  imageUrls: string[];
  _id: string;
};

const Slider = () => {
  const toast = useToast();
  const [banner, setBanner] = useState<TBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useNavigate();
  const getBanner = async () => {
    const url = `${BASE_URL}/banner`;
    try {
      const res = await axios.get(url);
      const data = res.data;
      if (data?.success) {
        setBanner(data.banner);
      } else {
        const option = toastOption("error", "error fetching data");
        toast(option);
      }
    } catch (error) {
      const option = toastOption("error", "error fetching data");
      toast(option);
    }
  };

  useEffect(() => {
    getBanner().finally(() => setLoading(false));
  }, []);

  return (
    <Swiper
      autoplay={{ delay: 6000 }}
      navigation
      pagination={{ type: "bullets" }}
      modules={[Pagination, Navigation, Autoplay , Controller]}
      className="h-96 w-full rounded-lg"
    >
      {loading ? (
        <SwiperSlide>
          <div className="flex items-center justify-center w-full h-full">
            <Spinner />
          </div>
        </SwiperSlide>
      ) : (
        <>
          {banner.map((item) => (
            <SwiperSlide key={item._id}>
              <img
                src={item.imageUrls[0]}
                onClick={() => router("/" + item._id)}
                className="h-full mx-auto cursor-pointer"
                alt="image item"
              />
            </SwiperSlide>
          ))}
        </>
      )}
    </Swiper>
  );
};

export default Slider;
