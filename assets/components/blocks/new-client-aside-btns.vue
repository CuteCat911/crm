<template>
    <aside-btns>
        <aside-btn title="Сохранить клиента"
                   icon="save"
                   :click-func="save"
        ></aside-btn>
        <aside-btn title="Сохранить и содать"
                   icon="plus"
                   :click-func="saveAndCreate"
        ></aside-btn>
        <aside-btn title="Отмена"
                   icon="cancel"
                   :link="{name: 'clients'}"
        ></aside-btn>
    </aside-btns>
</template>

<script>

    import {btnsEvents} from "../../js/modules/btns-events";

    import asideBtns from "../mixins/aside-btns";
    import asideBtn from "../mixins/aside-btn";

    export default {
        name: "new-client-aside-btns",
        methods: {
            save: btnsEvents.getEvent("saveNewClient"),
            saveAndCreate: btnsEvents.getEvent("saveAndCreateNewClient")
        },
        components: {
            asideBtns,
            asideBtn
        }
    }

</script>