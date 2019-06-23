<template>
    <div class="row-btns" :class="{'box': box}">
        <slot></slot>
    </div>
</template>

<script>

    export default {
        name: "row-btns",
        props: {
            box: Boolean
        }
    }

</script>