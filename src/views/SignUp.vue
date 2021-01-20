<template>
  <section class="lg:p-10 flex xs:flex-col lg:flex-row h-full w-full">

    <div class="lg:w-7/12 xs:w-12/12 px-5 pb-5 pt-0 lg:border-r-2 xs:border-r-0 lg:border-b-0 xs:border-b-2 relative">
      <div class="mb-5 text-center">
        <h1 class="font-light text-center text-3xl">REGISTER</h1>

        <small class="text-xs text-unidark">Already have an account? 
          <router-link to="/login" class="border-b-2 border-black">Login</router-link> 
        </small>
      </div>

      <form action="#" @submit.prevent >
        <div class="mb-5">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" name="username" id="username" autocomplete="username" placeholder="emerald" 
          v-model.trim="$v.regForm.username.$model"
          class="mt-1 p-2 bg-transparent focus:outline-none focus:ring focus:border-unidark block w-full sm:text-sm border border-unidarkblue rounded-md"
          :class="{'is-invalid':$v.regForm.username.$error}">
        </div>

        <div class="mb-5">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" id="email" autocomplete="email" placeholder="emmadoe@mail.com" 
          v-model.trim="$v.regForm.email.$model"
          class="mt-1 p-2 bg-transparent focus:outline-none focus:ring focus:border-unidark block w-full sm:text-sm border border-unidarkblue rounded-md"
          :class="{'is-invalid':$v.regForm.email.$error}">
        </div>

        <div class="mb-5">
          <label for="dob" class="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input type="date" name="dob" id="dob" autocomplete="dob" placeholder="dd/mm/yyyy" 
          v-model.trim="$v.regForm.dob.$model"
          class="mt-1 p-2 bg-transparent focus:outline-none focus:ring focus:border-unidark block w-full sm:text-sm border border-unidarkblue rounded-md"
          :class="{'is-invalid':$v.regForm.dob.$error}">
        </div>

        <div class="mb-8">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="mt-1 flex mt-1 p-2 focus:outline-none bg-transparent focus:ring focus:border-unidark block w-full sm:text-sm border border-unidarkblue rounded-md"
          :class="{'is-invalid':$v.regForm.password.$error}">

            <input v-if="!showPassword" type="password" name="password" id="password" 
            v-model.trim="$v.regForm.password.$model"
            class="focus:outline-none bg-transparent border-0 w-full outline-none" placeholder="********">

            <input v-else type="text" name="password" id="password" 
            v-model.trim="$v.regForm.password.$model"
            class="focus:outline-none bg-transparent border-0 w-full outline-none">

            <button @click="showPassword = !showPassword" class="inline-flex items-center focus:outline-none px-3">
              <span v-show="!showPassword"><i class="fa fa-eye text-unidark text-md"></i></span>

              <span v-show="showPassword"><i class="fas fa-eye-slash text-unidark text-md"></i></span>
            </button>
          </div>
          <p class="alert alert-danger" v-if="$v.regForm.password.$error" style="border-top-right-radius:0; border-top-left-radius:0">
            <small class="text-xs text-red-700">Password must contain at least <b>an uppercase letter</b>, <b>a lowercase letter</b>, <b>a number</b>, and must be atleast <b>8</b> characters long</small>
          </p>
        </div>

        <div class="">
          <button type="submit" :disabled="$v.regForm.$invalid || this.$v.regForm.$error" @click.prevent="signup()" class="group relative w-full text-center py-2 px-4 border border-transparent text-sm font-light rounded-md text-white bg-unidarkblue disabled:opacity-50 hover:bg-unidark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-unidark">
            REGISTER
          </button>
        </div>
      </form>
    </div>

    <div class="lg:w-5/12 xs:w-12/12 p-5 relative">
      <h2 class="font-thin mb-3"> Sign up with Social</h2>
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
import {mapMutations, mapActions} from 'vuex';
import { required, email, minLength} from 'vuelidate/lib/validators';
export default {
  name: 'SignUp',

  data() {
    return {
      regForm: {
        username: null,
        email: null,
        dob: null,
        password: null,
      },
      showPassword: false,
    }
  },

  validations: {
    regForm: {
      username: { required, minLength: minLength(5) },
      email: { required, email },
      dob: { required },
      password: {
        required,
        minLength: minLength(8),
        strongPassword(password) {
          return (
            /[a-z]/.test(password) && // checks for a-z
            /[A-Z]/.test(password) && // checks for A-Z
            /[0-9]/.test(password) // checks for 0-9
          );
        }
      },
    }
  },

  mounted() {
    this.setActiveHeader('signup');
  },

  methods: {
    ...mapMutations(["setLoginStat", "setActiveHeader"]),

    ...mapActions(["addToken", "addUserDetails"]),

    // emit sign up to app.vue to register user
    async signup() {
      // checks if inputs are filled well
      this.$v.regForm.$touch()
      if (this.$v.regForm.$invalid || this.$v.regForm.$error) {
        this.$toastr.e("All fields required");
        return;
      }

      try {
        this.regForm.emailVerifyUrl = `${this.$domainUrl}/email-verify`;

        const res = await this.$http.post(`${this.$apiV1}/user/register`, this.regForm);

        // add user details in store and localstorage
        this.addUserDetails(res.data.data.newUser);
        
        // add token in store and localstorage
        this.addToken(res.data.data.auth.token);
        
        // set loggedIn as true in the store
        this.setLoginStat(true);

        // console.log(res);
        this.$toastr.s(res.data.message);

        // go to the next page
        const nexturl = localStorage.getItem('einex');
        
        localStorage.removeItem('einex');

        this.$router.push({ path: nexturl || '/' })

      } catch (e) {
        console.log('User register');
        this.reqErrorHandler({e, message: ''});
      }
    }
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