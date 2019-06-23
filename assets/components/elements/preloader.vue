<template>
    <div class="preloader"
         :class="{'is-active': preloader}"
    >
        <div class="preloader__indicator"></div>
    </div>
</template>

<script>

    import {mapState} from "vuex";

    export default {
        name: "preloader",
        computed: {
            ...mapState({
                preloader: state => state.preloader
            })
        }
    }

</script>