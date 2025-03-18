import ItemCardV2 from "../ItemCard/ItemCardV2";
import ListHeader from "../ListHeader";
export default function ItemListV2() {
  return (
    <>
      <div className="shadow-xl px-3">
        <ListHeader title="Editor’s Choice" />
        <div className="flex gap-2 overflow-auto gap-3 scrollbar-hidden justify-center">
          <ItemCardV2 showTags={true} />
          <ItemCardV2 showTags={true} />
          <ItemCardV2 showTags={true} />
          <ItemCardV2 showTags={true} />
          <ItemCardV2 showTags={true} />
          <ItemCardV2 showTags={true} />
        </div>
      </div>
    </>
  );
}
