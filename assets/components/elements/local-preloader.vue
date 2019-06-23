<template>
    <div class="local-preloader"
         :class="{'is-active': show}"
    >
        <div class="local-preloader__indicator"></div>
    </div>
</template>

<script>

    export default {
        name: "local-preloader",
        props: {
            show: {
                type: Boolean,
                required: true
            }
        }
    }

</script>