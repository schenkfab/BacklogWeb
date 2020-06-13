<template>
  <div>
    <FollowButton :id="this.collectionId" v-if="!this.getAlreadyFollowed(this.collectionId)"></FollowButton>
    <UnfollowButton :id="this.collectionId" v-if="this.getAlreadyFollowed(this.collectionId)"></UnfollowButton>
  </div>
</template>

<script>
import FollowButton from '@/components/Collection/FollowButton'
import UnfollowButton from '@/components/Collection/UnfollowButton'

import { mapGetters } from 'vuex'

export default {
  props: {
    collectionId: {
      type: Number,
      default: () => (-1)
    },
    ismycollection: {
      type: Boolean,
      default: () => (false)
    }
  },
  computed: {
    ...mapGetters(['getAlreadyFollowed'])
  },
  components: {
    FollowButton, UnfollowButton
  }
}
</script>

<style>

</style>
