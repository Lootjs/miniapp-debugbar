# Miniapp Debugbar

Панель для удобного дебага ваших миниаппов

## Установка

Выполнить:
```shell
npm install --save-dev miniapp-debugbar
```

И в нужном месте подключить компонент: (обычно, это App.vue)
```javascript
import MiniappDebugger from "miniapp-debugbar/miniapp-debugbar.vue";

<MiniappDebugger v-if="isDevelopment"/>
```

## Расширенное использование

### Console
Если хотите получать логи из console, в вашем main.js (либо app.js)
вызовите функцию consoleDebugbar.
```javascript
import { consoleDebugbar } from "miniapp-debugbar/listeners/console-debugbar";
consoleDebugbar();
```

### Аналитика
Если хотите получать логи amplitude, там где подключаете библиотеку
передайте функцию amplitudeListener.

#### Подключение
```javascript
import { amplitudeListener } from "miniapp-debugbar/listeners/analytics-debugbar";
```

#### Передача функции amplitudeListener

Было:
```javascript
amplitude.getInstance().logEvent(event, data);
```

Стало:
```javascript
amplitude.getInstance().logEvent(event, data, amplitudeListener(event, data));
```

## Кастомизация
### Скрытие дебагбаров
Если вам не нужны некоторые дебагбары, то можно их убрать через props:
```vue
<MiniappDebugger v-if="isDevelopment" exclude="['cookies', 'route']"/>
```


### Добавление дебагбаров
Если вам нужно добавить свои дебагбары, то можно их указать через props:
```vue
<MiniappDebugger v-if="isDevelopment" custom-options="customOptions"/>
```

```javascript
const customOptions = [
    {
        id: 'uikit',
        name: 'UI',
        component: defineAsyncComponent(() => import('./uikit-demo-debugbar')),
    },
];
```

uikit-demo-debugbar - это обычный ваш vue компонент
