<template>
<nav>
    <ul className="navbar-nav me-auto">
        <li v-for="(crumb, ci) in crumbs" :key="ci" class="nav-item">
            <button type="button" class="btn btn-success" :class="{ disabled: isLast(ci) }" @click="selected(crumb)">
                {{ crumb }}
            </button>
            <span v-if="!isLast(ci)">
                \
            </span>
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
            return index === this.crumbs.length - 1;
        },
        selected(crumb) {
            this.$emit('selected', crumb);
        },
    },
};
</script>

<style scoped>
    
</style>
