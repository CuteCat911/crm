<template>
    <v-form name="login"
            :preloader="preloader"
            title="Вход в SimpleCrm"
    >
        <template slot="inputs">
            <form-input v-for="(input, key) in form"
                        :key="key"
                        :name="key"
                        :data="input"
                        :submit-func="submit"
            ></form-input>
        </template>
        <template slot="submit">
            <button class="form__submit btn" @click="submit">Войти</button>
        </template>
    </v-form>
</template>

<script>

    import axios from "axios";
    import {mapState, mapActions} from "vuex";
    import {InputTemplate} from "../../js/modules/input-template";
    import {checkForm} from "../../js/modules/check-form";
    import {getInputsData} from "../../js/modules/get-inputs-data";
    import {serialize} from "../../js/general/serialize";
    import {storageActions} from "../../js/modules/storage-actions";

    import vForm from "../mixins/v-form";
    import formInput from "../elements/form-input";
    import {structures} from "../../js/modules/structures";

    export default {
        name: "login-form",
        data() {
            return {
                preloader: false,
                form: {
                    login: new InputTemplate({
                        type: "text",
                        title: "Логин",
                        error: {
                            texts: {
                                empty: "Введите логин"
                            }
                        }
                    }),
                    password: new InputTemplate({
                        type: "password",
                        title: "Пароль",
                        error: {
                            texts: {
                                empty: "Введите пароль"
                            }
                        }
                    })
                }
            }
        },
        computed: {
            ...mapState("api", {
                request: state => state.user.login
            })
        },
        methods: {
            ...mapActions("user", {
                setUserData: "setData"
            }),
            submit() {

                let check = checkForm(this.form);

                if (!check.status) {
                    if (DEV) console.error();
                    return false;
                }

                this.preloader = true;

                axios({
                    method: this.request.method,
                    url: this.request.url,
                    data: serialize(this.request.method, getInputsData(this.form)),
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
                    .then(response => {

                        let requestData = response.data;

                        if (!requestData.success) {
                            return false;
                        }

                        let userData = requestData.data.user;
                        this.setUserData(structures.structure("user", userData));
                        storageActions.getAction("setUserData")(this.$storage, userData);
                        this.$router.push({name: "actions"});

                    })
                    .catch(error => {
                        if (DEV) console.error(error);
                        return false;
                    })
                    .finally(() => {
                        this.preloader = false;
                    });

            }
        },
        components: {
            vForm,
            formInput
        }
    }

</script>