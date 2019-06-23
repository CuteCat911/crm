<template>
    <div class="page login">
        <div class="login__block box">
            <div class="login__forms">
                <loginForm v-show="currentForm === 'login'"></loginForm>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapMutations} from "vuex";

    import loginForm from "../forms/login";

    export default {
        name: "login-page",
        data() {
            return {
                currentForm: "login"
            }
        },
        beforeMount() {
            this.setPreloaderStatus(false);
        },
        methods: {
            ...mapMutations({
                setPreloaderStatus: "preloader"
            })
        },
        components: {
            loginForm
        }
    }

</script>