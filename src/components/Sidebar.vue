<template>
  <nav class="sidebar">
    <h1 class="sidebar__logo">SINGING FRAME</h1>
    <ul class="sidebar__list">
      <li class="sidebar__item">
        <router-link to="/" class="sidebar__link">
          <span class="sidebar__link__en"
            ><TextMain role="img" aria-label="MAIN"
          /></span>
          <span class="sidebar__link__ja">メイン画面</span>
        </router-link>
      </li>
      <li class="sidebar__item">
        <router-link to="/history" class="sidebar__link">
          <span class="sidebar__link__en"
            ><TextHistory role="img" aria-label="HISTORY"
          /></span>
          <span class="sidebar__link__ja">履歴</span>
        </router-link>
      </li>
      <li class="sidebar__item">
        <router-link to="/customize" class="sidebar__link">
          <span class="sidebar__link__en"
            ><TextCustomize role="img" aria-label="CUSTOMIZE"
          /></span>
          <span class="sidebar__link__ja">カスタマイズ</span>
        </router-link>
      </li>
    </ul>
    <div class="sidebar__bottom">
      <p class="sidebar__license">
        <button type="button" class="sidebar__license__btn">
          ライセンスについて
        </button>
      </p>
      <p class="sidebar__version c-en">v.1.0.0</p>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TextMain from '@/assets/img/common/txt_main.svg';
import TextHistory from '@/assets/img/common/txt_history.svg';
import TextCustomize from '@/assets/img/common/txt_customize.svg';

export default defineComponent({
  name: 'Sidebar',
  components: {
    TextMain,
    TextHistory,
    TextCustomize
  }
});
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  &__logo {
    padding: 40px 0;
    margin-bottom: 24px;
    border-bottom: 1px solid rgba(#fff, 0.3);
  }
  &__list {
    margin-bottom: 20px;
  }
  &__link {
    display: block;
    padding: 22px 40px;
    margin: 0 -40px;
    &.router-link-exact-active,
    &:hover {
      .sidebar__link__en {
        color: var(--accentColor);
      }
      .sidebar__link__ja {
        color: var(--subColor);
        &::before {
          width: 100%;
          opacity: 1;
        }
      }
    }
    &.router-link-exact-active {
      pointer-events: none;
    }
    &__en {
      color: var(--backColor);
      display: block;
      transition: color 0.2s $easeInOutCubic;
    }
    &__ja {
      position: relative;
      color: var(--accentColor);
      display: block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-top: 14px;
      padding-bottom: 1px;
      width: max-content;
      z-index: 0;
      transition: color 0.2s $easeInOutCubic;
      &::before {
        content: '';
        background-color: var(--accentColor);
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 0;
        opacity: 0;
        z-index: -1;
        transition: 0.2s $easeInOutCubic;
        transition-property: width, opacity;
        pointer-events: none;
      }
    }
  }
  &__bottom {
    margin-top: auto;
  }
  &__license {
    padding: 16px 0;
    &__btn {
      display: inline-block;
      color: var(--backColor);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &__version {
    border-top: 1px solid rgba(#fff, 0.3);
    color: var(--backColor);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-align: center;
    padding: 12px 0;
  }
}
</style>
