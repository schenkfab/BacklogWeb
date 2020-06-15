const API_HOST = process.env.VUE_APP_API_HOST

module.exports = {
  POST_FEED () {
    return `${API_HOST}/api/feeds`
  },
  GET_FEED () {
    return `${API_HOST}/api/feeds`
  },
  POST_Subscription () {
    return `${API_HOST}/api/subscriptions`
  },
  POST_AddItems () {
    return `${API_HOST}/api/subscriptions/additems`
  },
  DELETE_Subscription (id) {
    return `${API_HOST}/api/subscriptions/${id}`
  },
  GET_User () {
    return `${API_HOST}/api/users`
  },
  POST_NON_DUB_USER () {
    return `${API_HOST}/api/users`
  },
  PATCH_ITEM (itemId, statusId) {
    return `${API_HOST}/api/users/${itemId}/${statusId}`
  },
  POST_ERROR () {
    return `${API_HOST}/api/errors`
  },
  GET_COLLECTIONS () {
    return `${API_HOST}/api/collections`
  },
  POST_COLLECTION () {
    return `${API_HOST}/api/collections`
  },
  POST_IMPORT_OPML () {
    return `${API_HOST}/api/feeds/importopml`
  },
  GET_FOLLOWS () {
    return `${API_HOST}/api/follows`
  },
  POST_FOLLOW () {
    return `${API_HOST}/api/follows`
  },
  DELETE_FOLLOW (id) {
    return `${API_HOST}/api/follows/${id}`
  },
  POST_AddFeedToCollection () {
    return `${API_HOST}/api/collections/addfeedtocollection`
  },
  GET_CollectionStatistics () {
    return `${API_HOST}/api/collections/statistics`
  },
  DELETE_RemoveFeedFromCollection (feedId, collectionId) {
    return `${API_HOST}/api/collections/removefeedfromcollection/${collectionId}/${feedId}`
  }
}
