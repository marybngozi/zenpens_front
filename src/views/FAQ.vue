<template>
  <section class="">
    <div class="xl:w-4/6 md:w-3/6 xs:w-11/12 xs:mx-auto xs:mb-8">
      <p class="text-gray-400 mt-20 text-center">
        <i class="fa fa-10x fa-question"></i><br>
        <span>Coming soon...</span>
      </p>
    </div>
  </section>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
  name: 'FAQ',
  
  components: {

  },

  data() {
    return {

    }
  },

  mounted() {
    this.setActiveHeader('faq')
  },

  methods: {
    ...mapMutations(['setActiveHeader']),

  }
}
</script>