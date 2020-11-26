<template>
  <section class="">
    {{ text }}
  </section>
</template>

<script>
export default {
  name: 'SignUp',

  props: {
    text: String,

  },
  
  data() {
    return {
      reqValidated: false,
      formInfo: {
        regNumber: null,
        password: null,
        confirmPassword: null,
      }
    }
  },

  methods: {
    checkRegNumber() {
      console.log("Hello World");
      this.reqValidated = true;
    },
    register() {
      console.log("Hello World")
      this.$router.push('/');
    }
  }
}
</script>
