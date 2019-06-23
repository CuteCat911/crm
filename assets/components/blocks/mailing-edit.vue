<template>
    <div class="mailing-edit">
        <div class="mailing-edit__row">
            <div class="mailing-edit__col mailing-edit__col--left">
                <form-input name="name"
                            :data="data.name"
                ></form-input>
                <form-input name="description"
                            :data="data.description"
                ></form-input>
                <form-input name="template"
                            :data="data.template"
                ></form-input>
                <form-input name="archive"
                            :data="data.archive"
                ></form-input>
            </div>
            <div class="mailing-edit__col mailing-edit__col--right"></div>
        </div>
    </div>
</template>

<script>

    import formInput from "../elements/form-input";

    export default {
        name: "mailing-edit",
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        components: {
            formInput
        }
    }

</script>