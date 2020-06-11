<template>
  <button class="bg-white hover:bg-purple-300 text-gray-800 py-1 px-3 hover:underline" @click="unfollow()">
    Unfollow
  </button>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'UnfollowButton',
  props: ['id'],
  computed: {
    ...mapGetters(['getFollows'])
  },
  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions(['unfollowAsync']),
    async unfollow () {
      console.log('blah')
      this.setLoading(true)
      var followId = this.getFollows.filter(o => o.collection.id === this.id)[0].id
      await this.unfollowAsync(followId)
      this.setLoading(false)
    }
  }
}
</script>
