<template>
    <div class="contact-person-btns">
        <div class="contact-person-btns__btn"
             @click="addFunc(index)"
        >
            <v-svg name="plus"></v-svg>
        </div>
        <div class="contact-person-btns__btn"
             @click="removeFunc(index)"
        >
            <v-svg name="minus"></v-svg>
        </div>
        <div class="contact-person-btns__btn">
            <v-svg name="move"></v-svg>
        </div>
    </div>
</template>

<script>

    import vSvg from "../mixins/v-svg";

    export default {
        name: "contact-person-btns",
        props: {
            index: {
                type: Number,
                required: true
            },
            addFunc: {
                type: Function,
                required: true
            },
            removeFunc: {
                type: Function,
                required: true
            }
        },
        components: {
            vSvg
        }
    }

</script>