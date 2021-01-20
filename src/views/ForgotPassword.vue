<template>
  <section class="">
    <h3 class="font-light text-center">FORGOT PASSWORD</h3>

    <form class="" action="#" @submit.prevent>
      <div class="mb-5 mt-3 flex justify-center">
        <div class="xs:w-full md:w-6/12">
          <label for="email" class="block text-sm font-medium text-gray-700">Email or Username</label>
          <input type="text" name="email" id="email" autocomplete="email" placeholder="emmadoe@mail.com or emmadoe" 
          v-model.trim="$v.email.$model"
          class="mt-1 p-2 bg-transparent focus:outline-none focus:ring focus:border-unidark block w-full sm:text-sm border border-unidarkblue rounded-md"
          :class="{'is-invalid':$v.email.$error}">
        </div>
      </div>

      <div class="flex justify-between space-x-5 mb-10">
        <button type="submit" :disabled="$v.email.$invalid || this.$v.email.$error" @click.prevent="forgotPassword()" class="group relative xs:w-full md:w-6/12 text-center py-2 px-4 border border-transparent text-sm font-light rounded-md text-white bg-unidarkblue disabled:opacity-50 hover:bg-unidark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-unidark">
          <span class="mr-5">Send Instructions</span>
          <span v-if="sending">
            <i class="fas fa-circle-notch animate-spin"></i>
          </span>
        </button>

        <a href="/login" class="group relative xs:w-full md:w-6/12 text-center py-2 px-4 border border-red-600 text-sm font-light rounded-md text-white bg-red-400 disabled:opacity-50 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <span class="mr-5">Cancel</span>
        </a>
      </div>
    </form>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'ForgotPassword',

  data() {
    return {
      email: null,
      sending: false,
    }
  },

  validations: {
    email: { required, minLength: minLength(5) },
  },

  created() {
    this.setActiveHeader('forgot-password');
  },

  methods: {
    ...mapMutations(['setActiveHeader']),

    async forgotPassword() {
      try {
        this.sending = true;

        const res = await this.$http.post(`${this.$apiV1}/user/forgot-password`, { 
          email: this.email,
          passwordResetUrl: `${this.$domainUrl}/reset-password`,
        });

        // console.log(res);
        this.sending = false;

        this.$toastr.s(res.data.message);
        
      } catch (e) {
        console.log('ForgotPassword -- send email for reset');

        this.sending = false;
        this.reqErrorHandler({e});
      }
    },
  }
}
</script>

