<template>
  <div class="container mx-auto items-center justify-center" v-if="this.getUser.initialized">
    <BaseTitle>{{ this.name }}</BaseTitle>

    <div class="flex flex-col w-full">
      <div class="flex flex-row p-2">
        <div class="w-32"></div><div><FollowUnfollowButton class="text-xs" :collectionId="parseInt(this.id)"></FollowUnfollowButton></div>
      </div>
      <div class="flex flex-row p-2" v-if="isMyCollection && this.name !== 'My Collection'">
        <div class="w-32 my-1 py-1">Name</div>
        <div class="w-full">
          <BaseTextInput v-model="name" class="w-full" />
        </div>
      </div>
      <div class="flex flex-row p-2" v-if="!isMyCollection || this.name === 'My Collection'">
        <div class="w-32">Name</div>
        <div class="w-full">
          <span>{{ name }}</span>
        </div>
      </div>
      <div class="flex flex-row p-2 w-full" v-if="isMyCollection && this.name !== 'My Collection'">
        <div class="w-32 my-1 py-1">Description</div>
        <div class="w-full" >
          <BaseTextInput v-model="description" class="w-full" />
        </div>
      </div>
      <div class="flex flex-row p-2 w-full" v-if="!isMyCollection || this.name === 'My Collection'">
        <div class="w-32">Description</div>
        <div class="w-full" >
          <span>{{ description }}</span>
        </div>
      </div>
      <div class="flex flex-row p-2 w-full" v-if="isMyCollection && this.name !== 'My Collection'">
        <div class="w-32 my-1 py-1">Is Private</div>
        <div class="w-full" >
          <input type="checkbox" v-model="isPrivate" />
        </div>
      </div>
      <div class="flex flex-row p-2">
        <div class="w-32">Created</div>
        <div class="w-full" >{{ this.collection ? new Date(this.collection.createdDate).toLocaleString() : '' }}</div>
      </div>
      <div class="flex flex-row p-2" v-if="isMyCollection && this.name !== 'My Collection'">
        <div class="w-32 my-1 py-1"></div>
        <div class="w-full">
          <BaseButton @click="saveChanges">Save Changes</BaseButton>
        </div>
      </div>
    </div>
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
import FollowUnfollowButton from '@/components/Collection/FollowUnfollowButton'

export default {
  props: ['id'],
  components: {
    'feeds-table': FeedsInCollectionTable,
    FollowUnfollowButton
  },
  data: () => {
    return {
      collection: null,
      name: null,
      description: null,
      feeds: [],
      isPrivate: false
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
    ...mapActions(['getCollectionsAsync', 'removeFeedFromCollectionAsync', 'getFeedsAsync', 'updateCollectionAsync']),
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
    },
    saveChanges: async function () {
      this.setLoading(true)
      await this.updateCollectionAsync({ name: this.name, description: this.description, id: this.id, isPrivate: this.isPrivate })
      this.setLoading(false)
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
    this.collection = this.getCollectionById(this.id)
    this.name = this.getCollectionName(this.id)
    this.description = this.collection.description
    this.isPrivate = this.collection.isPrivate
    this.createFeeds()
    this.setLoading(false)
  }
}
</script>
