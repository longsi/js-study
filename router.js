/**
 * 一个简单的Router
 */

class Router {
    constructor() {
        this.routes = {};
        this.currentUrl = '';
    }
    route(path, callback) {
        this.routes[path] = callback || function () { };
    }

    updateView() {
        this.currentUrl = location.hash.slice(1) || '/';
        this.routes[this.currentUrl] && this.routes[this.currentUrl]();
    }
    init() {
        window.addEventListener('load', this.updateView.bind(this), false);
        window.addEventListener('hashchange', this.updateView.bind(this), false);
    }
}

class RouterHistory {
    constructor() {
        this.routes = {};
        this.currentUrl = '';
    }
    route(path, callback) {
        this.routes[path] = callback || function () { };
    }
    updateView(url) {
        this.currentUrl = url;
        this.routes[this.currentUrl] && this.routes[this.currentUrl]();
    }
    bindLink() {
        let links = document.querySelectorAll('a[data-href]');
        let self = this;
        Array.from(links).forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                let url = link.getAttribute('data-href');
                window.history.pushState({}, null, url);
                self.updateView(url);
            }, false)
        })
    }
    init() {
        this.bindLink();
        window.addEventListener('popstate', e => {
            this.updateView(window.location.pathname);
        })
        window.addEventListener('load', () => this.updateView('/'), false);
    }
}