import ItemCardV2 from "../ItemCard/ItemCardV2";
import ListHeader from "../ListHeader";
export default function ItemListV2(props: {
  showButton: boolean;
  title: string;
}) {
  const { showButton, title } = props;

  return (
    <>
      <div className="p-8 rounded-xl shadow-md mx-auto">
        <ListHeader title={title} showButton={showButton} />

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
