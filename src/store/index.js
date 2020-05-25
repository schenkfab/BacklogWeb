import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _URLs from '../config/path'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    loading: false,
    feeds: [],
    token: {
      token: ''
    },
    user: {
    },
    collections: [],
    mycollections: [],
    follows: []
  },
  getters: {
    getPersonalCollection: (state) => {
      return state.collections.filter(o => o.name === state.user.sub)[0]
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
    }
  },
  actions: {
    // Follows
    getFollowsAsync: async ({ commit, state, dispatch }) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      try {
        const { data } = await axios.get(_URLs.GET_FOLLOWS(), options)
        console.log(data)

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
      } catch (err) {
        console.log(err)
      }
    },
    addFollowsAsync: async ({ commit, state, dispatch }, collectionId) => {
      const follow = {
        userId: state.user.id,
        collectionId: collectionId
      }
      console.log('adding follow', follow)

      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      try {
        await axios.post(_URLs.POST_FOLLOW(), follow, options)
      } catch (err) {
        console.log(err)
      }

      dispatch('getFollowsAsync')
    },
    // Collections
    addCollectionAsync: async ({ commit, state, dispatch }, collection) => {
      collection.userId = state.user.id
      console.log('adding collection', collection)

      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      try {
        await axios.post(_URLs.POST_COLLECTION(), collection, options)
      } catch (err) {
        console.log(err)
      }

      dispatch('getCollectionsAsync')
    },
    getCollectionsAsync: async ({ commit, state }) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      try {
        const { data } = await axios.get(_URLs.GET_COLLECTIONS(), options)
        var mycollections = []
        data.forEach(x => {
          if (x.UserId === state.user.Id) {
            mycollections.push(x)
          }
        })
        commit('setCollections', data)
        commit('setMyCollections', mycollections)
      } catch (err) {
        console.log(err)
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
    getFeedsAsync: async ({ state, commit }) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      try {
        const { data } = await axios.get(_URLs.GET_FEED(), options)
        commit('setFeeds', data)
      } catch (err) {
        console.log(err)
      }
    },
    addFeedAsync: async ({ dispatch, state }, feed) => {
      const options = {
        headers: { Authorization: `Bearer ${state.token.token}` }
      }
      try {
        await axios.post(_URLs.POST_FEED(), feed, options)
      } catch (err) {
        console.log(err)
      }

      dispatch('getFeedsAsync')
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

      // // get all subscribed feed Ids:
      // var subscribed = []
      // userData.subscriptions.forEach(o => {
      //   subscribed.push(o.feed.id)
      // })

      // const backlog = []
      // const toDo = []
      // const inProgress = []
      // const done = []
      // const rejected = []

      // userData.boardItems.forEach(o => {
      //   if (o.status === 0) {
      //     backlog.push(o)
      //   } else if (o.status === 1) {
      //     toDo.push(o)
      //   } else if (o.status === 2) {
      //     inProgress.push(o)
      //   } else if (o.status === 3) {
      //     done.push(o)
      //   } else if (o.status === 4) {
      //     rejected.push(o)
      //   }
      // })

      // const compare = function (a, b) {
      //   if (a.article.date < b.article.date) {
      //     return 1
      //   }
      //   if (a.article.date > b.article.date) {
      //     return -1
      //   }
      //   return 0
      // }
      // const backlogOrdered = backlog.sort(compare)

      // commit('setBacklog', backlogOrdered)
      // commit('setToDo', toDo)
      // commit('setInProgress', inProgress)
      // commit('setDone', done)
      // commit('setRejected', rejected)

      // commit('setSubscribed', subscribed)
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

      dispatch('getUserAsync')
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

      dispatch('getCollectionsAsync')
    }
  }
})
