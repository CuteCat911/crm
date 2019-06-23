<template>
    <div class="edit-contact-persons">
        <div class="edit-contact-persons__person" v-for="(person,key) of persons">
            <edit-contact-person :data="person"></edit-contact-person>
            <contact-person-btns :index="key"
                                 :add-func="addPerson"
                                 :remove-func="removePerson"
            ></contact-person-btns>
        </div>
    </div>
</template>

<script>

    import {entityTemplates} from "../../js/modules/entity-templates";

    import editContactPerson from "../elements/edit-contact-person";
    import contactPersonBtns from "./contact-person-btns";

    export default {
        name: "edit-contact-persons",
        props: {
            persons: {
                type: Array,
                required: true,
                validator(array) {
                    return array.length;
                }
            },
            template: {
                type: String,
                required: true
            }
        },
        data() {
            return {}
        },
        methods: {
            addPerson(index) {
                this.$store.commit("addItemToInputArray", {array: this.persons, index, newItem: entityTemplates.template("contactPerson")});
            },
            removePerson(index) {
                this.$store.commit("removeItemToInputArray", {array: this.persons, index, newItem: entityTemplates.template("contactPerson")});
            }
        },
        components: {
            editContactPerson,
            contactPersonBtns
        }
    }

</script>