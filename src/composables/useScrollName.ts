import { sleep } from '@/assets/ts/utility';
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  Ref,
  ref,
  watch
} from 'vue';

const useScrollName = (nameRef: Ref, nameInnerRef: Ref, watchRef?: Ref) => {
  const variableX = ref('0px');
  const variableDuration = ref('0s');
  const clsReset = reactive({ 'is-reset': false });

  // 位置と時間を計算
  const setVariable = (nameRef: Ref, nameInnerRef: Ref) => {
    const x = nameRef?.value.clientWidth;
    const innX = nameInnerRef?.value.clientWidth;
    const value = Math.max(0, innX - x);
    variableX.value = `-${value}px`;
    variableDuration.value = `${value / 60}s`;
  };

  const onAnimationend = async () => {
    await sleep(1000);
    clsReset['is-reset'] = true;

    await sleep(1600);
    clsReset['is-reset'] = false;
  };

  onMounted(() => {
    if (!nameRef.value || !nameInnerRef.value) return;
    setVariable(nameRef, nameInnerRef);
    nameInnerRef.value.addEventListener('animationend', onAnimationend);
  });

  onBeforeUnmount(() => {
    if (!nameRef.value || !nameInnerRef.value) return;
    nameInnerRef.value.removeEventListener('animationend', onAnimationend);
  });

  if (watchRef) {
    watch(watchRef, async () => {
      await nextTick();
      setVariable(nameRef, nameInnerRef);
    });
  }

  return {
    variableX,
    variableDuration,
    clsReset
  };
};
export default useScrollName;
