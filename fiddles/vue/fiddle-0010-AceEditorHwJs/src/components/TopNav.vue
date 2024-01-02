<template>
<nav className="navbar navbar-expand navbar-dark bg-primary navbar-top hide-0-to-350">
    <div class="container-fluid">
        <BreadCrumbs :crumbs="crumbs"></BreadCrumbs>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
            </ul>
            <ul className="navbar-nav my-2 my-lg-0">
                <li className="nav-item">
                    <RouterLink to="/">Fiddle</RouterLink>
                </li>
                <li className="nav-item">
                    <RouterLink to="/about">About</RouterLink>
                </li>
                <li className="nav-item">
                    <RouterLink to="/docs">Docs</RouterLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link custom-nav-link" rel="noreferrer" alt="Fork me on GitHub" target="_blank" @click="onLinkClick" href="return false">
                        Fork Me On Github
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
import {
    RouterLink
} from 'vue-router'
import BreadCrumbs from './BreadCrumbs.vue'

export default {
    name: 'TopNav',
    props: {
        href: {
            type: String,
            required: true
        },
    },
    components: {
        BreadCrumbs
    },
    data() {
        return {
            crumbs: [{
                title: 'fiddle.sh',
                url: 'https://bradyhouse.github.io/'
            }, {
                title: 'Vue',
                url: 'https://bradyhouse.github.io/vue/index.html'
            }, {
                title: 'fiddle-0010-AceEditorHwJs',
                url: null
            }],
        };
    },
    methods: {
        onLinkClick() {

            window.open(this.href, '_blank')
        }
    }
}
</script>

<style scoped>
nav a.router-link-exact-active {
    color: white;
    font-weight: 800;
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    color: gainsboro;
}

nav a:first-of-type {
    border: 0;
}

.navbar {
    border-radius: 0 !important;
}

@media(max-width:350px) {
    .hide-0-to-350 {
        display: none;
    }
}

</style>
