<template>
    <input :type="type"
           :name="name"
           :ref="name"
           :value="data.value"
           @input="setValue"
    >
</template>

<script>

    import {mapMutations} from "vuex";

    export default {
        name: "v-input-default",
        props: {
            name: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
                validator(value) {
                    return [
                        "text",
                        "password",
                        "number"
                    ].includes(value);
                }
            },
            data: {
                type: Object,
                required: true
            },
            submitFunc: Function
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