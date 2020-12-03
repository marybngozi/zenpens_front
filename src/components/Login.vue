<template>
  <section class="lg:p-10 flex xs:flex-col lg:flex-row h-full w-full">

    <div class="lg:w-7/12 xs:w-12/12 p-5 lg:border-r-2 xs:border-r-0 lg:border-b-0 xs:border-b-2 relative">
      <div class="mb-5 text-center">
        <h1 class="font-light text-center text-3xl">LOGIN</h1>

        <small class="text-xs text-unidark">Don't have an account? 
          <button @click="showSignup()" class="border-b-2 border-black">Register</button> 
        </small>
      </div>

      <form action="#" @submit.prevent >
        <div class="mb-5">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="text" name="email" id="email" autocomplete="email" placeholder="emmadoe@mail.com" v-model.trim="$v.loginForm.email.$model"  :class="{'is-invalid':$v.loginForm.email.$error}"
          class="mt-1 p-2 bg-transparent focus:outline-none focus:ring focus:border-unidark block w-full sm:text-sm border border-unidarkblue rounded-md">
        </div>

        <div class="mb-5">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="mt-1 flex mt-1 p-2 focus:outline-none bg-transparent focus:ring focus:border-unidark block w-full sm:text-sm border border-unidarkblue rounded-md">

            <input v-if="!showPassword" type="password" name="password" id="password" 
            v-model.trim="$v.loginForm.password.$model"
            :class="{'is-invalid':$v.loginForm.password.$error}"
            class="focus:outline-none bg-transparent border-0 w-full outline-none" placeholder="********">

            <input v-else type="text" name="password" id="password" 
            v-model.trim="$v.loginForm.password.$model"
            :class="{'is-invalid':$v.loginForm.password.$error}"
            placeholder="qwerY123@StrongU"
            class="focus:outline-none bg-transparent border-0 w-full outline-none">

            <button @click="showPassword = !showPassword" class="inline-flex items-center focus:outline-none px-3">
              <span v-show="!showPassword"><i class="fa fa-eye text-unidark text-md"></i></span>

              <span v-show="showPassword"><i class="fas fa-eye-slash text-unidark text-md"></i></span>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center">
            <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 xs:h-3 xs:w-3 text-unidarkblue focus:ring-unidark border-gray-300 rounded">
            <label for="remember_me" class="ml-2 block text-sm xs:text-xs text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-unilightblue text-sm xs:text-xs hover:text-unidarkblue">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button type="submit" @click.prevent="login()" class="group relative w-full text-center py-2 px-4 border border-transparent text-sm font-light rounded-md text-white bg-unidarkblue hover:bg-unidark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-unidark">
            LOGIN
          </button>
        </div>
      </form>
    </div>

    <div class="lg:w-5/12 xs:w-12/12 p-5 relative">
      <h2 class="font-thin mb-3"> Login with Social</h2>
      <button
        class="flex justify-center w-full mb-4 px-4 py-2 cursor-pointer border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-100 bg-red-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-unidark">
        <i class="fab fa-google text-white mr-3 mt-1"></i>Google
      </button>

      <button
        class="flex justify-center w-full mb-4 px-4 py-2 cursor-pointer border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-100 bg-blue-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-unidark">
        <i class="fab fa-facebook-f text-white mr-3 mt-1"></i>Facebook
      </button>

      <button
        class="flex justify-center w-full mb-4 px-4 py-2 cursor-pointer border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-100 bg-blue-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-unidark">
        <i class="fab fa-twitter text-white mr-3 mt-1"></i>Twitter
      </button>
    </div>
  </section>
</template>

<script>
import { required, email, minLength} from 'vuelidate/lib/validators';
export default {
  name: 'Login',

  data() {
    return {
      loginForm: {
        email: null,
        password: null,
      },
      showPassword: false,
    }
  },

  validations: {
    loginForm: {
      email: { required, email },
      password: {
        required,
        minLength: minLength(8),
      },
    }
  },

  methods: {
    showSignup() {
      this.$emit('showsignup');
    },

    login() {
      this.$emit('login', this.loginForm);
    },
  }
}
</script>
<style scoped>
  section {
    position: relative;
  }
  section::before {    
    content: "";
    background-image: url("../assets/illusts/login.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right;
    position: absolute;
    top: 30px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.25;
  } 
 
</style>