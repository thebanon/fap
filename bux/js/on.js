window.on = {};

window.on['click'] = {

    body: event => {

        var target = event.target;
        var href = event.target.closest('[data-href]');

        href ? href.dataset.href.router() : null;

    }

}