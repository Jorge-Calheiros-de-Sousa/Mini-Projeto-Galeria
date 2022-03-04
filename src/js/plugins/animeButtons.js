import $ from 'jquery';

import { onLoadHtmlSuccessCallback } from '../core/inclues';

const duration = 300;

function filterByAnime(name) {
    $('[wm-name]').each(function (i, e) {
        const isTarget = $(this).attr('wm-name') === name || name === null;
        if (isTarget) {
            $(this).parent().removeClass('d-none');
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none');
            })
        }
    })
}
$.fn.animesButtons = function () {
    const animes = new Set;

    $('[wm-name]').each(function (i, e) {
        animes.add($(e).attr('wm-name'));
    })

    const btns = Array.from(animes).map((anime) => {
        const btn = $(`<button id="${anime}">`).addClass(["btn", 'btn-info']).html(anime);
        btn.click(e => filterByAnime(anime))
        return btn;
    })
    const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html("Todas");
    btnAll.click(e => filterByAnime(null));
    btns.push(btnAll);

    const btnGroup = $('<div>').addClass(['btn-group']).append(btns);
    $(this).html(btnGroup);
    return this;
}
onLoadHtmlSuccessCallback(function () {
    $('[wm-names-buttons]').animesButtons();
});