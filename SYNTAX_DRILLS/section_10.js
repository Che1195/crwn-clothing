/*********************************************************
 * 138. Directory State Into Redux
 **********************************************************/

// create a new redux folder for the directory component and create a reducer file
// moving the shop data to the reducer makes it easier to test

const INITIAL_STATE = {
  sections: [
    {
      title: "hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
      id: 1,
      linkUrl: "hats",
    },
    {
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      id: 2,
      linkUrl: "",
    },
    {
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      id: 3,
      linkUrl: "",
    },
    {
      title: "womens",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
      size: "large",
      id: 4,
      linkUrl: "",
    },
    {
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
      size: "large",
      id: 5,
      linkUrl: "",
    },
  ],
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      // since we don't have any actions we can go straight to the default
      return state;
  }
};

export default directoryReducer;

// add the directory reducer to the root reducer file

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import CartReducer from "./cart/cart.reducer";
import UserReducer from "./user/user.reducer";
import directoryReducer from "./directory/directory.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: UserReducer,
  cart: CartReducer,
  directory: directoryReducer,
});

export default persistReducer(persistConfig, rootReducer);

// convert the directory component into a regular functional component
// since we no longer need state

import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import "./directory.styles.scss";

import { connect } from "react-redux";

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

// create the selector file for the components state

import { createSelector } from "reselect";

const selectDirectory = (state) => state.directory; // input selector

export const selectDirectorySections = createSelector(
  // memoized selector
  [selectDirectory],
  (directory) => directory.sections
);

// add the selectors to the directory component

import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import "./directory.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selectors.js";

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);

/*********************************************************
 * 139. Directory State Into Redux
 * Moving the shop information for the shop page into its own reducer
 **********************************************************/

// the routine is pretty much the same as for the directory component except
// we need to assign the SHOP_DATA to a key arbitrally called collections
// in the reducer function

/*********************************************************
 * 140. Collection Overview Component
 * creating a page for each type of item in the SHOP_DATA
 **********************************************************/

// make the collections overview folder and component and styles files

import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCollections } from "../../redux/shop/shop.selectors";

import { CollectionPreview } from "./../../components/collection-preview/collection-preview.component";

import "./collections-overview.styles.scss";

const collectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

export default connect(mapStateToProps)(collectionsOverview);

// modify the ShopPage to account for the collections-overview component we just created

import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

import "./shop.styles.scss";

const ShopPage = () => (
  <div className="shop-page">
    <CollectionsOverview />
  </div>
);

export default ShopPage;
