export let editMailingsItems = function () {

    let selected = this.$store.getters["mailingsItems/selected"];

    if (selected.length === 1) {
        this.$router.push({name: "editMailingItem", params: {id: selected[0]}});
    } else {

        for (let id of selected) {
            let routeData = this.$router.resolve({name: "editMailingItem", params: {id}});
            window.open(routeData.href, "_blank");
        }

        this.$store.commit("mailingsItems/selected", []);

    }

};