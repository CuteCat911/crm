<template>
    <aside-btns>
        <aside-btn title="Сохранить"
                   icon="save"
                   :click-func="save"
        ></aside-btn>
        <aside-btn title="Сохранить и содать"
                   icon="plus"
        ></aside-btn>
        <aside-btn title="Отмена"
                   icon="cancel"
        ></aside-btn>
    </aside-btns>
</template>

<script>

    import {btnsEvents} from "../../js/modules/btns-events";

    import asideBtns from "../mixins/aside-btns";
    import asideBtn from "../mixins/aside-btn";

    export default {
        name: "new-mailing-aside-btns",
        methods: {
            save: btnsEvents.getEvent("saveNewMailing")
        },
        components: {
            asideBtns,
            asideBtn
        }
    }

</script>