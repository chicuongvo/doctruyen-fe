import { Swiper, SwiperSlide } from "swiper/react";
import ItemCardV2 from "../ItemCard/ItemCardV2";
// import "swiper/css";

export default function ItemListV2() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={6}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <ItemCardV2 />
      </SwiperSlide>
      <SwiperSlide>
        <ItemCardV2 />
      </SwiperSlide>

      <SwiperSlide>
        <ItemCardV2 />
      </SwiperSlide>
      <SwiperSlide>
        <ItemCardV2 />
      </SwiperSlide>
      <SwiperSlide>
        <ItemCardV2 />
      </SwiperSlide>
      <SwiperSlide>
        <ItemCardV2 />
      </SwiperSlide>
    </Swiper>
  );
}
