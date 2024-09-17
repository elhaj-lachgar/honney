// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, Controller } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { TBanner } from "../constant/types";

const Slider = ({ banner }: { banner: TBanner[] }) => {
  const router = useNavigate();

  return (
    <Swiper
      autoplay={{ delay: 6000 }}
      spaceBetween={10}
      loop={true}
      navigation
      pagination={{ type: "bullets" }}
      modules={[Pagination, Navigation, Autoplay, Controller]}
      className="h-96 md:h-[500px] relative w-full rounded-lg"
    >
      <>
        {banner.map((item) => (
          <SwiperSlide key={item._id}>
            <img
              src={item.imageUrls[0]}
              onClick={() => router("/" + item._id)}
              className="h-full  w-full bg-center  mx-auto object-cover  cursor-pointer"
              alt="image item"
            />
          </SwiperSlide>
        ))}
      </>
    </Swiper>
  );
};

export default Slider;
