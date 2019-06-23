import {checkForm} from "../check-form";

export let saveNewMailing = function() {

    let checkData = checkForm(this.$store.getters["mailing/all"], true);

    if (!checkData.status) {
        if (DEV) console.error();
        return false;
    }

    this.$store.commit("preloader", true);
    this.$store.dispatch("mailing/saveNew")
        .then(response => {
            this.$router.push({name: "mailingsTypes"});
        })
        .catch(response => {
            this.$store.commit("preloader", false);
        });

};