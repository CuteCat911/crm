<template>
    <div class="edit-mailing-item">
        <div class="edit-mailing-item__row"
             v-if="mailingItem.createdTime"
        >
            <p class="edit-mailing-item__send-status"></p>
            <div class="edit-mailing-item__times">
                <div class="edit-mailing-item__time-item">
                    <p class="edit-mailing-item__time-title">Время создания:</p>
                    <p class="edit-mailing-item__time"></p>
                </div>
                <div class="edit-mailing-item__time-item"
                     v-if="mailingItem.updatedTime"
                >
                    <p class="edit-mailing-item__time-title">Время последнего редактирования:</p>
                    <p class="edit-mailing-item__time"></p>
                </div>
            </div>
        </div>
        <div class="edit-mailing-item__row">
            <div class="edit-mailing-item__col edit-mailing-item__col--left">
                <form-input name="theme"
                            :data="mailingItem.theme"
                ></form-input>
                <div class="edit-mailing-item__send-time-block">
                    <form-input name="sendTime"
                                :data="mailingItem.sendTime"
                                :other-data="{now: mailingItem.nowSend}"
                    ></form-input>
                    <button class="btn"
                            @click="setNowSend(!mailingItem.nowSend)"
                            v-text="mailingItem.nowSend ? 'Точное время' : 'Сейчас'"
                    ></button>
                </div>
                <form-input name="mailing"
                            :data="mailingItem.mailing"
                ></form-input>
            </div>
            <div class="edit-mailing-item__col edit-mailing-item__col--right"></div>
        </div>
    </div>
</template>

<script>

    import {mapState, mapMutations} from "vuex";

    import formInput from "../elements/form-input";

    export default {
        name: "edit-mailing-item",
        computed: {
            ...mapState("mailingItem", {
                mailingItem: state => state
            })
        },
        methods: {
            ...mapMutations("mailingItem", {
                setNowSend: "nowSend"
            })
        },
        components: {
            formInput
        }
    }

</script>