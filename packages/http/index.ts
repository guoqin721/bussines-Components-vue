import { createAxios } from '../../src/utils/axios';
const { VITE_APP_BASE_URL_PREFIX } = import.meta.env;
export const sysPreFix = VITE_APP_BASE_URL_PREFIX + '/sys';

export const sysHttp = createAxios({
  requestOptions: {
    urlPrefix: sysPreFix,
  },
});
