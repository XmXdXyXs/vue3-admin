export const useAppStrore = defineStore(
  "app",
  () => {
    const state = ref({
      silder: {
        opened: false
      }
    });

    const silder = computed(() => state.value.silder);
    const toggleSilder = () => {
      state.value.silder.opened = !state.value.silder.opened;
    };
    return { state, silder, toggleSilder };
  },
  {
    persist: {
      storage: window.localStorage,
      pick: ["state.silder.opened"]
    }
  }
);
