<template>
    <div class="aside-btn">
        <router-link class="aside-btn__btn"
                     :class="{'is-disabled': disabled}"
                     v-if="link"
                     :to="link"
                     tag="div"
                     :title="title"
        >
            <v-svg :name="icon"></v-svg>
        </router-link>
        <div class="aside-btn__btn"
             :class="{'is-disabled': disabled}"
             v-else
             :title="title"
             @click="checkClickFunc ? clickFunc() : null"
        >
            <v-svg :name="icon"></v-svg>
        </div>
    </div>
</template>

<script>

    import vSvg from "./v-svg";
    import {checkType} from "../../js/general/check-type";

    export default {
        name: "aside-btn",
        props: {
            title: {
                required: true,
                type: String
            },
            icon: {
                required: true,
                type: String
            },
            clickFunc: Function,
            disabled: Boolean,
            link: Object
        },
        computed: {
            checkClickFunc() {
                return checkType(this.clickFunc, "function");
            }
        },
        components: {
            vSvg
        }
    }

</script>