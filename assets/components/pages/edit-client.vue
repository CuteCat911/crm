<template>
    <div class="page">
        <div class="counterparty box box--page">
            <div class="page__title-wrapper">
                <h1 class="page__title">Редактирование клиента id: {{ client.id }}</h1>
                <edit-client-row-btns></edit-client-row-btns>
            </div>
            <edit-counterparty v-if="client.name"
                               :data="client"
            ></edit-counterparty>
        </div>
    </div>
</template>

<script>

    import {mapState, mapMutations, mapActions} from "vuex";
    import {convertString} from "../../js/general/convert-string";
    import {checkType} from "../../js/general/check-type";
    import {structures} from "../../js/modules/structures";

    import editClientRowBtns from "../blocks/edit-client-row-btns";
    import editCounterparty from "../blocks/edit-counterparty";

    export default {
        name: "edit-client-page",
        computed: {
            ...mapState("endpoints", {
                endpoint: state => state.editClient
            }),
            ...mapState("client", {
                client: state => state
            })
        },
        beforeMount() {

            this.$root.getEndpointData({
                server: {
                    method: this.endpoint.method,
                    url: convertString(this.endpoint.url, this.$route.params)
                },
                funcs: {
                    success: this.setData
                }
            });

        },
        methods: {
            ...mapMutations({
                setPreloaderStatus: "preloader"
            }),
            ...mapActions("client", {
                setClientData: "setData"
            }),
            setData(data) {

                if (!checkType(data, "object") || !checkType(data.data, "object")) {
                    if (DEV) console.error();
                    return false;
                }

                data = data.data;
                this.setClientData(structures.structure("counterparty", {type: "client", data: data.client}));
                this.setPreloaderStatus(false);

            }
        },
        components: {
            editClientRowBtns,
            editCounterparty
        }
    }

</script>