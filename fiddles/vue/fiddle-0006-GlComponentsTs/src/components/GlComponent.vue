<template>
	<div ref="GlComponent" style="position: absolute; overflow: hidden;">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const GlComponent = ref<null | HTMLElement>(null);

const numberToPixels = (value: number): string => {
	return value.toString(10) + "px";
};

const emit = defineEmits<{
  heightChange: [height: string, id: Number] 
}>()

const props = defineProps({
  id: { type: Number, required: true}
})

const setPosAndSize = (
	left: number,
	top: number,
	width: number,
	height: number
): void => {
	if (GlComponent.value) {
		const el = GlComponent.value as HTMLElement;
		el.style.left = numberToPixels(left);
		el.style.top = numberToPixels(top);
		el.style.width = numberToPixels(width);
		el.style.height = numberToPixels(height);
		emit("heightChange", el.style.height, props.id);
	}
};

const setVisibility = (visible: boolean): void => {
	if (GlComponent.value) {
		const el = GlComponent.value as HTMLElement;
		if (visible) {
			el.style.display = "";
		} else {
			el.style.display = "none";
		}
	}
};
const getContainerHeight = (): string => {
	if (GlComponent.value) {
		const el = GlComponent.value as HTMLElement;
		return el.style.height;
	}
	return "0px";
};

const getId = (): number => {
	return props.id
}

const setZIndex = (value: string): void => {
	if (GlComponent.value) {
		const el = GlComponent.value as HTMLElement;
		el.style.zIndex = value;
	}
};



defineExpose({
	setPosAndSize,
	setVisibility,
	setZIndex,
	getContainerHeight,
	getId
});
</script>
