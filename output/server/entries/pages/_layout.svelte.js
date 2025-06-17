import { z as spread_props, y as pop, w as push, A as attr, C as head, D as attr_class, E as stringify, F as slot } from "../../chunks/index.js";
import "clsx";
import { c as createSubscriber, M as MediaQuery } from "../../chunks/stores.js";
import "style-to-object";
import { B as Button } from "../../chunks/button.js";
import { I as Icon } from "../../chunks/Icon.js";
import "../../chunks/client.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Sun($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "4" }
    ],
    ["path", { "d": "M12 2v2" }],
    ["path", { "d": "M12 20v2" }],
    ["path", { "d": "m4.93 4.93 1.41 1.41" }],
    ["path", { "d": "m17.66 17.66 1.41 1.41" }],
    ["path", { "d": "M2 12h2" }],
    ["path", { "d": "M20 12h2" }],
    ["path", { "d": "m6.34 17.66-1.41 1.41" }],
    ["path", { "d": "m19.07 4.93-1.41 1.41" }]
  ];
  Icon($$payload, spread_props([
    { name: "sun" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Moon($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      { "d": "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "moon" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
const defaultWindow$1 = void 0;
function getActiveElement$1(document2) {
  let activeElement = document2.activeElement;
  while (activeElement?.shadowRoot) {
    const node = activeElement.shadowRoot.activeElement;
    if (node === activeElement)
      break;
    else
      activeElement = node;
  }
  return activeElement;
}
let ActiveElement$1 = class ActiveElement {
  #document;
  #subscribe;
  constructor(options = {}) {
    const {
      window: window2 = defaultWindow$1,
      document: document2 = window2?.document
    } = options;
    if (window2 === void 0) return;
    this.#document = document2;
    this.#subscribe = createSubscriber();
  }
  get current() {
    this.#subscribe?.();
    if (!this.#document) return null;
    return getActiveElement$1(this.#document);
  }
};
new ActiveElement$1();
function getStorage(storageType, window2) {
  switch (storageType) {
    case "local":
      return window2.localStorage;
    case "session":
      return window2.sessionStorage;
  }
}
class PersistedState {
  #current;
  #key;
  #serializer;
  #storage;
  #subscribe;
  #version = 0;
  constructor(key, initialValue, options = {}) {
    const {
      storage: storageType = "local",
      serializer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
      },
      syncTabs = true,
      window: window2 = defaultWindow$1
    } = options;
    this.#current = initialValue;
    this.#key = key;
    this.#serializer = serializer;
    if (window2 === void 0) return;
    const storage = getStorage(storageType, window2);
    this.#storage = storage;
    const existingValue = storage.getItem(key);
    if (existingValue !== null) {
      this.#current = this.#deserialize(existingValue);
    } else {
      this.#serialize(initialValue);
    }
    if (syncTabs && storageType === "local") {
      this.#subscribe = createSubscriber();
    }
  }
  get current() {
    this.#subscribe?.();
    this.#version;
    const root = this.#deserialize(this.#storage?.getItem(this.#key)) ?? this.#current;
    const proxies = /* @__PURE__ */ new WeakMap();
    const proxy = (value) => {
      if (value === null || value?.constructor.name === "Date" || typeof value !== "object") {
        return value;
      }
      let p = proxies.get(value);
      if (!p) {
        p = new Proxy(value, {
          get: (target, property) => {
            this.#version;
            return proxy(Reflect.get(target, property));
          },
          set: (target, property, value2) => {
            this.#version += 1;
            Reflect.set(target, property, value2);
            this.#serialize(root);
            return true;
          }
        });
        proxies.set(value, p);
      }
      return p;
    };
    return proxy(root);
  }
  set current(newValue) {
    this.#serialize(newValue);
    this.#version += 1;
  }
  #handleStorageEvent = (event) => {
    if (event.key !== this.#key || event.newValue === null) return;
    this.#current = this.#deserialize(event.newValue);
    this.#version += 1;
  };
  #deserialize(value) {
    try {
      return this.#serializer.deserialize(value);
    } catch (error) {
      console.error(`Error when parsing "${value}" from persisted store "${this.#key}"`, error);
      return;
    }
  }
  #serialize(value) {
    try {
      if (value != void 0) {
        this.#storage?.setItem(this.#key, this.#serializer.serialize(value));
      }
    } catch (error) {
      console.error(`Error when writing value from persisted store "${this.#key}" to ${this.#storage}`, error);
    }
  }
}
function sanitizeClassNames(classNames) {
  return classNames.filter((className) => className.length > 0);
}
const noopStorage = {
  getItem: (_key) => null,
  setItem: (_key, _value) => {
  }
};
const isBrowser = typeof document !== "undefined";
function isFunction(value) {
  return typeof value === "function";
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
const BoxSymbol = Symbol("box");
const isWritableSymbol = Symbol("is-writable");
function isBox(value) {
  return isObject(value) && BoxSymbol in value;
}
function isWritableBox(value) {
  return box.isBox(value) && isWritableSymbol in value;
}
function box(initialValue) {
  let current = initialValue;
  return {
    [BoxSymbol]: true,
    [isWritableSymbol]: true,
    get current() {
      return current;
    },
    set current(v) {
      current = v;
    }
  };
}
function boxWith(getter, setter) {
  const derived = getter();
  if (setter) {
    return {
      [BoxSymbol]: true,
      [isWritableSymbol]: true,
      get current() {
        return derived;
      },
      set current(v) {
        setter(v);
      }
    };
  }
  return {
    [BoxSymbol]: true,
    get current() {
      return getter();
    }
  };
}
function boxFrom(value) {
  if (box.isBox(value)) return value;
  if (isFunction(value)) return box.with(value);
  return box(value);
}
function boxFlatten(boxes) {
  return Object.entries(boxes).reduce(
    (acc, [key, b]) => {
      if (!box.isBox(b)) {
        return Object.assign(acc, { [key]: b });
      }
      if (box.isWritableBox(b)) {
        Object.defineProperty(acc, key, {
          get() {
            return b.current;
          },
          set(v) {
            b.current = v;
          }
        });
      } else {
        Object.defineProperty(acc, key, {
          get() {
            return b.current;
          }
        });
      }
      return acc;
    },
    {}
  );
}
function toReadonlyBox(b) {
  if (!box.isWritableBox(b)) return b;
  return {
    [BoxSymbol]: true,
    get current() {
      return b.current;
    }
  };
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
function createParser(matcher, replacer) {
  const regex = RegExp(matcher, "g");
  return (str) => {
    if (typeof str !== "string") {
      throw new TypeError(`expected an argument of type string, but got ${typeof str}`);
    }
    if (!str.match(regex))
      return str;
    return str.replace(regex, replacer);
  };
}
const camelToKebab = createParser(/[A-Z]/, (match) => `-${match.toLowerCase()}`);
function styleToCSS(styleObj) {
  if (!styleObj || typeof styleObj !== "object" || Array.isArray(styleObj)) {
    throw new TypeError(`expected an argument of type object, but got ${typeof styleObj}`);
  }
  return Object.keys(styleObj).map((property) => `${camelToKebab(property)}: ${styleObj[property]};`).join("\n");
}
function styleToString(style = {}) {
  return styleToCSS(style).replace("\n", " ");
}
const srOnlyStyles = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
  transform: "translateX(-100%)"
};
styleToString(srOnlyStyles);
const defaultWindow = void 0;
function getActiveElement(document2) {
  let activeElement = document2.activeElement;
  while (activeElement?.shadowRoot) {
    const node = activeElement.shadowRoot.activeElement;
    if (node === activeElement)
      break;
    else
      activeElement = node;
  }
  return activeElement;
}
class ActiveElement2 {
  #document;
  #subscribe;
  constructor(options = {}) {
    const {
      window: window2 = defaultWindow,
      document: document2 = window2?.document
    } = options;
    if (window2 === void 0) return;
    this.#document = document2;
    this.#subscribe = createSubscriber();
  }
  get current() {
    this.#subscribe?.();
    if (!this.#document) return null;
    return getActiveElement(this.#document);
  }
}
new ActiveElement2();
const modeStorageKey = box("mode-watcher-mode");
const themeStorageKey = box("mode-watcher-theme");
const modes = ["dark", "light", "system"];
function isValidMode(value) {
  if (typeof value !== "string")
    return false;
  return modes.includes(value);
}
class UserPrefersMode {
  #defaultValue = "system";
  #storage = isBrowser ? localStorage : noopStorage;
  #initialValue = this.#storage.getItem(modeStorageKey.current);
  #value = isValidMode(this.#initialValue) ? this.#initialValue : this.#defaultValue;
  #persisted = this.#makePersisted();
  #makePersisted(value = this.#value) {
    return new PersistedState(modeStorageKey.current, value, {
      serializer: {
        serialize: (v) => v,
        deserialize: (v) => {
          if (isValidMode(v)) return v;
          return this.#defaultValue;
        }
      }
    });
  }
  constructor() {
  }
  get current() {
    return this.#persisted.current;
  }
  set current(newValue) {
    this.#persisted.current = newValue;
  }
}
class SystemPrefersMode {
  #defaultValue = void 0;
  #track = true;
  #current = this.#defaultValue;
  #mediaQueryState = typeof window !== "undefined" && typeof window.matchMedia === "function" ? new MediaQuery("prefers-color-scheme: light") : { current: false };
  query() {
    if (!isBrowser) return;
    this.#current = this.#mediaQueryState.current ? "light" : "dark";
  }
  tracking(active) {
    this.#track = active;
  }
  constructor() {
    this.query = this.query.bind(this);
    this.tracking = this.tracking.bind(this);
  }
  get current() {
    return this.#current;
  }
}
const userPrefersMode = new UserPrefersMode();
const systemPrefersMode = new SystemPrefersMode();
class CustomTheme {
  #storage = isBrowser ? localStorage : noopStorage;
  #initialValue = this.#storage.getItem(themeStorageKey.current);
  #value = this.#initialValue === null || this.#initialValue === void 0 ? "" : this.#initialValue;
  #persisted = this.#makePersisted();
  #makePersisted(value = this.#value) {
    return new PersistedState(themeStorageKey.current, value, {
      serializer: {
        serialize: (v) => {
          if (typeof v !== "string") return "";
          return v;
        },
        deserialize: (v) => v
      }
    });
  }
  constructor() {
  }
  /**
   * The current theme.
   * @returns The current theme.
   */
  get current() {
    return this.#persisted.current;
  }
  /**
   * Set the current theme.
   * @param newValue The new theme to set.
   */
  set current(newValue) {
    this.#persisted.current = newValue;
  }
}
const customTheme = new CustomTheme();
let timeoutAction;
let timeoutEnable;
let hasLoaded = false;
let styleElement = null;
function getStyleElement() {
  if (styleElement)
    return styleElement;
  styleElement = document.createElement("style");
  styleElement.appendChild(document.createTextNode(`* {
		-webkit-transition: none !important;
		-moz-transition: none !important;
		-o-transition: none !important;
		-ms-transition: none !important;
		transition: none !important;
	}`));
  return styleElement;
}
function withoutTransition(action) {
  if (typeof document === "undefined")
    return;
  if (!hasLoaded) {
    hasLoaded = true;
    action();
    return;
  }
  const isTest = typeof process !== "undefined" && process.env?.NODE_ENV === "test" || typeof window !== "undefined" && window.__vitest_worker__;
  if (isTest) {
    action();
    return;
  }
  clearTimeout(timeoutAction);
  clearTimeout(timeoutEnable);
  const style = getStyleElement();
  const disable = () => document.head.appendChild(style);
  const enable = () => {
    if (style.parentNode) {
      document.head.removeChild(style);
    }
  };
  if (typeof window.requestAnimationFrame !== "undefined") {
    disable();
    window.requestAnimationFrame(() => {
      action();
      window.requestAnimationFrame(enable);
    });
    return;
  }
  disable();
  timeoutAction = window.setTimeout(() => {
    action();
    timeoutEnable = window.setTimeout(enable, 16);
  }, 16);
}
const themeColors = box(void 0);
const disableTransitions = box(true);
const darkClassNames = box([]);
const lightClassNames = box([]);
function createDerivedMode() {
  const current = (() => {
    if (!isBrowser) return void 0;
    const derivedMode2 = userPrefersMode.current === "system" ? systemPrefersMode.current : userPrefersMode.current;
    const sanitizedDarkClassNames = sanitizeClassNames(darkClassNames.current);
    const sanitizedLightClassNames = sanitizeClassNames(lightClassNames.current);
    function update() {
      const htmlEl = document.documentElement;
      const themeColorEl = document.querySelector('meta[name="theme-color"]');
      if (derivedMode2 === "light") {
        if (sanitizedDarkClassNames.length) htmlEl.classList.remove(...sanitizedDarkClassNames);
        if (sanitizedLightClassNames.length) htmlEl.classList.add(...sanitizedLightClassNames);
        htmlEl.style.colorScheme = "light";
        if (themeColorEl && themeColors.current) {
          themeColorEl.setAttribute("content", themeColors.current.light);
        }
      } else {
        if (sanitizedLightClassNames.length) htmlEl.classList.remove(...sanitizedLightClassNames);
        if (sanitizedDarkClassNames.length) htmlEl.classList.add(...sanitizedDarkClassNames);
        htmlEl.style.colorScheme = "dark";
        if (themeColorEl && themeColors.current) {
          themeColorEl.setAttribute("content", themeColors.current.dark);
        }
      }
    }
    if (disableTransitions.current) {
      withoutTransition(update);
    } else {
      update();
    }
    return derivedMode2;
  })();
  return {
    get current() {
      return current;
    }
  };
}
function createDerivedTheme() {
  const current = (() => {
    customTheme.current;
    if (!isBrowser) return void 0;
    function update() {
      const htmlEl = document.documentElement;
      htmlEl.setAttribute("data-theme", customTheme.current);
    }
    if (disableTransitions.current) {
      withoutTransition(update);
    } else {
      update();
    }
    return customTheme.current;
  })();
  return {
    get current() {
      return current;
    }
  };
}
const derivedMode = createDerivedMode();
createDerivedTheme();
function toggleMode() {
  userPrefersMode.current = derivedMode.current === "dark" ? "light" : "dark";
}
function defineConfig(config) {
  return config;
}
function setInitialMode({ defaultMode = "system", themeColors: themeColors2, darkClassNames: darkClassNames2 = ["dark"], lightClassNames: lightClassNames2 = [], defaultTheme = "", modeStorageKey: modeStorageKey2 = "mode-watcher-mode", themeStorageKey: themeStorageKey2 = "mode-watcher-theme" }) {
  const rootEl = document.documentElement;
  const mode = localStorage.getItem(modeStorageKey2) ?? defaultMode;
  const theme = localStorage.getItem(themeStorageKey2) ?? defaultTheme;
  const light = mode === "light" || mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches;
  if (light) {
    if (darkClassNames2.length)
      rootEl.classList.remove(...darkClassNames2.filter(Boolean));
    if (lightClassNames2.length)
      rootEl.classList.add(...lightClassNames2.filter(Boolean));
  } else {
    if (lightClassNames2.length)
      rootEl.classList.remove(...lightClassNames2.filter(Boolean));
    if (darkClassNames2.length)
      rootEl.classList.add(...darkClassNames2.filter(Boolean));
  }
  rootEl.style.colorScheme = light ? "light" : "dark";
  if (themeColors2) {
    const themeMetaEl = document.querySelector('meta[name="theme-color"]');
    if (themeMetaEl) {
      themeMetaEl.setAttribute("content", mode === "light" ? themeColors2.light : themeColors2.dark);
    }
  }
  if (theme) {
    rootEl.setAttribute("data-theme", theme);
    localStorage.setItem(themeStorageKey2, theme);
  }
  localStorage.setItem(modeStorageKey2, mode);
}
function Mode_watcher_lite($$payload, $$props) {
  push();
  let { themeColors: themeColors2 } = $$props;
  if (themeColors2) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<meta name="theme-color"${attr("content", themeColors2.dark)}/>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Mode_watcher_full($$payload, $$props) {
  push();
  let { trueNonce = "", initConfig, themeColors: themeColors2 } = $$props;
  head($$payload, ($$payload2) => {
    if (themeColors2) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<meta name="theme-color"${attr("content", themeColors2.dark)}/>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> ${html(`<script${trueNonce ? ` nonce=${trueNonce}` : ""}>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`)}`;
  });
  pop();
}
function Mode_watcher($$payload, $$props) {
  push();
  let {
    defaultMode = "system",
    themeColors: themeColorsProp,
    disableTransitions: disableTransitionsProp = true,
    darkClassNames: darkClassNamesProp = ["dark"],
    lightClassNames: lightClassNamesProp = [],
    defaultTheme = "",
    nonce = "",
    themeStorageKey: themeStorageKeyProp = "mode-watcher-theme",
    modeStorageKey: modeStorageKeyProp = "mode-watcher-mode",
    disableHeadScriptInjection = false
  } = $$props;
  modeStorageKey.current = modeStorageKeyProp;
  themeStorageKey.current = themeStorageKeyProp;
  darkClassNames.current = darkClassNamesProp;
  lightClassNames.current = lightClassNamesProp;
  disableTransitions.current = disableTransitionsProp;
  themeColors.current = themeColorsProp;
  const initConfig = defineConfig({
    defaultMode,
    themeColors: themeColorsProp,
    darkClassNames: darkClassNamesProp,
    lightClassNames: lightClassNamesProp,
    defaultTheme,
    modeStorageKey: modeStorageKeyProp,
    themeStorageKey: themeStorageKeyProp
  });
  const trueNonce = typeof window === "undefined" ? nonce : "";
  if (disableHeadScriptInjection) {
    $$payload.out += "<!--[-->";
    Mode_watcher_lite($$payload, { themeColors: themeColors.current });
  } else {
    $$payload.out += "<!--[!-->";
    Mode_watcher_full($$payload, {
      trueNonce,
      initConfig,
      themeColors: themeColors.current
    });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function TopBar($$payload, $$props) {
  push();
  $$payload.out += `<nav${attr_class(`bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${stringify("")}`)}><div class="container mx-auto px-4"><div class="flex h-16 items-center justify-between"><span></span> `;
  Button($$payload, {
    onclick: toggleMode,
    variant: "outline",
    size: "icon",
    children: ($$payload2) => {
      Sun($$payload2, {
        class: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      });
      $$payload2.out += `<!----> `;
      Moon($$payload2, {
        class: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      });
      $$payload2.out += `<!----> <span class="sr-only">Toggle theme</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div></nav>`;
  pop();
}
function _layout($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Your Life in Weeks</title>`;
    $$payload2.out += `<meta name="description" content="Visualize your life journey in weeks - gain perspective and make the most of your time"/> <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"/> <link rel="manifest" href="/manifest.json"/> <meta name="theme-color" content="#ffffff"/> <meta name="apple-mobile-web-app-capable" content="yes"/> <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/> <meta name="apple-mobile-web-app-title" content="Life Progress"/> <link rel="apple-touch-icon" href="/icons/icon-192x192.png"/> <meta name="format-detection" content="telephone=no"/>`;
  });
  Mode_watcher($$payload, {});
  $$payload.out += `<!----> <div class="min-h-screen bg-background">`;
  TopBar($$payload);
  $$payload.out += `<!----> <main class="container h-[calc(100vh-100px)] mx-auto"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></main></div>`;
  pop();
}
export {
  _layout as default
};
