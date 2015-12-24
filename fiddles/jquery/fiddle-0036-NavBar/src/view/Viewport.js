app.view.Viewport = class extends app.view.navbar.NavBar {
    constructor(config) {
        super({
            id: config && config.hasOwnProperty('id') ? config.id : 'navBar1',
            hook: config && config.hasOwnProperty('hook') ? config.hook : window.document.body,
            title: 'Stuff',
            autoBind: true,
            store: new app.store.Links({
                links: [
                    new app.model.Link({
                        href: 'http://duckduckgo.com',
                        text: 'duckduckgo',
                        target: '_blank',
                        title: 'Google Alternative'
                    }),
                    new app.model.Link({
                        href: 'https://github.com/bradyhouse',
                        text: 'github',
                        target: '_blank',
                        title: 'All my fiddles on github'
                    }),
                    new app.model.Link({
                        href: 'http://www.starwars.com/embed/522807c0b6c6761590ef1bee',
                        text: 'starwars',
                        target: '_blank',
                        title: 'The Force Awakens Trailer'
                    })
                ]
            })
        });
    }
}
