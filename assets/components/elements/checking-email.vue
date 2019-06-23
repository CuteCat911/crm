<template>
    <div class="checking-email" @click="setEmail(data.id)">
        <p class="checking-email__name" v-if="data.name">
            {{ data.name }}:
        </p>
        <p class="checking-email__email">
            {{ data.email }}
        </p>
        <div class="checking-email__check"
             :class="{'is-active': checkStatus}"
        >
            <v-svg name="check"></v-svg>
        </div>
    </div>
</template>

<script>

    import vSvg from "../mixins/v-svg";

    export default {
        name: "checking-email",
        props: {
            data: {
                type: Object,
                required: true
            },
            selectedEmails: {
                type: Array,
                required: true
            },
            setEmail: {
                type: Function,
                required: true
            }
        },
        computed: {
            checkStatus() {
                return this.selectedEmails.includes(this.data.id);
            }
        },
        components: {
            vSvg
        }
    }

</script>