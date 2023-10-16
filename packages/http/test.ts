import { sysHttp } from './index';

export const getTestData = () => {
  return sysHttp.get({
    url: '/guoqin',
  });
};