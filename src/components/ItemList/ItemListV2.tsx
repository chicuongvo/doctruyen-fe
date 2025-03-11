import { Swiper, SwiperSlide } from "swiper/react";
import ItemCardV2 from "../ItemCard/ItemCardV2";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "swiper/css";

const splideOptions: any = {
  type: "loop",
  drag: "free",
  snap: true,
  gap: "1rem",
  focus: "center",
  pagination: false,
  breakpoints: {
    640: { perPage: 2 },
    960: { perPage: 2 },
    1200: { perPage: 5 },
  },
};
export default function ItemListV2() {
  return (
    <>
      <div className="title font-semibold text-2xl">
        <h1 className="mb-2">Editor’s Choice</h1>
      </div>
      <Splide options={splideOptions} aria-label="React Splide Example">
        <SplideSlide>
          <ItemCardV2 />
        </SplideSlide>
        <SplideSlide>
          <ItemCardV2 />
        </SplideSlide>
        <SplideSlide>
          <ItemCardV2 />
        </SplideSlide>
        <SplideSlide>
          <ItemCardV2 />
        </SplideSlide>
        <SplideSlide>
          <ItemCardV2 />
        </SplideSlide>
        <SplideSlide>
          <ItemCardV2 />
        </SplideSlide>
        <SplideSlide>
          <ItemCardV2 />
        </SplideSlide>
      </Splide>
      {/* <div className="swiper">
        <Swiper
          spaceBetween={10}
          onSlideChange={() => console.log("slide change")}
          // slidesPerView={2}
          breakpoints={{
            "640": {
              slidesPerView: 4,
            },
            "768": {
              slidesPerView: 4,
            },
            "1024": {
              slidesPerView: 5,
            },
            "1280": {
              slidesPerView: 6,
            },
            default: {
              slidesPerView: 2,
            },
          }}
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
        </Swiper> */}
      {/* </div> */}
    </>
  );
}
