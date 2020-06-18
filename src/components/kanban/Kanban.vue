<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" v-if="this.getUser.initialized">
        <column :entities="backlog" @onUpdate="update" @updateTxt="updateTxt" title="Backlog" color="gray" @onExternalLink="triggerExternalLink" />
        <column :entities="toDo" @onUpdate="update" @updateTxt="updateTxt" title="To Do" color="purple" @onExternalLink="triggerExternalLink"/>
        <column :entities="inProgress" @onUpdate="update" @updateTxt="updateTxt" title="In Progress" color="blue" @onExternalLink="triggerExternalLink"/>
        <div>
          <column :entities="done" @onUpdate="update" @updateTxt="updateTxt" title="Done" color="green" @onExternalLink="triggerExternalLink"/>
          <column :entities="rejected" @onUpdate="update" @updateTxt="updateTxt" title="Rejected" color="red" @onExternalLink="triggerExternalLink"/>
        </div>
    </div>
  </div>
</template>
<script>
import Column from '@/components/kanban/Column'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    follow: {
      type: Object,
      default: () => ({})
    }
  },
  name: 'Kanban',
  components: {
    Column
  },
  data () {
    return {
      highlighted: {},
      hasHighlight: false
    }
  },
  methods: {
    triggerExternalLink (entity) {
      var win = window.open(entity.link, '_blank')
      win.focus()
    },
    async updateTxt (id, board) {
      var obj = this.follow.boardItems.filter(x => x.id === id)[0]

      let status = 0
      if (board === 'Backlog') {
        status = 0
        this.follow.backlog.push(obj)
      } else if (board === 'To Do') {
        status = 1
        this.follow.toDo.push(obj)
      } else if (board === 'In Progress') {
        status = 2
        this.follow.inProgress.push(obj)
      } else if (board === 'Done') {
        status = 3
        this.follow.done.push(obj)
      } else if (board === 'Rejected') {
        status = 4
        this.follow.rejected.push(obj)
      }

      if (obj.status === 0) {
        this.follow.backlog = this.follow.backlog.filter(x => x.id !== id)
      }
      if (obj.status === 1) {
        this.follow.toDo = this.follow.toDo.filter(x => x.id !== id)
      }
      if (obj.status === 2) {
        this.follow.inProgress = this.follow.inProgress.filter(x => x.id !== id)
      }
      if (obj.status === 3) {
        this.follow.done = this.follow.done.filter(x => x.id !== id)
      }
      if (obj.status === 4) {
        this.follow.rejected = this.follow.rejected.filter(x => x.id !== id)
      }

      this.follow.boardItems.filter(x => x.id === id)[0].status = status

      this.setLoading(true)
      await this.setStatusAsync({ itemId: id, statusId: status })
      this.setLoading(false)
    },
    update (event, board) {
      let status = 0
      if (board === 'Backlog') {
        status = 0
      } else if (board === 'To Do') {
        status = 1
      } else if (board === 'In Progress') {
        status = 2
      } else if (board === 'Done') {
        status = 3
      } else if (board === 'Rejected') {
        status = 4
      }

      const el = event.added.element
      el.status = status

      this.setStatusAsync({ itemId: el.id, statusId: el.status })
    },
    ...mapActions(['getUserAsync', 'setStatusAsync', 'getBacklog', 'getFollowsAsync']),
    ...mapMutations(['setToDo', 'setLoading', 'setStatusForBoardItem'])
  },
  computed: {
    ...mapGetters(['getUser']),
    backlog: {
      get () {
        return this.follow.backlog
      }
    },
    toDo: {
      get () {
        return this.follow.toDo
      }
    },
    inProgress: {
      get () {
        return this.follow.inProgress
      }
    },
    done: {
      get () {
        return this.follow.done
      }
    },
    rejected: {
      get () {
        return this.follow.rejected
      }
    }
  }
}
</script>
