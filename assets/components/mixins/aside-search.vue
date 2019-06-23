<template>
    <div class="aside-search">
        <input class="aside-search__input"
               type="text"
               :placeholder="title"
               :value="value"
               @input="search($event.target.value)"
        >
    </div>
</template>

<script>

    export default {
        name: "aside-search",
        props: {
            title: {
                type: String,
                required: true
            },
            value: String,
            search: {
                type: Function,
                required: true
            }
        }
    }

</script>