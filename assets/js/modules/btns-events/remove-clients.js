export let removeClients = function() {

    let clients = this.$store.getters["clients/list"];
    let selected = this.$store.getters["clients/selected"];

    if (selected.length === 1) {

        for (let client of clients) {
            if (client.id !== selected[0]) continue;
            // this.$store.dispatch("client/setData", generateCounterpartyStructure("client", client));
        }

        this.$store.commit("openPopup", "warn-remove-client");

    } else {
        this.$store.commit("openPopup", "warn-remove-clients");
    }

};