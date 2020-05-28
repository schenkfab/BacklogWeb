<template>
  <div>
    <button class="text-purple-700" v-for="follow in this.getFollows" v-bind:key="follow.id" @click="setFollow(follow)">{{ getName(follow.collection.name) }}</button>
    <hr>
    <kanban :follow="this.selected" v-if="this.selected.backlog"></kanban>
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
