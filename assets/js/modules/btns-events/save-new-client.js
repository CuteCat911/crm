import {checkForm} from "../check-form";

export let saveNewClient = function() {

    let checkData = checkForm(this.$store.getters["client/all"], true);

    if (!checkData.status) {
        if (DEV) console.error();
        return false;
    }

    this.$store.commit("preloader", true);
    this.$store.dispatch("client/saveNew")
        .then(response => {
            this.$router.push({name: "clients"});
        })
        .catch(response => {
            this.$store.commit("preloader", false);
        });

};