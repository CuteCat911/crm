<template>
    <div class="simple-preview-counterparty">
        <p class="simple-preview-counterparty__name">{{ counterparty.name }}</p>
        <p class="simple-preview-counterparty__id">(id: {{ counterparty.id }})</p>
    </div>
</template>

<script>

    export default {
        name: "simple-preview-counterpartyt",
        props: {
            counterparty: {
                type: Object,
                required: true
            }
        }
    }

</script>