<template>
    <div class="counterparty-emails">
        <p class="counterparty-emails__title">{{ title }}</p>
        <div class="counterparty-emails__pagination">
            <slot name="pagination"></slot>
        </div>
        <div class="counterparty-emails__list">
            <slot name="empty-text"></slot>
            <slot name="list"></slot>
        </div>
        <div class="counterparty-emails__pagination">
            <slot name="pagination"></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: "counterparty-emails",
        props: {
            title: {
                type: String,
                required: true
            }
        }
    }

</script>