import {checkType} from "./check-type";
import {errorClass, successClass} from "./state-classes";
import {findElemsClass} from "./find";
import {attr} from "./attr";
import {getObjectLength} from "./get-object-length";
import {applyClasses} from "./apply-classes";
import {applyStyle} from "./apply-style";

export let Validation = class Validation {

    #DEFAULT_INPUT_TYPES = ["text", "email", "tel", "number", "password", "hidden", "range", "search", "url", "date", "time", "color"];
    #attrs = {
        noValidate: "data-no-validate",
        clearForm: "data-clear-form",
        minCheck: "data-min-check",
        customValue: "data-custom-value",
        regExp: "data-reg-exp",
        name: {
            form: "data-form-name",
            input: "data-input-name",
            warn: "data-warn-name"
        },
        texts: {
            success: "data-success-text",
            error: "data-error-text",
            errorReg: "data-error-reg-text",
            default: "data-default-text",
            errorMin: "data-error-min-text",
            errorMax: "data-error-max-text"
        },
        value: {
            min: "data-min-value",
            max: "data-max-value"
        }
    };
    #data = {
        classes: {
            forms: null,
            inputs: null,
            submitBtns: null,
            warnBlocks: null
        },
        formsInfo: []
    };
    #system = {
        ajax: false,
        dynamicErrors: false,
        classes: {
            success: null,
            error: null
        },
        timeouts: {
            send: 0,
            clear: 200
        }
    };
    #rules = null;
    #funcs = {
        success: [],
        error: [],
        clear: {
            after: [],
            before: []
        }
    };
    #colors = {
        green: "#257400",
        lightGreen: "rgba(37,116,0,0.3)",
        red: "#ef0505",
        lightRed: "rgba(239,5,5,0.3)"
    };
    #styles = {
        success: {
            color: this.#colors.green,
            backgroundColor: this.#colors.lightGreen,
            border: "1px solid " + this.#colors.green
        },
        error: {
            color: this.#colors.red,
            backgroundColor: this.#colors.lightRed,
            border: "1px solid " + this.#colors.red
        }
    };

    constructor(params) {

        if (!checkType(params, "object") || !checkType(params.forms, "string") || !checkType(params.inputs, "string")) {
            if (DEV) console.error();
            return {fallInstall: true};
        }

        this.#__setData(params);
        this.#__setSystem(params);
        this.#__setRules(params);
        this.findElems();

    }

    #__setData = params => {

        let classes = this.#data.classes;

        let {forms, inputs, submitBtns, warnBlocks} = params;

        classes.forms = forms;
        classes.inputs = inputs;
        classes.submitBtns = checkType(submitBtns, "string") ? submitBtns : null;
        classes.warnBlocks = checkType(warnBlocks, "string") ? warnBlocks : null;

    };

    #__setSystem = params => {

        let {ajax, dynamicErrors, timeouts, classes} = params;
        let system = this.#system;

        system.ajax = checkType(ajax, "boolean") ? ajax : false;
        system.dynamicErrors = checkType(dynamicErrors, "boolean") ? dynamicErrors : false;
        system.timeouts.send = (timeouts && checkType(timeouts.send, "number")) ? timeouts.send : 0;
        system.timeouts.clear = (timeouts && checkType(timeouts.clear, "number")) ? timeouts.clear : 200;

        if (classes) {

            if (checkType(classes.default, "boolean") && classes.default) {
                system.classes.success = successClass;
                system.classes.error = errorClass;
            } else if (checkType(classes.default, "object")) {
                system.classes.success = (checkType(classes.default.success, "boolean") && classes.default.success) ? successClass : null;
                system.classes.error = (checkType(classes.default.error, "boolean") && classes.default.error) ? errorClass : null;
            } else {
                system.classes.success = checkType(classes.success, "string") ? classes.success : null;
                system.classes.error = checkType(classes.error, "string") ? classes.error : null;
            }

        }

    };

    #__setRules = params => {
        this.#rules = checkType(params.rules, "object") ? params.rules : null;
    };

    #__getInputsData = (inputs, formInfo) => {

        if (!checkType(inputs, "array") || !checkType(formInfo, "object")) {
            if (DEV) console.error();
            return null;
        }

        let inputsData = [];

        for (let input of inputs) {

            let defaultInputName = attr(input, "name");
            let inputName = defaultInputName ? defaultInputName : attr(input, this.#attrs.name.input);
            let formName = formInfo.params.name;

            if (!checkType(inputName, "string")) continue;

            let min = attr(input, this.#attrs.value.min);
            let max = attr(input, this.#attrs.value.max);
            let inputInfo = {
                form: {
                    elem: formInfo.elem,
                    name: formName
                },
                elem: input,
                value: null,
                lastValue: null,
                params: {
                    name: inputName,
                    type: null,
                    tag: input.tagName.toLowerCase(),
                    validate: !attr(input, this.#attrs.noValidate),
                    min: min ? Math.abs(parseInt(min)) : null,
                    max: max ? Math.abs(parseInt(max)) : null
                },
                texts: {
                    success: null,
                    error: null,
                    errorReg: null,
                    default: null,
                    errorMin: null,
                    errorMax: null,
                    custom: null
                },
                textPlace: {
                    place: null,
                    elem: null,
                    warnBlock: false
                },
                regExp: null,
                errors: {}
            };

            this.#__setCurrentInputType(inputInfo);
            this.#__setCurrentInputTexts(inputInfo);
            this.#__setInputRegexp(inputInfo);
            this.#__setCurrentInputTextPlace(inputInfo, formInfo);
            inputsData.push(inputInfo);

            inputInfo.elem.addEventListener("focus", () => {
                this.clearInput(inputName, formName);
            });

            if (this.#system.dynamicErrors) {
                inputInfo.elem.addEventListener("keyup", (e) => {

                    if (!checkType(e, "object")) {
                        if (DEV) console.error();
                        return false;
                    }

                    if (e.keycode !== 8 && input.value) {
                        this.validateInput(inputName, formName, "validate", true);
                    } else {
                        this.clearInput(inputName, formName);
                    }

                });
            }

        }

        return inputsData.length !== 0 ? inputsData : null;

    };

    #__setCurrentInputType = inputInfo => {

        if (!checkType(inputInfo,"object")) {
            if (DEV) console.error();
            return false;
        }

        switch (inputInfo.params.tag) {
            case "input":
                inputInfo.params.type = attr(inputInfo.elem, "type");
                break;
            case "textarea":
                inputInfo.params.type = "textarea";
                break;
            case "select":
                inputInfo.params.type = "select";
                break;
            default:
                inputInfo.params.type = "custom";
                break;
        }

    };

    #__setCurrentInputTexts = inputInfo => {

        if (!checkType(inputInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        let rules = this.#rules;

        for (let i in inputInfo.texts) {

            if (i === "custom") continue;

            let attrValue = attr(inputInfo.elem, this.#attrs.texts[i]);

            if (checkType(attrValue, "string")) {
                inputInfo.texts[i] = attrValue;
            } else if (rules) {

                for (let j in rules) {

                    let tagRules = rules[j][inputInfo.params.tag];

                    if ((j !== inputInfo.form.name && j !== "global") || !tagRules) continue;

                    let nameRules = tagRules.name;
                    let typeRules = tagRules.type;
                    let setTypeText = (type, typeName) => {

                        if (checkType(type, "object") && checkType(typeName, "string")) {
                            if (type[inputInfo.params[typeName]] && type[inputInfo.params[typeName]].texts) {

                                let value = type[inputInfo.params[typeName]].texts[i];
                                inputInfo.texts[i] = value ? value : null;

                            }
                        }

                    };

                    if (nameRules && typeRules) {
                        setTypeText(typeRules, "type");
                        setTypeText(nameRules, "name");
                    } else if (nameRules && !typeRules) {
                        setTypeText(nameRules, "name");
                    } else if (!nameRules && typeRules) {
                        setTypeText(typeRules, "type");
                    } else if (!nameRules && !typeRules) {

                        if (!tagRules.texts) continue;
                        let value = tagRules.texts[i];
                        inputInfo.texts[i] = value ? value : null;

                    }

                }

            }

        }

    };

    #__setInputRegexp = inputInfo => {

        if (!checkType(inputInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        let rules = this.#rules;

        let attrValue = attr(inputInfo.elem, this.#attrs.regExp);

        if (checkType(attrValue, "string")) {
            inputInfo.regExp = attrValue;
        } else {

            for (let j in rules) {

                let tagRules = rules[j][inputInfo.params.tag];

                if ((j !== inputInfo.form.name && j !== "global") || !tagRules) continue;

                let nameRules = tagRules.name;
                let typeRules = tagRules.type;
                let setRegExp = (type, typeName) => {

                    if (checkType(type, "object") && checkType(typeName, "string")) {
                        if (type[inputInfo.params[typeName]]) {

                            let value = type[inputInfo.params[typeName]].regExp;
                            inputInfo.regExp = value ? value : inputInfo.regExp ? inputInfo.regExp : null;

                        }
                    }

                };

                if (nameRules && typeRules) {
                    setRegExp(typeRules, "type");
                    setRegExp(nameRules, "name");
                } else if (nameRules && !typeRules) {
                    setRegExp(nameRules, "name");
                } else if (!nameRules && typeRules) {
                    setRegExp(typeRules, "type");
                } else if (!nameRules && !typeRules) {

                    let value = tagRules.regExp;
                    inputInfo.regExp = value ? value : null;

                }

            }

        }

    };

    #__getInputWarnBlock = (inputName, warnBlocks) => {

        if (!checkType(inputName, "string") || !checkType(warnBlocks, "array")) {
            if (DEV) console.error();
            return false;
        }

        for (let warnBlock of warnBlocks) {
            if (warnBlock.params.name === inputName) return warnBlock;
        }

        return null;

    };

    #__getTextPlace = (inputInfo, warnBlock) => {

        if (!checkType(inputInfo, "object") || !checkType(warnBlock, "object")) {
            if (DEV) console.error();
            return false;
        }

        if (warnBlock) return "innerText";

        switch (inputInfo.params.tag) {
            case "input":
                if (this.#DEFAULT_INPUT_TYPES.includes(inputInfo.params.type))  return "value";
                break;
            case "textarea":
                return "value";
            default:
                return "innerText";
        }

    };

    #__setCurrentInputTextPlace = (inputInfo, formInfo) => {

        if (!checkType(inputInfo, "object") || !checkType(formInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        let warnBlock = this.#__getInputWarnBlock(inputInfo.params.name, formInfo.elems.warnBlocks);
        let textPlace = inputInfo.textPlace;

        textPlace.place = this.#__getTextPlace(inputInfo, warnBlock);
        textPlace.elem = warnBlock ? warnBlock.elem : inputInfo.elem;
        textPlace.warnBlock = warnBlock;

    };

    #__getWarnBlocksData = (warnBlocks, formInfo) => {

        if (!checkType(warnBlocks, "array") || !checkType(formInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        let warnBlocksData = [];

        for (let warnBlock of warnBlocks) {

            let warnBlockName = attr(warnBlock, this.#attrs.name.warn);

            if (!checkType(warnBlockName, "string")) continue;

            warnBlocksData.push({
                form: {
                    elem: formInfo.elem,
                    name: formInfo.params.name
                },
                elem: warnBlock,
                params: {
                    name: warnBlockName
                }
            });

        }

        return warnBlocksData.length !== 0 ? warnBlocksData : null;

    };

    #__getSubmitBtnsData = (submitBtns) => {

        if (!checkType(submitBtns, "array")) {
            if (DEV) console.error();
            return false;
        }

        let submitBtnsData = [];

        for (let submitBtn of submitBtns) {

            let submitBtnFormName = attr(submitBtn, this.#attrs.name.form);

            if (!checkType(submitBtnFormName, "string")) continue;

            submitBtnsData.push({
                elem: submitBtn,
                params: {
                    formName: submitBtnFormName
                }
            });

            submitBtn.addEventListener("click", (e) => {
                this.validate(submitBtnFormName, "validate", e);
            });

        }

        return submitBtnsData.length !== 0 ? submitBtnsData : null;

    };

    #__checkMode = mode => {
        return checkType(mode, "string") && ["validate", "check", "data"].includes(mode);
    };

    #__clearFormErrors = formInfo => {

        if (!checkType(formInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        formInfo.errors = [];
        for (let inputInfo of formInfo.elems.inputs) inputInfo.errors = {};

    };

    #__setInputValue = inputInfo => {

        if (!checkType(inputInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        let input = inputInfo.elem;
        let type = inputInfo.params.type;

        switch (inputInfo.params.tag) {
            case "input":

                // TODO value for checkbox and radio

                if (this.#DEFAULT_INPUT_TYPES.includes(type)) {
                    inputInfo.value = input.value;
                } else if (type === "file") {

                    let files = input.files;

                    if (files.length === 0) break;

                    if (attr(input, "multiple")) {

                        inputInfo.value = {};
                        for (let i in files) inputInfo.value[i] = files[i];

                    } else {
                        inputInfo.value = files[0];
                    }

                }

                break;
            case "textarea":
                inputInfo.value = input.value;
                break;
            case "select":
                inputInfo.value = input.value;
                break;
            default:
                inputInfo.value = attr(input, this.#attrs.customValue);
                break;
        }

    };

    #__setInputData = (inputInfo, formInfo) => {

        if (!checkType(inputInfo, "object") || !checkType(formInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        let data = formInfo.data;
        let name = inputInfo.params.name;
        let texts = inputInfo.texts;
        let value = inputInfo.value;

        if (["checkbox", "radio"].includes(inputInfo.params.type)) {
            // TODO set data for checkbox and radio
        } else {

            if ([texts.success, texts.error, texts.errorReg, texts.errorMin, texts.errorMax].includes(value)) {
                data[name] = "";
            } else {
                data[name] = value;
            }

        }

    };

    #__setInputError = (inputInfo, formInfo, mode) => {

        if (!checkType(inputInfo, "object") || !checkType(formInfo, "object") || !this.#__checkMode(mode)) {
            if (DEV) console.error();
            return false;
        }

        let input = inputInfo.elem;
        let value = inputInfo.value;
        let texts = inputInfo.texts;
        let inputErrors = inputInfo.errors;
        let formErrors = formInfo.errors;
        let setError = () => {

            inputErrors.error = true;
            formErrors.push({
                elem: input,
                errors: inputErrors
            });

        };

        if (["checkbox", "radio"].includes(inputInfo.params.type)) {
            // TODO set errors for checkbox and radio
        } else {

            if (!inputInfo.params.validate) return false;

            if (!value) {
                setError();
            } else {

                let min = inputInfo.params.min;
                let max = inputInfo.params.max;
                let checkRegExp = () => {

                    if (!inputInfo.regExp) return false;

                    let regRules = inputInfo.regExp.split(", ");
                    let regExp = new RegExp(regRules[0], regRules[1]);

                    if (!regExp.test(value)) {

                        inputErrors.errorRegExp = true;
                        formErrors.push({
                            elem: input,
                            errors: inputErrors
                        });

                    }

                };

                if (!min && !max) {

                    if ([texts.success, texts.error, texts.errorReg, texts.errorMin, texts.errorMax].includes(value)) {
                        setError();
                    } else {
                        checkRegExp();
                    }

                } else {

                    let valueLength = value.length;
                    let setTypeError = type => {

                        if (!checkType(type, "string")) {
                            if (DEV) console.error();
                            return false;
                        }

                        inputErrors["error" + type] = true;
                        formErrors.push({
                            elem: input,
                            errors: inputErrors
                        });

                    };

                    if (min && max) {

                        if (valueLength < min) {
                            setTypeError("Min");
                        } else if (valueLength > max) {
                            setTypeError("Max");
                        } else {
                            checkRegExp();
                        }

                    } else if (min && !max) {

                        if (valueLength < min) {
                            setTypeError("Min");
                        } else {
                            checkRegExp();
                        }

                    } else if (!min && max) {

                        if (valueLength > max) {
                            setTypeError("Max");
                        } else {
                            checkRegExp();
                        }

                    }

                }

            }

        }

        if (mode === "validate") {
            this.#__setInputState(inputInfo);
            this.#__setInputText(inputInfo);
        }

    };

    #__setInputState = (inputInfo, clearOnFocus) => {

        if (!checkType(inputInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        let input = inputInfo.elem;
        let classes = this.#system.classes;
        let styles = this.#styles;
        let checkClasses = classes.success && classes.error;
        let errors = inputInfo.errors;
        let textPlace = inputInfo.textPlace;

        if (checkType(clearOnFocus, "boolean") && clearOnFocus) {

            if (checkClasses) {

                applyClasses(input, [classes.success, classes.error], "remove");

                if (textPlace.warnBlock) {
                    applyClasses(textPlace.elem, [classes.success, classes.error], "remove");
                }

            } else {

                applyStyle(input, styles.success, "remove");
                applyStyle(input, styles.error, "remove");

                if (textPlace.warnBlock) {
                    applyStyle(textPlace.elem, styles.success, "remove");
                    applyStyle(textPlace.elem, styles.error, "remove");
                }

            }

        } else {

            if (getObjectLength(errors) !== 0) {

                if (checkClasses) {

                    applyClasses(input, [classes.success], "remove");
                    applyClasses(input, [classes.error], "add");

                    if (textPlace.warnBlock) {
                        applyClasses(textPlace.elem, [classes.success], "remove");
                        applyClasses(textPlace.elem, [classes.error], "add");
                    }

                } else {

                    applyStyle(input, styles.success, "remove");
                    applyStyle(input, styles.error, "add");

                    if (textPlace.warnBlock) {
                        applyStyle(textPlace.elem, styles.success, "remove");
                        applyStyle(textPlace.elem, styles.error, "add");
                    }

                }

            } else {

                if (checkClasses) {

                    applyClasses(input, [classes.error], "remove");
                    applyClasses(input, [classes.success], "add");

                    if (textPlace.warnBlock) {
                        applyClasses(textPlace.elem, [classes.error], "remove");
                        applyClasses(textPlace.elem, [classes.success], "add");
                    }

                } else {

                    applyStyle(input, styles.error, "remove");
                    applyStyle(input, styles.success, "add");

                    if (textPlace.warnBlock) {
                        applyStyle(textPlace.elem, styles.error, "remove");
                        applyStyle(textPlace.elem, styles.success, "add");
                    }

                }

            }

        }

    };

    #__setInputText = (inputInfo) => {

        if (!checkType(inputInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        let texts = inputInfo.texts;
        let errors = inputInfo.errors;
        let textPlace = inputInfo.textPlace;

        if (getObjectLength(errors) !== 0) {

            if (errors.errorRegExp) {
                textPlace.elem[textPlace.place] = texts.errorReg;
            } else {
                for (let i in errors) {
                    if (texts[i]) textPlace.elem[textPlace.place] = texts[i];
                }
            }

        } else if (textPlace === "innerText") {

            if (texts.success) {
                textPlace.elem[textPlace.place] = texts.success;
            } else {
                textPlace.elem[textPlace.place] = "";
            }

        }

    };

    #__applyFuncs = (event, type, formName) => {

        if (!checkType(event, "string") || !checkType(formName, "string")) {
            if (DEV) console.error();
            return false;
        }

        let funcs = this.#funcs;
        let array = checkType(type, "string") ? funcs[event][type] : funcs[event];

        if (!array || array.length === 0) return false;

        let formInfo = this.getFormInfo(formName);

        for (let item of array) {

            if (item.length === 2) {

                for (let form of item[1]) {

                    if (form !== formName) continue;
                    let func = item[0];
                    func(formInfo);

                }

            } else {
                item(formInfo);
            }

        }

    };

    get getAttrs() {
        return this.#attrs;
    }

    get getFormsInfo() {
        return this.#data.formsInfo;
    }

    findElems = () => {

        let data = this.#data;
        let forms = findElemsClass(data.classes.forms, document);

        if (!forms) {
            if (DEV) console.error();
            return false;
        }

        if (data.formsInfo.length === 0) {

            for (let form of forms) {

                let formName = attr(form, this.#attrs.name.form);

                if (!checkType(formName, "string")) continue;

                let inputs = checkType(data.classes.inputs, "string") ? findElemsClass(data.classes.inputs, form) : null;
                let warnBlocks = checkType(data.classes.warnBlocks, "string") ? findElemsClass(data.classes.warnBlocks, form) : null;
                let submitBtns = checkType(data.classes.submitBtns, "string") ? findElemsClass(data.classes.submitBtns, form) : null;
                let formData = {
                    elem: form,
                    params: {
                        name: formName,
                        valid: false,
                        clear: attr(form, this.#attrs.clearForm) !== "false",
                        enableEvents: true
                    },
                    errors: [],
                    data: {},
                    elems: {
                        inputs: null,
                        warnBlocks: null,
                        submitBtns: null
                    }
                };

                warnBlocks = this.#__getWarnBlocksData(warnBlocks, formData);
                formData.elems.warnBlocks = warnBlocks ? warnBlocks : null;
                submitBtns = this.#__getSubmitBtnsData(submitBtns);
                formData.elems.submitBtns = submitBtns ? submitBtns : null;
                inputs = this.#__getInputsData(inputs, formData);
                formData.elems.inputs = inputs ? inputs : null;
                data.formsInfo.push(formData);

            }

        } else {

        }

    };

    validate = (formName, mode, e) => {

        if (!checkType(formName, "string") || !this.#__checkMode(mode)) {
            if (DEV) console.error();
            return false;
        }

        let formInfo = this.getFormInfo(formName);

        if (!checkType(formInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        let system = this.#system;
        let checkEvent = checkType(e, "object");
        let formParams = formInfo.params;

        if (checkEvent && (!formParams.valid || system.ajax)) e.preventDefault();

        if (!formParams.enableEvents) {
            if (DEV) console.error();
            return false;
        }

        this.#__clearFormErrors(formInfo);

        if (formInfo.elems.inputs) {
            for (let inputInfo of formInfo.elems.inputs) this.validateInput(inputInfo.params.name, formParams.name, mode);
        }

        if (formInfo.errors.length === 0) {

            let timeouts = system.timeouts;

            formParams.valid = true;

            if (mode === "validate") {
                this.#__applyFuncs("success", null, formParams.name);
            }

            if (system.ajax && formParams.clear) {

                setTimeout(() => {
                    this.clearForm(formParams.name);
                }, timeouts.clear);

            } else if (!system.ajax) {

                setTimeout(() => {
                    formInfo.elem.submit();
                }, timeouts.send);

            }

        } else if (formInfo.errors && mode === "validate") {
            this.#__applyFuncs("error", null, formParams.name);
        }

        if (mode === "validate") {
            return {
                valid: formParams.valid,
                data: formInfo.data
            };
        } else if (mode === "check") {
            return formParams.valid;
        } else if (mode === "data") {
            return formInfo.data;
        }

    };

    validateInput = (inputName, formName, mode, dynamicErrors = false) => {

        if (!checkType(inputName, "string") || !checkType(formName, "string") || !this.#__checkMode(mode)) {
            if (DEV) console.error();
            return false;
        }

        let formInfo = this.getFormInfo(formName);
        let inputInfo = this.getInputInfo(inputName, formInfo);

        if (!checkType(formInfo, "object") || !checkType(inputInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        if (!formInfo.params.enableEvents) {
            if (DEV) console.error();
            return false;
        }

        this.#__setInputValue(inputInfo);

        if (mode === "validate" || mode === "data") this.#__setInputData(inputInfo, formInfo);
        if (mode !== "data") this.#__setInputError(inputInfo, formInfo, mode);

        if (checkType(dynamicErrors, "boolean") && dynamicErrors) inputInfo.errors = {};

        let valid = !getObjectLength(inputInfo.errors);

        if (mode === "validate") {
            return {valid: valid, data: inputInfo}
        } else if (mode === "data") {
            return inputInfo;
        } else if (mode === "check") {
            return valid;
        }

    };

    clearInput = (inputName, formName, setDefaultText = false, total = false) => {

        if (!checkType(inputName, "string") || !checkType(formName, "string")) {
            if (DEV) console.error();
            return false;
        }

        let formInfo = this.getFormInfo(formName);
        let inputInfo = this.getInputInfo(inputName, formInfo);

        if (!checkType(inputInfo, "object") || !checkType(formInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        if (!formInfo.params.enableEvents) {
            if (DEV) console.error();
            return false;
        }

        let texts = inputInfo.texts;
        let value = inputInfo.elem.value;
        let textPlace = inputInfo.textPlace;
        let defaultText = (texts.default && textPlace.place !== "innerText") ? texts.default : "";
        let clear = () => {

            this.#__setInputState(inputInfo, true);

            if (setDefaultText) {
                textPlace.elem[textPlace.place] = defaultText;
            } else {
                textPlace.elem[textPlace.place] = "";
            }

            texts.custom = null;

        };

        if (total || !inputInfo.value || !value || ([texts.error, texts.errorReg, texts.errorMin, texts.errorMax].includes(value)) || texts.custom) {
            clear();
        }

    };

    clearForm = formName => {

        if (!checkType(formName, "string")) {
            if (DEV) console.error();
            return false;
        }

        let formInfo = this.getFormInfo(formName);

        if (!checkType(formInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        if (!formInfo.params.enableEvents) {
            if (DEV) console.error();
            return false;
        }

        this.#__applyFuncs("clear", "before", formName);

        for (let inputInfo of formInfo.elems.inputs) {
            this.clearInput(inputInfo.params.name, formName, true, true);
        }

        formInfo.data = {};
        formInfo.errors = [];
        formInfo.params.valid = false;

        this.#__applyFuncs("clear", "after", formName);

    };

    getFormInfo = id => {

        if (!id) {
            if (DEV) console.error();
            return false;
        }

        for (let i in this.#data.formsInfo) {

            let info = this.#data.formsInfo[i];

            if (checkType(id, "object")) {
                if (info.elem === id) return info;
            } else if (checkType(id, "string")) {
                if (info.params.name === id) return info;
            } else if (checkType(id, "number")) {
                if (i === id) return info;
            }

        }

        return null;

    };

    getInputInfo = (id, formInfo) => {

        if (!id || !checkType(formInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        for (let i in formInfo.elems.inputs) {

            let info = formInfo.elems.inputs[i];

            if (checkType(id, "object")) {
                if (info.elem === id) return info;
            } else if (checkType(id, "string")) {
                if (info.params.name === id) return info;
            } else if (checkType(id, "number")) {
                if (i === id) return info;
            }

        }

        return null;

    };

    setCustomInputError = (inputName, formName, text) => {

        if (!checkType(inputName, "string") || !checkType(formName, "string") || !checkType(text, "string")) {
            if (DEV) console.error();
            return false;
        }

        let formInfo = this.getFormInfo(formName);
        let inputInfo = this.getInputInfo(inputName, formInfo);

        if (!checkType(inputInfo, "object") || !checkType(formInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        inputInfo.texts.custom = text;
        inputInfo.errors.custom = true;
        this.#__setInputText(inputInfo);
        this.#__setInputState(inputInfo);

    };

    disableForm = formName => {

        if (!checkType(formName, "string")) {
            if (DEV) console.error();
            return false;
        }

        let formInfo = this.getFormInfo(formName);

        if (!checkType(formInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        formInfo.params.enableEvents = false;

    };

    enableForm = formName => {

        if (!checkType(formName, "string")) {
            if (DEV) console.error();
            return false;
        }

        let formInfo = this.getFormInfo(formName);

        if (!checkType(formInfo, "object")) {
            if (DEV) console.error();
            return false;
        }

        formInfo.params.enableEvents = true;

    };

    addFuncs = params => {

        if (!checkType(params, "object")) {
            if (DEV) console.error();
            return false;
        }

        let {funcs, event, type, formsName} = params;
        let $checkType = checkType(type, "string");

        if (!funcs || !checkType(event, "string")) {
            if (DEV) console.error();
            return false;
        }

        let $funcs = this.#funcs;

        if (checkType(funcs, "function")) {

            if (formsName) {
                $checkType ? $funcs[event][type].push([funcs, formsName]) : $funcs[event].push([funcs, formsName]);
            } else {
                $checkType ? $funcs[event][type].push(funcs) : $funcs[event].push(funcs);
            }

        } else if (checkType(funcs, "array")) {

            for (let func of funcs) {

                if (!checkType(func, "function")) continue;

                if (formsName) {
                    $checkType ? $funcs[event][type].push([func, formsName]) : $funcs[event].push([func, formsName]);
                } else {
                    $checkType ? $funcs[event][type].push(func) : $funcs[event].push(func);
                }

            }

        }

    };

};