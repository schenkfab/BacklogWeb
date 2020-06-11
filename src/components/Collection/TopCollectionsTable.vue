<template>
  <table class="table-auto w-full" v-if="this.collections">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Description</th>
          <th class="px-4 py-2">Nr of Feeds</th>
          <th class="px-4 py-2">Nr of Followers</th>
          <th class="px-4 py-2">Nr of Articles</th>
          <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="collection in this.getCollectionStatistics" :key="collection.collectionId">
          <td class="border px-4 py-2">
            <button class="text-purple-600" @click="goToCollection(collection.collectionId)">{{ getCollectionName(collection.collectionId) }}</button></td>
          <td class="border px-4 py-2">{{ collection.description }}</td>
          <td class="border px-4 py-2">
            {{ collection.nrOfFeeds }}
          </td>
          <td class="border px-4 py-2 text-xs">
            Current: {{ collection.nrOfFollowers }}
            <br>
            Last 7 Days: {{ collection.newFollowersLast7Days }}
            <br>
            Last 30 Days: {{ collection.newFollowersLast30Days }}
          </td>
          <td class="border px-4 py-2 text-xs">
            Current: {{ collection.nrOfArticles }}
            <br>
            Last 7 Days: {{ collection.nrOfArticlesLast7Days }}
            <br>
            Last 30 Days: {{ collection.nrOfArticlesLast30Days }}
          </td>
          <td class="border py-2">
            <follow :id="collection.collectionId" v-if="!alreadyFollowed(collection.collectionId) && getCollectionName(collection.collectionId) != 'My Collection'"></follow>
            <unfollow :id="collection.collectionId" v-if="alreadyFollowed(collection.collectionId) && getCollectionName(collection.collectionId) != 'My Collection'"></unfollow>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import { mapGetters } from 'vuex'
import FollowButton from '@/components/Collection/FollowButton'
import UnfollowButton from '@/components/Collection/UnfollowButton'

export default {
  components: { follow: FollowButton, unfollow: UnfollowButton },
  props: {
    collections: {
      type: Array,
      default: () => ([])
    },
    followed: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getCollectionName', 'getCollectionStatistics'])
  },
  methods: {
    goToCollection (id) {
      this.$router.push('/collection/' + id).catch(err => { console.log(err) })
    },
    getIsPrivate (isPrivate) {
      return isPrivate ? 'Yes' : 'No'
    },
    unfollow: function (collectionId) {
      this.$emit('unfollow', collectionId)
    },
    alreadyFollowed: function (id) {
      return this.followed.includes(id)
    }
  }
}
</script>

<style>

</style>
