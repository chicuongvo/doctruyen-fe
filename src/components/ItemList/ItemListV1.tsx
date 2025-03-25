import React from "react";
import ItemCardV1 from "../ItemCard/ItemCardV1";
import ArrowIcon from "../../assets/arrow-icon.svg";
import ListHeader from "../ListHeader";

export default function ItemListV1(props: {
  showButton: boolean;
  title: string;
}) {
  const { showButton, title } = props;

  return (
    <div className="p-8 rounded-xl shadow-md mx-auto">
      <ListHeader title={title} showButton={showButton} />
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
