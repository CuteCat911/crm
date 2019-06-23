<template>
    <div class="row-btn">
        <router-link class="row-btn__btn btn"
                     :class="{'is-disabled': disabled}"
                     v-if="link"
                     :to="link"
                     tag="button"
        >
            {{ title }}
        </router-link>
        <button class="row-btn__btn btn"
                :class="{'is-disabled': disabled}"
                v-else
                @click="checkClickFunc ? clickFunc() : null"
        >
            {{ title }}
        </button>
    </div>
</template>

<script>

    import {checkType} from "../../js/general/check-type";

    export default {
        name: "row-btn",
        props: {
            title: {
                required: true,
                type: String
            },
            disabled: Boolean,
            clickFunc: Function,
            link: Object
        },
        computed: {
            checkClickFunc() {
                return checkType(this.clickFunc, "function");
            }
        }
    }

</script>