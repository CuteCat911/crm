<template>
    <div class="popups"
         :class="{'is-open': openedPopups.length}"
    >
        <div class="popups__overlay"
             @click="close"
        ></div>
        <warn-remove-client-popup></warn-remove-client-popup>
        <warn-remove-clients-popup></warn-remove-clients-popup>
    </div>
</template>

<script>

    import {mapState, mapMutations} from "vuex";

    import warnRemoveClientPopup from "../popups/warn-remove-client-popup";
    import warnRemoveClientsPopup from "../popups/warn-remove-clients-popup";

    export default {
        name: "popups",
        computed: {
            ...mapState({
                openedPopups: state => state.openedPopups
            })
        },
        methods: {
            ...mapMutations({
                close: "closePopup"
            })
        },
        components: {
            warnRemoveClientPopup,
            warnRemoveClientsPopup
        }
    }

</script>