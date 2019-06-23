<template>
    <svg class="svg-icon">
        <use :xlink:href="currentPath + name"></use>
    </svg>
</template>

<script>

    export default {
        name: "v-svg",
        props: {
            name: {
                type: String,
                required: true
            },
            color: Boolean
        },
        data() {
            return {
                defaultPath: "/svg-sprite.svg#",
                colorPath: "/color-svg-sprite.svg#"
            };
        },
        computed: {
            currentPath() {
                return (this.color) ? this.colorPath : this.defaultPath;
            }
        }
    };

</script>