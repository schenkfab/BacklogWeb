<template>
  <nav class="flex items-center justify-between flex-wrap pl-4">
    <Logo />
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto pt-1">
      <div class="lg:flex-grow">
        <router-link
          class="block mt-4 lg:inline-block lg:mt-0 mr-2 ml-2 font-bold font-sans hover:bg-pink-500 hover:text-white p-5"
          to="/"
        >Home</router-link>
        <MegaMenuBoard />
        <MegaMenuFeeds />
        <MegaMenuCollections />
        <router-link
          v-if="this.getUser.initialized"
          class="block mt-4 lg:inline-block lg:mt-0 text-purple-600 hover:text-white mr-2 ml-5 font-semibold font-sans hover:bg-pink-500 hover:text-white p-5"
          to="/feeds"
        >Development</router-link>
      </div>
      <div>
        <router-link
          v-if="!this.getUser.initialized"
          class="block mt-4 lg:inline-block lg:mt-0 text-sm mr-4 text-sm font-bold font-sans"
          to="/login"
        >Login or Register</router-link>
        <button
          v-if="this.getUser.initialized"
          @click="logout"
          class="block mt-4 lg:inline-block lg:mt-0 text-sm mr-4 text-sm font-bold font-sans"
        ><img
          v-if="this.getUser.initialized"
          :src="this.getUser.picture"
          style="float: left; margin-top:-4px;"
          class="h-8 w-8 rounded-full border-solid border-2 mr-2 text-sm font-bold font-sans"
        /><span>{{ this.getUser.name }}</span></button>
        <button
          v-if="this.getUser.initialized"
          @click="logout"
          class="block mt-4 lg:inline-block lg:mt-0 text-sm mr-4 text-sm font-bold font-sans hover:bg-pink-500 hover:text-white p-5"
        >Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MegaMenuBoard from './Nav/MegaMenuBoards'
import MegaMenuFeeds from './Nav/MegaMenuFeeds'
import MegaMenuCollections from './Nav/MegaMenuCollections'
import Logo from './Nav/Logo'

require('dotenv').config()

export default {
  components: { MegaMenuBoard, MegaMenuFeeds, MegaMenuCollections, Logo },
  name: 'Nav',
  methods: {
    ...mapActions(['getUserAsync']),
    logout: function () {
      this.$auth.logout({
        returnTo: window.location.origin
      })
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getFollows', 'getCollectionName'])
  }
}
</script>
<style>

  /* ––––––––––––––––––––––––––––––––––––––––––––––––––
    Based on: https://codepen.io/nickelse/pen/YGPJQG
    Influenced by: https://sproutsocial.com/
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

  /* #Mega Menu Styles
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  .bg-nav {
    background: linear-gradient(90deg, #cd5eda 0%, #ffa200 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .color-two {
    background: #ffa200
  }

  .mega-menu {
    display: none;
    left: 0;
    position: absolute;
    text-align: left;
    width: 100%;
    background: rgb(55,13,60);
    background: linear-gradient(90deg, #cd5eda 0%, #ffa200 100%);
  }

  /* #hoverable Class Styles
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  .hoverable {
    position: static;
  }

  .hoverable > a:after {
    content: "\25BC";
    font-size: 10px;
    padding-left: 6px;
    position: relative;
    top: -1px;
  }

  .hoverable:hover .mega-menu {
    display: block;
  }

  /* #toggle Class Styles
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

  .toggleable > label:after {
    content: "\25BC";
    font-size: 10px;
    padding-left: 6px;
    position: relative;
    top: -1px;
  }

  .toggle-input {
    display: none;
  }
  .toggle-input:not(checked) ~ .mega-menu {
    display: none;
  }

  .toggle-input:checked ~ .mega-menu {
    display: block;
  }

  .toggle-input:checked + label {
    color: white;
    background: #2c5282; /*@apply bg-blue-800 */
  }

  .toggle-input:checked ~ label:after {
    content: "\25B2";
    font-size: 10px;
    padding-left: 6px;
    position: relative;
    top: -1px;
  }
  </style>
