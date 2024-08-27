import {
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
} from "@chakra-ui/react";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ImageModule({ image }: { image: string[] }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = useRef<null | HTMLInputElement>(null);

  return (
    <>
      <img
        src={image[0]}
        alt="image of product"
        className="w-full object-cover cursor-zoom-in  h-96"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
        <ModalOverlay />
        <ModalContent>
          <Swiper
            autoplay={{ delay: 6000 }}
            navigation
            pagination={{ type: "bullets" }}
            modules={[Pagination, Navigation, Autoplay, Controller]}
            className="w-full h-[300px] "
          >
            {image.map((item, i) => (
              <SwiperSlide key={i}>
                <img src={item} className="object-fill h-[300px] w-full" alt="image item" />
              </SwiperSlide>
            ))}
          </Swiper>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageModule;
