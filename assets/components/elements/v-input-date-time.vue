<template>
    <div class="date-time">
        <masked-input type="text"
                      :name="name + '-date'"
                      :ref="name + '-date'"
                      v-model="date"
                      mask="11.11.1111"
                      @input="setValue"
        ></masked-input>
        <masked-input type="text"
                      :name="name + '-time'"
                      :ref="name + '-time'"
                      v-model="time"
                      mask="11:11:11"
                      @input="setValue"
        ></masked-input>
    </div>
</template>

<script>

    import maskedInput from "vue-masked-input";
    import {mapMutations} from "vuex";
    import {checkType} from "../../js/general/check-type";
    import {getTimeForBack} from "../../js/modules/get-time-for-back";

    export default {
        name: "v-input-date-time",
        props: {
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true,
                validator(value) {
                    return value === "date-time"
                }
            },
            data: {
                type: Object,
                required: true
            },
            otherData: Object,
            submitFunc: Function
        },
        data() {
            return {
                date: "",
                time: ""
            }
        },
        beforeMount() {
            this.setDateTime();
        },
        methods: {
            ...mapMutations({
                updateValue: "updateInputValue"
            }),
            addZero(value) {

                value = +value;

                if (!checkType(value, "number")) {
                    if (DEV) console.error();
                    return false;
                }

                return value < 10 ? "0" + value : value;

            },
            setDateTime() {

                let dateTime;

                if (checkType(this.otherData, "object") && this.otherData.now) {
                    dateTime = new Date();
                } else if (checkType(this.data.value, "string")) {
                    dateTime = new Date(this.data.value);
                } else {
                    this.date = "";
                    this.time = "";
                    return false;
                }

                let [year, month, day] = [dateTime.getFullYear(), this.addZero(dateTime.getMonth() + 1), this.addZero(dateTime.getDate())];
                let [hours, minutes, seconds] = [this.addZero(dateTime.getHours()), this.addZero(dateTime.getMinutes()), this.addZero(dateTime.getSeconds())];

                this.date = day + "." + month + "." + year;
                this.time = hours + ":" + minutes + ":" + seconds;

            },
            setValue() {

                let {store} = this.data.params;
                let [day, month, year] = this.date.split(".");
                let [hours, minutes, seconds] = this.time.split(":");

                if (!checkType(+day, "number") || !checkType(+month, "number") || !checkType(+year, "number") || !checkType(+hours, "number") || !checkType(+minutes, "number") || !checkType(+seconds, "number")) {
                    if (DEV) console.error();
                    return false;
                }

                let dateTime = getTimeForBack(new Date(year, +month - 1, day, hours, minutes, seconds));

                if (store) {
                    this.updateValue({newValue: dateTime, input: this.data});
                } else {
                    this.data.value = dateTime;
                }

            }
        },
        components: {
            maskedInput
        },
        watch: {
            "otherData.now"() {
                this.setDateTime();
                this.setValue();
            }
        }
    }

</script>