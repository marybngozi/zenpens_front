<template>
  <section class="">
    {{ text }}
  </section>
</template>

<script>
export default {
  name: 'Login',

  props: {
    text: String,

  },

  methods: {
    login() {
      console.log("Hello World");
      this.$router.push('/');
    }
  }
}
</script>
