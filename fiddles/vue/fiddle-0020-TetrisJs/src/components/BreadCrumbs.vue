<template>
<nav class="hide-0-to-750">
    <ul className="navbar-nav me-auto">
        <li v-for="(crumb, ci) in crumbs" :key="ci" class="nav-item">
            <button type="button" class="btn btn-primary" :class="{ disabled: isLast(ci) }" @click="selected(crumb)">
                {{ crumb.title }}
            </button>
            <button v-if="!isLast(ci)" class="btn btn-primary disabled">
                &bsol;
            </button>
        </li>
    </ul>
</nav>
</template>

<script>
export default {
    name: 'BreadCrumbs',
    props: {
        crumbs: {
            type: Array,
            required: true,
        },
    },
    methods: {
        isLast(index) {
            return index === this.crumbs.length - 1
        },
        selected(crumb) {
            if (!crumb.url) return
            window.open(crumb.url, '_blank')
        },
    },
};
</script>

<style scoped>
@media(max-width:750px) {
    .hide-0-to-750 {
        display: none;
    }
    .back-slash {
        color: white !important;
        background-color: aqua;
    }
}
</style>
