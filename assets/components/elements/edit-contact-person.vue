<template>
    <div class="edit-contact-person">
        <div class="edit-contact-person__info">
            <div class="edit-contact-person__full-name">
                <form-input name="lastName"
                            :type="data.lastName.type"
                            :title="data.lastName.title"
                            :data="data.lastName"
                ></form-input>
                <form-input name="name"
                            :type="data.name.type"
                            :title="data.name.title"
                            :data="data.name"
                ></form-input>
                <form-input name="patronymic"
                            :type="data.patronymic.type"
                            :title="data.patronymic.title"
                            :data="data.patronymic"
                ></form-input>
            </div>
            <form-input name="position"
                        :type="data.position.type"
                        :title="data.position.title"
                        :data="data.position"
            ></form-input>
            <form-input name="description"
                        :type="data.description.type"
                        :title="data.description.title"
                        :data="data.description"
            ></form-input>
        </div>
        <div class="edit-contact-person__contacts">
            <p class="edit-contact-person__title">Контактные данные</p>
            <inputs-list :title="data.emails.title"
                         template="email"
                         :data="data.emails.value"
            ></inputs-list>
            <inputs-list :title="data.phones.title"
                         template="phone"
                         :data="data.phones.value"
            ></inputs-list>
            <inputs-list :title="data.socials.title"
                         template="social"
                         :data="data.socials.value"
            ></inputs-list>
        </div>
    </div>
</template>

<script>

    import formInput from "./form-input";
    import inputsList from "../blocks/inputs-list";

    export default {
        name: "edit-contact-person",
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        components: {
            formInput,
            inputsList
        }
    }

</script>