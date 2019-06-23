<template>
    <div class="filter">
        <div class="filter__title-wrapper">
            <p class="filter__title" v-html="title"></p>
        </div>
        <div class="filter__content">
            <slot name="inputs"></slot>
        </div>
        <div class="filter__submit-wrapper">
            <slot name="submit"></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: "v-filter",
        props: {
            title: {
                required: true,
                type: String
            }
        }
    }

</script>