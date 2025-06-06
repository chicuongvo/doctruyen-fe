import Banner from "../assets/banner.png";
import GooglePlay from "../assets/ggplay.svg";
import QR from "../assets/qr.svg";
import Appstore from "../assets/appstore.svg";
import ItemListV2 from "../components/ItemList/ItemListV2";
import ItemListV1 from "../components/ItemList/ItemListV1";
import BlogList from "../components/ItemList/BlogList";
import { Link } from "react-router-dom";
function AppDownloadIcon(src: string) {
  return (
    <div>
      <Link to="/">
        <img
          width="170"
          height="56"
          alt="Google Play Store"
          title="Download on the Google Play Store"
          src={src}
          className="w-full max-w-[170px] h-auto"
        />
      </Link>
    </div>
  );
}
export default function Home() {
  return (
    <div className="bg-black text-white dark:bg-zinc-100 dark:text-black">
      <div className="banner py-20 relative w-full border-box font-spartan">
        <img
          className="w-full h-full absolute top-0 left-0 object-cover object-[54%_100%]"
          src={Banner}
          alt="Ảnh bìa trang chủ"
        />
        <div className="max-w-screen-xl relative mx-auto px-[1rem]">
          <div className="w-6/12 max-lg:w-8/12 max-md:w-full">
            <div className="text-4xl text-white font-bold md:text-7xl md:mb-10 md:leading-[68px]">
              <span className="text-violet-600">Đọc</span> hay, <br />
              <span className="text-violet-600"> Nghe</span> đã!
            </div>
            <p className="mb-5 text-sm font-normal italic text-[#BCBCBC] w-[75%]">
              Vừa đọc vừa nghe, cảm xúc gấp đôi - bạn chọn cách nào?
            </p>
          </div>
          <h1 className="mb-2 max-md:mb-1 max-md:text-sm text-white">
            Đọc truyện tranh miễn phí bất cứ lúc nào, bất cứ đâu
          </h1>
          <div className="flex gap-3 justify-start items-center w-full">
            {AppDownloadIcon(GooglePlay)}
            {AppDownloadIcon(Appstore)}
            <div className="flex items-center px-4 bg-[#060606] bg-opacity-50 rounded-lg h-[56px] max-md:hidden">
              <img
                loading="lazy"
                alt="Scan QR"
                width="48"
                height="48"
                title="Scan QR"
                src={QR}
                className="mr-3 w-[48px] h-[48px]"
              />
              <span className="text-gray-200 text-xs leading-[14px] w-[100px]">
                Quét mã QR để tải ứng dụng
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content py-8 px-[1rem] max-w-screen-xl mx-auto rounded-xl mx-auto box-border">
        <div className="mb-6 p-8 rounded-xl shadow-md mx-auto bg-zinc-800 dark:bg-zinc-200">
          <ItemListV2 title="Truyện hàng đầu" />
        </div>
        <div className="p-8 mb-6 rounded-xl shadow-md mx-auto bg-zinc-800 dark:bg-zinc-200">
          <ItemListV1 showButton={true} title="Truyện nên đọc" />
        </div>
        <div className="rounded-xl mb-6 ">
          <BlogList title="Các blogs gần đây" />
        </div>
        <div className="p-8 mb-6 rounded-xl shadow-md mx-auto bg-zinc-800 dark:bg-zinc-200">
          <ItemListV2 title="Truyện cho trẻ" />
        </div>
      </div>
    </div>
  );
}
