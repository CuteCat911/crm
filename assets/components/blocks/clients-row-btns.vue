<template>
    <row-btns :box="true">
        <button class="row-btn btn btn--empty"
                v-html="checkAllSelect ? 'Снять выделение' : 'Выделить всех'"
                @click="selectDrop"
        ></button>
        <row-btn title="Добавить нового клиента"
                 :link="{name: 'newClient'}"
        ></row-btn>
        <row-btn title="Удалить"
                 :disabled="checkDisabled"
                 :click-func="removeClients"
        ></row-btn>
        <row-btn title="Редактировать"
                 :disabled="checkDisabled"
                 :click-func="editClients"
        ></row-btn>
    </row-btns>
</template>

<script>

    import {mapState, mapMutations} from "vuex";
    import {btnsEvents} from "../../js/modules/btns-events";

    import rowBtns from "../mixins/row-btns";
    import rowBtn from "../mixins/row-btn";

    export default {
        name: "clients-row-btns",
        computed: {
            ...mapState("clients", {
                clients: state => state.items,
                selected: state => state.selected
            }),
            checkDisabled() {
                return !this.selected.length;
            },
            checkAllSelect() {
                return this.clients.length === this.selected.length;
            }
        },
        methods: {
            ...mapMutations("clients", {
                addClientsSelectedItem: "addSelectedItem",
                clearSelected: "selected"
            }),
            removeClients: btnsEvents.getEvent("removeClients"),
            editClients: btnsEvents.getEvent("editClients"),
            selectDrop() {

                if (this.checkAllSelect) {
                    this.clearSelected([]);
                } else {
                    for (let client of this.clients) {
                        this.addClientsSelectedItem(client.id);
                    }
                }

            }
        },
        components: {
            rowBtns,
            rowBtn
        }
    }

</script>