import React from "react";
import { Route } from "react-router-dom";
import {connect} from "react-redux"

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import WithSpinner from "../../components/with-spinner/with-spinner.component"

import {firestore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils"
import {updateCollections} from "../../redux/shop/shop.actions"

import {} from "./shop.styles"

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
class ShopPage extends React.Component {
  state = {
    loading: true,
  }

  unsubscribeFromSnapshot = null

  componentDidMount() {
    const {updateCollections} = this.props;
    const collectionRef = firestore.collection('collections');
    
    // fetch("https://firestore.googleapis.com/v1/projects/crwn-db-b874f/databases/(default)/documents/collections")
    // .then(response => response.json())
    // .then(collections => {
    //   console.log(collections.documents)
    //   return collections.documents
    // })
    // .then(docs => {
    //   const collections = docs.reduce(
    //     (collectionsObject, currentDoc) => {
    //       return {
    //         ...collectionsObject,
    //         [currentDoc.fields.title.stringValue.toLowerCase()]: 
    //         {title: currentDoc.fields.title.stringValue,
    //         routeName: encodeURI(currentDoc.fields.title.stringValue.toLowerCase()),
    //         items: currentDoc.fields.items.arrayValue.values
    //           .reduce((collectionList, currentDoc) => {
    //             return [
    //               ...collectionList,
    //                 {id: currentDoc.mapValue.fields.id.integerValue,
    //                 imageUrl: currentDoc.mapValue.fields.imageUrl.stringValue,
    //                 name: currentDoc.mapValue.fields.name.stringValue,
    //                 price: currentDoc.mapValue.fields.price.integerValue}
    //               ]
    //           }, [])}}
    //     }, {})

    //   console.log(collections)
    //   updateCollections(collections)
    //   this.setState({loading: false})
    // })
    // .catch(error => console.log(error))

    //path to single item --> collections.documents[0].fields.items.arrayValue.values[0].mapValue.fields

    collectionRef.get().then(async (snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionsMap)
      // * remove setTimeout functionality
      setTimeout(() => this.setState({loading: false}), 125)
    })
  }

  render() {
    const {match} = this.props
    const {loading} = this.state

    return (
      <div className="shop-page">
        <Route 
          exact 
          path={`${match.path}`} 
          render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} 
        />
        <Route 
          path={`${match.path}/:collectionId`} 
          render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} 
        />
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
