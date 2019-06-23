<template>
    <textarea :name="name"
              :ref="name"
              :value="data.value"
              @input="setValue"
    ></textarea>
</template>

<script>

    import {mapMutations} from "vuex";

    export default {
        name: "v-textarea",
        props: {
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true,
                validator(value) {
                    return value === "textarea";
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