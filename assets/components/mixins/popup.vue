<template>
    <div class="popup box"
         :class="{'is-open': openPopup === name, 'is-big': checkBig}"
    >
        <div class="popup__close"
             @click="close"
        >
            <v-svg name="cancel"></v-svg>
        </div>
        <div class="popup__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>

    import {mapState, mapMutations} from "vuex";
    import {windowResize} from "../../js/general/window-resize";

    import vSvg from "./v-svg";

    export default {
        name: "popup",
        props: {
            name: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                sizes: null
            }
        },
        computed: {
            ...mapState({
                openPopup: state => state.openedPopups[state.openedPopups.length - 1]
            }),
            checkBig() {

                if (!this.sizes) return false;

                let windowHeight = window.innerHeight;
                let popupHeight = this.sizes.height;

                return popupHeight > windowHeight - 160;

            }
        },
        mounted() {

            this.setSizes();
            this.$el.addEventListener("click", this.setSizes);
            windowResize(this.setSizes);

        },
        methods: {
            ...mapMutations({
                close: "closePopup"
            }),
            setSizes() {
                this.sizes = this.$el.getBoundingClientRect();
            }
        },
        components: {
            vSvg
        }
    }

</script>