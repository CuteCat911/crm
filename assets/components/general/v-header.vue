<template>
    <header class="header">
        <div class="wrapper">
            <div class="header__logo">
                <span class="header__logo-text is-main"
                      v-if="pageName === 'actions'"
                >
                    SimpleCrm
                </span>
                <router-link class="header__logo-text"
                             v-else
                             :to="{name: 'actions'}"
                             exact
                >
                    SimpleCrm
                </router-link>
            </div>
            <nav class="header__nav">
                <router-link class="header__nav-link"
                             v-for="item of nav"
                             :key="item.pageName"
                             :to="{name: item.pageName}"
                             :exact="item.exact"
                >
                    {{ item.title }}
                </router-link>
            </nav>
        </div>
    </header>
</template>

<script>

    export default {
        name: "v-header",
        data() {
            return {
                nav: [
                    {pageName: "actions", title: "Действия", exact: true},
                    {pageName: "clients", title: "Клиенты"},
                    {pageName: "mailingsItems", title: "E-mail рассылки"}
                ]
            }
        },
        computed: {
            pageName() {
                return this.$route.name;
            }
        }
    }

</script>