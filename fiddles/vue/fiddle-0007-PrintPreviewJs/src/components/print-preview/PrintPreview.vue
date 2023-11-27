<script>
import {
    h
} from 'vue'
import {
    cloneDeep
} from 'lodash'
import Page from './Page.vue'

const PageNode = class {

    #children = []

    constructor(children) {
        this.#children = children
    }

    push(child) {
        this.#children.push(child)
    }

    get children() {
        return this.#children
    }

}

const splitPages = (nodes) => {
    const pages = []
    const vpages = []
    const header = h('div', {class: 'header'}, 'H E A D E R')
    const footer = h('div', {class: 'footer'}, 'F O O T E R')
    let page = new PageNode([])
    nodes.forEach((node) => {
        if (node.props && node.props.class === 'page-break') {
            pages.push(page)
            page = new PageNode([])
        } else {
            page.push(cloneDeep(node))
        }
    })
    pages.push(page)
    pages.forEach((page) => {
        const children = cloneDeep(page.children)
        const vpage = h(Page, {}, {
            header: () => header,
            main: () => children,
            footer: () => footer
        })
        vpages.push(vpage)
    })



    return vpages
}

export default {
    components: {
        Page
    },
    setup(props, context) {
        let pages = []
        context.slots.default().forEach((child) => {
            if (child.props.class === 'page' && child.props.contenteditable === 'true') {

                const newPages = splitPages(child.children)

                pages = pages.concat(newPages)

            }
        })

        return () => pages

    },

};
</script>
