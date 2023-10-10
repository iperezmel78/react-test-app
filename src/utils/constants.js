const TEXT = { wait: "Wait ..." };
const TYPE = { success: "SUCCESS", exception: "EXCEPTION" };
const VARIANT = { sucess: "success", danger: "danger" };
const MESSAGES = { no_data: "No data found" }
const constants = {
    regexp: {
        isJson: new RegExp(env.JSON_REGEXP)
    }
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function isString(value) {
    return typeof value === 'string' || value instanceof String
}

function showAlert(value, fnc) {
    fnc(value);
    setTimeout(() => {
        fnc('');
    }, env.TIMEOUT);
}

export { constants, capitalize, isString, showAlert, MESSAGES, TYPE, TEXT, VARIANT };