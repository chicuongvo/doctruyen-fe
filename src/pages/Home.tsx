import Banner from "../assets/banner.png";
import GooglePlay from "../assets/ggplay.svg";
import QR from "../assets/QR.svg";
import Appstore from "../assets/Appstore.svg";
import ItemListV2 from "../components/ItemList/ItemListV2";
import ItemListV1 from "../components/ItemList/ItemListV1";
import BlogList from "../components/ItemList/BlogList";

function AppDownloadIcon(src: string) {
  return (
    <div>
      <a
        href="https://play.google.com/store/apps/details?id=com.fiction.me"
        aria-label="play store"
      >
        <img
          width="170"
          height="56"
          alt="Google Play Store"
          title="Download on the Google Play Store"
          src={src}
          className="w-full max-w-[170px] h-auto"
        />
      </a>
    </div>
  );
}
export default function Home() {
  return (
    <div className="">
      <div className="banner py-20 relative w-full border-box">
        <img
          className="w-full h-full absolute top-0 left-0 object-cover object-[54%_100%]"
          src={Banner}
        />
        <div className="max-w-screen-xl relative mx-auto px-[1rem]">
          <div className="w-6/12 max-lg:w-8/12 max-md:w-full">
            <div className="text-4xl text-white font-bold md:text-7xl md:mb-10 md:leading-[68px]">
              The Merciless
              <br />
              Alpha{" "}
              <span className="text-primary text-[rgb(160,81,250)]">
                Killer
              </span>
            </div>
            <p className="mb-5 text-sm font-normal italic text-[#BCBCBC] w-[75%]">
              {" "}
              “Murderer!” Everything changes for Anaiah Ross when she killed
              someone following her first unexpected shift into her wolf.{" "}
            </p>
          </div>
          <h1 className="mb-2 max-md:mb-1 max-md:text-sm text-white">
            Read novels online anytime and anywhere
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
                Scan the QR code to download the app
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content py-8 px-[1rem] max-w-screen-xl mx-auto mb-6 rounded-xl mx-auto box-border">
        <div className="mb-6">
          <ItemListV2 />
        </div>
        <div className="p-8 mb-6 rounded-xl shadow-md mx-auto">
          <ItemListV1 showButton={true} />
        </div>
        <div className="rounded-xl mb-6">
          <BlogList />
        </div>
        <div>
          <ItemListV2 />
        </div>
      </div>
    </div>
  );
}
