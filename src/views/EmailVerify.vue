<template>
  <section class="">
    <div v-if="verifying" class="xl:w-4/6 md:w-3/6 xs:w-11/12 xs:mx-auto xs:mb-8">
      <!-- loader -->
      <p class="text-green-300 mt-10 text-center">
        <i class="fa fa-spinner fa-7x animate-spin"></i>
      </p>
    </div>

    <div v-if="!verifying" >
      <div v-if="verified" class="xl:w-4/6 md:w-3/6 xs:w-11/12 xs:mx-auto xs:mb-8">

        <p class="text-green-300 mt-10 text-center">
          <i class="fa fa-8x fa-thumbs-up"></i><br><br><br>
          <span class="text-green-800">Email Verification Successful. <br> Visit previous tab to continue exploring</span>
        </p>

      </div>
      
      <div v-else class="xl:w-4/6 md:w-3/6 xs:w-11/12 xs:mx-auto xs:mb-8">

        <p class="text-red-200 mt-10 text-center">
          <i class="fa fa-8x fa-unlink"></i><br><br><br>
          <span class="text-gray-600 text-md">Email Verification Failed! <br> Link maybe broken, try again</span>
        </p>

      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
  name: 'EmailVerify',

  data() {
    return {
      emailToken: null,
      verifying: true,
      verified: false,
    }
  },

  created() {
    this.setActiveHeader('email-verify');

    this.emailToken = this.$route.params.token;

    if (!this.emailToken) {
      this.$router.push({ path: '/' });
      return;
    }

    // email verification request
    this.verifyEmail();
  },

  computed: {
    ...mapGetters(['userEmail']),
  },

  methods: {
    ...mapMutations(['setActiveHeader', 'setEmailVerified']),

    async verifyEmail() {
      try {
        this.verifying = true;

        const res = await this.$http.post(`${this.$apiV1}/user/email-verify`, { 
          email: this.userEmail,
          emailConfirmCode: this.emailToken,
        });

        // console.log(res);
        this.verifying = false;
        this.verified = true;

        // update store and localstorage
        this.setEmailVerified();

        this.$toastr.s(res.data.message);

        // go to the home page
        setTimeout(() => {
          this.$router.push({ path: '/' })
        }, 1500);

        
      } catch (e) {
        console.log('EmailVerify -- email verification');
        this.verifying = false;
        this.verified = false;
        this.reqErrorHandler({e});
      }
    },
  }
}
</script>