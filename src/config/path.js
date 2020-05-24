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
  }
}
