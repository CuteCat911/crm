<template>
    <div class="counterparty-wide"
         :class="{'is-select': checkSelected}"
         v-dbl-click="[click, dblClick]"
    >
        <div class="counterparty-wide__header">
            <div class="counterparty-wide__title-wrapper">
                <p class="counterparty-wide__title">{{ data.name }}</p>
                <p class="counterparty-wide__id">(id: {{ data.id }})</p>
            </div>
            <p class="counterparty-wide__updated-time">Время последнего редактирования: {{ data.updatedTime ? data.updatedTime : data.createdTime | time }}</p>
        </div>
        <div class="counterparty-wide__info-block">
            <div class="counterparty-wide__priority-block" v-if="data.priority">
                <p class="counterparty-wide__priority-title">Приоритет:</p>
                <p class="counterparty-wide__priority">{{ data.priority }}</p>
            </div>
            <p class="counterparty-wide__group" v-if="data.group">{{ data.group }}</p>
        </div>
        <div class="counterparty-wide__address-block" v-if="data.city || data.postIndex || data.address">
            <div class="counterparty-wide__address-item" v-if="data.city">
                <p class="counterparty-wide__address-item-title">Город:</p>
                <p class="counterparty-wide__address-item-text">{{ data.city }}</p>
            </div>
            <div class="counterparty-wide__address-item" v-if="data.postIndex">
                <p class="counterparty-wide__address-item-title">Почтовый индекс:</p>
                <p class="counterparty-wide__address-item-text">{{ data.postIndex }}</p>
            </div>
            <div class="counterparty-wide__address-item" v-if="data.address">
                <p class="counterparty-wide__address-item-title">Адрес:</p>
                <p class="counterparty-wide__address-item-text">{{ data.address }}</p>
            </div>
        </div>
        <div class="counterparty-wide__contacts-block" v-if="data.emails.length || data.phones.length">
            <div class="counterparty-wide__contacts" v-if="data.emails.length">
                <p class="counterparty-wide__contacts-title">E-mails:</p>
                <div class="counterparty-wide__contacts-item" v-for="email of data.emails">
                    <p class="counterparty-wide__contacts-item-title" v-if="email.name">{{ email.name }}</p>
                    <a class="counterparty-wide__contacts-item-link" :href="'mailto:' + email.email">{{ email.email }}</a>
                </div>
            </div>
            <div class="counterparty-wide__contacts" v-if="data.phones.length">
                <p class="counterparty-wide__contacts-title">Телефоны:</p>
                <div class="counterparty-wide__contacts-item" v-for="phone of data.phones">
                    <p class="counterparty-wide__contacts-item-title" v-if="phone.name">{{ phone.name }}</p>
                    <a class="counterparty-wide__contacts-item-link" :href="'tel:' + phone.phone">{{ phone.phone }}</a>
                </div>
            </div>
        </div>
        <div class="counterparty-wide__contact-persons" v-if="data.contactPersons.length">
            <p class="counterparty-wide__contact-persons-title">Контактные лица:</p>
            <div class="counterparty-wide__contact-persons-list">
                <preview-contact-person v-for="person of data.contactPersons"
                                        :key="person.id"
                                        type="wide"
                                        :data="person"
                ></preview-contact-person>
            </div>
        </div>
    </div>
</template>

<script>

    import dblClick from "../directives/dbl-click";
    import {mapState, mapMutations} from "vuex";

    import previewContactPerson from "./preview-contact-person";

    export default {
        name: "counterparty-wide",
        props: {
            type: {
                type: String,
                required: true,
                validator(value) {
                    return ["client"].includes(value);
                }
            },
            data: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                clicks: 0,
                timer: null
            }
        },
        computed: {
            ...mapState("clients", {
                clientsSelected: state => state.selected
            }),
            checkSelected() {
                if (this.type === "client") {
                    return this.clientsSelected.includes(this.data.id);
                } else {

                }
            }
        },
        methods: {
            ...mapMutations("clients", {
                addClientsSelectedItem: "addSelectedItem",
                removeClientsSelectedItem: "removeSelectedItem"
            }),
            click() {

                if (this.checkSelected) {
                    if (this.type === "client") {
                        this.removeClientsSelectedItem(this.clientsSelected.indexOf(this.data.id));
                    } else {

                    }
                } else {
                    if (this.type === "client") {
                        this.addClientsSelectedItem(this.data.id);
                    } else {

                    }
                }

            },
            dblClick() {
                this.$router.push({name: "viewClient", params: {id: this.data.id}});
            }
        },
        components: {
            previewContactPerson
        },
        directives: {
            dblClick
        }
    };

</script>