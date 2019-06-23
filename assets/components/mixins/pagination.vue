<template>
    <div class="pagination box">
        <div class="pagination__pages">
            <slot name="pages"></slot>
        </div>
        <div class="pagination__count-on-page">
            <slot name="count-on-page"></slot>
        </div>
        <div class="pagination__display-type">
            <slot name="display-type"></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: "pagination"
    }

</script>