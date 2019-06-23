import {checkForm} from "../check-form";

export let saveAndCreateNewClient = function() {

    let checkData = checkForm(this.$store.getters['client/all'], true);

    if (!checkData.status) {
        if (DEV) console.error();
        return false;
    }

    this.$store.commit("preloader", true);
    // this.$store.dispatch("client/saveNew")
    //     .then(response => {
    //         this.$store.dispatch("client/setData", generateCounterpartyStructure("client"));
    //     })
    //     .finally(() => {
    //         this.$store.commit("preloader", false);
    //     });

};