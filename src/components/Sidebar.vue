<template>
  <nav class="sidebar">
    <div class="sidebar__logo">SINGING FRAME</div>
    <ul class="sidebar__list">
      <li class="sidebar__item">
        <router-link to="/" class="sidebar__link">
          <span class="c-en sidebar__link__en">MAIN</span>
          <span class="sidebar__link__ja">メイン画面</span>
        </router-link>
      </li>
      <li class="sidebar__item">
        <router-link to="/history" class="sidebar__link">
          <span class="c-en sidebar__link__en">HISTORY</span>
          <span class="sidebar__link__ja">履歴</span>
        </router-link>
      </li>
      <li class="sidebar__item">
        <router-link to="/customize" class="sidebar__link">
          <span class="c-en sidebar__link__en">CUSTOMIZE</span>
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
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class Sidebar extends Vue {
  msg!: string;
}
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  &__logo {
    padding: 40px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(#fff, 0.3);
  }
  &__list {
    margin-bottom: 20px;
  }
  &__link {
    display: block;
    padding: 20px 40px;
    margin: 0 -40px;
    &__en {
      color: var(--backColor);
      display: block;
      font-size: 26px;
      font-weight: 900;
      letter-spacing: 0.1em;
    }
    &__ja {
      color: var(--accentColor);
      display: block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-top: 8px;
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
