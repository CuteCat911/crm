<template>
    <div class="aside__wrapper">
        <clients-search></clients-search>
    </div>
</template>

<script>

    import clientsSearch from "../elements/clients-search"

    export default {
        name: "clients-aside",
        components: {
            clientsSearch
        }
    }

</script>