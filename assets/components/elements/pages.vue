<template>
    <div class="pages">
        <div class="pages__btn pages__btn--first btn"
             :class="{'is-disabled': currentPage === 1}"
             @click="setPage(1)"
        >
            В начало
        </div>
        <template v-if="totalPages <= 6">

            <div class="pages__page"
                 v-for="page in totalPages"
                 :class="{'is-active': page === currentPage}"
                 @click="page !== currentPage ? setPage(page) : null"
            >
                {{ page }}
            </div>

        </template>
        <template v-else>
            <template v-if="currentPage <= 3">

                <div class="pages__page"
                     v-for="page in 5"
                     :class="{'is-active': page === currentPage}"
                     @click="page !== currentPage ? setPage(page) : null"
                >
                    {{ page }}
                </div>

            </template>
            <template v-else-if="currentPage > totalPages - 3">

                <div class="pages__page"
                     v-for="page in totalPages"
                     v-if="page >= totalPages - 4"
                     :class="{'is-active': page === currentPage}"
                     @click="page !== currentPage ? setPage(page) : null"
                >
                    {{ page }}
                </div>

            </template>
            <template v-else>

                <div class="pages__page"
                     @click="setPage(currentPage - 2)"
                >
                    {{ currentPage - 2 }}
                </div>
                <div class="pages__page"
                     @click="setPage(currentPage - 1)"
                >
                    {{ currentPage - 1 }}
                </div>
                <div class="pages__page is-active">{{ currentPage }}</div>
                <div class="pages__page"
                     @click="setPage(currentPage + 1)"
                >
                    {{ currentPage + 1 }}
                </div>
                <div class="pages__page"
                     @click="setPage(currentPage + 2)"
                >
                    {{ currentPage + 2 }}
                </div>

            </template>
        </template>
        <div class="pages__btn pages__btn--last btn"
             :class="{'is-disabled': currentPage === totalPages}"
             @click="setPage(totalPages)"
        >
            В конец
        </div>
    </div>
</template>

<script>

    export default {
        name: "pages",
        props: {
            currentPage: {
                type: Number,
                required: true
            },
            totalPages: {
                type: Number,
                required: true
            },
            setPage: {
                type: Function,
                required: true
            }
        }
    }

</script>