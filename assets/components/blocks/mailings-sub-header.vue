<template>
    <sub-header :nav="nav"></sub-header>
</template>

<script>

    import subHeader from "../mixins/sub-header";

    export default {
        name: "mailings-sub-header",
        data() {
            return {
                nav: [
                    {pageName: "mailingsItems", title: "Рассылки"},
                    {pageName: "mailingsTypes", title: "Типы рассылок"}
                ]
            }
        },
        components: {
            subHeader
        }
    }

</script>