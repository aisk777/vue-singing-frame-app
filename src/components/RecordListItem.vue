<template>
  <li class="c-list__item">
    <div class="c-list__icon c-list__icon--handle"><iconHandle /></div>
    <p class="c-en c-list__index">0{{ index + 1 }}</p>
    <p class="c-list__name" ref="name">
      <span ref="nameInner" :style="{ '--x': `${this.x}px` }">{{
        item.name
      }}</span>
    </p>
    <button type="button" class="c-list__icon c-list__icon--pen">
      <iconPen />
    </button>
    <button type="button" class="c-list__icon c-list__icon--delete">
      <iconDelete />
    </button>
  </li>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import iconHandle from '@/assets/img/icon/icon_handle.svg';
import iconPen from '@/assets/img/icon/icon_pen.svg';
import iconDelete from '@/assets/img/icon/icon_delete.svg';

@Options({
  components: {
    iconHandle,
    iconPen,
    iconDelete
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
})
export default class RecordListItem extends Vue {
  x = 0;

  mounted() {
    this.setAnim();
  }

  setAnim() {
    const width = (this.$refs.name as HTMLElement).clientWidth;
    const innerW = (this.$refs.nameInner as HTMLElement).clientWidth;
    this.x = -Math.max(0, innerW - width);
  }
}
</script>

<style scoped lang="scss">
.c-list {
  &__item {
    background-color: var(--backColor);
    display: grid;
    align-items: center;
    grid-template-columns: 26px 56px 1fr 26px auto;
    padding: 12px 16px;
    & + & {
      position: relative;
      z-index: 0;
      &::before {
        content: '';
        background-color: var(--borderColor);
        position: absolute;
        top: 0;
        left: 16px;
        right: 16px;
        height: 1px;
        pointer-events: none;
        z-index: -1;
      }
    }
  }
  &__index {
    color: var(--subColor);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-align: center;
  }
  &__name {
    font-size: 14px;
    letter-spacing: 0.05em;
    margin-right: 16px;
    line-height: 26px;
    overflow: hidden;
    > span {
      display: block;
      width: max-content;
      backface-visibility: hidden;
      animation: txtScroll 10s linear 5s both running infinite;
    }
  }
  &__icon {
    color: var(--iconColor);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 4px;
    flex-shrink: 0;
    &--handle {
      cursor: grab;
    }
    &--pen,
    &--delete {
      transition: background-color 0.2s $easeInOutCubic;
      &:hover {
        background-color: rgba(#000, 0.06);
      }
    }
    &--delete {
      margin-left: 8px;
    }
  }
}

@keyframes txtScroll {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(var(--x), 0, 0);
  }
}
</style>
