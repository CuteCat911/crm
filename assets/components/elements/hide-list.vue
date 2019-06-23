<template>
    <div class="hide-list">
        <div class="hide-list__btn-wrapper">
            <p class="hide-list__btn"
               @click="setStatus"
               v-html="open ? closeTitle : openTitle"
            ></p>
        </div>
        <div class="hide-list__list" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: "hide-list",
        props: {
            openTitle: {
                type: String,
                required: true
            },
            closeTitle: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                open: false
            }
        },
        methods: {
            setStatus() {
                this.open = !this.open;
            }
        }
    }

</script>