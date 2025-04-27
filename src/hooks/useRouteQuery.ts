import type { LocationQuery } from "vue-router";
interface QueryData {
  readirect: Ref<string>;
  otherQuery: Ref<LocationQuery | undefined>;
}
export const useGetQuery: () => QueryData = () => {
  const route = useRoute();
  const readirect = ref("");
  const otherQuery = ref<LocationQuery | undefined>({});

  const getOtherQuery = (query: LocationQuery) => {
    return Object.keys(query).reduce((acc: LocationQuery, key) => {
      if (key !== "redirect") {
        acc[key] = query[key];
      }
      return acc;
    }, {});
  };
  watchEffect(() => {
    const { query } = route;
    const { redirect } = query;
    readirect.value = redirect as string;
    otherQuery.value = getOtherQuery(query);
  });
  return {
    readirect,
    otherQuery
  };
};
