<template>
  <section class="">
    <h3 class="font-light text-center">CHANGE PASSWORD</h3>

    <form class="" action="#" @submit.prevent>

      <div class="mb-5 mt-3 flex justify-center">
        <div class="xs:w-full md:w-6/12">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Old Password
          </label>

          <div class="mt-1 flex mt-1 p-2 focus:outline-none bg-transparent focus:ring focus:border-unidark block w-full  sm:text-sm border border-unidarkblue rounded-md "
          :class="{'is-invalid':$v.changeForm.oldPassword.$error}">

            <input v-if="!showOldPassword" type="password" name="password" id="password" 
            v-model.trim="$v.changeForm.oldPassword.$model"
            class="focus:outline-none bg-transparent border-0 w-full outline-none" placeholder="********">

            <input v-else type="text" name="password" id="password" 
            v-model.trim="$v.changeForm.oldPassword.$model"
            class="focus:outline-none bg-transparent border-0 w-full outline-none">

            <button @click="showOldPassword = !showOldPassword" class="inline-flex items-center focus:outline-none px-3">
              <span v-show="!showOldPassword"><i class="fa fa-eye text-unidark text-md"></i></span>

              <span v-show="showOldPassword"><i class="fas fa-eye-slash text-unidark text-md"></i></span>
            </button>
          </div>
        </div>
      </div>

      <div class="mb-5 mt-3 flex justify-center">
        <div class="xs:w-full md:w-6/12">
          <label for="password" class="block text-sm font-medium text-gray-700">
            New Password
          </label>

          <div class="mt-1 flex mt-1 p-2 focus:outline-none bg-transparent focus:ring focus:border-unidark block w-full  sm:text-sm border border-unidarkblue rounded-md "
          :class="{'is-invalid':$v.changeForm.newPassword.$error}">

            <input v-if="!showNewPassword" type="password" name="password" id="password" 
            v-model.trim="$v.changeForm.newPassword.$model"
            class="focus:outline-none bg-transparent border-0 w-full outline-none" placeholder="********">

            <input v-else type="text" name="password" id="password" 
            v-model.trim="$v.changeForm.newPassword.$model"
            class="focus:outline-none bg-transparent border-0 w-full outline-none">

            <button @click="showNewPassword = !showNewPassword" class="inline-flex items-center focus:outline-none px-3">
              <span v-show="!showNewPassword"><i class="fa fa-eye text-unidark text-md"></i></span>

              <span v-show="showNewPassword"><i class="fas fa-eye-slash text-unidark text-md"></i></span>
            </button>
          </div>

          <p class="alert alert-danger" v-if="$v.changeForm.newPassword.$error" style="border-top-right-radius:0; border-top-left-radius:0">
            <small class="text-xs text-red-700">Password must contain at least <b>an uppercase letter</b>, <b>a lowercase letter</b>, <b>a number</b>, and must be atleast <b>8</b> characters long</small>
          </p>
        </div>
      </div>

      <div class="flex justify-center mb-10">
        <button type="submit" :disabled="$v.changeForm.$invalid || this.$v.changeForm.$error" @click.prevent="changePassword()" class="group relative xs:w-full md:w-6/12 text-center py-2 px-4 border border-transparent text-sm font-light rounded-md text-white bg-unidarkblue disabled:opacity-50 hover:bg-unidark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-unidark">
          <span class="mr-5">Change Password</span>
          <span v-if="sending">
            <i class="fas fa-circle-notch animate-spin"></i>
          </span>
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'ForgotPassword',

  data() {
    return {
      changeForm: {
        oldPassword: null,
        newPassword: null,
      },
      sending: false,
      showNewPassword: false,
      showOldPassword: false,
    }
  },

  validations: {
    changeForm: {
      oldPassword: { required, minLength: minLength(8) },
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
    }
  },

  created() {
    this.setActiveHeader('change-password');
  },

  computed: {
    ...mapGetters(['userEmail']),
  },

  methods: {
    ...mapMutations(['setActiveHeader']),

    async changePassword() {
      try {
        this.sending = true;

        const res = await this.$http.post(`${this.$apiV1}/user/change-password`, { 
          email: this.userEmail,
          oldPassword: this.changeForm.oldPassword,
          newPassword: this.changeForm.newPassword,
        });

        // console.log(res);
        this.sending = false;

        this.$toastr.s(res.data.message);

        this.$router.push({ path: '/user-profile' })
        
      } catch (e) {
        console.log('ChangePassword -- change password in auth');

        this.sending = false;
        this.reqErrorHandler({e});
      }
    },
  }
}
</script>