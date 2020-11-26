/* eslint-disable prettier/prettier */
<template>
  <header id="nav" class="unihostelFont shadow-xs">
    <div class="w-full flex justify-center items-center h-12 text-sm bg-unidarkblue text-white">
      <p class="p-2 font-thin">DISCIPLINE, SELF RELIANCE & EXCELLENCE</p>
    </div>

    <nav class="flex items-center justify-between flex-wrap bg-white sm:p-4 xs:px-2 xs:py-4">
      <a href="/" class="flex justify-start md:space-x-4 xs:space-x-1" > 
        <div class="xs:w-8 md:w-2/12">
          <img width="150" height="150" class="" src="../assets/images/logo.png" alt="logo"/>
        </div>

        <h1 class="w-10/12 md:leading-tight xs:leading-none font-bold md:-mt-4 xs:-mt-1">
          <span class="text-unidark md:text-5xl xs:text-xl">ZenPens</span><br>
          <small class="italic text-green-200 md:text-md xs:text-xs text-shadow">... the addicted writers ...</small>
        </h1>
      </a>
        
      <div class="block lg:hidden flex justify-between sm:space-x-3 xs:space-x-1">
        <!-- User pics medium to small screen -->
        <ProfileMenu
        class="mt-2"
        v-show="loggedIn"
        whdiv="sm:h-10 sm:w-10 xs:h-8 xs:w-8"
        />
        <button
          class="flex items-center px-2 py-2 text-unidark hover:text-white hover:border-white focus:outline-none"
          @click="toggleMenu"
        >
          <img src="../assets/images/menu-icon.svg" class="lg:h-10 lg:w-10 xs:w-8 xs:h-8" />
        </button>
        <button v-if="showMenu" @click="showMenu = false" tabindex="-1" class="fixed inset-0 h-full w-full cursor-default"></button>
      </div>
      
      <div
        class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        :class="showMenu ? 'block' : 'hidden'"
      >
        <div
          class="md:w-5/12 xs:w-8/12 xs:pb-5 xs:rounded xs:shadow-xl lg:shadow-none lg:pb-auto xs:absolute xs:right-0 xs:bg-white xs:text-md lg:text-sm block lg:relative lg:space-x-2 lg:flex-grow lg:flex lg:justify-center"
        >
          <a
            href="/"
            class="lg:p-3 xs:py-4 xs:px-4 xs:flex xs:justify-start xs:space-x-3 lg:space-x-0 block lg:mt-4 lg:inline-block lg:mt-0 text-unidark hover:border-b-2"
            :class="active === 'home' ? 'active' : 'notActive'"
          >
            <i class="fa fa-home  mt-1 lg:hidden"></i><span>Home</span>
          </a>
          <a
            href="/process"
            class="lg:p-3 xs:py-4 xs:px-4 xs:flex xs:justify-start xs:space-x-3 lg:space-x-0 block lg:mt-4 lg:inline-block lg:mt-0 text-unidark hover:border-b-2"
            :class="active === 'process' ? 'active' : 'notActive'"
          >
            <i class="fa fa-user-cog  mt-1 lg:hidden"></i><span>How it Works</span>
          </a>
          <a
            href="/hostels"
            class="lg:p-3 xs:py-4 xs:px-4 xs:flex xs:justify-start xs:space-x-3 lg:space-x-0 block lg:mt-4 lg:inline-block lg:mt-0 text-unidark hover:border-b-2"
            :class="active === 'hostels' ? 'active' : 'notActive'"
          >
            <i class="fa fa-person-booth  mt-1 lg:hidden"></i><span>Book Space</span>
          </a>
          <a
            href="/contact"
            class="lg:p-3 xs:py-4 xs:px-4 xs:flex xs:justify-start xs:space-x-3 lg:space-x-0 block lg:mt-4 lg:inline-block lg:mt-0 text-unidark hover:border-b-2"
            :class="active === 'contact' ? 'active' : 'notActive'"
          >
            <i class="fa fa-phone-alt lg:hidden mt-1"></i><span>Contact</span>
          </a>
          <a
            href="/faq"
            class="lg:p-3 xs:py-4 xs:px-4 xs:flex xs:justify-start xs:space-x-3 lg:space-x-0 block lg:mt-4 lg:inline-block lg:mt-0 text-unidark hover:border-b-2"
            :class="active === 'faq' ? 'active' : 'notActive'"
          >
            <i class="fa fa-question mt-1 lg:hidden"></i><span>FAQ</span>
          </a>
          <a
            href="/login"
            v-show="!loggedIn"
            class="lg:p-3 xs:py-4 xs:px-4 xs:flex xs:justify-start block lg:mt-4 lg:inline-block lg:mt-0 text-unidark hover:border-b-2"
            :class="(active === 'login' || active === 'signup') ? 'active' : 'notActive'"
          >
            <span v-if="active != 'signup'" class="xs:space-x-3 lg:space-x-0"><i class="fa fa-user mt-1 lg:hidden"></i><span>Login</span></span>
            <span v-if="active == 'signup'" class="xs:space-x-3 lg:space-x-0"><i class="fa fa-user-plus mt-1 lg:hidden"></i><span>Sign Up</span></span>
          </a>
        </div>

      </div>

      <!-- User pics large screen-->
      <ProfileMenu 
      class="xs:hidden md:hidden lg:block"
      v-show="loggedIn"
      whdiv="h-10 w-10"
      />
    </nav>
  </header>
</template>

<script>
import ProfileMenu from "@/components/ProfileMenu.vue"
export default {
  name: "Header",
  components: {
    ProfileMenu
  },
  props: {
    active: {
      type: String
    }
  },
  data() {
    return {
      showMenu: false,
      loggedIn: true,
    };
  },
  created(){
    const handleEscape = (e) => {
      if (e.key === 'Esc' || e.key == "Escape") {
        this.showMenu = false;
      }
    }

    document.addEventListener('keydown', handleEscape);

    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape);
    })
  },
  methods: {
    toggleMenu: function() {
      this.showMenu = !this.showMenu;
    },
    showProfileMenu(){

    }
  }
};
</script>

<style scoped>
.active {
  background: #05A658;
  color: white;
}
#nav {
  z-index: 10;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.text-shadow {
  text-shadow: 1px 1px 1px black;
}
</style>
