import {checkForm} from "../check-form";

export let updateMailingItem = function() {

    let checkData = checkForm(this.$store.getters["mailingItem/all"], true);

    if (!checkData.status) {
        if (DEV) console.error();
        return false;
    }

    this.$store.commit("preloader", true);
    this.$store.dispatch("mailingItem/update")
        .then(response => {
            this.$router.push({name: "mailingsItems"});
        })
        .catch(response => {
            this.$store.commit("preloader", false);
        });

};