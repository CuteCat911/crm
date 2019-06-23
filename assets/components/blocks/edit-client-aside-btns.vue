<template>
    <aside-btns>
        <aside-btn title="Просмотр"
                   icon="view"
                   :link="{name: 'viewClient', params: {id: $route.params.id}}"
        ></aside-btn>
        <aside-btn title="Сохранить"
                   icon="save"
                   :click-func="update"
        ></aside-btn>
        <aside-btn title="Сохранить и содать"
                   icon="plus"
        ></aside-btn>
        <aside-btn title="Удалить"
                   icon="remove"
                   :click-func="remove"
        ></aside-btn>
        <aside-btn title="Отмена"
                   icon="cancel"
                   :link="{name: 'clients'}"
        ></aside-btn>
    </aside-btns>
</template>

<script>

    import asideBtns from "../mixins/aside-btns";
    import asideBtn from "../mixins/aside-btn";
    import {btnsEvents} from "../../js/modules/btns-events";

    export default {
        name: "edit-client-aside-btns",
        methods: {
            update: btnsEvents.getEvent("updateClient"),
            remove: btnsEvents.getEvent("removeClient")
        },
        components: {
            asideBtns,
            asideBtn
        }
    }

</script>