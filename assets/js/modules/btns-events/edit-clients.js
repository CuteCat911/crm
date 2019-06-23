export let editClients = function() {

    let selected = this.$store.getters["clients/selected"];

    if (selected.length === 1) {
        this.$router.push({name: "editClient", params: {id: selected[0]}});
    } else {

        for (let id of selected) {
            let routeData = this.$router.resolve({name: "editClient", params: {id}});
            window.open(routeData.href, "_blank");
        }

        this.$store.commit("clients/selected", []);

    }

};