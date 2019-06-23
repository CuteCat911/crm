<template>
    <div class="form" :class="'form--' + name">
        <local-preloader :show="preloader"></local-preloader>
        <p class="form__title" v-if="title">{{ title }}</p>
        <p class="form__description" v-if="description">{{ description }}</p>
        <slot name="before-inputs"></slot>
        <div class="form__inputs">
            <slot name="inputs"></slot>
        </div>
        <slot name="after-inputs"></slot>
        <slot name="submit"></slot>
        <slot name="after-submit"></slot>
    </div>
</template>

<script>

    import localPreloader from "../elements/local-preloader";

    export default {
        name: "v-form",
        props: {
            name: {
                type: String,
                required: true
            },
            title: String,
            description: String,
            preloader: {
                type: Boolean,
                required: true
            }
        },
        components: {
            localPreloader
        }
    }

</script>