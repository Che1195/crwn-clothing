import React from "react";
import { connect } from "react-redux";

import { addItem } from "../../redux/cart/cart.actions";

import { CollectionFooterContainer, CollectionItemButton, CollectionItemContainer, ImageContainer, NameContainer, PriceContainer } from "./collection-item.styles"

const CollectionItem = ({ item, addItem }) => {
  const { imageUrl, price, name } = item;

  return (
    <CollectionItemContainer>
      <ImageContainer className='image' imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>${price}</PriceContainer>
      </CollectionFooterContainer>
      <CollectionItemButton onClick={() => addItem(item)} inverted>
        {" "}
        Add To Cart{" "}
      </CollectionItemButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
