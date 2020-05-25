<template>
  <div>
    <button v-for="follow in this.getFollows" v-bind:key="follow.id" @click="setFollow(follow)">{{ getName(follow.collection.name) }}</button>
    <kanban :follow="this.selected"></kanban>
  </div>
</template>
<script>
import Kanban from '@/components/kanban/Kanban'
import { mapGetters } from 'vuex'

export default {
  name: 'Boards',
  components: {
    Kanban
  },
  data () {
    return {
      selected: {}
    }
  },
  computed: {
    ...mapGetters(['getFollows', 'getUser'])
  },
  methods: {
    getName (name) {
      if (name === this.getUser.sub) {
        return 'My Collection'
      } else {
        return name
      }
    },
    setFollow (follow) {
      console.log(follow)
      this.selected = follow
    }
  }
}
</script>
