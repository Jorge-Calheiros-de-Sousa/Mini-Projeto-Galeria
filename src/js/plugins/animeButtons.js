import $ from 'jquery';

import { onLoadHtmlSuccessCallback } from '../core/inclues';

const duration = 300;

function filterByAnime(anime) {
    $('[wm-anime]').each(function (i, e) {
        const isTarget = $(this).attr('wm-anime') === anime || anime === null;
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

    $('[wm-anime]').each(function (i, e) {
        animes.add($(e).attr('wm-anime'));
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
    $('[wm-animes-buttons]').animesButtons();
});