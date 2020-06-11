<template>
  <div id="app">
    <div class="w-full flex justify-center" v-if="this.getError">
      <div class="w-1/2 m-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed" role="alert">
        <strong class="font-bold">Error! </strong>
        <span class="block sm:inline">{{ this.getError }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" @click="this.removeError" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
    </div>
    <Nav class="mb-6"></Nav>
    <div class="se-pre-con" v-if="getLoading">
      <div class="loader">Loading...</div>
    </div>
    <div class="mx-auto">
      <router-view/>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Nav from '@/components/Nav'

export default {
  name: 'App',
  components: { Nav },
  computed: {
    ...mapGetters(['getLoading', 'getError'])
  },
  methods: {
    ...mapMutations(['setError']),
    removeError: function () {
      this.setError(null)
    }
  }
}

</script>

<style>
.se-pre-con {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: white;
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #74a6ff;
  font-size: 10px;
  margin: 140px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

</style>
