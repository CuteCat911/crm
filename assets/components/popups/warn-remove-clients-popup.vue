<template>
    <popup name="warn-remove-clients">
        <template>
            <div class="popup__title-wrapper">
                <div class="popup__title-icon popup__title-icon--warn">
                    <v-svg name="warn"></v-svg>
                </div>
                <p class="popup__title">Внимание!</p>
            </div>
            <div class="popup__description">
                <p>
                    Вы уверены что хотите удалить {{ selected.length }} {{ {count: selected.length, variables: clientVariables} | transchoice }}:
                </p>
            </div>
            <hide-list v-if="selected.length"
                       open-title="Посмотреть список"
                       close-title="Скрыть список"
            >
                <template>
                    <simple-preview-counterparty v-for="client in filteredClients"
                                           :key="client.id"
                                           :counterparty="client"
                    ></simple-preview-counterparty>
                </template>
            </hide-list>
            <div class="popup__btns-wrapper">
                <div class="popup__btn btn"
                     @click="remove"
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
    import {checkType} from "../../js/general/check-type";

    import popup from "../mixins/popup";
    import hideList from "../elements/hide-list";
    import vSvg from "../mixins/v-svg";
    import simplePreviewCounterparty from "../elements/simple-preview-counterparty";

    export default {
        name: "warn-remove-clients-popup",
        data() {
            return {
                clientVariables: ["клиент,", "клиентов", "клиентов"]
            }
        },
        computed: {
            ...mapState("clients", {
                selected: state => state.selected,
                clients: state => state.list
            }),
            filteredClients() {
                return this.clients.filter((client) => {
                    return this.selected.includes(client.id);
                });
            }
        },
        methods: {
            ...mapMutations({
                close: "closePopup"
            }),
            ...mapActions("client", {
                removeClient: "remove"
            }),
            ...mapMutations("clients", {
                setLocalPreloaderStatus: "listPreloader"
            }),
            ...mapActions("clients", {
                getClients: "getList"
            }),
            remove() {

                this.setLocalPreloaderStatus(true);
                this.close();
                this.removeClients(this.selected.entries());

            },
            removeClients(iterator) {

                if (!checkType(iterator, "object")) {
                    if (DEV) console.error();
                    return false;
                }

                let iteration = iterator.next();

                this.close();

                if (iteration.done) {

                    this.getClients()
                        .finally(() => {
                            this.setLocalPreloaderStatus(false);
                        });

                    return false;

                }

                let clientId = iteration.value[1];

                this.removeClient(clientId)
                    .then(response => {
                        this.removeClients(iterator);
                    })
                    .catch(response => {
                        this.removeClients(iterator);
                    });

            }
        },
        components: {
            popup,
            vSvg,
            hideList,
            simplePreviewCounterparty
        }
    }

</script>