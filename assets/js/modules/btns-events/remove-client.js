export let removeClient = function() {
    this.$store.commit("openPopup", "warn-remove-client");
};