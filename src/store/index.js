import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _URLs from '../config/path'

Vue.use(Vuex)

const MINUTES_BETWEEN_API_CALLS = 5

export default new Vuex.Store({
  state: {
    opml: [],
    error: null,
    loading: false,
    feeds: [],
    feedsLastLoad: null,
    token: {
      token: ''
    },
    user: {
    },
    collections: [],
    collectionsLastLoad: null,
    mycollections: [],
    collectionStatistics: [],
    collectionStatisticsLastLoad: null,
    follows: [],
    followsLastLoad: null
  },
  getters: {
    getOPML: (state) => {
      return state.opml
    },
    getFeedAlreadyExists: (state) => (url) => {
      if (!url.endsWith('/')) {
        url = url + '/'
      }
      var exists = state.feeds.filter(o => o.url === url)
      if (exists && exists.length > 0) {
        return true
      } else {
        return false
      }
    },
    getAlreadyFollowed: (state) => (collectionId) => {
      var followed = state.follows.filter(o => o.collection.id === collectionId)
      if (followed && followed.length > 0) {
        return true
      } else {
        return false
      }
    },
    getCollectionStatistics: (state) => {
      return state.collectionStatistics
    },
    getCollectionName: (state) => (id) => {
      const collection = state.collections.filter(o => o.id === parseInt(id))[0]
      if (collection.name === state.user.sub) {
        return 'My Collection'
      } else {
        return collection.name
      }
    },
    getPersonalCollection: (state) => {
      return state.collections.filter(o => o.name === state.user.sub)[0]
    },
    getCollectionById: (state) => (id) => {
      const collection = state.collections.filter(o => o.id === parseInt(id))[0]
      return collection
    },
    getLoading: state => state.loading,
    getFeeds: state => state.feeds,
    getUser: state => state.user,
    getSubscribed: state => state.subscribed,
    getError: state => state.error,
    getCollections: state => state.collections,
    getMyCollections: state => state.mycollections,
    getFollows: state => state.follows

  },
  mutations: {
    setOPML (state, opml) {
      state.opml = opml
    },
    setCollectionStatistics (state, stats) {
      state.collectionStatistics = stats
    },
    setCollectionStatisticsLastLoad (state, lastLoad) {
      state.collectionStatisticsLastLoad = lastLoad
    },
    setFollows (state, follows) {
      state.follows = follows
    },
    setCollections (state, collections) {
      state.collections = collections
    },
    setMyCollections (state, collections) {
      state.mycollections = collections
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    setUser (state, user) {
      state.user = user
      state.user.initialized = true
    },
    setToken (state, token) {
      state.token = token
      state.token.initialized = true
      state.user = token
      state.user.initialized = true
    },
    setFeeds (state, feeds) {
      state.feeds = feeds
    },
    setSubscribed (state, subscribed) {
      state.subscribed = subscribed
    },
    setBacklog (state, d) {
      state.backlog = d
    },
    setToDo (state, d) {
      state.toDo = d
    },
    setInProgress (state, d) {
      state.inProgress = d
    },
    setRejected (state, d) {
      state.rejected = d
    },
    setDone (state, d) {
      state.done = d
    },
    setError (state, err) {
      state.error = err
    },
    setFollowsLastLoad (state, time) {
      state.followsLastLoad = time
    },
    setCollectionsLastLoad (state, time) {
      state.collectionsLastLoad = time
    },
    setFeedsLastLoad (state, time) {
      state.feedsLastLoad = time
    }
  },
  actions: {
    getCollectionStatisticsAsync: async ({ commit, state }, force = false) => {
      const currentTime = (new Date()).getTime()

      if (force || !state.followsLastLoad || currentTime - state.followsLastLoad > (MINUTES_BETWEEN_API_CALLS * 60000)) {
        const options = {
          headers: { Authorization: `Bearer ${state.token.token}` }
        }
        try {
          const { data } = await axios.get(_URLs.GET_CollectionStatistics(), options)

          commit('setCollectionStatistics', data)
          commit('setCollectionStatisticsLastLoad', currentTime)
        } catch (err) {
          console.log(err)
        }
      }
    },
    // Follows
    getFollowsAsync: async ({ commit, state }, force = false) => {
      const currentTime = (new Date()).getTime()

      if (force || !state.followsLastLoad || currentTime - state.followsLastLoad > (MINUTES_BETWEEN_API_CALLS * 60000)) {
        const options = {
          headers: { Authorization: `Bearer ${state.token.token}` }
        }
        try {
          const { data } = await axios.get(_URLs.GET_FOLLOWS(), options)

          data.forEach(x => {
            var backlog = []
            var toDo = []
            var inProgress = []
            var done = []
            var rejected = []

            x.boardItems.forEach(o => {
              if (o.status === 0) {
                backlog.push(o)
              } else if (o.status === 1) {
                toDo.push(o)
              } else if (o.status === 2) {
                inProgress.push(o)
              } else if (o.status === 3) {
                done.push(o)
              } else if (o.status === 4) {
                rejected.push(o)
              }
            })

            const compare = function (a, b) {
              if (a.article.date < b.article.date) {
                return 1
              }
              if (a.article.date > b.article.date) {
                return -1
              }
              return 0
            }
            const backlogOrdered = backlog.sort(compare)

            x.backlog = backlogOrdered
            x.toDo = toDo
            x.inProgress = inProgress
            x.done = done
            x.rejected = rejected
          })

          commit('setFollows', data)
          commit('setFollowsLastLoad', currentTime)
        } catch (err) {
          console.log(err)
        }
      }
    },
    addFollowsAsync: async ({ commit, state, dispatch }, collectionId) => {
      const follow = {
        userId: state.user.id,
        collectionId: collectionId
      }

      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      try {
        await axios.post(_URLs.POST_FOLLOW(), follow, options)
      } catch (err) {
        console.log(err)
      }

      await dispatch('getFollowsAsync', true)
    },
    // Collections
    addCollectionAsync: async ({ commit, state, dispatch }, collection) => {
      collection.userId = state.user.id

      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      try {
        await axios.post(_URLs.POST_COLLECTION(), collection, options)
      } catch (err) {
        console.log(err)
      }

      await dispatch('getCollectionsAsync', true)
    },
    getCollectionsAsync: async ({ commit, state }, force = false) => {
      const currentTime = (new Date()).getTime()

      if (force || !state.collectionsLastLoad || currentTime - state.collectionsLastLoad > (MINUTES_BETWEEN_API_CALLS * 60000)) {
        const options = {
          headers: { Authorization: `Bearer ${state.token.token}` }
        }
        try {
          const { data } = await axios.get(_URLs.GET_COLLECTIONS(), options)
          var mycollections = []
          data.forEach(x => {
            if (x.userId === state.user.id) {
              mycollections.push(x)
            }
          })
          commit('setCollections', data)
          commit('setMyCollections', mycollections)
          commit('setCollectionsLastLoad', currentTime)
        } catch (err) {
          console.log(err)
        }
      }
    },
    submitErrorAsync: async ({ commit, state }, url) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      try {
        await axios.post(_URLs.POST_ERROR(), {
          url: url,
          userId: state.user.id
        }, options)
      } catch (err) {
        console.log(err)
      }
    },
    setStatusAsync: async ({ commit, state }, { itemId, statusId }) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      try {
        await axios.patch(_URLs.PATCH_ITEM(itemId, statusId), {}, options)
      } catch (err) {
        console.log(err)
      }
    },
    getFeedsAsync: async ({ state, commit, dispatch }, force = false) => {
      const currentTime = (new Date()).getTime()

      if (force || !state.feedsLastLoad || currentTime - state.feedsLastLoad > (MINUTES_BETWEEN_API_CALLS * 60000)) {
        const options = {
          headers: { Authorization: `Bearer ${state.token.token}` }
        }
        try {
          const { data } = await axios.get(_URLs.GET_FEED(), options)

          commit('setFeedsLastLoad', currentTime)
          commit('setFeeds', data)
        } catch (err) {
          console.log(err)
        }
      }
    },
    submitOPMLAsync: async ({ commit, dispatch, state }, opml) => {
      opml.forEach(async collection => {
        if (collection.checked) {
          // Add collection and all feeds that are checked.
          await dispatch('addCollectionAsync', { name: collection.title, description: '', isPrivate: collection.private })
          var createdCollection = state.collections.filter(o => {
            return o.name === collection.title && o.userId === state.user.id && o.isPrivate === collection.private
          })[0]
          collection.feeds.forEach(async feed => {
            if (feed.error) {

            } else {
              if (feed.checked) {
                await dispatch('addFeedAsync', { name: feed.title, url: feed.xmlUrl })
                var createdFeed = state.feeds.filter(o => o.url === feed.xmlUrl)[0]
                dispatch('addFeedToCollectionAsyncNoRefresh', { FeedId: createdFeed.id, CollectionId: createdCollection.id })
              }
            }
          })
        }
      })
      await Promise.all([dispatch('getFeedsAsync', true), dispatch('getCollectionsAsync', true), dispatch('getFollowsAsync', true)])
    },
    importOPMLAsync: async ({ commit, state }, xml) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      try {
        const { data } = await axios.post(_URLs.POST_IMPORT_OPML(), { xml }, options)
        data.forEach((o, i) => {
          o.private = false
          o.error = null
          o.checked = true
          o.id = i
          o.feeds.forEach((f, j) => {
            f.checked = true
            f.id = j
          })
        })

        commit('setOPML', data)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    addFeedAsync: async ({ dispatch, state }, feed) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      var existingFeed = state.feeds.filter(o => o.url === feed.url)
      if (existingFeed && existingFeed.length > 0) {
        // Report error, as it already exist, or have it silent? tbd..
      } else {
        try {
          await axios.post(_URLs.POST_FEED(), feed, options)
        } catch (err) {
          console.log(err)
        }
        await dispatch('getFeedsAsync', true)
      }
    },
    getUserAsync: async ({ commit, state }, force = false) => {
      // var userData = null
      if (state.user.initialized && !force) {
        // userData = state.user
      } else {
        try {
          const options = {
            headers: { Authorization: `Bearer ${state.token.token}` }
          }
          const { data } = await axios.get(_URLs.GET_User(), options)
          commit('setUser', data[0])
          // userData = data[0]
        } catch (err) {
          commit('setError', 'User object cannot be downloaded. Please try again later.')
        }
      }
    },
    deleteSubscriptionAsync: async ({ dispatch, state }, subscriptionId) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }

      try {
        await axios.delete(_URLs.DELETE_Subscription(subscriptionId), options)
      } catch (err) {
        console.log(err)
      }

      await dispatch('getUserAsync')
    },
    getBacklog: ({ state }, collectionId) => {
      state.follows.forEach(x => {
        if (x.collection.id === collectionId) {
          return x.backlog
        }
      })
    },
    addFeedToCollectionAsync: async ({ dispatch, state }, obj) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      await axios.post(_URLs.POST_AddFeedToCollection(), obj, options)
      await Promise.all([dispatch('getFeedsAsync', true), dispatch('getCollectionsAsync', true), dispatch('getFollowsAsync', true)])
    },
    addFeedToCollectionAsyncNoRefresh: async ({ dispatch, state }, obj) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      await axios.post(_URLs.POST_AddFeedToCollection(), obj, options)
    },
    removeFeedFromCollectionAsync: async ({ dispatch, state }, { feedId, collectionId }) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      await axios.delete(_URLs.DELETE_RemoveFeedFromCollection(feedId, collectionId), options)
      await Promise.all([dispatch('getFeedsAsync', true), dispatch('getCollectionsAsync', true), dispatch('getFollowsAsync', true)])
    },
    unfollowAsync: async ({ dispatch, state }, id) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }

      try {
        await axios.delete(_URLs.DELETE_FOLLOW(id), options)
      } catch (err) {
        console.log(err)
      }

      await Promise.all([dispatch('getCollectionsAsync', true), dispatch('getFollowsAsync', true)])
    },
    followCollectionAsync: async ({ dispatch, state }, { feedId, collectionId }) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }

      if (!collectionId) {
        collectionId = state.collections.filter(o => o.name === state.user.sub)[0]
      }

      const sub = {
        userId: state.user.id,
        collectionId: collectionId,
        feedId: feedId
      }

      try {
        await axios.post(_URLs.POST_AddFeedToCollection(), sub, options)
        await axios.post(_URLs.POST_AddItems(), {}, options)
      } catch (err) {
        console.log(err)
      }

      dispatch('getCollectionsAsync', true)
    }
  }
})
