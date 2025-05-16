import ItemCardV1 from "../ItemCard/ItemCardV1";
// import ArrowIcon from "../../assets/arrow-icon.svg";
import ListHeader from "../ListHeader";

export default function ItemListV1(props: { showButton: boolean }) {
  const { showButton } = props;
  console.log(showButton);
  return (
    <div>
      <ListHeader title="Editor’s Choice-x" />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <ItemCardV1 />
        <ItemCardV1 />
        <ItemCardV1 />
        <ItemCardV1 />
        <ItemCardV1 />
        <ItemCardV1 />
      </div>
    </div>
  );
}
