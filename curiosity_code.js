    fetch("https://firestore.googleapis.com/v1/projects/crwn-db-b874f/databases/(default)/documents/collections")
    .then(response => response.json())
    .then(collections => {
      console.log(collections.documents)
      return collections.documents
    })
    .then(docs => {
      const collections = docs.reduce(
        (collectionsObject, currentDoc) => {
          return {
            ...collectionsObject,
            [currentDoc.fields.title.stringValue.toLowerCase()]: 
            {title: currentDoc.fields.title.stringValue,
            routeName: encodeURI(currentDoc.fields.title.stringValue.toLowerCase()),
            items: currentDoc.fields.items.arrayValue.values
              .reduce((collectionList, currentDoc) => {
                return [
                  ...collectionList,
                    {id: currentDoc.mapValue.fields.id.integerValue,
                    imageUrl: currentDoc.mapValue.fields.imageUrl.stringValue,
                    name: currentDoc.mapValue.fields.name.stringValue,
                    price: currentDoc.mapValue.fields.price.integerValue}
                  ]
              }, [])}}
        }, {})

      console.log(collections)
      updateCollections(collections)
      this.setState({loading: false})
    })
    .catch(error => console.log(error))

    path to single item --> collections.documents[0].fields.items.arrayValue.values[0].mapValue.fields