<template>
    <pagination>
        <template slot="pages">
            <pages :current-page="pages.current"
                   :total-pages="pages.total ? pages.total : 1"
                   :set-page="setPage"
            ></pages>
        </template>
        <template slot="count-on-page">
            <div class="count-on-page">
                <p class="count-on-page__title">Показывать по:</p>
                <div class="count-on-page__list">
                    <span class="count-on-page__item"
                          v-for="count of [30, 50, 100]"
                          :class="{'is-active': pages.countOn === count}"
                          @click="changeCount(count)"
                    >
                        {{ count }}
                    </span>
                </div>
            </div>
        </template>
        <template slot="display-type">
            <div class="display-type">
                <div class="display-type__btn"
                     :class="{'is-active': displayType === 1}"
                     title="Обычный вид"
                     @click="changeDisplayType(1)"
                >
                    <v-svg name="display-type-1"></v-svg>
                </div>
                <div class="display-type__btn"
                     :class="{'is-active': displayType === 2}"
                     title="Компактный вид"
                     @click="changeDisplayType(2)"
                >
                    <v-svg name="display-type-2"></v-svg>
                </div>
            </div>
        </template>
    </pagination>
</template>

<script>

    import {mapState, mapMutations, mapActions} from "vuex";
    import {checkType} from "../../js/general/check-type";
    import {setNewQuery} from "../../js/modules/set-new-query";

    import pagination from "../mixins/pagination";
    import pages from "../elements/pages";
    import vSvg from "../mixins/v-svg";

    export default {
        name: "clients-pagination",
        computed: {
            ...mapState("clients", {
                pages: state => state.pages,
                displayType: state => state.displayType
            })
        },
        methods: {
            ...mapMutations("clients", {
                changeDisplayType: "displayType",
                setPagesData: "pages"
            }),
            ...mapActions("clients", {
                setNewClients: "setNewClients"
            }),
            changeCount(count) {

                if (!checkType(count, "number")) {
                    if (DEV) console.error();
                    return false;
                }

                this.$router.push({
                    query: setNewQuery(this.$route.query, {
                        count,
                        page: this.pages.current
                    })
                });
                this.setPagesData({name: "current", value: 1});
                this.setPagesData({name: "countOn", value: count});
                this.setNewClients();

            },
            setPage(page) {

                if (!checkType(page, "number")) {
                    if (DEV) console.error();
                    return false;
                }

                this.$router.push({
                    query: setNewQuery(this.$route.query, {page})
                });
                this.setPagesData({name: "current", value: page});
                this.setNewClients();

            }
        },
        components: {
            pagination,
            pages,
            vSvg
        }
    }

</script>