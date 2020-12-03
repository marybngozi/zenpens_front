<template>
  <div class="text-gray-600">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati incidunt dignissimos dolores adipisci ullam cumque deleniti corporis alias! Perspiciatis ipsum voluptate autem dolores ducimus! Iusto nesciunt nemo odio molestiae praesentium.
    <br>
    <br>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati incidunt dignissimos dolores adipisci ullam cumque deleniti corporis alias! Perspiciatis ipsum voluptate autem dolores ducimus! Iusto nesciunt nemo odio molestiae praesentium.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati incidunt dignissimos dolores adipisci ullam cumque deleniti corporis alias! Perspiciatis ipsum voluptate autem dolores ducimus! Iusto nesciunt nemo odio molestiae praesentium.
    <br>
    <br>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati incidunt dignissimos dolores adipisci ullam cumque deleniti corporis alias! Perspiciatis ipsum voluptate autem dolores ducimus! Iusto nesciunt nemo odio molestiae praesentium.
    <br>
    <br>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati incidunt dignissimos dolores adipisci ullam cumque deleniti corporis alias! Perspiciatis ipsum voluptate autem dolores ducimus! Iusto nesciunt nemo odio molestiae praesentium.
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: 'Home',

  components: {

  },

  data() {
    return {

    }
  },

  mounted() {
    this.setActiveHeader('home')
  },

  methods: {
    ...mapMutations(['setActiveHeader']),


  }
  
}
</script>
