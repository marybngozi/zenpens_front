<template>
    <section class="relative">
        <button @click="isOpen = !isOpen" 
        class="relative rounded-full overflow-hidden border-2 border-black focus:outline-none focus:border-unidarkblue"
        :class="whdiv"
        >
            <img class="h-full w-full object-cover" src="../assets/images/testipic.png"/>
        </button>
        
        <button v-if="isOpen" @click="isOpen = false" tabindex="-1" class="fixed inset-0 h-full w-full cursor-default"></button>

        <!-- A liitle opacity fade in and out -->
        <transition name="fade">
        <div v-if="isOpen" class="absolute right-0 transition duration-500 ease-in-out mt-2 pt-2 w-64 bg-white rounded shadow-xl text-md">
            <ul>
                <li class="block px-4 py-4 text-gray-800 hover:border-b-2 hover:border-green-500"
                :class="activeHeader === 'user-profile' ? 'active' : 'notActive'">
                    <a href="/user-profile" class="flex justify-start">
                        <i class="fa fa-user mr-3 mt-1 "></i> Profile
                    </a>
                </li>
                <li class="block px-4 py-4 text-gray-800 hover:border-b-2 hover:border-green-500"
                :class="activeHeader === 'change-password' ? 'active' : 'notActive'">
                    <a href="/change-password" class="flex justify-start" >
                        <i class="fa fa-key mr-3 mt-1 "></i>Change Password
                    </a>
                </li>
                <li class="block px-4 py-4 text-gray-800 hover:border-b-2 hover:border-green-500 border-b"
                :class="activeHeader === 'notifications' ? 'active' : 'notActive'">
                    <a href="#" class="flex justify-start">
                        <i class="fa fa-bell mr-3 mt-1 "></i>Notifications
                    </a>
                </li>
                <li @click="logout" class="cursor-pointer block px-4 py-4 text-gray-800 hover:border-b-2 hover:border-green-500">
                    <a class="flex justify-start" >
                        <i class="fa fa-sign-out-alt mr-3 mt-1"></i>Log Out
                    </a>
                </li>
            </ul>
        </div>
        </transition>
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: "ProfileMenu",
    data() {
        return {
            isOpen: false,
        }
    },
    props: {
        whdiv: String,
    },
    created(){
        const handleEscape = (e) => {
            if (e.key === 'Esc' || e.key == "Escape") {
                this.isOpen = false;
            }
        }

        document.addEventListener('keydown', handleEscape);

        this.$once('hook:beforeDestroy', () => {
            document.removeEventListener('keydown', handleEscape);
        })
    },

    computed: {
        ...mapState(['activeHeader']),
    },

    methods: {
        ...mapMutations(["setLogout"]),

        // logout and go to home page
        logout() {
            // clear the localstorage
            localStorage.removeItem('phoneixx');
            localStorage.removeItem('tangloo');

            // clear the store
            this.setLogout();

            // go to home page
            this.$router.push({ path: '/'})
        }
    }

}
</script>

<style scoped>
    .active {
        background: #05A658;
        color: white;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>