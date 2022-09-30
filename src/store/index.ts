import { createStore } from 'vuex';

export type Payload<T, S> = {
  type: T;
  payload: S;
};

export type RecordItem = {
  _id: string;
  order: number;
  value: string;
  history_id: null | string;
};

export type FontStyle = {
  postscriptName: string;
  family: string;
  style: string;
};

export type Padding = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

export type ColorData = {
  hex: string;
  opacity: number;
};

export type Color = {
  base: ColorData;
  text: ColorData;
  sub: ColorData;
  accent: ColorData;
};

export type CustomData = {
  file: File | null;
  src: string;
  palette: string[];
};

interface Customize {
  font_style: FontStyle;
  font_size_main: number;
  font_size_sub: number;
  list_style: 'number' | 'dot' | 'off';
  list_per_page: number;
  theme: 'default' | 'transparent' | 'custom';
  theme_color: 'light' | 'dark' | 'user';
  custom: CustomData;
  color: Color;
  check_round: boolean;
  check_border: boolean;
  check_guide: boolean;
  check_title_hide: boolean;
  size_width: number;
  size_height: number;
  padding_main: Padding;
  padding_sub: Padding;
}

// カスタマイズの初期値を定義
export const defaultCustomData: Customize = {
  font_style: {
    postscriptName: 'inherit',
    family: '',
    style: ''
  },
  font_size_main: 16,
  font_size_sub: 16,
  list_style: 'number',
  list_per_page: 12,
  theme: 'default',
  theme_color: 'light',
  custom: {
    file: null,
    src: '',
    palette: []
  },
  color: {
    base: { hex: '#fff', opacity: 1 },
    text: { hex: '#333', opacity: 1 },
    sub: { hex: '#31b6a0', opacity: 1 },
    accent: { hex: '#ef8bb6', opacity: 1 }
  },
  check_round: true,
  check_border: true,
  check_guide: false,
  check_title_hide: false,
  size_width: 636,
  size_height: 900,
  padding_main: { top: 36, left: 28, bottom: 28, right: 28 },
  padding_sub: { top: 28, left: 28, bottom: 36, right: 28 }
};

// ストア
export interface State {
  now_singing: string;
  main_record: RecordItem[];
  customize: Customize;
}

export default createStore<State>({
  state: {
    now_singing: '',
    main_record: [],
    customize: { ...defaultCustomData }
  },
  getters: {},
  mutations: {
    sync<T extends keyof State>(state: State, json: string) {
      const { type, payload }: Payload<T, State[T]> = JSON.parse(json);
      state[type] = payload;
    }
  },
  actions: {},
  modules: {}
});
