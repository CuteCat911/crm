<template>
    <label class="inputs-list-item">
        <component class="inputs-list-item__input"
                   :class="['inputs-list-item__input--' + type, statusClass]"
                   v-bind:is="currentComponent"
                   :name="name"
                   :type="(type === 'password') ? password.type : type"
                   :data="data"
        ></component>
        <span class="inputs-list-item__error-message"
              v-if="data.error.message"
        >
            {{ data.error.message }}
        </span>
    </label>
</template>

<script>

    import vInputDefault from "./v-input-default";
    import vTextarea from "./v-textarea";

    export default {
        name: "inputs-list-item",
        props: {
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true,
                validator(value) {
                    return [
                        "text",
                        "password",
                        "textarea",
                        "select",
                        "image",
                        "file",
                        "checkbox",
                        "radio",
                        "email",
                        "color",
                        "number",
                        "date",
                        "time",
                        "date-time",
                        "url",
                    ].includes(value);
                }
            },
            data: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                password: {
                    type: "password",
                    view: false
                }
            };
        },
        computed: {
            currentComponent() {

                let type = this.type;

                if (["text", "password", "number"].includes(type)) {
                    return "v-input-default";
                } else if (type === "textarea") {
                    return "v-textarea";
                }

            },
            statusClass() {
                if (this.data.error.status && !this.data.success) {
                    return "is-error";
                } else if (!this.data.error.status && this.data.success) {
                    return "is-success";
                } else {
                    return null;
                }
            }
        },
        components: {
            vInputDefault,
            vTextarea
        }
    }

</script>