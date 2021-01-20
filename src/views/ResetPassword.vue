<template>
  <section class="">
    <h3 class="font-light text-center">RESET PASSWORD</h3>

    <div v-if="verifying" class="xl:w-4/6 md:w-3/6 xs:w-11/12 xs:mx-auto xs:mb-8">
      <!-- loader -->
      <p class="text-green-300 mt-10 text-center">
        <i class="fa fa-spinner fa-7x animate-spin"></i>
      </p>
    </div>

    <div v-if="!verifying" class="mt-4 mb-10">
      <form class="" action="#" @submit.prevent v-if="verified">
        <div class="mb-5 flex justify-center">
          <div class="xs:w-full md:w-6/12">
            <label for="password" class="block text-sm font-medium text-gray-700">
              New Password
            </label>

            <div class="mt-1 flex mt-1 p-2 focus:outline-none bg-transparent focus:ring focus:border-unidark block w-full  sm:text-sm border border-unidarkblue rounded-md "
            :class="{'is-invalid':$v.newPassword.$error}">

              <input v-if="!showPassword" type="password" name="password" id="password" 
              v-model.trim="$v.newPassword.$model"
              class="focus:outline-none bg-transparent border-0 w-full outline-none" placeholder="********">

              <input v-else type="text" name="password" id="password" 
              v-model.trim="$v.newPassword.$model"
              class="focus:outline-none bg-transparent border-0 w-full outline-none">

              <button @click="showPassword = !showPassword" class="inline-flex items-center focus:outline-none px-3">
                <span v-show="!showPassword"><i class="fa fa-eye text-unidark text-md"></i></span>

                <span v-show="showPassword"><i class="fas fa-eye-slash text-unidark text-md"></i></span>
              </button>
            </div>

            <p class="alert alert-danger" v-if="$v.newPassword.$error" style="border-top-right-radius:0; border-top-left-radius:0">
              <small class="text-xs text-red-700">Password must contain at least <b>an uppercase letter</b>, <b>a lowercase letter</b>, <b>a number</b>, and must be atleast <b>8</b> characters long</small>
            </p>
          </div>
        </div>

        <div class="flex justify-center">
          <button type="submit" :disabled="$v.newPassword.$invalid || this.$v.newPassword.$error" @click.prevent="resetPassword()" class="group relative xs:w-full md:w-6/12 text-center py-2 px-4 border border-transparent text-sm font-light rounded-md text-white bg-unidarkblue disabled:opacity-50 hover:bg-unidark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-unidark">
            <span class="mr-5">Reset Passsword</span>
            <span v-if="resetting">
              <i class="fas fa-circle-notch animate-spin"></i>
            </span>
          </button>
        </div>
      </form>

      <div v-else class="xl:w-4/6 md:w-3/6 xs:w-11/12 xs:mx-auto xs:mb-8">
        <p class="text-red-200 mt-10 text-center">
          <i class="fa fa-8x fa-unlink"></i><br><br><br>
          <span class="text-gray-600 text-md">Link maybe broken or expired... <br>Go to Login to try again</span>
        </p>
      </div>
    </div>
    
  </section>
</template>

<script>
import { mapMutations } from 'vuex';
import { required, minLength} from 'vuelidate/lib/validators';

export default {
  name: 'ResetPassword',

  data() {
    return {
      passwordToken: null,
      newPassword: null,
      verifying: true,
      verified: false,
      resetting: false,
      showPassword: false,
    }
  },

  validations: {
    newPassword: {
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
  },

  created() {
    this.setActiveHeader('reset-password');

    this.passwordToken = this.$route.params.token;

    if (!this.passwordToken) {
      this.$router.push({ path: '/' });
      return;
    }

    // password token verification request
    this.verifyPasswordToken();
  },

  methods: {
    ...mapMutations(['setActiveHeader']),

    async verifyPasswordToken() {
      try {
        const res = await this.$http.get(`${this.$apiV1}/user/validate-password-token/${this.passwordToken}`);

        // console.log(res);
        this.verifying = false;
        this.verified = true;

      } catch (e) {
        console.log('ResetPassword -- verify password token');
        this.verifying = false;
        this.verified = false;
        this.reqErrorHandler({e});
      }
    },

    async resetPassword() {
      try {
        this.resetting = true;

        const res = await this.$http.post(`${this.$apiV1}/user/reset-password/`, {
          token: this.passwordToken,
          newPassword: this.newPassword 
        });

        // console.log(res);
        this.resetting = false;

        this.$toastr.s(res.data.message);

        // go to the home page
        setTimeout(() => {
          this.$router.push({ path: '/login' })
        }, 1500);

        
      } catch (e) {
        console.log('ResetPassword -- reset password');
        this.resetting = false;
        this.reqErrorHandler({e});
      }
    },
  }
}
</script>