<template>
  <div class="pl-2 pr-2">
    <button class="border rounded-full m-1 p-1 px-2 text-xs hover:bg-pink-500 hover:text-white" v-for="follow in this.getFollows.filter(f => f.collection.isPrivate)" v-bind:key="follow.id" @click="setFollow(follow.id)">{{ getCollectionName(follow.collection.id) }} {{ follow.collection.isPrivate ? '(P)' : '' }}</button>
    <button class="border rounded-full m-1 p-1 px-2 text-xs hover:bg-pink-500 hover:text-white" v-for="follow in this.getFollows.filter(f => !f.collection.isPrivate)" v-bind:key="follow.id" @click="setFollow(follow.id)">{{ getCollectionName(follow.collection.id) }} {{ follow.collection.isPrivate ? '(P)' : '' }}</button>
    <hr>
    <kanban :follow="this.selected"></kanban>
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
    ...mapGetters(['getFollows', 'getUser', 'getCollectionName'])
  },
  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions(['getFollowsAsync', 'getCollectionsAsync', 'getFollowAsync']),
    setSelected (follow) {
      console.log('setSelected', follow)
      this.selected = follow
    },
    setFollow (id) {
      this.setSelected(this.getFollows.filter(o => o.id === id)[0])
      this.$router.push('/board/' + id).catch(err => { console.log(err) })
    }
  },
  watch: {
    followId: async function (val) {
      this.setLoading(true)
      await this.getFollowAsync(this.followId)
      console.log('loaded...')
      this.setSelected(this.getFollows.filter(o => o.id === parseInt(this.followId))[0])
      this.setLoading(false)
    }
  },
  async mounted () {
    this.setLoading(true)
    await this.getCollectionsAsync()
    await this.getFollowsAsync()
    if (this.followId) {
      await this.getFollowAsync(this.followId)
      console.log('here')
      this.setSelected(this.getFollows.filter(o => o.id === parseInt(this.followId))[0])
    }
    this.setLoading(false)
  }
}
</script>
