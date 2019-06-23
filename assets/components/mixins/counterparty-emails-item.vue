<template>
    <div class="counterparty-emails-item">
        <div class="counterparty-emails-item__header">
            <p class="counterparty-emails-item__name">{{ data.name }}</p>
            <p class="counterparty-emails-item__id">(id: {{ data.id }})</p>
        </div>
        <div class="counterparty-emails-item__item-block" v-if="data.emails.length">
            <p class="counterparty-emails-item__item-title">E-mails:</p>
            <div class="counterparty-emails-item__item-list">
                <checking-email v-for="email in data.emails"
                                :key="email.id"
                                :data="email"
                                :selected-emails="selectedEmails"
                                :set-email="setEmail"
                ></checking-email>
            </div>
        </div>
    </div>
</template>

<script>

    import checkingEmail from "../elements/checking-email";

    export default {
        name: "counterparty-emails-item",
        props: {
            data: {
                type: Object,
                required: true
            },
            selectedEmails: {
                type: Array,
                required: true
            },
            setEmail: {
                type: Function,
                required: true
            }
        },
        components: {
            checkingEmail
        }
    }

</script>