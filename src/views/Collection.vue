<template>
  <div class="container mx-auto items-center justify-center" v-if="this.getUser.initialized">
    <BaseTitle>{{ this.title ? this.title : 'Error.' }}</BaseTitle>
    <FollowButton :id="this.id"></FollowButton>
    <UnfollowButton :id="this.id"></UnfollowButton><br>
    <!-- <div class="text-left mb-4">
      <a @click="$router.go(-1)" class="text-xs">back</a>
    </div> -->
    Description:
    Created:
    Statistics:
    <BaseSubtitle>List of Feeds in Collection</BaseSubtitle>
    <div>
      <feeds-table :ismycollection="isMyCollection" @unsubscribe="unsubscribe" :feeds="this.feeds"></feeds-table>
    </div>
    <BaseSubtitle>Articles in Collection</BaseSubtitle>
  </div>
</template>

<script>
import FeedsInCollectionTable from '@/components/Feed/FeedsInCollectionTable'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import FollowButton from '@/components/Collection/FollowButton'
import UnfollowButton from '@/components/Collection/UnfollowButton'

export default {
  props: ['id'],
  components: {
    'feeds-table': FeedsInCollectionTable,
    FollowButton,
    UnfollowButton
  },
  data: () => {
    return {
      title: null,
      collection: null,
      feeds: []
    }
  },
  computed: {
    ...mapGetters(['getMyCollections', 'getFeeds', 'getUser', 'getCollectionName', 'getCollectionById']),
    isMyCollection () {
      if (this.collection) {
        if (this.collection.userId === this.getUser.id) {
          return true
        } else {
          return false
        }
      }
      return false
    }
  },
  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions(['getCollectionsAsync', 'removeFeedFromCollectionAsync', 'getFeedsAsync']),
    async unsubscribe (feedId) {
      this.setLoading(true)
      await this.removeFeedFromCollectionAsync({ feedId: feedId, collectionId: this.id })
      this.setLoading(false)
    },
    createFeeds () {
      const feeds = []
      this.getFeeds.forEach(o => {
        o.feedInCollections.forEach(y => {
          if (y.collectionId === parseInt(this.id)) {
            feeds.push(o)
          }
        })
      })
      this.feeds = feeds
    }
  },
  watch: {
    getFeeds: {
      deep: true,
      handler () {
        this.createFeeds()
      }
    }
  },
  mounted: async function () {
    this.setLoading(true)
    await Promise.all([this.getCollectionsAsync(), this.getFeedsAsync()])
    this.title = this.getCollectionName(this.id)
    this.collection = this.getCollectionById(this.id)
    this.createFeeds()
    this.setLoading(false)
  }
}
</script>
