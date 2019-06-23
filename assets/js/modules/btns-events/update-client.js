import {checkForm} from "../check-form";

export let updateClient = function() {

    let checkData = checkForm(this.$store.getters['client/all'], true);

    console.log(checkData);

    if (!checkData.status) {
        if (DEV) console.error();
        return false;
    }

    this.$store.commit("preloader", true);
    this.$store.dispatch("client/update")
        .then(response => {
            this.$router.push({name: "clients"});
        })
        .catch(response => {
            this.$store.commit("preloader", false);
        });

};