<template>
    <popup name="warn-remove-client">
        <template>
            <div class="popup__title-wrapper">
                <div class="popup__title-icon popup__title-icon--warn">
                    <v-svg name="warn"></v-svg>
                </div>
                <p class="popup__title">Внимание!</p>
            </div>
            <div class="popup__description" v-if="client.id && client.name">
                <p>
                    Вы уверены что хотите удалить клиента:
                    <br>
                    <span class="emerald-text">{{ client.name.value }}</span> <span class="small-text">(id: {{ client.id }})</span>
                </p>
            </div>
            <div class="popup__btns-wrapper">
                <div class="popup__btn btn"
                     @click="removeClient"
                >
                    Удалить
                </div>
                <div class="popup__btn btn btn--empty"
                     @click="close"
                >
                    Отмена
                </div>
            </div>
        </template>
    </popup>
</template>

<script>

    import {mapState, mapMutations, mapActions} from "vuex";

    import popup from "../mixins/popup";
    import vSvg from "../mixins/v-svg";

    export default {
        name: "warn-remove-client-popup",
        computed: {
            pageName() {
                return this.$route.name;
            },
            ...mapState("client", {
                client: state => state
            })
        },
        methods: {
            ...mapMutations({
                close: "closePopup",
                setPreloaderStatus: "preloader"
            }),
            ...mapMutations("clients", {
                setLocalPreloaderStatus: "listPreloader"
            }),
            ...mapActions("client", {
                remove: "remove"
            }),
            ...mapActions("clients", {
                getClients: "getList"
            }),
            removeClient() {

                let isClientsPage = this.pageName === "clients";

                this.close();
                isClientsPage ? this.setLocalPreloaderStatus(true) : this.setPreloaderStatus(true);
                this.remove()
                    .then(response => {

                        if (isClientsPage) {

                            this.getClients()
                                .finally(() => {
                                    this.setLocalPreloaderStatus(false);
                                });

                        } else {
                            this.$router.push({name: "clients"});
                        }
                    })
                    .catch(response => {
                        isClientsPage ? this.setLocalPreloaderStatus(false) : this.setPreloaderStatus(false);
                    });
            }
        },
        components: {
            popup,
            vSvg
        }
    }

</script>