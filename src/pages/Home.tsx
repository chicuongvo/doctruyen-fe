import Header from "../layout/Header/Header";
import Banner from "../assets/banner.png";
import GooglePlay from "../assets/ggplay.svg";
import QR from "../assets/QR.svg";
import Appstore from "../assets/Appstore.svg";
import ItemListV2 from "../components/ItemList/ItemListV2";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="banner py-20 relative">
        <img
          className="w-full h-full absolute top-0 left-0 object-center object-cover"
          src={Banner}
        />
        <div className="relative max-w-screen-xl mx-auto">
          <div className="w-6/12 max-lg:w-8/12 max-md:w-full">
            <div className="text-4xl font-semibold md:text-7xl md:mb-10 md:leading-[68px]">
              The Merciless
              <br />
              Alpha{" "}
              <span className="text-primary text-[rgb(160,81,250)]">
                Killer
              </span>
            </div>
            <p className="mb-5 md:mb-[56px] md:text-lg text-sm font-normal italic text-[#BCBCBC] max-md:w-[75%]">
              {" "}
              “Murderer!” Everything changes for Anaiah Ross when she killed
              someone following her first unexpected shift into her wolf.{" "}
            </p>
          </div>
          <h1 className="mb-2 max-md:mb-1 max-md:text-sm">
            Read novels online anytime and anywhere
          </h1>
          <div className="flex">
            <img src={GooglePlay} />
            <img src={Appstore} />
            <div className="flex items-center rounded-lg px-4 bg-[#060606]">
              <img src={QR} className="w-[48px] h-[48px] mr-3" />
              <span className="text-xs w-[100px]">
                Scan the qr-code to download the app
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content max-w-screen-2xl">
        <ItemListV2 />
      </div>
    </div>
  );
}
