import $ from 'jquery';

const loadCallbackSuccess = [];

export function onLoadHtmlSuccessCallback(func) {
    if (!loadCallbackSuccess.includes(func)) {
        loadCallbackSuccess.push(func);
    }
}

function loadInclude(parent) {
    if (!parent) parent = 'body';

    $(parent).find('[wm-include]').each((i, e) => {
        const url = $(e).attr('wm-include');
        $.ajax({
            url,
            success(data) {
                $(e).html(data);
                $(e).removeAttr('wm-include');

                loadCallbackSuccess.forEach((callback) => callback(data));
                loadInclude(e);
            }
        })
    })
}
loadInclude();