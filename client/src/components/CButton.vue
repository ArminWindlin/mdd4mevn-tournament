<template>
    <button @click="onClick"
        class="button rounded-5 border-0 clickable py-4 px-8 min-w-96 fs-12 bold transition"
        :class="dynamicStyling"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'c-button',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        bg: {
            type: String,
            default: 'primary',
        },
        fg: {
            type: String,
            default: 'black',
        },
    },
    computed: {
        dynamicStyling() {
            if (this.disabled) return 'bg-light-grey cursor-disabled';
            else return `hover-shadow bg-${this.bg} fg-${this.fg}`;
        },
    },
    methods: {
        onClick() {
            this.$emit('clickTriggered')
        },
    },
};
</script>

<style scoped lang="scss">
</style>
