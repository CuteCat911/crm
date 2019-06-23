<template>
    <div class="sub-header">
        <router-link class="sub-header__link" v-for="item in nav"
                     :key="item.pageName"
                     :to="{name: item.pageName}"
                     :exact="item.exact"
        >
            {{ item.title }}
        </router-link>
    </div>
</template>

<script>

    export default {
        name: "sub-header",
        props: {
            nav: {
                type: Array,
                required: true
            }
        }
    }

</script>