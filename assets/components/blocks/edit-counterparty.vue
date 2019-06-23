<template>
    <div class="edit-counterparty">
<!--        TODO: вывод времени создания и редактирования-->
        <div class="edit-counterparty__row">
            <p class="edit-counterparty__title">О клиенте:</p>
            <div class="edit-counterparty__col edit-counterparty__col--left">
                <form-input name="name"
                            :data="data.name"
                ></form-input>
                <form-input name="priority"
                            :data="data.priority"
                ></form-input>
                <form-input name="source"
                            :data="data.source"
                ></form-input>
                <form-input name="groupType"
                            :data="data.groupType"
                ></form-input>
                <form-input name="city"
                            :data="data.city"
                ></form-input>
                <form-input name="postIndex"
                            :data="data.postIndex"
                ></form-input>
                <form-input name="address"
                            :data="data.address"
                ></form-input>
            </div>
            <div class="edit-counterparty__col edit-counterparty__col--right">
                <form-input class="form-input--description"
                            name="description"
                            :data="data.description"
                ></form-input>
            </div>
        </div>
        <div class="edit-counterparty__row">
            <p class="edit-counterparty__title">Контактная информация:</p>
            <div class="edit-counterparty__col edit-counterparty__col--left">
                <inputs-list :title="data.emails.title"
                             template="email"
                             :data="data.emails.value"
                ></inputs-list>
                <inputs-list :title="data.phones.title"
                             template="phone"
                             :data="data.phones.value"
                ></inputs-list>
            </div>
            <div class="edit-counterparty__col edit-counterparty__col--right">
                <inputs-list :title="data.sites.title"
                             template="site"
                             :data="data.sites.value"
                ></inputs-list>
                <inputs-list :title="data.socials.title"
                             template="social"
                             :data="data.socials.value"
                ></inputs-list>
            </div>
        </div>
        <div class="edit-counterparty__row">
            <p class="edit-counterparty__title">Контактные лица:</p>
            <edit-contact-persons :persons="data.contactPersons.value"
                                  template="contactPerson"
            ></edit-contact-persons>
        </div>
    </div>
</template>

<script>

    import formInput from "../elements/form-input";
    import inputsList from "./inputs-list";
    import editContactPersons from "./edit-contact-persons";

    export default {
        name: "edit-counterparty",
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        components: {
            formInput,
            inputsList,
            editContactPersons
        }
    }

</script>