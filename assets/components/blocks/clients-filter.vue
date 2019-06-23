<template>
    <v-filter title="Фильтровать клиентов"></v-filter>
</template>

<script>

    import vFilter from "../mixins/v-filter";

    export default {
        name: "clients-filter",
        components: {
            vFilter
        }
    }

</script>