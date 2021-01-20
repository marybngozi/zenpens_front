<template>
  <div id="app">
    <Header
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
import {mapState, mapActions} from 'vuex';

import Header from '@/components/Header.vue';
import AsideLeft from "@/components/AsideLeft.vue"
import AsideRight from "@/components/AsideRight.vue"
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    AsideLeft,
    AsideRight,
    Footer,
  },

  data() {
    return {
      // userLoggedIn: null,
    }
  },

  created() {
    this.updateUserDetails();

    this.updateToken();
  },

  computed: {
    ...mapState(['loggedIn']),
  },

  methods: {
    ...mapActions(["updateToken", "updateUserDetails"]),
  }
}
</script>

<style>
  .is-invalid {
    border: 1px solid red !important;
  }
  
  /* for browser autocomplete */
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
    transition: background-color 5000s ease-in-out 0s;
  }
</style>