import Components from './packages/componets'
export * from './packages/componets'
import type { App } from '@vue/runtime-core'
// 批量引入
const install = (app: App) => {
  Components.forEach((component) => {
    app.component(component.name, component);
  });
};
export default {
  install
};
