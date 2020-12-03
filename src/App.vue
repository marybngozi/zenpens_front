<template>
  <div id="app">
    <Header  
      @showlogin="showLogin()"
      class="sticky top-0" 
    />

    <section class="mt-5 flex xs:flex-col lg:flex-row">
      <aside class="lg:w-2/12 lg:flex-none lg:order-none xs:w-11/12 xs:mx-auto xs:mb-10 sm:mb-0">
        <AsideLeft />
      </aside>

      <main class="lg:w-7/12 lg:flex-none lg:order-none xs:w-11/12 xs:mx-auto xs:mb-8 sm:mb-0 xs:order-first">
        <router-view/>
      </main>

      <aside class="lg:w-2/12 lg:flex-none lg:order-none xs:w-11/12 xs:mx-auto xs:mb-10 sm:mb-0 xs:order-last">
        <AsideRight />
      </aside>
    </section>

    <section>
      <modal name="login"
         :width="modalWidth"
         :height="'auto'"
         :adaptive="true">
        <Login @showsignup="showSignUp()" @login="login()" />
      </modal>

      <modal name="signup"
         :width="modalWidth"
         :height="'auto'"
         :adaptive="true">
        <SignUp @showlogin="showLogin()"  @signup="signup()"/>
      </modal>
    </section>

    <Footer />
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';

import Header from '@/components/Header.vue';
import AsideLeft from "@/components/AsideLeft.vue"
import AsideRight from "@/components/AsideRight.vue"
import Footer from "@/components/Footer.vue";

import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';

export default {
  components: {
    Header,
    AsideLeft,
    AsideRight,
    Footer,

    Login,
    SignUp,
  },

  data() {
    return {
      userLoggedIn: null,
    }
  },

  mounted() {

  },

  computed: {
    ...mapState(['loggedIn']),

    modalWidth: function() {
      return (screen.width <= 768)? 310: 700;
    }
  },

  methods: {
    showLogin() {
      this.$modal.hide('signup');
      if (!this.loggedIn) {
        this.$modal.show('login');
      }
    },

    showSignUp() {
      this.$modal.hide('login');
      if (!this.loggedIn) {
        this.$modal.show('signup');
      }
    },

    login(d) {
      console.log('Login started');
      this.$modal.hide('login');
    },

    signup() {
      this.$modal.hide('signup');
      console.log('Signup started');
    },
  }
}
</script>