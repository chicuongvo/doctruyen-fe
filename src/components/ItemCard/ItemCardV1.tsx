import ItemImage from "../../assets/item1.webp";
export default function ItemCardV1() {
  return (
    <div className="item-card-v1 flex">
      <div className="">
        <img src={ItemImage} />
      </div>
      <div className="main-info">
        <div className="title-field">
          <span>Luna Lola: The Moon Wolf</span>
        </div>
        <div className="genre-field">
          <span>Luna Lola: The Moon Wolf</span>
        </div>
        <div className="description-field text-ellipsis">
          <span>
            "You're the moon wolf, Lola. You're the wolf with the power of the
            Moon goddess", Serena said, and collective gasps were heard
          </span>
        </div>
        <div className="flex justify-between">
          <span>429.2K views</span>
          <span>Completed</span>
        </div>
      </div>
    </div>
  );
}
