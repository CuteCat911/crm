<template>
    <div class="counterparties-emails">
        <div class="counterparties-emails__header">
            <div class="counterparties-emails__search">
                <input class="counterparties-emails__search-input"
                       type="text"
                       :value="search"
                       placeholder="Поиск контрагента"
                       @input="setSearch($event.target.value)"
                >
            </div>
            <div class="counterparties-emails__filters-block"></div>
            <div class="counterparties-emails__count-block">
                <p class="counterparties-emails__count-title">Показывать по:</p>
                <div class="counterparties-emails__count-list">
                    <span class="counterparties-emails__count"
                          v-for="count in [30, 50, 100]"
                          :class="{'is-active': count === emailsCount}"
                          @click="setEmailsCount(count)"

                    >
                        {{ count }}
                    </span>
                </div>
            </div>
        </div>
        <div class="cols cols--2">
            <div class="cols__col">
                <slot name="clients"></slot>
            </div>
            <div class="cols__col"></div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "counterparties-emails",
        props: {
            emailsCount: {
                type: Number,
                required: true
            },
            setEmailsCount: {
                type: Function,
                required: true
            },
            search: String,
            setSearch: {
                type: Function,
                required: true
            }
        }
    }

</script>