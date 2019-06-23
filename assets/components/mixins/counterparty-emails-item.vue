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
        <div class="counterparty-emails-item__item-block" v-if="data.contactPersons.length">
            <p class="counterparty-emails-item__item-title">Контактные лица:</p>
            <div class="counterparty-emails-item__item-list">
                <div class="counterparty-emails-item__person" v-for="person in data.contactPersons" :key="person.id">
                    <p class="counterparty-emails-item__person-id">{{ person.id }}</p>
                    <div class="counterparty-emails-item__person-header">
                        <p class="counterparty-emails-item__person-full-name">
                            {{ person.lastName }} {{ person.name }} {{ person.patronymic }}
                        </p>
                        <p class="counterparty-emails-item__person-position" v-if="person.position">{{ person.position }}</p>
                    </div>
                    <div class="counterparty-emails-item__person-emails">
                        <checking-email v-for="email in person.emails"
                                        :key="email.id"
                                        :data="email"
                                        :selected-emails="selectedEmails"
                                        :set-email="setEmail"
                        ></checking-email>
                    </div>
                </div>
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