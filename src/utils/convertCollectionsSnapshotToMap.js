 const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  return transformedCollection.reduce  ((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection
    return acc
  }, {})
}
export default convertCollectionsSnapshotToMap