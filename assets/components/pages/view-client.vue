<template>
    <div class="page">
        <div class="counterparty box box--page">
            <div class="page__title-wrapper">
                <h1 class="page__title">Клиент id: {{ client.id }}</h1>
                <view-client-row-btns></view-client-row-btns>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapState, mapMutations, mapActions} from "vuex";
    import {checkType} from "../../js/general/check-type";
    import {convertString} from "../../js/general/convert-string";

    import viewClientRowBtns from "../blocks/view-client-row-btns";

    export default {
        name: "view-client-page",
        computed: {
            ...mapState("endpoints", {
                endpoint: state => state.viewClient
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
                // this.setClientData(generateCounterpartyStructure("client", data.client));
                this.setPreloaderStatus(false);

            }
        },
        components: {
            viewClientRowBtns
        }
    }

</script>