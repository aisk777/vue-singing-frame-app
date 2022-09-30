import ColorThief from 'colorthief';
import { ref } from 'vue';

// RGB値をHexに変換
const rgbToHex = (rgb: number[]) => {
  const hexJoin = rgb
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');
  return `#${hexJoin}`;
};

// 画像の読み込み
const useFileReader = (callback: (T: boolean) => any) => {
  const colorThief = new ColorThief();
  const selectedFile = ref<File | null>();
  const base64Data = ref<string>('');
  const colorPalette = ref<string[]>([]);

  const fileReader = (file: File): Promise<string> => {
    const render = new FileReader();
    render.readAsDataURL(file);
    return new Promise((resolve) => {
      render.addEventListener('load', (e) => {
        resolve(e.target?.result as string);
      });
    });
  };

  const imageReader = (base64Data: string): Promise<string[]> => {
    const image = new Image();
    image.src = base64Data;
    return new Promise((resolve) => {
      image.addEventListener('load', () => {
        const palette = colorThief.getPalette(image, 4);
        return resolve(palette.map((numArray: number[]) => rgbToHex(numArray)));
      });
    });
  };

  const onFile = async (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    selectedFile.value = files ? files[0] : null;

    if (!selectedFile.value) return;
    try {
      base64Data.value = await fileReader(selectedFile.value);
      colorPalette.value = await imageReader(base64Data.value);

      // コールバック関数を呼び出し
      callback(true);
    } catch (e: any) {
      console.error(e);
    }
  };

  return {
    onFile,
    selectedFile,
    base64Data,
    colorPalette
  };
};
export default useFileReader;
