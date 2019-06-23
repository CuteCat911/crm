<template>
    <div class="inputs-list" v-if="colsStructure">
        <p class="inputs-list__title" v-if="title">{{ title }}</p>
        <p class="inputs-list__description" v-if="description">{{ description }}</p>
        <div class="inputs-list__header">
            <p class="inputs-list__col-title" v-for="item in colsStructure" :class="'inputs-list__col-title--' + colsStructureLength">{{ item }}</p>
        </div>
        <div class="inputs-list__items">
            <div class="inputs-list__item" v-for="(item,key) in data">
                <div class="inputs-list__item-wrapper">
                    <inputs-list-item v-for="(item2,key2) in colsStructure"
                                      :class="'inputs-list-item--' + colsStructureLength"
                                      :key="key2"
                                      :name="key2 + '-' + key"
                                      :type="item[key2].type"
                                      :data="item[key2]"
                    ></inputs-list-item>
                </div>
                <inputs-list-btns :index="+key"
                                  :add-func="addItem"
                                  :remove-func="removeItem"
                ></inputs-list-btns>
            </div>
        </div>
    </div>
</template>

<script>

    import {getObjectLength} from "../../js/general/get-object-length";
    import {entityTemplates} from "../../js/modules/entity-templates";

    import inputsListItem from "../elements/inputs-list-item";
    import inputsListBtns from "./inputs-list-btns";

    export default {
        name: "inputs-list",
        props: {
            title: String,
            description: String,
            template: {
                type: String,
                required: true
            },
            data: {
                type: Array,
                required: true,
                validator(array) {
                    return array.length;
                }
            }
        },
        data() {
            return {
                colsStructure: null
            }
        },
        computed: {
            colsStructureLength() {
                return getObjectLength(this.colsStructure);
            }
        },
        beforeMount() {
            this.colsStructure = this.getColsStructure();
        },
        methods: {
            getColsStructure() {

                let structure = {};
                let lastItem = this.data[this.data.length - 1];

                for (let i in lastItem) {
                    if (i === "orderIndex" || i === "id") continue;
                    structure[i] = lastItem[i].title;
                }

                return structure;

            },
            addItem(index) {
                this.$store.commit("addItemToInputArray", {array: this.data, index, newItem: entityTemplates.template(this.template)});
            },
            removeItem(index) {
                this.$store.commit("removeItemToInputArray", {array: this.data, index, newItem: entityTemplates.template(this.template)});
            }
        },
        components: {
            inputsListItem,
            inputsListBtns
        }
    }

</script>