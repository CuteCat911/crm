import {transchoice} from "./vue-filters/transchoice";
import {time} from "./vue-filters/time";

export let declareVueFilters = () => {

    transchoice();
    time();

};