<template>
<nav className="navbar navbar-expand navbar-dark bg-primary navbar-top hide-0-to-350">
    <div class="container-fluid">
        <BreadCrumbs :crumbs="crumbs" v-tour-step:3="step3TopNavFiddleShLink(startupTour)" ></BreadCrumbs>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
            </ul>
            <ul className="navbar-nav my-2 my-lg-0">
                <li className="nav-item" v-tour-step:4="step4TopNavTourLink(startupTour)">
                    <RouterLink :to="{
                            name: 'fiddle',
                            params: {
                            tour: 'tour'
                            }
                        }" title="Site Tour">
                        <font-awesome-icon icon="person-circle-question" style="color: white;" />
                    </RouterLink>
                </li>
                <li className="nav-item" v-tour-step:5="step5TopNavFiddleLink(startupTour)">
                    <RouterLink to="/" title="Link to /">Fiddle</RouterLink>
                </li>
                <li className="nav-item" v-tour-step:6="step6TopNavAboutLink(startupTour)">
                    <RouterLink to="/about" title="Link to /about">About</RouterLink>
                </li>
                <li className="nav-item" v-tour-step:7="step7TopNavDocLink(startupTour)">
                    <RouterLink to="/docs" title="Link to /docs">Docs</RouterLink>
                </li>
                <li className="nav-item" v-tour-step:8="step8TopNavGithubLink(startupTour)">
                    <a className="nav-link custom-nav-link" rel="noreferrer" title="link to github" alt="Fork me on GitHub" target="_blank" @click="onLinkClick" href="return false">
                        Fork Me On Github
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script lang="ts">
import {
    RouterLink
} from 'vue-router'
import BreadCrumbs from './BreadCrumbs.vue'
import step3TopNavFiddleShLink from '@/shepherd-tour/step3-top-nav_fiddle-sh-link.js'
import step4TopNavTourLink from '@/shepherd-tour/step4-top-nav_tour-link.js'
import step5TopNavFiddleLink from '@/shepherd-tour/step5-top-nav_fiddle-link.js'
import step6TopNavAboutLink from '@/shepherd-tour/step6-top-nav_about-link.js'
import step7TopNavDocLink from '@/shepherd-tour/step7-top-nav_doc-link.js'
import step8TopNavGithubLink from '@/shepherd-tour/step8-top-nav_github-link.js'

import {inject} from 'vue'

export default {
    name: 'TopNav',
    props: {
        href: {
            type: String,
            required: true
        },
    },
    setup() {
        const startupTour = inject('startupTour')
        return {
            startupTour,
            step3TopNavFiddleShLink,
            step4TopNavTourLink,
            step5TopNavFiddleLink,
            step6TopNavAboutLink,
            step7TopNavDocLink,
            step8TopNavGithubLink
        };
    },

    components: {
        BreadCrumbs,
    },
    data() {
        return {
            crumbs: [{
                title: 'fiddle.sh',
                url: 'https://bradyhouse.github.io/',
                tourStepId: 3,
                tourStep: 'step3TopNavFiddleShLink'
            }, {
                title: 'Vue',
                url: 'https://bradyhouse.github.io/vue/index.html',
                tourStepId: 4,
                tourStep: 'step4TopNavVueLink'
            }, {
                title: 'fiddle-0004-SheperdHwTs',
                url: null,
                tourStep: null
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
