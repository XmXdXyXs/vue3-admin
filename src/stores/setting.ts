export const useSetting = defineStore("setting", () => {
  const setting = ref({
    logoVisiable: true,
    tagViewsVisiable: true
  });

  const setLogoStatus = (val: boolean) => {
    setting.value.logoVisiable = val;
  };
  const setTagViewsStatus = (val: boolean) => {
    setting.value.tagViewsVisiable = val;
  };
  return {
    setting,
    setLogoStatus,
    setTagViewsStatus
  };
});
