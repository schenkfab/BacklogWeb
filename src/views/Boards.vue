<template>
  <div class="pl-2 pr-2">
    <button class="text-purple-700 mr-4" v-for="follow in this.getFollows" v-bind:key="follow.id" @click="setFollow(follow.id)">{{ getName(follow.collection.name) }}</button>
    <hr>
    <kanban :follow="this.selected" v-if="this.selected.backlog"></kanban>
  </div>
</template>
<script>
import Kanban from '@/components/kanban/Kanban'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  props: ['followId'],
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
    ...mapMutations(['setLoading']),
    ...mapActions(['getFollowsAsync', 'getCollectionsAsync']),
    getName (name) {
      if (name === this.getUser.sub) {
        return 'My Collection'
      } else {
        return name
      }
    },
    setSelected (follow) {
      this.selected = follow
    },
    setFollow (id) {
      this.setSelected(this.getFollows.filter(o => o.id === id)[0])
      this.$router.push('/board/' + id).catch(err => { console.log(err) })
    }
  },
  watch: {
    followId: function (val) {
      this.setSelected(this.getFollows.filter(o => o.id === parseInt(this.followId))[0])
    }
  },
  async mounted () {
    this.setLoading(true)
    await this.getCollectionsAsync()
    await this.getFollowsAsync()
    if (this.followId) {
      console.log('test')
      this.setSelected(this.getFollows.filter(o => o.id === parseInt(this.followId))[0])
    }
    this.setLoading(false)
  }
}
</script>
