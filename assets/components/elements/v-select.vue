<template>
    <select v-if="data.selectList"
            :name="name"
            :ref="name"
            :value="data.value"
            @change="setValue"
    >
<!--        TODO: сдклать настройку первого option через data -->
        <option value="" disabled>Выберите</option>
        <template v-for="item of data.selectList">
            <option :value="item.id">{{ item.name }}</option>
        </template>
    </select>
</template>

<script>

    import {mapMutations} from "vuex";

    export default {
        name: "v-select",
        props: {
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true,
                validator(value) {
                    return value === "select";
                }
            },
            data: {
                type: Object,
                required: true
            }
        },
        methods: {
            ...mapMutations({
                updateValue: "updateInputValue"
            }),
            setValue(e) {

                let {store} = this.data.params;
                let newValue = e.target.value;

                if (store) {
                    this.updateValue({newValue, input: this.data});
                } else {
                    this.data.value = newValue;
                }

            }
        }
    }

</script>