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
          <td class="border px-4 py-2"><button class="text-purple-600" @click="goToCollection(collection.id)">{{ getName(collection.name) }}</button></td>
          <td class="border px-4 py-2">{{ collection.description }}</td>
          <td class="border px-4 py-2">{{ getIsPrivate(collection.isPrivate) }}</td>
          <td class="border px-4 py-2">
            <button v-if="!alreadyFollowed(collection.id)" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" @click="follow(collection.id)">
              Follow
            </button>
            <button v-if="alreadyFollowed(collection.id)" class="bg-white hover:bg-gray-100 text-red-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" @click="unfollow(collection.id)">
              Unfollow
            </button>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
    ...mapGetters(['getUser'])
  },
  methods: {
    goToCollection (id) {
      this.$router.push('/collection/' + id).catch(err => { console.log(err) })
    },
    getName (name) {
      if (name === this.getUser.sub) {
        return 'My Collection'
      } else {
        return name
      }
    },
    getIsPrivate (isPrivate) {
      return isPrivate ? 'Yes' : 'No'
    },
    follow: function (id) {
      this.$emit('follow', id)
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
