/*********************************************************
 * 141. Nested Routing in Shop Page
 **********************************************************/

// in the ShopPage put the collections overview in a route

// create a new page called category

// create a route component in the shop page that gives us a categoryId paramter
// in the match property

//// shop.component.jsx

import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import "./shop.styles.scss";

// the match (along with location and history) prop is automatically passed into
// our ShopPage component since it is nested inside of a route in App.js
const ShopPage = ({ match }) => {
  console.log(match);

  return (
    <div className="shop-page">
      {/* when the url is "/shop" it will show the collectiosn overview component
    and when it is "shop/hats" it will show the collection page for that collection */}
      {/* match.path tells us our current location, which we can tack on "/:category" */}
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
};

export default ShopPage;

//// collection.component.jsx

import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selectors";

import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;

  return (
    <div className="collection">
      <h2>{title}</h2>
      {items.map((item) => (
        <CollectionItem key={item.id} item={item} />
      ))}
    </div>
  );
};

// ownprops are the props of the component being wrapped in the connect()(..)
// selectCollection is a function that returns a function (because of memoize i think)
// so we pass state into that to "wire everthing together"
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);

/*********************************************************
 * 142. Improving Naming of Component
 * changing the naming from category to collection
 **********************************************************/

/*********************************************************
 * 143. Collection Routing and Selector
 **********************************************************/

// create a collection id map in the shop.selectors file
import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

// create a memoized collection selector that leverages the collection id map
// add the lodash.memoize package to the project and use it to memoize
// selectCollection

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    )
  )
);

// mapStateToProps in collection.component will include a second argument

/// ownprops are the props of the component being wrapped in the connect()(..)
/// selectCollection is a function that returns a function so we pass state into that
/// to "wire everthing together"
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.categoryId)(state),
});

export default connect(mapStateToProps)(CollectionPage);

/*********************************************************
 * 146. Data Normalization + Collection Page
 **********************************************************/

 // data normalization is storing lists of elements inside of an object instead of
 // an array

 // convert the SHOP_DATA list into an object with each element is attached to a key
 // that is the lower case of that item

 // change selectCollection to find the right item based on its key, instead of ID.
 export const selectCollection = memoize((collectionUrlParam) =>
 createSelector(
   [selectCollections], 
   (collections) => collections[collectionUrlParam]
 )
);

/*********************************************************
 * 148. Data Flow in Our App
 **********************************************************/

 // our collectionOverview is broken since we changed the shop data into a hash table
 // so we need to make a new selector that converts it back into an array

 export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
)


