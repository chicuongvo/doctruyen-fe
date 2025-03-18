import ItemImage from "../../assets/item1.webp";
export default function ItemCardV1() {
  return (
    <div className="item-card-v1 w-fit flex gap-3 lg:border-1 lg:border-gray-200 rounded-xl p-3">
      <div className="w-[160px] max-md:w-[116px] flex-none">
        <img src={ItemImage} className="w-full h-full rounded-lg" />
      </div>
      <div className="main-info font-spartan gap-2 flex flex-col">
        <div className="title-field font-semibold text-lg leading-5">
          <span className="">Luna Lola: The Moon Wolf</span>
        </div>
        <div className="genre-field text-primary">
          <span>Werewolf</span>
        </div>
        <div className="description-field grow">
          <span className=" line-clamp-3 text-sm">
            "You're the moon wolf, Lola. You're the wolf with the power of the
            Moon goddess", Serena said, and collective gasps were heard in the
            room. *** After being rejected by her mate in the Moonlit pack, Lola
            escaped on a full moon only to enter the territory of the next Alpha
            King, who also happened to be her second-chance mate. Adrian is the
            next Alpha King, but he hasn't been able to assume his role because
            he needs Luna by his side. A rogue who trespassed on his territory
            and whom he ordered to be killed turned out to be his mate, leaving
            him in a dilemma. Will Adrian reject Lola because she came into his
            territory as a rogue? Will he overcome what happened to him in the
            past and give Lola a chance, or reject her and go ahead with Fay as
            his chosen Luna? What will happen when everyone finds out just how
            much power Lola wields and how she's supposed to protect her kind in
            an oncoming war?
          </span>
        </div>
        <div className="flex justify-between text-sm items-center">
          <span className="whitespace-nowrap">429.2K views</span>
          <span>Completed</span>
        </div>
      </div>
    </div>
  );
}
