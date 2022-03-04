import $ from 'jquery';

$.fn.adicionarImgs = function (json) {
    const div = json.map((json) => {
        const div = $('<div>').addClass(["col-12", "col-md-6", "col-lg-3"]);
        const img = $(`<img src="/img/${json.filename}" wm-name="${json.nome}">`).addClass(["img-fluid", "mb-4"]);
        div.html(img);
        return div;
    });
    $(this).append(div);
    return this;
}
const pegarJson = (data) => data.json();

function letArquivoJSON() {
    const array = fetch('imgs.json').then(pegarJson)
        .then(jsondata => {
            $('[wm-container-imgs]').adicionarImgs(jsondata)
        });
}
letArquivoJSON();