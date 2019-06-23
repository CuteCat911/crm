<template>
    <input v-if="!data.checkboxes"
           :name="name"
           :type="type"
           :ref="name"
           :value="data.value"
           @click="setValue"
    >
    <div class="checkboxes-wrapper" v-else>
        <label :for="checkbox in data.checkboxes"></label>
    </div>
</template>

<script>

    import {mapMutations} from "vuex";

    export default {
        name: "v-input-checkbox",
        props: {
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true,
                validator(value) {
                    return value === "checkbox";
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
                let newValue = e.target.checked;

                if (store) {
                    this.updateValue({newValue, input: this.data});
                } else {
                    this.data.value = newValue;
                }

            }
        }
    }

</script>