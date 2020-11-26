<template>
  <div id="app">
    <Header 
      active="home" 

      @showlogin="showLogin()"
      @showsignup="showSignUp()"
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

    <Footer />
  </div>
</template>

<script>
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
  },

  data() {
    return {
      userLoggedIn: null,
    }
  },

  mounted() {
    this.showLogin();
  },

  methods: {
    showLogin() {
      this.$modal.show(
        Login,
        { text: 'This text is a login prop' },
        // { draggable: true }
      )
    },

    showSignUp() {
      this.$modal.show(
        SignUp,
        { text: 'This text is a signup prop' },
        // { draggable: true }
      )
    },


  }
}
</script>