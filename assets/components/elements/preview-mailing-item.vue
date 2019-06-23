<template>
    <div class="preview-mailing-item"
         :class="{'is-select': checkSelected}"
         v-dbl-click="[click, dblClick]"
    >
        <p class="preview-mailing-item__status"></p>
        <div class="preview-mailing-item__title-wrapper">
            <p class="preview-mailing-item__title">{{ data.mailing.name }}</p>
            <p class="preview-mailing-item__id">{{ data.id }}</p>
        </div>
        <div class="preview-mailing-item__send-time-block">
            <template v-if="data.sendTime && !data.nowSend">
                <p class="preview-mailing-item__send-time-title">Время отправки:</p>
                <p class="preview-mailing-item__send-time"></p>
            </template>
        </div>
        <p class="preview-mailing-item__theme">Тема сообщения: {{ data.theme }}</p>
        <div class="preview-mailing-item__send-btn btn"
             :class="{'is-disabled': !data.selectedEmails.length || !data.sendTime}"
             v-text="data.nowSend ? 'Отправить сейчас' : 'Запланировать отправку'"
             @click="data.nowSend ? sendNowMails(data.id) : sendScheduledMails(data.id)"
        >

        </div>
    </div>
</template>

<script>

    import {mapState, mapMutations} from "vuex";
    import dblClick from "../directives/dbl-click";
    import {checkType} from "../../js/general/check-type";
    import {btnsEvents} from "../../js/modules/btns-events";

    export default {
        name: "preview-mailing-item",
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        computed: {
            ...mapState("mailingsItems", {
                selected: state => state.selected
            }),
            checkSelected() {
                return this.selected.includes(this.data.id);
            }
        },
        methods: {
            ...mapMutations("mailingsItems", {
                addSelectedItem: "addSelectedItem",
                removeSelectedItem: "removeSelectedItem"
            }),
            click() {

                if (this.checkSelected) {
                    this.removeSelectedItem(this.selected.indexOf(this.data.id));
                } else {
                    this.addSelectedItem(this.data.id);
                }

            },
            dblClick() {
                console.log(2);
            },
            sendNowMails: btnsEvents.getEvent("sendNowMailsMailingItem"),
            sendScheduledMails: btnsEvents.getEvent("sendScheduledMailsMailingItem")
        },
        directives: {
            dblClick
        }
    }

</script>