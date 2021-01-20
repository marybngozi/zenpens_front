/* eslint-disable prettier/prettier */
<template>
  <header id="nav" class="unihostelFont shadow-xs">

    <!-- pop up to notify for email verification -->
    <div id="emailNotify" v-if="!emailVerified" class="absolute right-0 left-0 top-0 flex px-3 justify-start items-center h-10 text-sm bg-green-300 text-black">
      <p class="p-2 font-thin break-normal">
        Veirification email was sent to <i>{{userEmail}}</i>. 
        Didn't see any email <button @click="resendEmail" class="focus:outline-none">Click to resend</button>
      </p>
      <!-- <button><i class="fa fa-times font-thin text-xl" ></i></button> -->
    </div>

    <div class="w-full flex justify-center items-center h-2 text-sm bg-unidarkblue text-white">
      <!-- <p class="p-2 italic font-bold">...for the lovers of written works...</p> -->
    </div>

    <nav class="flex items-center justify-between flex-wrap bg-white md:px-4 md:py-1 xs:px-2 xs:py-1">
      <router-link to="/" class="flex justify-start md:space-x-1 xs:space-x-1" > 
        <div class="xs:w-8 md:w-1/12">
          <img width="150" height="150" class="" src="../assets/images/logo.png" alt="logo"/>
        </div>

        <h1 class="w-10/12 md:leading-tight xs:leading-none font-bold md:-mt-2 xs:-mt-1">
          <span class="text-black md:text-2xl xs:text-xl">ZenPens</span><br>
          <small class="italic text-green-200 md:text-md xs:text-xs text-shadow">... the addicted writers ...</small>
        </h1>
      </router-link>
        
      <div class="block lg:hidden flex justify-between sm:space-x-3 xs:space-x-1">
        <!-- User pics medium to small screen -->
        <ProfileMenu
        class="mt-2"
        v-if="loggedIn"
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
          class="md:w-5/12 xs:w-8/12 xs:pb-0 xs:rounded xs:shadow-xl lg:shadow-none xs:absolute xs:right-0 xs:bg-white xs:text-md lg:text-sm block lg:py-2 lg:relative lg:space-x-2 lg:flex-grow lg:flex lg:justify-center"
        >
          <a
            href="/"
            class="lg:p-3 xs:py-4 xs:px-4 xs:flex xs:justify-start xs:space-x-3 lg:space-x-0 block lg:mt-4 lg:inline-block lg:-mt-1 text-unidark hover:border-b-2 hover:border-green-500"
            :class="activeHeader === 'home' ? 'active' : 'notActive'"
          >
            <i class="far fa-compass  mt-1 lg:hidden"></i><span>Explore</span>
          </a>
          
          <a
            href="/contact"
            class="lg:p-3 xs:py-4 xs:px-4 xs:flex xs:justify-start xs:space-x-3 lg:space-x-0 block lg:mt-4 lg:inline-block lg:-mt-1 text-unidark hover:border-b-2 hover:border-green-500"
            :class="activeHeader === 'contact' ? 'active' : 'notActive'"
          >
            <i class="fa fa-phone-alt lg:hidden mt-1"></i><span>Contact</span>
          </a>

          <a
            href="/faq"
            class="lg:p-3 xs:py-4 xs:px-4 xs:flex xs:justify-start xs:space-x-3 lg:space-x-0 block lg:mt-4 lg:inline-block lg:-mt-1 text-unidark hover:border-b-2 hover:border-green-500"
            :class="activeHeader === 'faq' ? 'active' : 'notActive'"
          >
            <i class="fa fa-question mt-1 lg:hidden"></i><span>FAQ</span>
          </a>

          <a
            v-show="!loggedIn"
            :href="'/'+authUrl"
            class="lg:p-3 xs:py-4 xs:px-4 xs:flex xs:justify-start block lg:mt-4 lg:inline-block lg:-mt-1 text-unidark hover:border-b-2 hover:border-green-500 focus:outline-none"
            :class="(activeHeader == 'login' || activeHeader == 'signup') ? 'active' : 'notActive'"
          >
            <span v-if="activeHeader != 'signup'" class="xs:space-x-3 lg:space-x-0">
              <i class="fa fa-user mt-1 lg:hidden"></i>
              <span>Login</span>
            </span>
            <span v-if="activeHeader == 'signup'" class="xs:space-x-3 lg:space-x-0">
              <i class="fa fa-user-plus mt-1 lg:hidden"></i>
              <span>Register</span>
            </span>
          </a>
        </div>

      </div>

      <!-- User pics large screen-->
      <ProfileMenu 
      class="xs:hidden md:hidden lg:block"
      v-if="loggedIn"
      whdiv="h-10 w-10"
      />
    </nav>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ProfileMenu from "@/components/ProfileMenu.vue";
export default {
  name: "Header",

  components: {
    ProfileMenu
  },

  computed: {
    ...mapState(['loggedIn', 'activeHeader']),
    ...mapGetters(['emailVerified', 'userEmail']),

    authUrl() {
      return (this.activeHeader === 'login' || this.activeHeader === 'signup')? this.activeHeader: 'login';
    }
  },
  data() {
    return {
      showMenu: false,
    };
  },
  created(){
    const handleEscape = (e) => {
      if (e.key === 'Esc' || e.key == "Escape") {
        this.showMenu = false;
      }
    }

    document.addEventListener('keydown', handleEscape);

    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', e => { this.showMenu = false; })
    })

    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape);
    })
  },
  methods: {
    toggleMenu: function() {
      this.showMenu = !this.showMenu;
    },

    async resendEmail() {
      try {
        const res = await this.$http.post(`${this.$apiV1}/user/resend-email`, { 
          email: this.userEmail,
          emailVerifyUrl: `${this.$domainUrl}/email-verify`
        });

        // console.log(res);
        this.$toastr.s(res.data.message);
        
      } catch (e) {
        console.log('Header -- re-send email');
        this.reqErrorHandler({e});
      }
    },

    showProfileMenu(){

    },
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
#emailNotify {
  z-index: 50;
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
