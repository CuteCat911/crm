<template>
    <div class="form-input">
        <p class="form-input__title"
           v-if="data.title"
        >
            {{ data.title }}
        </p>
        <p class="form-input__description"
           v-if="data.description"
        >
            {{ data.description }}
        </p>
        <label class="form-input__wrapper">
            <component class="form-input__input"
                       :class="['form-input__input--' + data.type, statusClass]"
                       :is="currentComponent"
                       :name="name"
                       :type="(data.type === 'password') ? password.type : data.type"
                       :data="data"
                       :other-data="otherData"
                       :submit-func="submitFunc"
            ></component>
            <span class="form-input__error-message"
                  v-if="data.error.message"
            >
                {{ data.error.message }}
            </span>
        </label>
    </div>
</template>

<script>

    export default {
        name: "form-input",
        props: {
            name: {
                type: String,
                required: true
            },
            data: {
                type: Object,
                required: true
            },
            otherData: Object,
            submitFunc: Function
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

                let type = this.data.type;

                if (["text", "password", "number"].includes(type)) {
                    return "v-input-default";
                } else if (type === "textarea") {
                    return "v-textarea";
                } else if (type === "select") {
                    return "v-select";
                } else if (type === "checkbox") {
                    return "v-input-checkbox";
                } else if (type === "date-time") {
                    return "v-input-date-time";
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
            vInputDefault: () => import("./v-input-default"),
            vTextarea: () => import("./v-textarea"),
            vSelect: () => import("./v-select"),
            vInputCheckbox: () => import("./v-input-checkbox"),
            vInputDateTime: () => import("./v-input-date-time")
        }
    }

</script>