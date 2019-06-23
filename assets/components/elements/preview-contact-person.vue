<template>
    <div class="preview-contact-person">
        <p class="preview-contact-person__id">id: {{ data.id }}</p>
        <div class="preview-contact-person__header">
            <p class="preview-contact-person__full-name">
                {{ data.lastName }} {{ data.name }} {{ data.patronymic }}
            </p>
            <p class="preview-contact-person__position" v-if="data.position">{{ data.position }}</p>
        </div>
        <div class="preview-contact-person__contacts-block"
             v-if="data.emails || data.phones"
             v-show="type === 'wide' || open"
        >
            <div class="preview-contact-person__contacts">
                <div class="preview-contact-person__contacts-title"></div>
                <div class="preview-contact-person__contacts-item"
                     v-for="email of data.emails"
                     :key="email.id"
                >
                    <p class="preview-contact-person__contacts-item-title"
                       v-if="email.name"
                    >{{ email.name }}</p>
                    <a class="preview-contact-person__contacts-item-link"
                       :href="'mailto:' + email.email"
                    >{{ email.email }}</a>
                </div>
            </div>
            <div class="preview-contact-person__contacts">
                <div class="preview-contact-person__contacts-title"></div>
                <div class="preview-contact-person__contacts-item"
                     v-for="phone of data.phones"
                     :key="phone.id"
                >
                    <p class="preview-contact-person__contacts-item-title"
                       v-if="phone.name"
                    >{{ phone.name }}</p>
                    <a class="preview-contact-person__contacts-item-link"
                       :href="'tel:' + phone.phone"
                    >{{ phone.phone }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "preview-contact-person",
        props: {
            type: {
                type: String,
                required: true,
                validator(value) {
                    return ["wide"].includes(value);
                }
            },
            data: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                open: false
            }
        },
        methods: {
            goToEdit() {

            }
        }
    }

</script>