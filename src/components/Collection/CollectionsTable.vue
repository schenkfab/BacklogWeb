<template>
  <table class="table-auto w-full" v-if="this.collections">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Description</th>
          <th class="px-4 py-2">Private</th>
          <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="collection in this.collections" :key="collection.id">
          <td class="border px-4 py-2"><button class="text-purple-600" @click="goToCollection(collection.id)">{{ getCollectionName(collection.id) }}</button></td>
          <td class="border px-4 py-2">{{ collection.description }}</td>
          <td class="border px-4 py-2">{{ getIsPrivate(collection.isPrivate) }}</td>
          <td class="border pl-3 py-2">
            <FollowUnfollowButton :collectionId="collection.id"></FollowUnfollowButton>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import { mapGetters } from 'vuex'
import FollowUnfollowButton from '@/components/Collection/FollowUnfollowButton'

export default {
  components: { FollowUnfollowButton },
  props: {
    collections: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getCollectionName'])
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
    }
  }
}
</script>

<style>

</style>
