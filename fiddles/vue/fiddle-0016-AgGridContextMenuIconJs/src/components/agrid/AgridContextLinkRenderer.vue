<template>
  <span class="cell-content">
    {{ params.value }}
    <span class="icon" @click="onClick($event)">
      <font-awesome-icon
        :icon="['fas', 'ellipsis-vertical']"
        @click="onClick($event)"
        style="cursor: pointer !important"
      />
    </span>
  </span>
</template>

<script>
export default {
  methods: {
    onClick(event) {
      this.params.context.componentParent.showContextMenu(this.params, event)
    }
  }
}
</script>

<style>
.cell-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
  cursor: pointer !important;
  margin-left: 8px;
  visibility: hidden !important;
}

.cell-content:hover .icon {
  visibility: visible !important;
}
</style>
