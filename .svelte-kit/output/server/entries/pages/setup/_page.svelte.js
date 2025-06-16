import { clsx as clsx$1 } from "clsx";
import { E as ATTACHMENT_KEY, w as push, F as spread_attributes, G as clsx, I as bind_props, y as pop, J as hasContext, C as getContext, x as setContext, K as derived, M as run, N as getAllContexts, O as props_id, D as escape_html, P as ensure_array_like, Q as attr, R as maybe_selected, S as spread_props, T as copy_payload, U as assign_payload, V as element, W as attr_class } from "../../../chunks/index.js";
import { d as cn, C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../chunks/card-title.js";
import "../../../chunks/client.js";
import "../../../chunks/stores.js";
import { b as buttonVariants, C as Card_description, B as Button } from "../../../chunks/button.js";
import parse from "style-to-object";
import { CalendarDateTime, CalendarDate, getLocalTimeZone, ZonedDateTime, parseZonedDateTime, parseDateTime, parseDate, toCalendar, getDayOfWeek, DateFormatter, startOfMonth, endOfMonth, isSameDay, isSameMonth, isToday, isEqualMonth, today } from "@internationalized/date";
import { computePosition, offset, shift, flip, size, arrow, hide, limitShift } from "@floating-ui/dom";
import { o as on } from "../../../chunks/events.js";
import { isTabbable } from "tabbable";
function createAttachmentKey() {
  return Symbol(ATTACHMENT_KEY);
}
function lifecycle_function_unavailable(name) {
  const error = new Error(`lifecycle_function_unavailable
\`${name}(...)\` is not available on the server
https://svelte.dev/e/lifecycle_function_unavailable`);
  error.name = "Svelte error";
  throw error;
}
function mount() {
  lifecycle_function_unavailable("mount");
}
function unmount() {
  lifecycle_function_unavailable("unmount");
}
async function tick() {
}
function Input($$payload, $$props) {
  push();
  let {
    ref = null,
    value = void 0,
    type,
    files = void 0,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (type === "file") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<input${spread_attributes(
      {
        "data-slot": "input",
        class: clsx(cn("selection:bg-primary dark:bg-input/30 selection:text-primary-foreground border-input ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 pt-1.5 text-sm font-medium outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className)),
        type: "file",
        ...restProps
      }
    )}/>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<input${spread_attributes(
      {
        "data-slot": "input",
        class: clsx(cn("border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className)),
        type,
        value,
        ...restProps
      }
    )}/>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, value, files });
  pop();
}
function isFunction$1(value) {
  return typeof value === "function";
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
const CLASS_VALUE_PRIMITIVE_TYPES = ["string", "number", "bigint", "boolean"];
function isClassValue(value) {
  if (value === null || value === void 0)
    return true;
  if (CLASS_VALUE_PRIMITIVE_TYPES.includes(typeof value))
    return true;
  if (Array.isArray(value))
    return value.every((item) => isClassValue(item));
  if (typeof value === "object") {
    if (Object.getPrototypeOf(value) !== Object.prototype)
      return false;
    return true;
  }
  return false;
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
  const derived2 = getter();
  if (setter) {
    return {
      [BoxSymbol]: true,
      [isWritableSymbol]: true,
      get current() {
        return derived2;
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
  if (isFunction$1(value)) return box.with(value);
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
function composeHandlers(...handlers) {
  return function(e) {
    for (const handler of handlers) {
      if (!handler)
        continue;
      if (e.defaultPrevented)
        return;
      if (typeof handler === "function") {
        handler.call(this, e);
      } else {
        handler.current?.call(this, e);
      }
    }
  };
}
const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char))
    return void 0;
  return char !== char.toLowerCase();
}
function splitByCase(str) {
  const parts = [];
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = STR_SPLITTERS.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function pascalCase(str) {
  if (!str)
    return "";
  return splitByCase(str).map((p) => upperFirst(p)).join("");
}
function camelCase(str) {
  return lowerFirst(pascalCase(str || ""));
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
  return str ? str[0].toLowerCase() + str.slice(1) : "";
}
function cssToStyleObj(css) {
  if (!css)
    return {};
  const styleObj = {};
  function iterator(name, value) {
    if (name.startsWith("-moz-") || name.startsWith("-webkit-") || name.startsWith("-ms-") || name.startsWith("-o-")) {
      styleObj[pascalCase(name)] = value;
      return;
    }
    if (name.startsWith("--")) {
      styleObj[name] = value;
      return;
    }
    styleObj[camelCase(name)] = value;
  }
  parse(css, iterator);
  return styleObj;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
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
const EVENT_LIST = [
  "onabort",
  "onanimationcancel",
  "onanimationend",
  "onanimationiteration",
  "onanimationstart",
  "onauxclick",
  "onbeforeinput",
  "onbeforetoggle",
  "onblur",
  "oncancel",
  "oncanplay",
  "oncanplaythrough",
  "onchange",
  "onclick",
  "onclose",
  "oncompositionend",
  "oncompositionstart",
  "oncompositionupdate",
  "oncontextlost",
  "oncontextmenu",
  "oncontextrestored",
  "oncopy",
  "oncuechange",
  "oncut",
  "ondblclick",
  "ondrag",
  "ondragend",
  "ondragenter",
  "ondragleave",
  "ondragover",
  "ondragstart",
  "ondrop",
  "ondurationchange",
  "onemptied",
  "onended",
  "onerror",
  "onfocus",
  "onfocusin",
  "onfocusout",
  "onformdata",
  "ongotpointercapture",
  "oninput",
  "oninvalid",
  "onkeydown",
  "onkeypress",
  "onkeyup",
  "onload",
  "onloadeddata",
  "onloadedmetadata",
  "onloadstart",
  "onlostpointercapture",
  "onmousedown",
  "onmouseenter",
  "onmouseleave",
  "onmousemove",
  "onmouseout",
  "onmouseover",
  "onmouseup",
  "onpaste",
  "onpause",
  "onplay",
  "onplaying",
  "onpointercancel",
  "onpointerdown",
  "onpointerenter",
  "onpointerleave",
  "onpointermove",
  "onpointerout",
  "onpointerover",
  "onpointerup",
  "onprogress",
  "onratechange",
  "onreset",
  "onresize",
  "onscroll",
  "onscrollend",
  "onsecuritypolicyviolation",
  "onseeked",
  "onseeking",
  "onselect",
  "onselectionchange",
  "onselectstart",
  "onslotchange",
  "onstalled",
  "onsubmit",
  "onsuspend",
  "ontimeupdate",
  "ontoggle",
  "ontouchcancel",
  "ontouchend",
  "ontouchmove",
  "ontouchstart",
  "ontransitioncancel",
  "ontransitionend",
  "ontransitionrun",
  "ontransitionstart",
  "onvolumechange",
  "onwaiting",
  "onwebkitanimationend",
  "onwebkitanimationiteration",
  "onwebkitanimationstart",
  "onwebkittransitionend",
  "onwheel"
];
const EVENT_LIST_SET = new Set(EVENT_LIST);
function isEventHandler(key) {
  return EVENT_LIST_SET.has(key);
}
function mergeProps(...args) {
  const result = { ...args[0] };
  for (let i = 1; i < args.length; i++) {
    const props = args[i];
    if (!props)
      continue;
    for (const key of Object.keys(props)) {
      const a = result[key];
      const b = props[key];
      const aIsFunction = typeof a === "function";
      const bIsFunction = typeof b === "function";
      if (aIsFunction && typeof bIsFunction && isEventHandler(key)) {
        const aHandler = a;
        const bHandler = b;
        result[key] = composeHandlers(aHandler, bHandler);
      } else if (aIsFunction && bIsFunction) {
        result[key] = executeCallbacks(a, b);
      } else if (key === "class") {
        const aIsClassValue = isClassValue(a);
        const bIsClassValue = isClassValue(b);
        if (aIsClassValue && bIsClassValue) {
          result[key] = clsx$1(a, b);
        } else if (aIsClassValue) {
          result[key] = clsx$1(a);
        } else if (bIsClassValue) {
          result[key] = clsx$1(b);
        }
      } else if (key === "style") {
        const aIsObject = typeof a === "object";
        const bIsObject = typeof b === "object";
        const aIsString = typeof a === "string";
        const bIsString = typeof b === "string";
        if (aIsObject && bIsObject) {
          result[key] = { ...a, ...b };
        } else if (aIsObject && bIsString) {
          const parsedStyle = cssToStyleObj(b);
          result[key] = { ...a, ...parsedStyle };
        } else if (aIsString && bIsObject) {
          const parsedStyle = cssToStyleObj(a);
          result[key] = { ...parsedStyle, ...b };
        } else if (aIsString && bIsString) {
          const parsedStyleA = cssToStyleObj(a);
          const parsedStyleB = cssToStyleObj(b);
          result[key] = { ...parsedStyleA, ...parsedStyleB };
        } else if (aIsObject) {
          result[key] = a;
        } else if (bIsObject) {
          result[key] = b;
        } else if (aIsString) {
          result[key] = a;
        } else if (bIsString) {
          result[key] = b;
        }
      } else {
        result[key] = b !== void 0 ? b : a;
      }
    }
    for (const key of Object.getOwnPropertySymbols(props)) {
      const a = result[key];
      const b = props[key];
      result[key] = b !== void 0 ? b : a;
    }
  }
  if (typeof result.style === "object") {
    result.style = styleToString(result.style).replaceAll("\n", " ");
  }
  if (result.hidden !== true) {
    result.hidden = void 0;
    delete result.hidden;
  }
  if (result.disabled !== true) {
    result.disabled = void 0;
    delete result.disabled;
  }
  return result;
}
const defaultWindow = void 0;
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
const SvelteMap = globalThis.Map;
function createSubscriber(_) {
  return () => {
  };
}
class ActiveElement {
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
    return getActiveElement$1(this.#document);
  }
}
new ActiveElement();
function isFunction(value) {
  return typeof value === "function";
}
class Context {
  #name;
  #key;
  /**
   * @param name The name of the context.
   * This is used for generating the context key and error messages.
   */
  constructor(name) {
    this.#name = name;
    this.#key = Symbol(name);
  }
  /**
   * The key used to get and set the context.
   *
   * It is not recommended to use this value directly.
   * Instead, use the methods provided by this class.
   */
  get key() {
    return this.#key;
  }
  /**
   * Checks whether this has been set in the context of a parent component.
   *
   * Must be called during component initialisation.
   */
  exists() {
    return hasContext(this.#key);
  }
  /**
   * Retrieves the context that belongs to the closest parent component.
   *
   * Must be called during component initialisation.
   *
   * @throws An error if the context does not exist.
   */
  get() {
    const context = getContext(this.#key);
    if (context === void 0) {
      throw new Error(`Context "${this.#name}" not found`);
    }
    return context;
  }
  /**
   * Retrieves the context that belongs to the closest parent component,
   * or the given fallback value if the context does not exist.
   *
   * Must be called during component initialisation.
   */
  getOr(fallback) {
    const context = getContext(this.#key);
    if (context === void 0) {
      return fallback;
    }
    return context;
  }
  /**
   * Associates the given value with the current component and returns it.
   *
   * Must be called during component initialisation.
   */
  set(context) {
    return setContext(this.#key, context);
  }
}
function runWatcher(sources, flush, effect, options = {}) {
  const { lazy = false } = options;
}
function watch(sources, effect, options) {
  runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
  runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
function get$1(value) {
  if (isFunction(value)) {
    return value();
  }
  return value;
}
class ElementSize {
  // no need to use `$state` here since we are using createSubscriber
  #size = { width: 0, height: 0 };
  #observed = false;
  #options;
  #node;
  #window;
  // we use a derived here to extract the width so that if the width doesn't change we don't get a state update
  // which we would get if we would just use a getter since the version of the subscriber will be changing
  #width = derived(() => {
    this.#subscribe()?.();
    return this.getSize().width;
  });
  // we use a derived here to extract the height so that if the height doesn't change we don't get a state update
  // which we would get if we would just use a getter since the version of the subscriber will be changing
  #height = derived(() => {
    this.#subscribe()?.();
    return this.getSize().height;
  });
  // we need to use a derived here because the class will be created before the node is bound to the ref
  #subscribe = derived(() => {
    const node$ = get$1(this.#node);
    if (!node$) return;
    return createSubscriber();
  });
  constructor(node, options = { box: "border-box" }) {
    this.#window = options.window ?? defaultWindow;
    this.#options = options;
    this.#node = node;
    this.#size = { width: 0, height: 0 };
  }
  calculateSize() {
    const element2 = get$1(this.#node);
    if (!element2 || !this.#window) {
      return;
    }
    const offsetWidth = element2.offsetWidth;
    const offsetHeight = element2.offsetHeight;
    if (this.#options.box === "border-box") {
      return { width: offsetWidth, height: offsetHeight };
    }
    const style = this.#window.getComputedStyle(element2);
    const paddingWidth = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const paddingHeight = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const borderWidth = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    const borderHeight = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const contentWidth = offsetWidth - paddingWidth - borderWidth;
    const contentHeight = offsetHeight - paddingHeight - borderHeight;
    return { width: contentWidth, height: contentHeight };
  }
  getSize() {
    return this.#observed ? this.#size : this.calculateSize() ?? this.#size;
  }
  get current() {
    this.#subscribe()?.();
    return this.getSize();
  }
  get width() {
    return this.#width();
  }
  get height() {
    return this.#height();
  }
}
class Previous {
  #previous = void 0;
  constructor(getter, initialValue) {
    if (initialValue !== void 0) this.#previous = initialValue;
    watch(() => getter(), (_, v) => {
      this.#previous = v;
    });
  }
  get current() {
    return this.#previous;
  }
}
function afterSleep(ms, cb) {
  return setTimeout(cb, ms);
}
function afterTick(fn) {
  tick().then(fn);
}
const ELEMENT_NODE = 1;
const DOCUMENT_NODE = 9;
const DOCUMENT_FRAGMENT_NODE = 11;
function isHTMLElement$1(node) {
  return isObject(node) && node.nodeType === ELEMENT_NODE && typeof node.nodeName === "string";
}
function isDocument(node) {
  return isObject(node) && node.nodeType === DOCUMENT_NODE;
}
function isWindow(node) {
  return isObject(node) && node.constructor?.name === "VisualViewport";
}
function isNode(node) {
  return isObject(node) && node.nodeType !== void 0;
}
function isShadowRoot(node) {
  return isNode(node) && node.nodeType === DOCUMENT_FRAGMENT_NODE && "host" in node;
}
function contains(parent, child) {
  if (!parent || !child)
    return false;
  if (!isHTMLElement$1(parent) || !isHTMLElement$1(child))
    return false;
  const rootNode = child.getRootNode?.();
  if (parent === child)
    return true;
  if (parent.contains(child))
    return true;
  if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next)
        return true;
      next = next.parentNode || next.host;
    }
  }
  return false;
}
function getDocument(node) {
  if (isDocument(node))
    return node;
  if (isWindow(node))
    return node.document;
  return node?.ownerDocument ?? document;
}
function getWindow(node) {
  if (isShadowRoot(node))
    return getWindow(node.host);
  if (isDocument(node))
    return node.defaultView ?? window;
  if (isHTMLElement$1(node))
    return node.ownerDocument?.defaultView ?? window;
  return window;
}
function getActiveElement(rootNode) {
  let activeElement = rootNode.activeElement;
  while (activeElement?.shadowRoot) {
    const el = activeElement.shadowRoot.activeElement;
    if (el === activeElement)
      break;
    else
      activeElement = el;
  }
  return activeElement;
}
class DOMContext {
  element;
  #root = derived(() => {
    if (!this.element.current) return document;
    const rootNode = this.element.current.getRootNode() ?? document;
    return rootNode;
  });
  get root() {
    return this.#root();
  }
  set root($$value) {
    return this.#root($$value);
  }
  constructor(element2) {
    if (typeof element2 === "function") {
      this.element = box.with(element2);
    } else {
      this.element = element2;
    }
  }
  getDocument = () => {
    return getDocument(this.root);
  };
  getWindow = () => {
    return this.getDocument().defaultView ?? window;
  };
  getActiveElement = () => {
    return getActiveElement(this.root);
  };
  isActiveElement = (node) => {
    return node === this.getActiveElement();
  };
  getElementById(id) {
    return this.root.getElementById(id);
  }
  querySelector = (selector) => {
    if (!this.root) return null;
    return this.root.querySelector(selector);
  };
  querySelectorAll = (selector) => {
    if (!this.root) return [];
    return this.root.querySelectorAll(selector);
  };
  setTimeout = (callback, delay) => {
    return this.getWindow().setTimeout(callback, delay);
  };
  clearTimeout = (timeoutId) => {
    return this.getWindow().clearTimeout(timeoutId);
  };
}
function attachRef(ref, onChange) {
  return {
    [createAttachmentKey()]: (node) => {
      if (box.isBox(ref)) {
        ref.current = node;
        run(() => onChange?.(node));
        return () => {
          ref.current = null;
          onChange?.(null);
        };
      }
      ref(node);
      run(() => onChange?.(node));
      return () => {
        ref(null);
        onChange?.(null);
      };
    }
  };
}
function getDataOpenClosed(condition) {
  return condition ? "open" : "closed";
}
function getAriaDisabled(condition) {
  return condition ? "true" : "false";
}
function getAriaReadonly(condition) {
  return condition ? "true" : "false";
}
function getAriaExpanded(condition) {
  return condition ? "true" : "false";
}
function getDataDisabled(condition) {
  return condition ? "" : void 0;
}
function getAriaSelected(condition) {
  return condition ? "true" : "false";
}
function getDataInvalid(condition) {
  return condition ? "" : void 0;
}
function getDataReadonly(condition) {
  return condition ? "" : void 0;
}
function getDataSelected(condition) {
  return condition ? "" : void 0;
}
function getDataUnavailable(condition) {
  return condition ? "" : void 0;
}
class BitsAttrs {
  #variant;
  #prefix;
  attrs;
  constructor(config) {
    this.#variant = config.getVariant ? config.getVariant() : null;
    this.#prefix = this.#variant ? `data-${this.#variant}-` : `data-${config.component}-`;
    this.getAttr = this.getAttr.bind(this);
    this.selector = this.selector.bind(this);
    this.attrs = Object.fromEntries(config.parts.map((part) => [part, this.getAttr(part)]));
  }
  getAttr(part, variantOverride) {
    if (variantOverride)
      return `data-${variantOverride}-${part}`;
    return `${this.#prefix}${part}`;
  }
  selector(part, variantOverride) {
    return `[${this.getAttr(part, variantOverride)}]`;
  }
}
function createBitsAttrs(config) {
  const bitsAttrs = new BitsAttrs(config);
  return {
    ...bitsAttrs.attrs,
    selector: bitsAttrs.selector,
    getAttr: bitsAttrs.getAttr
  };
}
const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
const ARROW_UP = "ArrowUp";
const ENTER = "Enter";
const ESCAPE = "Escape";
const SPACE = " ";
const TAB = "Tab";
function noop() {
}
function createId(prefixOrUid, uid) {
  return `bits-${prefixOrUid}`;
}
class StateMachine {
  state;
  #machine;
  constructor(initialState, machine) {
    this.state = box(initialState);
    this.#machine = machine;
    this.dispatch = this.dispatch.bind(this);
  }
  #reducer(event) {
    const nextState = this.#machine[this.state.current][event];
    return nextState ?? this.state.current;
  }
  dispatch(event) {
    this.state.current = this.#reducer(event);
  }
}
const presenceMachine = {
  mounted: {
    UNMOUNT: "unmounted",
    ANIMATION_OUT: "unmountSuspended"
  },
  unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
  unmounted: { MOUNT: "mounted" }
};
class Presence {
  opts;
  prevAnimationNameState = "none";
  styles = {};
  initialStatus;
  previousPresent;
  machine;
  present;
  constructor(opts) {
    this.opts = opts;
    this.present = this.opts.open;
    this.initialStatus = opts.open.current ? "mounted" : "unmounted";
    this.previousPresent = new Previous(() => this.present.current);
    this.machine = new StateMachine(this.initialStatus, presenceMachine);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleAnimationStart = this.handleAnimationStart.bind(this);
    watchPresenceChange(this);
    watchStatusChange(this);
    watchRefChange(this);
  }
  /**
   * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
   * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
   * make sure we only trigger ANIMATION_END for the currently active animation.
   */
  handleAnimationEnd(event) {
    if (!this.opts.ref.current) return;
    const currAnimationName = getAnimationName(this.opts.ref.current);
    const isCurrentAnimation = currAnimationName.includes(event.animationName) || currAnimationName === "none";
    if (event.target === this.opts.ref.current && isCurrentAnimation) {
      this.machine.dispatch("ANIMATION_END");
    }
  }
  handleAnimationStart(event) {
    if (!this.opts.ref.current) return;
    if (event.target === this.opts.ref.current) {
      this.prevAnimationNameState = getAnimationName(this.opts.ref.current);
    }
  }
  #isPresent = derived(() => {
    return ["mounted", "unmountSuspended"].includes(this.machine.state.current);
  });
  get isPresent() {
    return this.#isPresent();
  }
  set isPresent($$value) {
    return this.#isPresent($$value);
  }
}
function watchPresenceChange(state) {
  watch(() => state.present.current, () => {
    if (!state.opts.ref.current) return;
    const hasPresentChanged = state.present.current !== state.previousPresent.current;
    if (!hasPresentChanged) return;
    const prevAnimationName = state.prevAnimationNameState;
    const currAnimationName = getAnimationName(state.opts.ref.current);
    if (state.present.current) {
      state.machine.dispatch("MOUNT");
    } else if (currAnimationName === "none" || state.styles.display === "none") {
      state.machine.dispatch("UNMOUNT");
    } else {
      const isAnimating = prevAnimationName !== currAnimationName;
      if (state.previousPresent.current && isAnimating) {
        state.machine.dispatch("ANIMATION_OUT");
      } else {
        state.machine.dispatch("UNMOUNT");
      }
    }
  });
}
function watchStatusChange(state) {
  watch(() => state.machine.state.current, () => {
    if (!state.opts.ref.current) return;
    const currAnimationName = getAnimationName(state.opts.ref.current);
    state.prevAnimationNameState = state.machine.state.current === "mounted" ? currAnimationName : "none";
  });
}
function watchRefChange(state) {
  watch(() => state.opts.ref.current, () => {
    if (!state.opts.ref.current) return;
    state.styles = getComputedStyle(state.opts.ref.current);
    return executeCallbacks(on(state.opts.ref.current, "animationstart", state.handleAnimationStart), on(state.opts.ref.current, "animationcancel", state.handleAnimationEnd), on(state.opts.ref.current, "animationend", state.handleAnimationEnd));
  });
}
function getAnimationName(node) {
  return node ? getComputedStyle(node).animationName || "none" : "none";
}
function Presence_layer($$payload, $$props) {
  push();
  let { open, forceMount, presence, ref } = $$props;
  const presenceState = new Presence({ open: box.with(() => open), ref });
  if (forceMount || open || presenceState.isPresent) {
    $$payload.out += "<!--[-->";
    presence?.($$payload, { present: presenceState.isPresent });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
class AnimationsComplete {
  #opts;
  #currentFrame = void 0;
  #isRunning = false;
  constructor(opts) {
    this.#opts = opts;
  }
  #cleanup() {
    if (this.#currentFrame) {
      window.cancelAnimationFrame(this.#currentFrame);
      this.#currentFrame = void 0;
    }
    this.#isRunning = false;
  }
  run(fn) {
    if (this.#isRunning)
      return;
    this.#cleanup();
    this.#isRunning = true;
    const node = this.#opts.ref.current;
    if (!node) {
      this.#isRunning = false;
      return;
    }
    if (typeof node.getAnimations !== "function") {
      this.#executeCallback(fn);
      return;
    }
    this.#currentFrame = window.requestAnimationFrame(() => {
      const animations = node.getAnimations();
      if (animations.length === 0) {
        this.#executeCallback(fn);
        return;
      }
      Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
        this.#executeCallback(fn);
      });
    });
  }
  #executeCallback(fn) {
    const execute = () => {
      fn();
      this.#isRunning = false;
    };
    if (this.#opts.afterTick) {
      afterTick(execute);
    } else {
      execute();
    }
  }
}
class OpenChangeComplete {
  #opts;
  #enabled;
  #afterAnimations;
  constructor(opts) {
    this.#opts = opts;
    this.#enabled = opts.enabled ?? true;
    this.#afterAnimations = new AnimationsComplete({
      ref: this.#opts.ref,
      afterTick: this.#opts.open
    });
    watch([() => this.#opts.open.current], ([open]) => {
      if (!this.#enabled)
        return;
      this.#afterAnimations.run(() => {
        if (open === this.#opts.open.current) {
          this.#opts.onComplete();
        }
      });
    });
  }
}
const isBrowser = typeof document !== "undefined";
const isIOS = getIsIOS();
function getIsIOS() {
  return isBrowser && window?.navigator?.userAgent && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || // The new iPad Pro Gen3 does not identify itself as iPad, but as Macintosh.
  window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function isHTMLElement(element2) {
  return element2 instanceof HTMLElement;
}
function isElement(element2) {
  return element2 instanceof Element;
}
function isNotNull(value) {
  return value !== null;
}
function isSelectableInput(element2) {
  return element2 instanceof HTMLInputElement && "select" in element2;
}
function isElementHidden(node, stopAt) {
  if (getComputedStyle(node).visibility === "hidden")
    return true;
  while (node) {
    if (stopAt !== void 0 && node === stopAt)
      return false;
    if (getComputedStyle(node).display === "none")
      return true;
    node = node.parentElement;
  }
  return false;
}
const BitsConfigContext = new Context("BitsConfig");
function getBitsConfig() {
  const fallback = new BitsConfigState(null, {});
  return BitsConfigContext.getOr(fallback).opts;
}
class BitsConfigState {
  opts;
  constructor(parent, opts) {
    const resolveConfigOption = createConfigResolver(parent, opts);
    this.opts = {
      defaultPortalTo: resolveConfigOption((config) => config.defaultPortalTo),
      defaultLocale: resolveConfigOption((config) => config.defaultLocale)
    };
  }
}
function createConfigResolver(parent, currentOpts) {
  return (getter) => {
    const configOption = box.with(() => {
      const value = getter(currentOpts)?.current;
      if (value !== void 0)
        return value;
      if (parent === null)
        return void 0;
      return getter(parent.opts)?.current;
    });
    return configOption;
  };
}
function createPropResolver(configOption, fallback) {
  return (getProp) => {
    const config = getBitsConfig();
    return box.with(() => {
      const propValue = getProp();
      if (propValue !== void 0)
        return propValue;
      const option = configOption(config).current;
      if (option !== void 0)
        return option;
      return fallback;
    });
  };
}
const resolveLocaleProp = createPropResolver((config) => config.defaultLocale, "en");
const resolvePortalToProp = createPropResolver((config) => config.defaultPortalTo, "body");
function Portal($$payload, $$props) {
  push();
  let { to: toProp, children, disabled } = $$props;
  const to = resolvePortalToProp(() => toProp);
  getAllContexts();
  let target = getTarget();
  function getTarget() {
    if (!isBrowser || disabled) return null;
    let localTarget = null;
    if (typeof to.current === "string") {
      const target2 = document.querySelector(to.current);
      localTarget = target2;
    } else {
      localTarget = to.current;
    }
    return localTarget;
  }
  let instance;
  function unmountInstance() {
    if (instance) {
      unmount();
      instance = null;
    }
  }
  watch([() => target, () => disabled], ([target2, disabled2]) => {
    if (!target2 || disabled2) {
      unmountInstance();
      return;
    }
    instance = mount();
    return () => {
      unmountInstance();
    };
  });
  if (disabled) {
    $$payload.out += "<!--[-->";
    children?.($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
class CustomEventDispatcher {
  eventName;
  options;
  constructor(eventName, options = { bubbles: true, cancelable: true }) {
    this.eventName = eventName;
    this.options = options;
  }
  createEvent(detail) {
    return new CustomEvent(this.eventName, {
      ...this.options,
      detail
    });
  }
  dispatch(element2, detail) {
    const event = this.createEvent(detail);
    element2.dispatchEvent(event);
    return event;
  }
  listen(element2, callback, options) {
    const handler = (event) => {
      callback(event);
    };
    return on(element2, this.eventName, handler, options);
  }
}
function debounce(fn, wait = 500) {
  let timeout = null;
  const debounced = (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  };
  debounced.destroy = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  return debounced;
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
function isClickTrulyOutside(event, contentNode) {
  const { clientX, clientY } = event;
  const rect = contentNode.getBoundingClientRect();
  return clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom;
}
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
class DismissibleLayerState {
  static create(opts) {
    return new DismissibleLayerState(opts);
  }
  opts;
  #interactOutsideProp;
  #behaviorType;
  #interceptedEvents = { pointerdown: false };
  #isResponsibleLayer = false;
  #isFocusInsideDOMTree = false;
  #documentObj = void 0;
  #onFocusOutside;
  #unsubClickListener = noop;
  constructor(opts) {
    this.opts = opts;
    this.#behaviorType = opts.interactOutsideBehavior;
    this.#interactOutsideProp = opts.onInteractOutside;
    this.#onFocusOutside = opts.onFocusOutside;
    let unsubEvents = noop;
    const cleanup = () => {
      this.#resetState();
      globalThis.bitsDismissableLayers.delete(this);
      this.#handleInteractOutside.destroy();
      unsubEvents();
    };
    watch(
      [
        () => this.opts.enabled.current,
        () => this.opts.ref.current
      ],
      () => {
        if (!this.opts.enabled.current || !this.opts.ref.current) return;
        afterSleep(1, () => {
          if (!this.opts.ref.current) return;
          globalThis.bitsDismissableLayers.set(this, this.#behaviorType);
          unsubEvents();
          unsubEvents = this.#addEventListeners();
        });
        return cleanup;
      }
    );
  }
  #handleFocus = (event) => {
    if (event.defaultPrevented) return;
    if (!this.opts.ref.current) return;
    afterTick(() => {
      if (!this.opts.ref.current || this.#isTargetWithinLayer(event.target)) return;
      if (event.target && !this.#isFocusInsideDOMTree) {
        this.#onFocusOutside.current?.(event);
      }
    });
  };
  #addEventListeners() {
    return executeCallbacks(
      /**
      * CAPTURE INTERACTION START
      * mark interaction-start event as intercepted.
      * mark responsible layer during interaction start
      * to avoid checking if is responsible layer during interaction end
      * when a new floating element may have been opened.
      */
      on(this.#documentObj, "pointerdown", executeCallbacks(this.#markInterceptedEvent, this.#markResponsibleLayer), { capture: true }),
      /**
      * BUBBLE INTERACTION START
      * Mark interaction-start event as non-intercepted. Debounce `onInteractOutsideStart`
      * to avoid prematurely checking if other events were intercepted.
      */
      on(this.#documentObj, "pointerdown", executeCallbacks(this.#markNonInterceptedEvent, this.#handleInteractOutside)),
      /**
      * HANDLE FOCUS OUTSIDE
      */
      on(this.#documentObj, "focusin", this.#handleFocus)
    );
  }
  #handleDismiss = (e) => {
    let event = e;
    if (event.defaultPrevented) {
      event = createWrappedEvent(e);
    }
    this.#interactOutsideProp.current(e);
  };
  #handleInteractOutside = debounce(
    (e) => {
      if (!this.opts.ref.current) {
        this.#unsubClickListener();
        return;
      }
      const isEventValid = this.opts.isValidEvent.current(e, this.opts.ref.current) || isValidEvent(e, this.opts.ref.current);
      if (!this.#isResponsibleLayer || this.#isAnyEventIntercepted() || !isEventValid) {
        this.#unsubClickListener();
        return;
      }
      let event = e;
      if (event.defaultPrevented) {
        event = createWrappedEvent(event);
      }
      if (this.#behaviorType.current !== "close" && this.#behaviorType.current !== "defer-otherwise-close") {
        this.#unsubClickListener();
        return;
      }
      if (e.pointerType === "touch") {
        this.#unsubClickListener();
        this.#unsubClickListener = addEventListener(this.#documentObj, "click", this.#handleDismiss, { once: true });
      } else {
        this.#interactOutsideProp.current(event);
      }
    },
    10
  );
  #markInterceptedEvent = (e) => {
    this.#interceptedEvents[e.type] = true;
  };
  #markNonInterceptedEvent = (e) => {
    this.#interceptedEvents[e.type] = false;
  };
  #markResponsibleLayer = () => {
    if (!this.opts.ref.current) return;
    this.#isResponsibleLayer = isResponsibleLayer(this.opts.ref.current);
  };
  #isTargetWithinLayer = (target) => {
    if (!this.opts.ref.current) return false;
    return isOrContainsTarget(this.opts.ref.current, target);
  };
  #resetState = debounce(
    () => {
      for (const eventType in this.#interceptedEvents) {
        this.#interceptedEvents[eventType] = false;
      }
      this.#isResponsibleLayer = false;
    },
    20
  );
  #isAnyEventIntercepted() {
    const i = Object.values(this.#interceptedEvents).some(Boolean);
    return i;
  }
  #onfocuscapture = () => {
    this.#isFocusInsideDOMTree = true;
  };
  #onblurcapture = () => {
    this.#isFocusInsideDOMTree = false;
  };
  props = {
    onfocuscapture: this.#onfocuscapture,
    onblurcapture: this.#onblurcapture
  };
}
function getTopMostLayer(layersArr) {
  return layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
}
function isResponsibleLayer(node) {
  const layersArr = [...globalThis.bitsDismissableLayers];
  const topMostLayer = getTopMostLayer(layersArr);
  if (topMostLayer) return topMostLayer[0].opts.ref.current === node;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode.opts.ref.current === node;
}
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0) return false;
  const target = e.target;
  if (!isElement(target)) return false;
  const ownerDocument = getOwnerDocument(target);
  const isValid = ownerDocument.documentElement.contains(target) && !isOrContainsTarget(node, target) && isClickTrulyOutside(e, node);
  return isValid;
}
function createWrappedEvent(e) {
  const capturedCurrentTarget = e.currentTarget;
  const capturedTarget = e.target;
  let newEvent;
  if (e instanceof PointerEvent) {
    newEvent = new PointerEvent(e.type, e);
  } else {
    newEvent = new PointerEvent("pointerdown", e);
  }
  let isPrevented = false;
  const wrappedEvent = new Proxy(newEvent, {
    get: (target, prop) => {
      if (prop === "currentTarget") {
        return capturedCurrentTarget;
      }
      if (prop === "target") {
        return capturedTarget;
      }
      if (prop === "preventDefault") {
        return () => {
          isPrevented = true;
          if (typeof target.preventDefault === "function") {
            target.preventDefault();
          }
        };
      }
      if (prop === "defaultPrevented") {
        return isPrevented;
      }
      if (prop in target) {
        return target[prop];
      }
      return e[prop];
    }
  });
  return wrappedEvent;
}
function Dismissible_layer($$payload, $$props) {
  push();
  let {
    interactOutsideBehavior = "close",
    onInteractOutside = noop,
    onFocusOutside = noop,
    id,
    children,
    enabled,
    isValidEvent: isValidEvent2 = () => false,
    ref
  } = $$props;
  const dismissibleLayerState = DismissibleLayerState.create({
    id: box.with(() => id),
    interactOutsideBehavior: box.with(() => interactOutsideBehavior),
    onInteractOutside: box.with(() => onInteractOutside),
    enabled: box.with(() => enabled),
    onFocusOutside: box.with(() => onFocusOutside),
    isValidEvent: box.with(() => isValidEvent2),
    ref
  });
  children?.($$payload, { props: dismissibleLayerState.props });
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
class EscapeLayerState {
  static create(opts) {
    return new EscapeLayerState(opts);
  }
  opts;
  domContext;
  constructor(opts) {
    this.opts = opts;
    this.domContext = new DOMContext(this.opts.ref);
    let unsubEvents = noop;
    watch(() => opts.enabled.current, (enabled) => {
      if (enabled) {
        globalThis.bitsEscapeLayers.set(this, opts.escapeKeydownBehavior);
        unsubEvents = this.#addEventListener();
      }
      return () => {
        unsubEvents();
        globalThis.bitsEscapeLayers.delete(this);
      };
    });
  }
  #addEventListener = () => {
    return on(this.domContext.getDocument(), "keydown", this.#onkeydown, { passive: false });
  };
  #onkeydown = (e) => {
    if (e.key !== ESCAPE || !isResponsibleEscapeLayer(this)) return;
    const clonedEvent = new KeyboardEvent(e.type, e);
    e.preventDefault();
    const behaviorType = this.opts.escapeKeydownBehavior.current;
    if (behaviorType !== "close" && behaviorType !== "defer-otherwise-close") return;
    this.opts.onEscapeKeydown.current(clonedEvent);
  };
}
function isResponsibleEscapeLayer(instance) {
  const layersArr = [...globalThis.bitsEscapeLayers];
  const topMostLayer = layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
  if (topMostLayer) return topMostLayer[0] === instance;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode === instance;
}
function Escape_layer($$payload, $$props) {
  push();
  let {
    escapeKeydownBehavior = "close",
    onEscapeKeydown = noop,
    children,
    enabled,
    ref
  } = $$props;
  EscapeLayerState.create({
    escapeKeydownBehavior: box.with(() => escapeKeydownBehavior),
    onEscapeKeydown: box.with(() => onEscapeKeydown),
    enabled: box.with(() => enabled),
    ref
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsIdCounter ??= { current: 0 };
function useId(prefix = "bits") {
  globalThis.bitsIdCounter.current++;
  return `${prefix}-${globalThis.bitsIdCounter.current}`;
}
const focusStack = box([]);
function createFocusScopeStack() {
  return {
    add(focusScope) {
      const activeFocusScope = focusStack.current[0];
      if (activeFocusScope && focusScope.id !== activeFocusScope.id) {
        activeFocusScope.pause();
      }
      focusStack.current = removeFromFocusScopeArray(focusStack.current, focusScope);
      focusStack.current.unshift(focusScope);
    },
    remove(focusScope) {
      focusStack.current = removeFromFocusScopeArray(focusStack.current, focusScope);
      focusStack.current[0]?.resume();
    },
    get current() {
      return focusStack.current;
    }
  };
}
function createFocusScopeAPI() {
  let paused = false;
  let isHandlingFocus = false;
  return {
    id: useId(),
    get paused() {
      return paused;
    },
    get isHandlingFocus() {
      return isHandlingFocus;
    },
    set isHandlingFocus(value) {
      isHandlingFocus = value;
    },
    pause() {
      paused = true;
    },
    resume() {
      paused = false;
    }
  };
}
function removeFromFocusScopeArray(arr, item) {
  return [...arr].filter((i) => i.id !== item.id);
}
function removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}
function focus(element2, { select = false } = {}) {
  if (!(element2 && element2.focus))
    return;
  const doc = getDocument(element2);
  if (doc.activeElement === element2)
    return;
  const previouslyFocusedElement = doc.activeElement;
  element2.focus({ preventScroll: true });
  if (element2 !== previouslyFocusedElement && isSelectableInput(element2) && select) {
    element2.select();
  }
}
function focusFirst(candidates, { select = false } = {}, getActiveElement2) {
  const previouslyFocusedElement = getActiveElement2();
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (getActiveElement2() !== previouslyFocusedElement)
      return true;
  }
}
function findVisible(elements, container) {
  for (const element2 of elements) {
    if (!isElementHidden(element2, container))
      return element2;
  }
}
function getTabbableCandidates(container) {
  const nodes = [];
  const doc = getDocument(container);
  const walker = doc.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
const AutoFocusOnMountEvent = new CustomEventDispatcher("focusScope.autoFocusOnMount", { bubbles: false, cancelable: true });
const AutoFocusOnDestroyEvent = new CustomEventDispatcher("focusScope.autoFocusOnDestroy", { bubbles: false, cancelable: true });
const FocusScopeContext = new Context("FocusScope");
function useFocusScope({
  id,
  loop,
  enabled,
  onOpenAutoFocus,
  onCloseAutoFocus,
  forceMount,
  ref
}) {
  const focusScopeStack = createFocusScopeStack();
  const focusScope = createFocusScopeAPI();
  const ctx = FocusScopeContext.getOr({ ignoreCloseAutoFocus: false });
  let lastFocusedElement = null;
  const domContext = new DOMContext(ref);
  function manageFocus(event) {
    if (focusScope.paused || !ref.current || focusScope.isHandlingFocus) return;
    focusScope.isHandlingFocus = true;
    try {
      const target = event.target;
      if (!isHTMLElement(target)) return;
      const isWithinActiveScope = ref.current.contains(target);
      if (event.type === "focusin") {
        if (isWithinActiveScope) {
          lastFocusedElement = target;
        } else {
          if (ctx.ignoreCloseAutoFocus) return;
          focus(lastFocusedElement, { select: true });
        }
      } else if (event.type === "focusout") {
        if (!isWithinActiveScope && !ctx.ignoreCloseAutoFocus) {
          focus(lastFocusedElement, { select: true });
        }
      }
    } finally {
      focusScope.isHandlingFocus = false;
    }
  }
  function handleMutations(mutations) {
    if (!lastFocusedElement || !ref.current) return;
    let elementWasRemoved = false;
    for (const mutation of mutations) {
      if (mutation.type === "childList" && mutation.removedNodes.length > 0) {
        for (const removedNode of mutation.removedNodes) {
          if (removedNode === lastFocusedElement) {
            elementWasRemoved = true;
            break;
          }
          if (removedNode.nodeType === Node.ELEMENT_NODE && removedNode.contains(lastFocusedElement)) {
            elementWasRemoved = true;
            break;
          }
        }
      }
      if (elementWasRemoved) break;
    }
    if (elementWasRemoved && ref.current && !ref.current.contains(domContext.getActiveElement())) {
      focus(ref.current);
    }
  }
  watch([() => ref.current, () => enabled.current], ([container, enabled2]) => {
    if (!container || !enabled2) return;
    const removeEvents = executeCallbacks(on(domContext.getDocument(), "focusin", manageFocus), on(domContext.getDocument(), "focusout", manageFocus));
    const mutationObserver = new MutationObserver(handleMutations);
    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      attributes: false
    });
    return () => {
      removeEvents();
      mutationObserver.disconnect();
    };
  });
  watch([() => forceMount.current, () => ref.current], ([forceMount2, container]) => {
    if (forceMount2) return;
    const prevFocusedElement = domContext.getActiveElement();
    handleOpen(container, prevFocusedElement);
    return () => {
      if (!container) return;
      handleClose(prevFocusedElement);
    };
  });
  watch(
    [
      () => forceMount.current,
      () => ref.current,
      () => enabled.current
    ],
    ([forceMount2, container]) => {
      if (!forceMount2) return;
      const prevFocusedElement = domContext.getActiveElement();
      handleOpen(container, prevFocusedElement);
      return () => {
        if (!container) return;
        handleClose(prevFocusedElement);
      };
    }
  );
  function handleOpen(container, prevFocusedElement) {
    if (!container) container = domContext.getElementById(id.current);
    if (!container || !enabled.current) return;
    focusScopeStack.add(focusScope);
    const hasFocusedCandidate = container.contains(prevFocusedElement);
    if (!hasFocusedCandidate) {
      const mountEvent = AutoFocusOnMountEvent.createEvent();
      onOpenAutoFocus.current(mountEvent);
      if (!mountEvent.defaultPrevented) {
        afterTick(() => {
          if (!container) return;
          const result = focusFirst(removeLinks(getTabbableCandidates(container)), { select: true }, () => domContext.getActiveElement());
          if (!result) focus(container);
        });
      }
    }
  }
  function handleClose(prevFocusedElement) {
    const destroyEvent = AutoFocusOnDestroyEvent.createEvent();
    onCloseAutoFocus.current?.(destroyEvent);
    const shouldIgnore = ctx.ignoreCloseAutoFocus;
    afterSleep(0, () => {
      if (!destroyEvent.defaultPrevented && prevFocusedElement && !shouldIgnore) {
        focus(isTabbable(prevFocusedElement) ? prevFocusedElement : domContext.getDocument().body, { select: true });
      }
      focusScopeStack.remove(focusScope);
    });
  }
  function handleKeydown(e) {
    if (!enabled.current) return;
    if (!loop.current && !enabled.current) return;
    if (focusScope.paused) return;
    const isTabKey = e.key === TAB && !e.ctrlKey && !e.altKey && !e.metaKey;
    const focusedElement = domContext.getActiveElement();
    if (!(isTabKey && focusedElement)) return;
    const container = ref.current;
    if (!container) return;
    const [first, last] = getTabbableEdges(container);
    const hasTabbableElementsInside = first && last;
    if (!hasTabbableElementsInside) {
      if (focusedElement === container) {
        e.preventDefault();
      }
    } else {
      if (!e.shiftKey && focusedElement === last) {
        e.preventDefault();
        if (loop.current) focus(first, { select: true });
      } else if (e.shiftKey && focusedElement === first) {
        e.preventDefault();
        if (loop.current) focus(last, { select: true });
      }
    }
  }
  const props = (() => ({
    id: id.current,
    tabindex: -1,
    onkeydown: handleKeydown
  }))();
  return {
    get props() {
      return props;
    }
  };
}
function Focus_scope($$payload, $$props) {
  push();
  let {
    id,
    trapFocus = false,
    loop = false,
    onCloseAutoFocus = noop,
    onOpenAutoFocus = noop,
    focusScope,
    forceMount = false,
    ref
  } = $$props;
  const focusScopeState = useFocusScope({
    enabled: box.with(() => trapFocus),
    loop: box.with(() => loop),
    onCloseAutoFocus: box.with(() => onCloseAutoFocus),
    onOpenAutoFocus: box.with(() => onOpenAutoFocus),
    id: box.with(() => id),
    forceMount: box.with(() => forceMount),
    ref
  });
  focusScope?.($$payload, { props: focusScopeState.props });
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
class TextSelectionLayerState {
  static create(opts) {
    return new TextSelectionLayerState(opts);
  }
  opts;
  domContext;
  #unsubSelectionLock = noop;
  constructor(opts) {
    this.opts = opts;
    this.domContext = new DOMContext(opts.ref);
    let unsubEvents = noop;
    watch(() => this.opts.enabled.current, (isEnabled) => {
      if (isEnabled) {
        globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled);
        unsubEvents();
        unsubEvents = this.#addEventListeners();
      }
      return () => {
        unsubEvents();
        this.#resetSelectionLock();
        globalThis.bitsTextSelectionLayers.delete(this);
      };
    });
  }
  #addEventListeners() {
    return executeCallbacks(on(this.domContext.getDocument(), "pointerdown", this.#pointerdown), on(this.domContext.getDocument(), "pointerup", composeHandlers(this.#resetSelectionLock, this.opts.onPointerUp.current)));
  }
  #pointerdown = (e) => {
    const node = this.opts.ref.current;
    const target = e.target;
    if (!isHTMLElement(node) || !isHTMLElement(target) || !this.opts.enabled.current) return;
    if (!isHighestLayer(this) || !contains(node, target)) return;
    this.opts.onPointerDown.current(e);
    if (e.defaultPrevented) return;
    this.#unsubSelectionLock = preventTextSelectionOverflow(node, this.domContext.getDocument().body);
  };
  #resetSelectionLock = () => {
    this.#unsubSelectionLock();
    this.#unsubSelectionLock = noop;
  };
}
const getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
function preventTextSelectionOverflow(node, body) {
  const originalBodyUserSelect = getUserSelect(body);
  const originalNodeUserSelect = getUserSelect(node);
  setUserSelect(body, "none");
  setUserSelect(node, "text");
  return () => {
    setUserSelect(body, originalBodyUserSelect);
    setUserSelect(node, originalNodeUserSelect);
  };
}
function setUserSelect(node, value) {
  node.style.userSelect = value;
  node.style.webkitUserSelect = value;
}
function isHighestLayer(instance) {
  const layersArr = [...globalThis.bitsTextSelectionLayers];
  if (!layersArr.length) return false;
  const highestLayer = layersArr.at(-1);
  if (!highestLayer) return false;
  return highestLayer[0] === instance;
}
function Text_selection_layer($$payload, $$props) {
  push();
  let {
    preventOverflowTextSelection = true,
    onPointerDown = noop,
    onPointerUp = noop,
    id,
    children,
    enabled,
    ref
  } = $$props;
  TextSelectionLayerState.create({
    id: box.with(() => id),
    onPointerDown: box.with(() => onPointerDown),
    onPointerUp: box.with(() => onPointerUp),
    enabled: box.with(() => enabled && preventOverflowTextSelection),
    ref
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
class SharedState {
  #factory;
  #subscribers = 0;
  #state;
  #scope;
  constructor(factory) {
    this.#factory = factory;
  }
  #dispose() {
    this.#subscribers -= 1;
    if (this.#scope && this.#subscribers <= 0) {
      this.#scope();
      this.#state = void 0;
      this.#scope = void 0;
    }
  }
  get(...args) {
    this.#subscribers += 1;
    if (this.#state === void 0) {
      this.#scope = () => {
      };
    }
    return this.#state;
  }
}
const bodyLockStackCount = new SharedState(() => {
  const map = new SvelteMap();
  const locked = (() => {
    for (const value of map.values()) {
      if (value) return true;
    }
    return false;
  })();
  let initialBodyStyle = null;
  let stopTouchMoveListener = null;
  function resetBodyStyle() {
    if (!isBrowser) return;
    document.body.setAttribute("style", initialBodyStyle ?? "");
    document.body.style.removeProperty("--scrollbar-width");
    isIOS && stopTouchMoveListener?.();
  }
  watch(() => locked, () => {
    if (!locked) return;
    initialBodyStyle = document.body.getAttribute("style");
    const bodyStyle = getComputedStyle(document.body);
    const verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const paddingRight = Number.parseInt(bodyStyle.paddingRight ?? "0", 10);
    const config = {
      padding: paddingRight + verticalScrollbarWidth,
      margin: Number.parseInt(bodyStyle.marginRight ?? "0", 10)
    };
    if (verticalScrollbarWidth > 0) {
      document.body.style.paddingRight = `${config.padding}px`;
      document.body.style.marginRight = `${config.margin}px`;
      document.body.style.setProperty("--scrollbar-width", `${verticalScrollbarWidth}px`);
      document.body.style.overflow = "hidden";
    }
    if (isIOS) {
      stopTouchMoveListener = addEventListener(
        document,
        "touchmove",
        (e) => {
          if (e.target !== document.documentElement) return;
          if (e.touches.length > 1) return;
          e.preventDefault();
        },
        { passive: false }
      );
    }
    afterTick(() => {
      document.body.style.pointerEvents = "none";
      document.body.style.overflow = "hidden";
    });
  });
  return {
    get map() {
      return map;
    },
    resetBodyStyle
  };
});
class BodyScrollLock {
  #id = useId();
  #initialState;
  #restoreScrollDelay = () => null;
  #countState;
  locked;
  constructor(initialState, restoreScrollDelay = () => null) {
    this.#initialState = initialState;
    this.#restoreScrollDelay = restoreScrollDelay;
    this.#countState = bodyLockStackCount.get();
    if (!this.#countState) return;
    this.#countState.map.set(this.#id, this.#initialState ?? false);
    this.locked = box.with(() => this.#countState.map.get(this.#id) ?? false, (v) => this.#countState.map.set(this.#id, v));
  }
}
function Scroll_lock($$payload, $$props) {
  push();
  let {
    preventScroll = true,
    restoreScrollDelay = null
  } = $$props;
  if (preventScroll) {
    new BodyScrollLock(preventScroll, () => restoreScrollDelay);
  }
  pop();
}
function getAnnouncer(doc) {
  function announce(value, kind = "assertive", timeout = 7500) {
    return;
  }
  return {
    announce
  };
}
const defaultDateDefaults = {
  defaultValue: void 0,
  granularity: "day"
};
function getDefaultDate(opts) {
  const withDefaults = { ...defaultDateDefaults, ...opts };
  const { defaultValue, granularity } = withDefaults;
  if (Array.isArray(defaultValue) && defaultValue.length) {
    return defaultValue[defaultValue.length - 1];
  }
  if (defaultValue && !Array.isArray(defaultValue)) {
    return defaultValue;
  } else {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const calendarDateTimeGranularities = ["hour", "minute", "second"];
    if (calendarDateTimeGranularities.includes(granularity ?? "day")) {
      return new CalendarDateTime(year, month, day, 0, 0, 0);
    }
    return new CalendarDate(year, month, day);
  }
}
function parseStringToDateValue(dateStr, referenceVal) {
  let dateValue;
  if (referenceVal instanceof ZonedDateTime) {
    dateValue = parseZonedDateTime(dateStr);
  } else if (referenceVal instanceof CalendarDateTime) {
    dateValue = parseDateTime(dateStr);
  } else {
    dateValue = parseDate(dateStr);
  }
  return dateValue.calendar !== referenceVal.calendar ? toCalendar(dateValue, referenceVal.calendar) : dateValue;
}
function toDate(dateValue, tz = getLocalTimeZone()) {
  if (dateValue instanceof ZonedDateTime) {
    return dateValue.toDate();
  } else {
    return dateValue.toDate(tz);
  }
}
function getDateValueType(date) {
  if (date instanceof CalendarDate)
    return "date";
  if (date instanceof CalendarDateTime)
    return "datetime";
  if (date instanceof ZonedDateTime)
    return "zoneddatetime";
  throw new Error("Unknown date type");
}
function parseAnyDateValue(value, type) {
  switch (type) {
    case "date":
      return parseDate(value);
    case "datetime":
      return parseDateTime(value);
    case "zoneddatetime":
      return parseZonedDateTime(value);
    default:
      throw new Error(`Unknown date type: ${type}`);
  }
}
function isCalendarDateTime(dateValue) {
  return dateValue instanceof CalendarDateTime;
}
function isZonedDateTime(dateValue) {
  return dateValue instanceof ZonedDateTime;
}
function hasTime(dateValue) {
  return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}
function getDaysInMonth(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  } else {
    return date.set({ day: 100 }).day;
  }
}
function isBefore(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) < 0;
}
function isAfter(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) > 0;
}
function getLastFirstDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  if (firstDayOfWeek > day) {
    return date.subtract({ days: day + 7 - firstDayOfWeek });
  }
  if (firstDayOfWeek === day) {
    return date;
  }
  return date.subtract({ days: day - firstDayOfWeek });
}
function getNextLastDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  if (day === lastDayOfWeek) {
    return date;
  }
  if (day > lastDayOfWeek) {
    return date.add({ days: 7 - day + lastDayOfWeek });
  }
  return date.add({ days: lastDayOfWeek - day });
}
const defaultPartOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
};
function createFormatter(opts) {
  let locale = opts.initialLocale;
  function setLocale(newLocale) {
    locale = newLocale;
  }
  function getLocale() {
    return locale;
  }
  function custom(date, options) {
    return new DateFormatter(locale, options).format(date);
  }
  function selectedDate(date, includeTime = true) {
    if (hasTime(date) && includeTime) {
      return custom(toDate(date), {
        dateStyle: "long",
        timeStyle: "long"
      });
    } else {
      return custom(toDate(date), {
        dateStyle: "long"
      });
    }
  }
  function fullMonthAndYear(date) {
    if (typeof opts.monthFormat.current !== "function" && typeof opts.yearFormat.current !== "function") {
      return new DateFormatter(locale, {
        month: opts.monthFormat.current,
        year: opts.yearFormat.current
      }).format(date);
    }
    const formattedMonth = typeof opts.monthFormat.current === "function" ? opts.monthFormat.current(date.getMonth() + 1) : new DateFormatter(locale, { month: opts.monthFormat.current }).format(date);
    const formattedYear = typeof opts.yearFormat.current === "function" ? opts.yearFormat.current(date.getFullYear()) : new DateFormatter(locale, { year: opts.yearFormat.current }).format(date);
    return `${formattedMonth} ${formattedYear}`;
  }
  function fullMonth(date) {
    return new DateFormatter(locale, { month: "long" }).format(date);
  }
  function fullYear(date) {
    return new DateFormatter(locale, { year: "numeric" }).format(date);
  }
  function toParts(date, options) {
    if (isZonedDateTime(date)) {
      return new DateFormatter(locale, {
        ...options,
        timeZone: date.timeZone
      }).formatToParts(toDate(date));
    } else {
      return new DateFormatter(locale, options).formatToParts(toDate(date));
    }
  }
  function dayOfWeek(date, length = "narrow") {
    return new DateFormatter(locale, { weekday: length }).format(date);
  }
  function dayPeriod(date, hourCycle = void 0) {
    const parts = new DateFormatter(locale, {
      hour: "numeric",
      minute: "numeric",
      hourCycle: hourCycle === 24 ? "h23" : void 0
    }).formatToParts(date);
    const value = parts.find((p) => p.type === "dayPeriod")?.value;
    if (value === "PM") {
      return "PM";
    }
    return "AM";
  }
  function part(dateObj, type, options = {}) {
    const opts2 = { ...defaultPartOptions, ...options };
    const parts = toParts(dateObj, opts2);
    const part2 = parts.find((p) => p.type === type);
    return part2 ? part2.value : "";
  }
  return {
    setLocale,
    getLocale,
    fullMonth,
    fullYear,
    fullMonthAndYear,
    toParts,
    custom,
    part,
    dayPeriod,
    selectedDate,
    dayOfWeek
  };
}
function chunk(arr, size2) {
  const result = [];
  for (let i = 0; i < arr.length; i += size2) {
    result.push(arr.slice(i, i + size2));
  }
  return result;
}
function isValidIndex(index, arr) {
  return index >= 0 && index < arr.length;
}
function isCalendarDayNode(node) {
  if (!isHTMLElement(node)) return false;
  if (!node.hasAttribute("data-bits-day")) return false;
  return true;
}
function getDaysBetween(start, end) {
  const days = [];
  let dCurrent = start.add({ days: 1 });
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    days.push(dCurrent);
    dCurrent = dCurrent.add({ days: 1 });
  }
  return days;
}
function createMonth(props) {
  const { dateObj, weekStartsOn, fixedWeeks, locale } = props;
  const daysInMonth = getDaysInMonth(dateObj);
  const datesArray = Array.from({ length: daysInMonth }, (_, i) => dateObj.set({ day: i + 1 }));
  const firstDayOfMonth = startOfMonth(dateObj);
  const lastDayOfMonth = endOfMonth(dateObj);
  const lastSunday = weekStartsOn !== void 0 ? getLastFirstDayOfWeek(firstDayOfMonth, weekStartsOn, "en-US") : getLastFirstDayOfWeek(firstDayOfMonth, 0, locale);
  const nextSaturday = weekStartsOn !== void 0 ? getNextLastDayOfWeek(lastDayOfMonth, weekStartsOn, "en-US") : getNextLastDayOfWeek(lastDayOfMonth, 0, locale);
  const lastMonthDays = getDaysBetween(lastSunday.subtract({ days: 1 }), firstDayOfMonth);
  const nextMonthDays = getDaysBetween(lastDayOfMonth, nextSaturday.add({ days: 1 }));
  const totalDays = lastMonthDays.length + datesArray.length + nextMonthDays.length;
  if (fixedWeeks && totalDays < 42) {
    const extraDays = 42 - totalDays;
    let startFrom = nextMonthDays[nextMonthDays.length - 1];
    if (!startFrom) {
      startFrom = dateObj.add({ months: 1 }).set({ day: 1 });
    }
    let length = extraDays;
    if (nextMonthDays.length === 0) {
      length = extraDays - 1;
      nextMonthDays.push(startFrom);
    }
    const extraDaysArray = Array.from({ length }, (_, i) => {
      const incr = i + 1;
      return startFrom.add({ days: incr });
    });
    nextMonthDays.push(...extraDaysArray);
  }
  const allDays = lastMonthDays.concat(datesArray, nextMonthDays);
  const weeks = chunk(allDays, 7);
  return { value: dateObj, dates: allDays, weeks };
}
function createMonths(props) {
  const { numberOfMonths, dateObj, ...monthProps } = props;
  const months = [];
  if (!numberOfMonths || numberOfMonths === 1) {
    months.push(createMonth({ ...monthProps, dateObj }));
    return months;
  }
  months.push(createMonth({ ...monthProps, dateObj }));
  for (let i = 1; i < numberOfMonths; i++) {
    const nextMonth = dateObj.add({ months: i });
    months.push(createMonth({ ...monthProps, dateObj: nextMonth }));
  }
  return months;
}
function getSelectableCells(calendarNode) {
  if (!calendarNode) return [];
  const selectableSelector = `[data-bits-day]:not([data-disabled]):not([data-outside-visible-months])`;
  return Array.from(calendarNode.querySelectorAll(selectableSelector)).filter((el) => isHTMLElement(el));
}
function setPlaceholderToNodeValue(node, placeholder) {
  const cellValue = node.getAttribute("data-value");
  if (!cellValue) return;
  placeholder.current = parseStringToDateValue(cellValue, placeholder.current);
}
function shiftCalendarFocus({
  node,
  add,
  placeholder,
  calendarNode,
  isPrevButtonDisabled,
  isNextButtonDisabled,
  months,
  numberOfMonths
}) {
  const candidateCells = getSelectableCells(calendarNode);
  if (!candidateCells.length) return;
  const index = candidateCells.indexOf(node);
  const nextIndex = index + add;
  if (isValidIndex(nextIndex, candidateCells)) {
    const nextCell = candidateCells[nextIndex];
    setPlaceholderToNodeValue(nextCell, placeholder);
    return nextCell.focus();
  }
  if (nextIndex < 0) {
    if (isPrevButtonDisabled) return;
    const firstMonth = months[0]?.value;
    if (!firstMonth) return;
    placeholder.current = firstMonth.subtract({ months: numberOfMonths });
    afterTick(() => {
      const newCandidateCells = getSelectableCells(calendarNode);
      if (!newCandidateCells.length) return;
      const newIndex = newCandidateCells.length - Math.abs(nextIndex);
      if (isValidIndex(newIndex, newCandidateCells)) {
        const newCell = newCandidateCells[newIndex];
        setPlaceholderToNodeValue(newCell, placeholder);
        return newCell.focus();
      }
    });
  }
  if (nextIndex >= candidateCells.length) {
    if (isNextButtonDisabled) return;
    const firstMonth = months[0]?.value;
    if (!firstMonth) return;
    placeholder.current = firstMonth.add({ months: numberOfMonths });
    afterTick(() => {
      const newCandidateCells = getSelectableCells(calendarNode);
      if (!newCandidateCells.length) return;
      const newIndex = nextIndex - candidateCells.length;
      if (isValidIndex(newIndex, newCandidateCells)) {
        const nextCell = newCandidateCells[newIndex];
        return nextCell.focus();
      }
    });
  }
}
const ARROW_KEYS = [
  ARROW_DOWN,
  ARROW_UP,
  ARROW_LEFT,
  ARROW_RIGHT
];
const SELECT_KEYS = [ENTER, SPACE];
function handleCalendarKeydown({
  event,
  handleCellClick,
  shiftFocus,
  placeholderValue
}) {
  const currentCell = event.target;
  if (!isCalendarDayNode(currentCell)) return;
  if (!ARROW_KEYS.includes(event.key) && !SELECT_KEYS.includes(event.key)) return;
  event.preventDefault();
  const kbdFocusMap = {
    [ARROW_DOWN]: 7,
    [ARROW_UP]: -7,
    [ARROW_LEFT]: -1,
    [ARROW_RIGHT]: 1
  };
  if (ARROW_KEYS.includes(event.key)) {
    const add = kbdFocusMap[event.key];
    if (add !== void 0) {
      shiftFocus(currentCell, add);
    }
  }
  if (SELECT_KEYS.includes(event.key)) {
    const cellValue = currentCell.getAttribute("data-value");
    if (!cellValue) return;
    handleCellClick(event, parseStringToDateValue(cellValue, placeholderValue));
  }
}
function handleCalendarNextPage({
  months,
  setMonths,
  numberOfMonths,
  pagedNavigation,
  weekStartsOn,
  locale,
  fixedWeeks,
  setPlaceholder
}) {
  const firstMonth = months[0]?.value;
  if (!firstMonth) return;
  if (pagedNavigation) {
    setPlaceholder(firstMonth.add({ months: numberOfMonths }));
  } else {
    const newMonths = createMonths({
      dateObj: firstMonth.add({ months: 1 }),
      weekStartsOn,
      locale,
      fixedWeeks,
      numberOfMonths
    });
    setMonths(newMonths);
    const firstNewMonth = newMonths[0];
    if (!firstNewMonth) return;
    setPlaceholder(firstNewMonth.value.set({ day: 1 }));
  }
}
function handleCalendarPrevPage({
  months,
  setMonths,
  numberOfMonths,
  pagedNavigation,
  weekStartsOn,
  locale,
  fixedWeeks,
  setPlaceholder
}) {
  const firstMonth = months[0]?.value;
  if (!firstMonth) return;
  if (pagedNavigation) {
    setPlaceholder(firstMonth.subtract({ months: numberOfMonths }));
  } else {
    const newMonths = createMonths({
      dateObj: firstMonth.subtract({ months: 1 }),
      weekStartsOn,
      locale,
      fixedWeeks,
      numberOfMonths
    });
    setMonths(newMonths);
    const firstNewMonth = newMonths[0];
    if (!firstNewMonth) return;
    setPlaceholder(firstNewMonth.value.set({ day: 1 }));
  }
}
function getWeekdays({ months, formatter, weekdayFormat }) {
  if (!months.length) return [];
  const firstMonth = months[0];
  const firstWeek = firstMonth.weeks[0];
  if (!firstWeek) return [];
  return firstWeek.map((date) => formatter.dayOfWeek(toDate(date), weekdayFormat));
}
function useMonthViewOptionsSync(props) {
}
function useMonthViewPlaceholderSync({
  placeholder,
  getVisibleMonths,
  weekStartsOn,
  locale,
  fixedWeeks,
  numberOfMonths,
  setMonths
}) {
}
function getIsNextButtonDisabled({ maxValue, months, disabled }) {
  if (!maxValue || !months.length) return false;
  if (disabled) return true;
  const lastMonthInView = months[months.length - 1]?.value;
  if (!lastMonthInView) return false;
  const firstMonthOfNextPage = lastMonthInView.add({ months: 1 }).set({ day: 1 });
  return isAfter(firstMonthOfNextPage, maxValue);
}
function getIsPrevButtonDisabled({ minValue, months, disabled }) {
  if (!minValue || !months.length) return false;
  if (disabled) return true;
  const firstMonthInView = months[0]?.value;
  if (!firstMonthInView) return false;
  const lastMonthOfPrevPage = firstMonthInView.subtract({ months: 1 }).set({ day: 35 });
  return isBefore(lastMonthOfPrevPage, minValue);
}
function getCalendarHeadingValue({ months, locale, formatter }) {
  if (!months.length) return "";
  if (locale !== formatter.getLocale()) {
    formatter.setLocale(locale);
  }
  if (months.length === 1) {
    const month = toDate(months[0].value);
    return `${formatter.fullMonthAndYear(month)}`;
  }
  const startMonth = toDate(months[0].value);
  const endMonth = toDate(months[months.length - 1].value);
  const startMonthName = formatter.fullMonth(startMonth);
  const endMonthName = formatter.fullMonth(endMonth);
  const startMonthYear = formatter.fullYear(startMonth);
  const endMonthYear = formatter.fullYear(endMonth);
  const content = startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
  return content;
}
function getCalendarElementProps({
  fullCalendarLabel,
  id,
  isInvalid,
  disabled,
  readonly
}) {
  return {
    id,
    role: "application",
    "aria-label": fullCalendarLabel,
    "data-invalid": getDataInvalid(isInvalid),
    "data-disabled": getDataDisabled(disabled),
    "data-readonly": getDataReadonly(readonly)
  };
}
function getFirstNonDisabledDateInView(calendarRef) {
  if (!isBrowser) return;
  const daysInView = Array.from(calendarRef.querySelectorAll("[data-bits-day]:not([aria-disabled=true])"));
  if (daysInView.length === 0) return;
  const element2 = daysInView[0];
  const value = element2?.getAttribute("data-value");
  const type = element2?.getAttribute("data-type");
  if (!value || !type) return;
  return parseAnyDateValue(value, type);
}
function useEnsureNonDisabledPlaceholder({
  ref,
  placeholder,
  defaultPlaceholder,
  minValue,
  maxValue,
  isDateDisabled
}) {
  function isDisabled(date) {
    if (isDateDisabled.current(date)) return true;
    if (minValue.current && isBefore(date, minValue.current)) return true;
    if (maxValue.current && isBefore(maxValue.current, date)) return true;
    return false;
  }
  watch(() => ref.current, () => {
    if (!ref.current) return;
    if (placeholder.current && isSameDay(placeholder.current, defaultPlaceholder) && isDisabled(defaultPlaceholder)) {
      placeholder.current = getFirstNonDisabledDateInView(ref.current) ?? defaultPlaceholder;
    }
  });
}
function getDateWithPreviousTime(date, prev) {
  if (!date || !prev) return date;
  if (hasTime(date) && hasTime(prev)) {
    return date.set({
      hour: prev.hour,
      minute: prev.minute,
      millisecond: prev.millisecond,
      second: prev.second
    });
  }
  return date;
}
const calendarAttrs = createBitsAttrs({
  component: "calendar",
  parts: [
    "root",
    "grid",
    "cell",
    "next-button",
    "prev-button",
    "day",
    "grid-body",
    "grid-head",
    "grid-row",
    "head-cell",
    "header",
    "heading",
    "month-select",
    "year-select"
  ]
});
function getDefaultYears(opts) {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const latestYear = Math.max(opts.placeholderYear, currentYear);
  let minYear;
  let maxYear;
  if (opts.minValue) {
    minYear = opts.minValue.year;
  } else {
    const initialMinYear = latestYear - 100;
    minYear = opts.placeholderYear < initialMinYear ? opts.placeholderYear - 10 : initialMinYear;
  }
  if (opts.maxValue) {
    maxYear = opts.maxValue.year;
  } else {
    maxYear = latestYear + 10;
  }
  if (minYear > maxYear) {
    minYear = maxYear;
  }
  const totalYears = maxYear - minYear + 1;
  return Array.from({ length: totalYears }, (_, i) => minYear + i);
}
const CalendarRootContext = new Context("Calendar.Root | RangeCalender.Root");
class CalendarRootState {
  static create(opts) {
    return CalendarRootContext.set(new CalendarRootState(opts));
  }
  opts;
  #visibleMonths = derived(() => this.months.map((month) => month.value));
  get visibleMonths() {
    return this.#visibleMonths();
  }
  set visibleMonths($$value) {
    return this.#visibleMonths($$value);
  }
  formatter;
  accessibleHeadingId = useId();
  domContext;
  months = [];
  announcer;
  constructor(opts) {
    this.opts = opts;
    this.domContext = new DOMContext(opts.ref);
    this.announcer = getAnnouncer();
    this.formatter = createFormatter({
      initialLocale: this.opts.locale.current,
      monthFormat: this.opts.monthFormat,
      yearFormat: this.opts.yearFormat
    });
    this.setMonths = this.setMonths.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.prevYear = this.prevYear.bind(this);
    this.nextYear = this.nextYear.bind(this);
    this.setYear = this.setYear.bind(this);
    this.setMonth = this.setMonth.bind(this);
    this.isOutsideVisibleMonths = this.isOutsideVisibleMonths.bind(this);
    this.isDateDisabled = this.isDateDisabled.bind(this);
    this.isDateSelected = this.isDateSelected.bind(this);
    this.shiftFocus = this.shiftFocus.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleMultipleUpdate = this.handleMultipleUpdate.bind(this);
    this.handleSingleUpdate = this.handleSingleUpdate.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    this.getBitsAttr = this.getBitsAttr.bind(this);
    this.months = createMonths({
      dateObj: this.opts.placeholder.current,
      weekStartsOn: this.opts.weekStartsOn.current,
      locale: this.opts.locale.current,
      fixedWeeks: this.opts.fixedWeeks.current,
      numberOfMonths: this.opts.numberOfMonths.current
    });
    this.#setupInitialFocusEffect();
    this.#setupAccessibleHeadingEffect();
    this.#setupFormatterEffect();
    useMonthViewPlaceholderSync({
      placeholder: this.opts.placeholder,
      getVisibleMonths: () => this.visibleMonths,
      weekStartsOn: this.opts.weekStartsOn,
      locale: this.opts.locale,
      fixedWeeks: this.opts.fixedWeeks,
      numberOfMonths: this.opts.numberOfMonths,
      setMonths: (months) => this.months = months
    });
    useMonthViewOptionsSync({
      fixedWeeks: this.opts.fixedWeeks,
      locale: this.opts.locale,
      numberOfMonths: this.opts.numberOfMonths,
      placeholder: this.opts.placeholder,
      setMonths: this.setMonths,
      weekStartsOn: this.opts.weekStartsOn
    });
    watch(() => this.fullCalendarLabel, (label) => {
      const node = this.domContext.getElementById(this.accessibleHeadingId);
      if (!node) return;
      node.textContent = label;
    });
    watch(() => this.opts.value.current, () => {
      const value = this.opts.value.current;
      if (Array.isArray(value) && value.length) {
        const lastValue = value[value.length - 1];
        if (lastValue && this.opts.placeholder.current !== lastValue) {
          this.opts.placeholder.current = lastValue;
        }
      } else if (!Array.isArray(value) && value && this.opts.placeholder.current !== value) {
        this.opts.placeholder.current = value;
      }
    });
    useEnsureNonDisabledPlaceholder({
      placeholder: opts.placeholder,
      defaultPlaceholder: opts.defaultPlaceholder,
      isDateDisabled: opts.isDateDisabled,
      maxValue: opts.maxValue,
      minValue: opts.minValue,
      ref: opts.ref
    });
  }
  setMonths(months) {
    this.months = months;
  }
  #weekdays = derived(() => {
    return getWeekdays({
      months: this.months,
      formatter: this.formatter,
      weekdayFormat: this.opts.weekdayFormat.current
    });
  });
  get weekdays() {
    return this.#weekdays();
  }
  set weekdays($$value) {
    return this.#weekdays($$value);
  }
  #initialPlaceholderYear = derived(() => run(() => this.opts.placeholder.current.year));
  get initialPlaceholderYear() {
    return this.#initialPlaceholderYear();
  }
  set initialPlaceholderYear($$value) {
    return this.#initialPlaceholderYear($$value);
  }
  #defaultYears = derived(() => {
    return getDefaultYears({
      minValue: this.opts.minValue.current,
      maxValue: this.opts.maxValue.current,
      placeholderYear: this.initialPlaceholderYear
    });
  });
  get defaultYears() {
    return this.#defaultYears();
  }
  set defaultYears($$value) {
    return this.#defaultYears($$value);
  }
  #setupInitialFocusEffect() {
  }
  #setupAccessibleHeadingEffect() {
  }
  #setupFormatterEffect() {
  }
  /**
   * Navigates to the next page of the calendar.
   */
  nextPage() {
    handleCalendarNextPage({
      fixedWeeks: this.opts.fixedWeeks.current,
      locale: this.opts.locale.current,
      numberOfMonths: this.opts.numberOfMonths.current,
      pagedNavigation: this.opts.pagedNavigation.current,
      setMonths: this.setMonths,
      setPlaceholder: (date) => this.opts.placeholder.current = date,
      weekStartsOn: this.opts.weekStartsOn.current,
      months: this.months
    });
  }
  /**
   * Navigates to the previous page of the calendar.
   */
  prevPage() {
    handleCalendarPrevPage({
      fixedWeeks: this.opts.fixedWeeks.current,
      locale: this.opts.locale.current,
      numberOfMonths: this.opts.numberOfMonths.current,
      pagedNavigation: this.opts.pagedNavigation.current,
      setMonths: this.setMonths,
      setPlaceholder: (date) => this.opts.placeholder.current = date,
      weekStartsOn: this.opts.weekStartsOn.current,
      months: this.months
    });
  }
  nextYear() {
    this.opts.placeholder.current = this.opts.placeholder.current.add({ years: 1 });
  }
  prevYear() {
    this.opts.placeholder.current = this.opts.placeholder.current.subtract({ years: 1 });
  }
  setYear(year) {
    this.opts.placeholder.current = this.opts.placeholder.current.set({ year });
  }
  setMonth(month) {
    this.opts.placeholder.current = this.opts.placeholder.current.set({ month });
  }
  #isNextButtonDisabled = derived(() => {
    return getIsNextButtonDisabled({
      maxValue: this.opts.maxValue.current,
      months: this.months,
      disabled: this.opts.disabled.current
    });
  });
  get isNextButtonDisabled() {
    return this.#isNextButtonDisabled();
  }
  set isNextButtonDisabled($$value) {
    return this.#isNextButtonDisabled($$value);
  }
  #isPrevButtonDisabled = derived(() => {
    return getIsPrevButtonDisabled({
      minValue: this.opts.minValue.current,
      months: this.months,
      disabled: this.opts.disabled.current
    });
  });
  get isPrevButtonDisabled() {
    return this.#isPrevButtonDisabled();
  }
  set isPrevButtonDisabled($$value) {
    return this.#isPrevButtonDisabled($$value);
  }
  #isInvalid = derived(() => {
    const value = this.opts.value.current;
    const isDateDisabled = this.opts.isDateDisabled.current;
    const isDateUnavailable = this.opts.isDateUnavailable.current;
    if (Array.isArray(value)) {
      if (!value.length) return false;
      for (const date of value) {
        if (isDateDisabled(date)) return true;
        if (isDateUnavailable(date)) return true;
      }
    } else {
      if (!value) return false;
      if (isDateDisabled(value)) return true;
      if (isDateUnavailable(value)) return true;
    }
    return false;
  });
  get isInvalid() {
    return this.#isInvalid();
  }
  set isInvalid($$value) {
    return this.#isInvalid($$value);
  }
  #headingValue = derived(() => {
    this.opts.monthFormat.current;
    this.opts.yearFormat.current;
    return getCalendarHeadingValue({
      months: this.months,
      formatter: this.formatter,
      locale: this.opts.locale.current
    });
  });
  get headingValue() {
    return this.#headingValue();
  }
  set headingValue($$value) {
    return this.#headingValue($$value);
  }
  #fullCalendarLabel = derived(() => {
    return `${this.opts.calendarLabel.current} ${this.headingValue}`;
  });
  get fullCalendarLabel() {
    return this.#fullCalendarLabel();
  }
  set fullCalendarLabel($$value) {
    return this.#fullCalendarLabel($$value);
  }
  isOutsideVisibleMonths(date) {
    return !this.visibleMonths.some((month) => isSameMonth(date, month));
  }
  isDateDisabled(date) {
    if (this.opts.isDateDisabled.current(date) || this.opts.disabled.current) return true;
    const minValue = this.opts.minValue.current;
    const maxValue = this.opts.maxValue.current;
    if (minValue && isBefore(date, minValue)) return true;
    if (maxValue && isBefore(maxValue, date)) return true;
    return false;
  }
  isDateSelected(date) {
    const value = this.opts.value.current;
    if (Array.isArray(value)) {
      return value.some((d) => isSameDay(d, date));
    } else if (!value) {
      return false;
    }
    return isSameDay(value, date);
  }
  shiftFocus(node, add) {
    return shiftCalendarFocus({
      node,
      add,
      placeholder: this.opts.placeholder,
      calendarNode: this.opts.ref.current,
      isPrevButtonDisabled: this.isPrevButtonDisabled,
      isNextButtonDisabled: this.isNextButtonDisabled,
      months: this.months,
      numberOfMonths: this.opts.numberOfMonths.current
    });
  }
  #isMultipleSelectionValid(selectedDates) {
    if (this.opts.type.current !== "multiple") return true;
    if (!this.opts.maxDays.current) return true;
    const selectedCount = selectedDates.length;
    if (this.opts.maxDays.current && selectedCount > this.opts.maxDays.current) return false;
    return true;
  }
  handleCellClick(_, date) {
    if (this.opts.readonly.current || this.opts.isDateDisabled.current?.(date) || this.opts.isDateUnavailable.current?.(date)) {
      return;
    }
    const prev = this.opts.value.current;
    const multiple = this.opts.type.current === "multiple";
    if (multiple) {
      if (Array.isArray(prev) || prev === void 0) {
        this.opts.value.current = this.handleMultipleUpdate(prev, date);
      }
    } else if (!Array.isArray(prev)) {
      const next = this.handleSingleUpdate(prev, date);
      if (!next) {
        this.announcer.announce("Selected date is now empty.", "polite", 5e3);
      } else {
        this.announcer.announce(`Selected Date: ${this.formatter.selectedDate(next, false)}`, "polite");
      }
      this.opts.value.current = getDateWithPreviousTime(next, prev);
      if (next !== void 0) {
        this.opts.onDateSelect?.current?.();
      }
    }
  }
  handleMultipleUpdate(prev, date) {
    if (!prev) {
      const newSelection = [date];
      return this.#isMultipleSelectionValid(newSelection) ? newSelection : [date];
    }
    if (!Array.isArray(prev)) {
      return;
    }
    const index = prev.findIndex((d) => isSameDay(d, date));
    const preventDeselect = this.opts.preventDeselect.current;
    if (index === -1) {
      const newSelection = [...prev, date];
      if (this.#isMultipleSelectionValid(newSelection)) {
        return newSelection;
      } else {
        return [date];
      }
    } else if (preventDeselect) {
      return prev;
    } else {
      const next = prev.filter((d) => !isSameDay(d, date));
      if (!next.length) {
        this.opts.placeholder.current = date;
        return void 0;
      }
      return next;
    }
  }
  handleSingleUpdate(prev, date) {
    if (!prev) return date;
    const preventDeselect = this.opts.preventDeselect.current;
    if (!preventDeselect && isSameDay(prev, date)) {
      this.opts.placeholder.current = date;
      return void 0;
    }
    return date;
  }
  onkeydown(event) {
    handleCalendarKeydown({
      event,
      handleCellClick: this.handleCellClick,
      shiftFocus: this.shiftFocus,
      placeholderValue: this.opts.placeholder.current
    });
  }
  #snippetProps = derived(() => ({ months: this.months, weekdays: this.weekdays }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  getBitsAttr = (part) => {
    return calendarAttrs.getAttr(part);
  };
  #props = derived(() => ({
    ...getCalendarElementProps({
      fullCalendarLabel: this.fullCalendarLabel,
      id: this.opts.id.current,
      isInvalid: this.isInvalid,
      disabled: this.opts.disabled.current,
      readonly: this.opts.readonly.current
    }),
    [this.getBitsAttr("root")]: "",
    //
    onkeydown: this.onkeydown,
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
const CalendarCellContext = new Context("Calendar.Cell | RangeCalendar.Cell");
class CalendarCellState {
  static create(opts) {
    return CalendarCellContext.set(new CalendarCellState(opts, CalendarRootContext.get()));
  }
  opts;
  root;
  #cellDate = derived(() => toDate(this.opts.date.current));
  get cellDate() {
    return this.#cellDate();
  }
  set cellDate($$value) {
    return this.#cellDate($$value);
  }
  #isDisabled = derived(() => this.root.isDateDisabled(this.opts.date.current));
  get isDisabled() {
    return this.#isDisabled();
  }
  set isDisabled($$value) {
    return this.#isDisabled($$value);
  }
  #isUnavailable = derived(() => this.root.opts.isDateUnavailable.current(this.opts.date.current));
  get isUnavailable() {
    return this.#isUnavailable();
  }
  set isUnavailable($$value) {
    return this.#isUnavailable($$value);
  }
  #isDateToday = derived(() => isToday(this.opts.date.current, getLocalTimeZone()));
  get isDateToday() {
    return this.#isDateToday();
  }
  set isDateToday($$value) {
    return this.#isDateToday($$value);
  }
  #isOutsideMonth = derived(() => !isSameMonth(this.opts.date.current, this.opts.month.current));
  get isOutsideMonth() {
    return this.#isOutsideMonth();
  }
  set isOutsideMonth($$value) {
    return this.#isOutsideMonth($$value);
  }
  #isOutsideVisibleMonths = derived(() => this.root.isOutsideVisibleMonths(this.opts.date.current));
  get isOutsideVisibleMonths() {
    return this.#isOutsideVisibleMonths();
  }
  set isOutsideVisibleMonths($$value) {
    return this.#isOutsideVisibleMonths($$value);
  }
  #isFocusedDate = derived(() => isSameDay(this.opts.date.current, this.root.opts.placeholder.current));
  get isFocusedDate() {
    return this.#isFocusedDate();
  }
  set isFocusedDate($$value) {
    return this.#isFocusedDate($$value);
  }
  #isSelectedDate = derived(() => this.root.isDateSelected(this.opts.date.current));
  get isSelectedDate() {
    return this.#isSelectedDate();
  }
  set isSelectedDate($$value) {
    return this.#isSelectedDate($$value);
  }
  #labelText = derived(() => this.root.formatter.custom(this.cellDate, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }));
  get labelText() {
    return this.#labelText();
  }
  set labelText($$value) {
    return this.#labelText($$value);
  }
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
  }
  #snippetProps = derived(() => ({
    disabled: this.isDisabled,
    unavailable: this.isUnavailable,
    selected: this.isSelectedDate
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #ariaDisabled = derived(() => {
    return this.isDisabled || this.isOutsideMonth && this.root.opts.disableDaysOutsideMonth.current || this.isUnavailable;
  });
  get ariaDisabled() {
    return this.#ariaDisabled();
  }
  set ariaDisabled($$value) {
    return this.#ariaDisabled($$value);
  }
  #sharedDataAttrs = derived(() => ({
    "data-unavailable": getDataUnavailable(this.isUnavailable),
    "data-today": this.isDateToday ? "" : void 0,
    "data-outside-month": this.isOutsideMonth ? "" : void 0,
    "data-outside-visible-months": this.isOutsideVisibleMonths ? "" : void 0,
    "data-focused": this.isFocusedDate ? "" : void 0,
    "data-selected": getDataSelected(this.isSelectedDate),
    "data-value": this.opts.date.current.toString(),
    "data-type": getDateValueType(this.opts.date.current),
    "data-disabled": getDataDisabled(this.isDisabled || this.isOutsideMonth && this.root.opts.disableDaysOutsideMonth.current)
  }));
  get sharedDataAttrs() {
    return this.#sharedDataAttrs();
  }
  set sharedDataAttrs($$value) {
    return this.#sharedDataAttrs($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "gridcell",
    "aria-selected": getAriaSelected(this.isSelectedDate),
    "aria-disabled": getAriaDisabled(this.ariaDisabled),
    ...this.sharedDataAttrs,
    [this.root.getBitsAttr("cell")]: "",
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarDayState {
  static create(opts) {
    return new CalendarDayState(opts, CalendarCellContext.get());
  }
  opts;
  cell;
  constructor(opts, cell) {
    this.opts = opts;
    this.cell = cell;
    this.onclick = this.onclick.bind(this);
  }
  #tabindex = derived(() => this.cell.isOutsideMonth && this.cell.root.opts.disableDaysOutsideMonth.current || this.cell.isDisabled ? void 0 : this.cell.isFocusedDate ? 0 : -1);
  onclick(e) {
    if (this.cell.isDisabled) return;
    this.cell.root.handleCellClick(e, this.cell.opts.date.current);
  }
  #snippetProps = derived(() => ({
    disabled: this.cell.isDisabled,
    unavailable: this.cell.isUnavailable,
    selected: this.cell.isSelectedDate,
    day: `${this.cell.opts.date.current.day}`
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "button",
    "aria-label": this.cell.labelText,
    "aria-disabled": getAriaDisabled(this.cell.ariaDisabled),
    ...this.cell.sharedDataAttrs,
    tabindex: this.#tabindex(),
    [this.cell.root.getBitsAttr("day")]: "",
    // Shared logic for range calendar and calendar
    "data-bits-day": "",
    //
    onclick: this.onclick,
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarNextButtonState {
  static create(opts) {
    return new CalendarNextButtonState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  #isDisabled = derived(() => this.root.isNextButtonDisabled);
  get isDisabled() {
    return this.#isDisabled();
  }
  set isDisabled($$value) {
    return this.#isDisabled($$value);
  }
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.onclick = this.onclick.bind(this);
  }
  onclick(_) {
    if (this.isDisabled) return;
    this.root.nextPage();
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "button",
    type: "button",
    "aria-label": "Next",
    "aria-disabled": getAriaDisabled(this.isDisabled),
    "data-disabled": getDataDisabled(this.isDisabled),
    disabled: this.isDisabled,
    [this.root.getBitsAttr("next-button")]: "",
    //
    onclick: this.onclick,
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarPrevButtonState {
  static create(opts) {
    return new CalendarPrevButtonState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  #isDisabled = derived(() => this.root.isPrevButtonDisabled);
  get isDisabled() {
    return this.#isDisabled();
  }
  set isDisabled($$value) {
    return this.#isDisabled($$value);
  }
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.onclick = this.onclick.bind(this);
  }
  onclick(_) {
    if (this.isDisabled) return;
    this.root.prevPage();
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "button",
    type: "button",
    "aria-label": "Previous",
    "aria-disabled": getAriaDisabled(this.isDisabled),
    "data-disabled": getDataDisabled(this.isDisabled),
    disabled: this.isDisabled,
    [this.root.getBitsAttr("prev-button")]: "",
    //
    onclick: this.onclick,
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarGridState {
  static create(opts) {
    return new CalendarGridState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    tabindex: -1,
    role: "grid",
    "aria-readonly": getAriaReadonly(this.root.opts.readonly.current),
    "aria-disabled": getAriaDisabled(this.root.opts.disabled.current),
    "data-readonly": getDataReadonly(this.root.opts.readonly.current),
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    [this.root.getBitsAttr("grid")]: "",
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarGridBodyState {
  static create(opts) {
    return new CalendarGridBodyState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    "data-readonly": getDataReadonly(this.root.opts.readonly.current),
    [this.root.getBitsAttr("grid-body")]: "",
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarGridHeadState {
  static create(opts) {
    return new CalendarGridHeadState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    "data-readonly": getDataReadonly(this.root.opts.readonly.current),
    [this.root.getBitsAttr("grid-head")]: "",
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarGridRowState {
  static create(opts) {
    return new CalendarGridRowState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    "data-readonly": getDataReadonly(this.root.opts.readonly.current),
    [this.root.getBitsAttr("grid-row")]: "",
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarHeadCellState {
  static create(opts) {
    return new CalendarHeadCellState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    "data-readonly": getDataReadonly(this.root.opts.readonly.current),
    [this.root.getBitsAttr("head-cell")]: "",
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarHeaderState {
  static create(opts) {
    return new CalendarHeaderState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    "data-readonly": getDataReadonly(this.root.opts.readonly.current),
    [this.root.getBitsAttr("header")]: "",
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarMonthSelectState {
  static create(opts) {
    return new CalendarMonthSelectState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.onchange = this.onchange.bind(this);
  }
  #monthItems = derived(() => {
    this.root.opts.locale.current;
    const monthNumbers = this.opts.months.current;
    const monthFormat = this.opts.monthFormat.current;
    const months = [];
    for (const month of monthNumbers) {
      const date = this.root.opts.placeholder.current.set({ month });
      let label;
      if (typeof monthFormat === "function") {
        label = monthFormat(month);
      } else {
        label = this.root.formatter.custom(toDate(date), { month: monthFormat });
      }
      months.push({ value: month, label });
    }
    return months;
  });
  get monthItems() {
    return this.#monthItems();
  }
  set monthItems($$value) {
    return this.#monthItems($$value);
  }
  #currentMonth = derived(() => this.root.opts.placeholder.current.month);
  get currentMonth() {
    return this.#currentMonth();
  }
  set currentMonth($$value) {
    return this.#currentMonth($$value);
  }
  #isDisabled = derived(() => this.root.opts.disabled.current || this.opts.disabled.current);
  get isDisabled() {
    return this.#isDisabled();
  }
  set isDisabled($$value) {
    return this.#isDisabled($$value);
  }
  #snippetProps = derived(() => {
    return {
      monthItems: this.monthItems,
      selectedMonthItem: this.monthItems.find((month) => month.value === this.currentMonth)
    };
  });
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  onchange(event) {
    if (this.isDisabled) return;
    const target = event.target;
    const month = parseInt(target.value, 10);
    if (!isNaN(month)) {
      this.root.opts.placeholder.current = this.root.opts.placeholder.current.set({ month });
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    value: this.currentMonth,
    disabled: this.isDisabled,
    "data-disabled": getDataDisabled(this.isDisabled),
    [this.root.getBitsAttr("month-select")]: "",
    //
    onchange: this.onchange,
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CalendarYearSelectState {
  static create(opts) {
    return new CalendarYearSelectState(opts, CalendarRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.onchange = this.onchange.bind(this);
  }
  #years = derived(() => {
    if (this.opts.years.current && this.opts.years.current.length) return this.opts.years.current;
    return this.root.defaultYears;
  });
  get years() {
    return this.#years();
  }
  set years($$value) {
    return this.#years($$value);
  }
  #yearItems = derived(() => {
    this.root.opts.locale.current;
    const yearFormat = this.opts.yearFormat.current;
    const localYears = [];
    for (const year of this.years) {
      const date = this.root.opts.placeholder.current.set({ year });
      let label;
      if (typeof yearFormat === "function") {
        label = yearFormat(year);
      } else {
        label = this.root.formatter.custom(toDate(date), { year: yearFormat });
      }
      localYears.push({ value: year, label });
    }
    return localYears;
  });
  get yearItems() {
    return this.#yearItems();
  }
  set yearItems($$value) {
    return this.#yearItems($$value);
  }
  #currentYear = derived(() => this.root.opts.placeholder.current.year);
  get currentYear() {
    return this.#currentYear();
  }
  set currentYear($$value) {
    return this.#currentYear($$value);
  }
  #isDisabled = derived(() => this.root.opts.disabled.current || this.opts.disabled.current);
  get isDisabled() {
    return this.#isDisabled();
  }
  set isDisabled($$value) {
    return this.#isDisabled($$value);
  }
  #snippetProps = derived(() => {
    return {
      yearItems: this.yearItems,
      selectedYearItem: this.yearItems.find((year) => year.value === this.currentYear)
    };
  });
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  onchange(event) {
    if (this.isDisabled) return;
    const target = event.target;
    const year = parseInt(target.value, 10);
    if (!isNaN(year)) {
      this.root.opts.placeholder.current = this.root.opts.placeholder.current.set({ year });
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    value: this.currentYear,
    disabled: this.isDisabled,
    "data-disabled": getDataDisabled(this.isDisabled),
    [this.root.getBitsAttr("year-select")]: "",
    //
    onchange: this.onchange,
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function Calendar$1($$payload, $$props) {
  push();
  let {
    child,
    children,
    id = useId(),
    ref = null,
    value = void 0,
    onValueChange = noop,
    placeholder = void 0,
    onPlaceholderChange = noop,
    weekdayFormat = "narrow",
    weekStartsOn,
    pagedNavigation = false,
    isDateDisabled = () => false,
    isDateUnavailable = () => false,
    fixedWeeks = false,
    numberOfMonths = 1,
    locale,
    calendarLabel = "Event",
    disabled = false,
    readonly = false,
    minValue = void 0,
    maxValue = void 0,
    preventDeselect = false,
    type,
    disableDaysOutsideMonth = true,
    initialFocus = false,
    maxDays,
    monthFormat = "long",
    yearFormat = "numeric",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const defaultPlaceholder = getDefaultDate({ defaultValue: value });
  function handleDefaultPlaceholder() {
    if (placeholder !== void 0) return;
    placeholder = defaultPlaceholder;
  }
  handleDefaultPlaceholder();
  watch.pre(() => placeholder, () => {
    handleDefaultPlaceholder();
  });
  function handleDefaultValue() {
    if (value !== void 0) return;
    value = type === "single" ? void 0 : [];
  }
  handleDefaultValue();
  watch.pre(() => value, () => {
    handleDefaultValue();
  });
  const rootState = CalendarRootState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    weekdayFormat: box.with(() => weekdayFormat),
    weekStartsOn: box.with(() => weekStartsOn),
    pagedNavigation: box.with(() => pagedNavigation),
    isDateDisabled: box.with(() => isDateDisabled),
    isDateUnavailable: box.with(() => isDateUnavailable),
    fixedWeeks: box.with(() => fixedWeeks),
    numberOfMonths: box.with(() => numberOfMonths),
    locale: resolveLocaleProp(() => locale),
    calendarLabel: box.with(() => calendarLabel),
    readonly: box.with(() => readonly),
    disabled: box.with(() => disabled),
    minValue: box.with(() => minValue),
    maxValue: box.with(() => maxValue),
    disableDaysOutsideMonth: box.with(() => disableDaysOutsideMonth),
    initialFocus: box.with(() => initialFocus),
    maxDays: box.with(() => maxDays),
    placeholder: box.with(() => placeholder, (v) => {
      placeholder = v;
      onPlaceholderChange(v);
    }),
    preventDeselect: box.with(() => preventDeselect),
    value: box.with(() => value, (v) => {
      value = v;
      onValueChange(v);
    }),
    type: box.with(() => type),
    monthFormat: box.with(() => monthFormat),
    yearFormat: box.with(() => yearFormat),
    defaultPlaceholder
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...rootState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload, rootState.snippetProps);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, value, placeholder });
  pop();
}
function Calendar_day$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const dayState = CalendarDayState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, dayState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...dayState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    if (children) {
      $$payload.out += "<!--[-->";
      children?.($$payload, dayState.snippetProps);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(dayState.cell.opts.date.current.day)}`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridState = CalendarGridState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<table${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></table>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_body$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridBodyState = CalendarGridBodyState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridBodyState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<tbody${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></tbody>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_cell$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    date,
    month,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const cellState = CalendarCellState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    date: box.with(() => date),
    month: box.with(() => month)
  });
  const mergedProps = mergeProps(restProps, cellState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...cellState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<td${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload, cellState.snippetProps);
    $$payload.out += `<!----></td>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_head$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridHeadState = CalendarGridHeadState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridHeadState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<thead${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></thead>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_head_cell$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const headCellState = CalendarHeadCellState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, headCellState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<th${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></th>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_row$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridRowState = CalendarGridRowState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridRowState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<tr${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></tr>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_header$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const headerState = CalendarHeaderState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, headerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<header${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></header>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_month_select$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    months = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ],
    monthFormat = "long",
    disabled = false,
    "aria-label": ariaLabel = "Select a month",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const monthSelectState = CalendarMonthSelectState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    months: box.with(() => months),
    monthFormat: box.with(() => monthFormat),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, monthSelectState.props, { "aria-label": ariaLabel });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, {
      props: mergedProps,
      ...monthSelectState.snippetProps
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<select${spread_attributes({ ...mergedProps })}>`;
    $$payload.select_value = { ...mergedProps }?.value;
    if (children) {
      $$payload.out += "<!--[-->";
      children?.($$payload, monthSelectState.snippetProps);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(monthSelectState.monthItems);
      $$payload.out += `<!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let month = each_array[$$index];
        $$payload.out += `<option${attr("value", month.value)}${maybe_selected($$payload, month.value)}${attr("selected", month.value === monthSelectState.currentMonth, true)}>${escape_html(month.label)}</option>`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
    $$payload.select_value = void 0;
    $$payload.out += `</select>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_next_button$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const nextButtonState = CalendarNextButtonState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, nextButtonState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_prev_button$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const prevButtonState = CalendarPrevButtonState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, prevButtonState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_year_select$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId(uid),
    years,
    yearFormat = "numeric",
    disabled = false,
    "aria-label": ariaLabel = "Select a year",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const yearSelectState = CalendarYearSelectState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    years: box.with(() => years),
    yearFormat: box.with(() => yearFormat),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, yearSelectState.props, { "aria-label": ariaLabel });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, {
      props: mergedProps,
      ...yearSelectState.snippetProps
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<select${spread_attributes({ ...mergedProps })}>`;
    $$payload.select_value = { ...mergedProps }?.value;
    if (children) {
      $$payload.out += "<!--[-->";
      children?.($$payload, yearSelectState.snippetProps);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(yearSelectState.yearItems);
      $$payload.out += `<!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let year = each_array[$$index];
        $$payload.out += `<option${attr("value", year.value)}${maybe_selected($$payload, year.value)}${attr("selected", year.value === yearSelectState.currentYear, true)}>${escape_html(year.label)}</option>`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
    $$payload.select_value = void 0;
    $$payload.out += `</select>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function get(valueOrGetValue) {
  return typeof valueOrGetValue === "function" ? valueOrGetValue() : valueOrGetValue;
}
function getDPR(element2) {
  if (typeof window === "undefined") return 1;
  const win = element2.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element2, value) {
  const dpr = getDPR(element2);
  return Math.round(value * dpr) / dpr;
}
function getFloatingContentCSSVars(name) {
  return {
    [`--bits-${name}-content-transform-origin`]: `var(--bits-floating-transform-origin)`,
    [`--bits-${name}-content-available-width`]: `var(--bits-floating-available-width)`,
    [`--bits-${name}-content-available-height`]: `var(--bits-floating-available-height)`,
    [`--bits-${name}-anchor-width`]: `var(--bits-floating-anchor-width)`,
    [`--bits-${name}-anchor-height`]: `var(--bits-floating-anchor-height)`
  };
}
function useFloating(options) {
  const openOption = get(options.open) ?? true;
  const middlewareOption = get(options.middleware);
  const transformOption = get(options.transform) ?? true;
  const placementOption = get(options.placement) ?? "bottom";
  const strategyOption = get(options.strategy) ?? "absolute";
  const sideOffsetOption = get(options.sideOffset) ?? 0;
  const alignOffsetOption = get(options.alignOffset) ?? 0;
  const reference = options.reference;
  let x = 0;
  let y = 0;
  const floating = box(null);
  let strategy = strategyOption;
  let placement = placementOption;
  let middlewareData = {};
  let isPositioned = false;
  const floatingStyles = (() => {
    const xVal = floating.current ? roundByDPR(floating.current, x) : x;
    const yVal = floating.current ? roundByDPR(floating.current, y) : y;
    if (transformOption) {
      return {
        position: strategy,
        left: "0",
        top: "0",
        transform: `translate(${xVal}px, ${yVal}px)`,
        ...floating.current && getDPR(floating.current) >= 1.5 && { willChange: "transform" }
      };
    }
    return {
      position: strategy,
      left: `${xVal}px`,
      top: `${yVal}px`
    };
  })();
  function update() {
    if (reference.current === null || floating.current === null) return;
    computePosition(reference.current, floating.current, {
      middleware: middlewareOption,
      placement: placementOption,
      strategy: strategyOption
    }).then((position) => {
      if (!openOption && x !== 0 && y !== 0) {
        const maxExpectedOffset = Math.max(Math.abs(sideOffsetOption), Math.abs(alignOffsetOption), 15);
        if (position.x <= maxExpectedOffset && position.y <= maxExpectedOffset) return;
      }
      x = position.x;
      y = position.y;
      strategy = position.strategy;
      placement = position.placement;
      middlewareData = position.middlewareData;
      isPositioned = true;
    });
  }
  return {
    floating,
    reference,
    get strategy() {
      return strategy;
    },
    get placement() {
      return placement;
    },
    get middlewareData() {
      return middlewareData;
    },
    get isPositioned() {
      return isPositioned;
    },
    get floatingStyles() {
      return floatingStyles;
    },
    get update() {
      return update;
    }
  };
}
const OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
const FloatingRootContext = new Context("Floating.Root");
const FloatingContentContext = new Context("Floating.Content");
const FloatingTooltipRootContext = new Context("Floating.Root");
class FloatingRootState {
  static create(tooltip = false) {
    return tooltip ? FloatingTooltipRootContext.set(new FloatingRootState()) : FloatingRootContext.set(new FloatingRootState());
  }
  anchorNode = box(null);
  customAnchorNode = box(null);
  triggerNode = box(null);
  constructor() {
  }
}
class FloatingContentState {
  static create(opts, tooltip = false) {
    return tooltip ? FloatingContentContext.set(new FloatingContentState(opts, FloatingTooltipRootContext.get())) : FloatingContentContext.set(new FloatingContentState(opts, FloatingRootContext.get()));
  }
  opts;
  root;
  // nodes
  contentRef = box(null);
  wrapperRef = box(null);
  arrowRef = box(null);
  // ids
  arrowId = box(useId());
  #transformedStyle = derived(() => {
    if (typeof this.opts.style === "string") return cssToStyleObj(this.opts.style);
    if (!this.opts.style) return {};
  });
  #updatePositionStrategy = void 0;
  #arrowSize = new ElementSize(() => this.arrowRef.current ?? void 0);
  #arrowWidth = derived(() => this.#arrowSize?.width ?? 0);
  #arrowHeight = derived(() => this.#arrowSize?.height ?? 0);
  #desiredPlacement = derived(() => this.opts.side?.current + (this.opts.align.current !== "center" ? `-${this.opts.align.current}` : ""));
  #boundary = derived(() => Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]);
  #hasExplicitBoundaries = derived(() => this.#boundary().length > 0);
  get hasExplicitBoundaries() {
    return this.#hasExplicitBoundaries();
  }
  set hasExplicitBoundaries($$value) {
    return this.#hasExplicitBoundaries($$value);
  }
  #detectOverflowOptions = derived(() => ({
    padding: this.opts.collisionPadding.current,
    boundary: this.#boundary().filter(isNotNull),
    altBoundary: this.hasExplicitBoundaries
  }));
  get detectOverflowOptions() {
    return this.#detectOverflowOptions();
  }
  set detectOverflowOptions($$value) {
    return this.#detectOverflowOptions($$value);
  }
  #availableWidth = void 0;
  #availableHeight = void 0;
  #anchorWidth = void 0;
  #anchorHeight = void 0;
  #middleware = derived(() => [
    offset({
      mainAxis: this.opts.sideOffset.current + this.#arrowHeight(),
      alignmentAxis: this.opts.alignOffset.current
    }),
    this.opts.avoidCollisions.current && shift({
      mainAxis: true,
      crossAxis: false,
      limiter: this.opts.sticky.current === "partial" ? limitShift() : void 0,
      ...this.detectOverflowOptions
    }),
    this.opts.avoidCollisions.current && flip({ ...this.detectOverflowOptions }),
    size({
      ...this.detectOverflowOptions,
      apply: ({ rects, availableWidth, availableHeight }) => {
        const { width: anchorWidth, height: anchorHeight } = rects.reference;
        this.#availableWidth = availableWidth;
        this.#availableHeight = availableHeight;
        this.#anchorWidth = anchorWidth;
        this.#anchorHeight = anchorHeight;
      }
    }),
    this.arrowRef.current && arrow({
      element: this.arrowRef.current,
      padding: this.opts.arrowPadding.current
    }),
    transformOrigin({
      arrowWidth: this.#arrowWidth(),
      arrowHeight: this.#arrowHeight()
    }),
    this.opts.hideWhenDetached.current && hide({
      strategy: "referenceHidden",
      ...this.detectOverflowOptions
    })
  ].filter(Boolean));
  get middleware() {
    return this.#middleware();
  }
  set middleware($$value) {
    return this.#middleware($$value);
  }
  floating;
  #placedSide = derived(() => getSideFromPlacement(this.floating.placement));
  get placedSide() {
    return this.#placedSide();
  }
  set placedSide($$value) {
    return this.#placedSide($$value);
  }
  #placedAlign = derived(() => getAlignFromPlacement(this.floating.placement));
  get placedAlign() {
    return this.#placedAlign();
  }
  set placedAlign($$value) {
    return this.#placedAlign($$value);
  }
  #arrowX = derived(() => this.floating.middlewareData.arrow?.x ?? 0);
  get arrowX() {
    return this.#arrowX();
  }
  set arrowX($$value) {
    return this.#arrowX($$value);
  }
  #arrowY = derived(() => this.floating.middlewareData.arrow?.y ?? 0);
  get arrowY() {
    return this.#arrowY();
  }
  set arrowY($$value) {
    return this.#arrowY($$value);
  }
  #cannotCenterArrow = derived(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
  get cannotCenterArrow() {
    return this.#cannotCenterArrow();
  }
  set cannotCenterArrow($$value) {
    return this.#cannotCenterArrow($$value);
  }
  contentZIndex;
  #arrowBaseSide = derived(() => OPPOSITE_SIDE[this.placedSide]);
  get arrowBaseSide() {
    return this.#arrowBaseSide();
  }
  set arrowBaseSide($$value) {
    return this.#arrowBaseSide($$value);
  }
  #wrapperProps = derived(() => ({
    id: this.opts.wrapperId.current,
    "data-bits-floating-content-wrapper": "",
    style: {
      ...this.floating.floatingStyles,
      // keep off page when measuring
      transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
      minWidth: "max-content",
      zIndex: this.contentZIndex,
      "--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
      "--bits-floating-available-width": `${this.#availableWidth}px`,
      "--bits-floating-available-height": `${this.#availableHeight}px`,
      "--bits-floating-anchor-width": `${this.#anchorWidth}px`,
      "--bits-floating-anchor-height": `${this.#anchorHeight}px`,
      // hide the content if using the hide middleware and should be hidden
      ...this.floating.middlewareData.hide?.referenceHidden && {
        visibility: "hidden",
        "pointer-events": "none"
      },
      ...this.#transformedStyle()
    },
    // Floating UI calculates logical alignment based the `dir` attribute
    dir: this.opts.dir.current,
    ...attachRef(this.wrapperRef)
  }));
  get wrapperProps() {
    return this.#wrapperProps();
  }
  set wrapperProps($$value) {
    return this.#wrapperProps($$value);
  }
  #props = derived(() => ({
    "data-side": this.placedSide,
    "data-align": this.placedAlign,
    style: styleToString({ ...this.#transformedStyle() }),
    ...attachRef(this.contentRef)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  #arrowStyle = derived(() => ({
    position: "absolute",
    left: this.arrowX ? `${this.arrowX}px` : void 0,
    top: this.arrowY ? `${this.arrowY}px` : void 0,
    [this.arrowBaseSide]: 0,
    "transform-origin": {
      top: "",
      right: "0 0",
      bottom: "center 0",
      left: "100% 0"
    }[this.placedSide],
    transform: {
      top: "translateY(100%)",
      right: "translateY(50%) rotate(90deg) translateX(-50%)",
      bottom: "rotate(180deg)",
      left: "translateY(50%) rotate(-90deg) translateX(50%)"
    }[this.placedSide],
    visibility: this.cannotCenterArrow ? "hidden" : void 0
  }));
  get arrowStyle() {
    return this.#arrowStyle();
  }
  set arrowStyle($$value) {
    return this.#arrowStyle($$value);
  }
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    if (opts.customAnchor) {
      this.root.customAnchorNode.current = opts.customAnchor.current;
    }
    watch(() => opts.customAnchor.current, (customAnchor) => {
      this.root.customAnchorNode.current = customAnchor;
    });
    this.floating = useFloating({
      strategy: () => this.opts.strategy.current,
      placement: () => this.#desiredPlacement(),
      middleware: () => this.middleware,
      reference: this.root.anchorNode,
      open: () => this.opts.enabled.current,
      sideOffset: () => this.opts.sideOffset.current,
      alignOffset: () => this.opts.alignOffset.current
    });
    watch(() => this.contentRef.current, (contentNode) => {
      if (!contentNode) return;
      const win = getWindow(contentNode);
      this.contentZIndex = win.getComputedStyle(contentNode).zIndex;
    });
  }
}
class FloatingAnchorState {
  static create(opts, tooltip = false) {
    return tooltip ? new FloatingAnchorState(opts, FloatingTooltipRootContext.get()) : new FloatingAnchorState(opts, FloatingRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    if (opts.virtualEl && opts.virtualEl.current) {
      root.triggerNode = box.from(opts.virtualEl.current);
    } else {
      root.triggerNode = opts.ref;
    }
  }
}
function transformOrigin(options) {
  return {
    name: "transformOrigin",
    options,
    fn(data) {
      const { placement, rects, middlewareData } = data;
      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
      const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
      const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
      let x = "";
      let y = "";
      if (placedSide === "bottom") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${-arrowHeight}px`;
      } else if (placedSide === "top") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${rects.floating.height + arrowHeight}px`;
      } else if (placedSide === "right") {
        x = `${-arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      } else if (placedSide === "left") {
        x = `${rects.floating.width + arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      }
      return { data: { x, y } };
    }
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
function getSideFromPlacement(placement) {
  return getSideAndAlignFromPlacement(placement)[0];
}
function getAlignFromPlacement(placement) {
  return getSideAndAlignFromPlacement(placement)[1];
}
function Floating_layer($$payload, $$props) {
  push();
  let { children, tooltip = false } = $$props;
  FloatingRootState.create(tooltip);
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function Floating_layer_anchor($$payload, $$props) {
  push();
  let {
    id,
    children,
    virtualEl,
    ref,
    tooltip = false
  } = $$props;
  FloatingAnchorState.create(
    {
      id: box.with(() => id),
      virtualEl: box.with(() => virtualEl),
      ref
    },
    tooltip
  );
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function Floating_layer_content($$payload, $$props) {
  push();
  let {
    content,
    side = "bottom",
    sideOffset = 0,
    align = "center",
    alignOffset = 0,
    id,
    arrowPadding = 0,
    avoidCollisions = true,
    collisionBoundary = [],
    collisionPadding = 0,
    hideWhenDetached = false,
    onPlaced = () => {
    },
    sticky = "partial",
    updatePositionStrategy = "optimized",
    strategy = "fixed",
    dir = "ltr",
    style = {},
    wrapperId = useId(),
    customAnchor = null,
    enabled,
    tooltip = false
  } = $$props;
  const contentState = FloatingContentState.create(
    {
      side: box.with(() => side),
      sideOffset: box.with(() => sideOffset),
      align: box.with(() => align),
      alignOffset: box.with(() => alignOffset),
      id: box.with(() => id),
      arrowPadding: box.with(() => arrowPadding),
      avoidCollisions: box.with(() => avoidCollisions),
      collisionBoundary: box.with(() => collisionBoundary),
      collisionPadding: box.with(() => collisionPadding),
      hideWhenDetached: box.with(() => hideWhenDetached),
      onPlaced: box.with(() => onPlaced),
      sticky: box.with(() => sticky),
      updatePositionStrategy: box.with(() => updatePositionStrategy),
      strategy: box.with(() => strategy),
      dir: box.with(() => dir),
      style: box.with(() => style),
      enabled: box.with(() => enabled),
      wrapperId: box.with(() => wrapperId),
      customAnchor: box.with(() => customAnchor)
    },
    tooltip
  );
  const mergedProps = mergeProps(contentState.wrapperProps, { style: { pointerEvents: "auto" } });
  content?.($$payload, {
    props: contentState.props,
    wrapperProps: mergedProps
  });
  $$payload.out += `<!---->`;
  pop();
}
function Floating_layer_content_static($$payload, $$props) {
  push();
  let { content } = $$props;
  content?.($$payload, { props: {}, wrapperProps: {} });
  $$payload.out += `<!---->`;
  pop();
}
function Popper_content($$payload, $$props) {
  let {
    content,
    isStatic = false,
    onPlaced,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (isStatic) {
    $$payload.out += "<!--[-->";
    Floating_layer_content_static($$payload, { content });
  } else {
    $$payload.out += "<!--[!-->";
    Floating_layer_content($$payload, spread_props([{ content, onPlaced }, restProps]));
  }
  $$payload.out += `<!--]-->`;
}
function Popper_layer_inner($$payload, $$props) {
  push();
  let {
    popper,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    enabled,
    ref,
    tooltip = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  {
    let content = function($$payload2, { props: floatingProps, wrapperProps }) {
      if (restProps.forceMount && enabled) {
        $$payload2.out += "<!--[-->";
        Scroll_lock($$payload2, { preventScroll });
      } else if (!restProps.forceMount) {
        $$payload2.out += "<!--[1-->";
        Scroll_lock($$payload2, { preventScroll });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      {
        let focusScope = function($$payload3, { props: focusScopeProps }) {
          Escape_layer($$payload3, {
            onEscapeKeydown,
            escapeKeydownBehavior,
            enabled,
            ref,
            children: ($$payload4) => {
              {
                let children = function($$payload5, { props: dismissibleProps }) {
                  Text_selection_layer($$payload5, {
                    id,
                    preventOverflowTextSelection,
                    onPointerDown,
                    onPointerUp,
                    enabled,
                    ref,
                    children: ($$payload6) => {
                      popper?.($$payload6, {
                        props: mergeProps(restProps, floatingProps, dismissibleProps, focusScopeProps, { style: { pointerEvents: "auto" } }),
                        wrapperProps
                      });
                      $$payload6.out += `<!---->`;
                    }
                  });
                };
                Dismissible_layer($$payload4, {
                  id,
                  onInteractOutside,
                  onFocusOutside,
                  interactOutsideBehavior,
                  isValidEvent: isValidEvent2,
                  enabled,
                  ref,
                  children
                });
              }
            }
          });
        };
        Focus_scope($$payload2, {
          id,
          onOpenAutoFocus,
          onCloseAutoFocus,
          loop,
          trapFocus: enabled && trapFocus,
          forceMount: restProps.forceMount,
          ref,
          focusScope
        });
      }
      $$payload2.out += `<!---->`;
    };
    Popper_content($$payload, {
      isStatic,
      id,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      updatePositionStrategy,
      strategy,
      dir,
      wrapperId,
      style,
      onPlaced,
      customAnchor,
      enabled,
      tooltip,
      content,
      $$slots: { content: true }
    });
  }
  pop();
}
function Popper_layer($$payload, $$props) {
  let {
    popper,
    open,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    ref,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  {
    let presence = function($$payload2) {
      Popper_layer_inner($$payload2, spread_props([
        {
          popper,
          onEscapeKeydown,
          escapeKeydownBehavior,
          preventOverflowTextSelection,
          id,
          onPointerDown,
          onPointerUp,
          side,
          sideOffset,
          align,
          alignOffset,
          arrowPadding,
          avoidCollisions,
          collisionBoundary,
          collisionPadding,
          sticky,
          hideWhenDetached,
          updatePositionStrategy,
          strategy,
          dir,
          preventScroll,
          wrapperId,
          style,
          onPlaced,
          customAnchor,
          isStatic,
          enabled: open,
          onInteractOutside,
          onCloseAutoFocus,
          onOpenAutoFocus,
          interactOutsideBehavior,
          loop,
          trapFocus,
          isValidEvent: isValidEvent2,
          onFocusOutside,
          forceMount: false,
          ref
        },
        restProps
      ]));
    };
    Presence_layer($$payload, {
      open,
      ref,
      presence
    });
  }
}
function Popper_layer_force_mount($$payload, $$props) {
  let {
    popper,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    enabled,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  Popper_layer_inner($$payload, spread_props([
    {
      popper,
      onEscapeKeydown,
      escapeKeydownBehavior,
      preventOverflowTextSelection,
      id,
      onPointerDown,
      onPointerUp,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      updatePositionStrategy,
      strategy,
      dir,
      preventScroll,
      wrapperId,
      style,
      onPlaced,
      customAnchor,
      isStatic,
      enabled,
      onInteractOutside,
      onCloseAutoFocus,
      onOpenAutoFocus,
      interactOutsideBehavior,
      loop,
      trapFocus,
      isValidEvent: isValidEvent2,
      onFocusOutside
    },
    restProps,
    { forceMount: true }
  ]));
}
const popoverAttrs = createBitsAttrs({
  component: "popover",
  parts: ["root", "trigger", "content", "close"]
});
const PopoverRootContext = new Context("Popover.Root");
class PopoverRootState {
  static create(opts) {
    return PopoverRootContext.set(new PopoverRootState(opts));
  }
  opts;
  contentNode = null;
  triggerNode = null;
  constructor(opts) {
    this.opts = opts;
    new OpenChangeComplete({
      ref: box.with(() => this.contentNode),
      open: this.opts.open,
      onComplete: () => {
        this.opts.onOpenChangeComplete.current(this.opts.open.current);
      }
    });
  }
  toggleOpen() {
    this.opts.open.current = !this.opts.open.current;
  }
  handleClose() {
    if (!this.opts.open.current) return;
    this.opts.open.current = false;
  }
}
class PopoverTriggerState {
  static create(opts) {
    return new PopoverTriggerState(opts, PopoverRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
  }
  onclick(e) {
    if (this.opts.disabled.current) return;
    if (e.button !== 0) return;
    this.root.toggleOpen();
  }
  onkeydown(e) {
    if (this.opts.disabled.current) return;
    if (!(e.key === ENTER || e.key === SPACE)) return;
    e.preventDefault();
    this.root.toggleOpen();
  }
  #getAriaControls() {
    if (this.root.opts.open.current && this.root.contentNode?.id) {
      return this.root.contentNode?.id;
    }
    return void 0;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "aria-haspopup": "dialog",
    "aria-expanded": getAriaExpanded(this.root.opts.open.current),
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    "aria-controls": this.#getAriaControls(),
    [popoverAttrs.trigger]: "",
    disabled: this.opts.disabled.current,
    //
    onkeydown: this.onkeydown,
    onclick: this.onclick,
    ...attachRef(this.opts.ref, (v) => this.root.triggerNode = v)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class PopoverContentState {
  static create(opts) {
    return new PopoverContentState(opts, PopoverRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
  }
  onInteractOutside = (e) => {
    this.opts.onInteractOutside.current(e);
    if (e.defaultPrevented) return;
    if (!isElement(e.target)) return;
    const closestTrigger = e.target.closest(popoverAttrs.selector("trigger"));
    if (closestTrigger === this.root.triggerNode) return;
    this.root.handleClose();
  };
  onEscapeKeydown = (e) => {
    this.opts.onEscapeKeydown.current(e);
    if (e.defaultPrevented) return;
    this.root.handleClose();
  };
  onCloseAutoFocus = (e) => {
    this.opts.onCloseAutoFocus.current(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    this.root.triggerNode?.focus();
  };
  #snippetProps = derived(() => ({ open: this.root.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    tabindex: -1,
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    [popoverAttrs.content]: "",
    style: { pointerEvents: "auto" },
    ...attachRef(this.opts.ref, (v) => this.root.contentNode = v)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  popperProps = {
    onInteractOutside: this.onInteractOutside,
    onEscapeKeydown: this.onEscapeKeydown,
    onCloseAutoFocus: this.onCloseAutoFocus
  };
}
function Popover_content$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    child,
    children,
    ref = null,
    id = createId(uid),
    forceMount = false,
    onCloseAutoFocus = noop,
    onEscapeKeydown = noop,
    onInteractOutside = noop,
    trapFocus = true,
    preventScroll = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = PopoverContentState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    onInteractOutside: box.with(() => onInteractOutside),
    onEscapeKeydown: box.with(() => onEscapeKeydown),
    onCloseAutoFocus: box.with(() => onCloseAutoFocus)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  if (forceMount) {
    $$payload.out += "<!--[-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const finalProps = mergeProps(props, {
          style: getFloatingContentCSSVars("popover")
        });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: finalProps,
            wrapperProps,
            ...contentState.snippetProps
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...finalProps })}>`;
          children?.($$payload2);
          $$payload2.out += `<!----></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Popper_layer_force_mount($$payload, spread_props([
        mergedProps,
        contentState.popperProps,
        {
          ref: contentState.opts.ref,
          enabled: contentState.root.opts.open.current,
          id,
          trapFocus,
          preventScroll,
          loop: true,
          forceMount: true,
          popper,
          $$slots: { popper: true }
        }
      ]));
    }
  } else if (!forceMount) {
    $$payload.out += "<!--[1-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const finalProps = mergeProps(props, {
          style: getFloatingContentCSSVars("popover")
        });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: finalProps,
            wrapperProps,
            ...contentState.snippetProps
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...finalProps })}>`;
          children?.($$payload2);
          $$payload2.out += `<!----></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Popper_layer($$payload, spread_props([
        mergedProps,
        contentState.popperProps,
        {
          ref: contentState.opts.ref,
          open: contentState.root.opts.open.current,
          id,
          trapFocus,
          preventScroll,
          loop: true,
          forceMount: false,
          popper,
          $$slots: { popper: true }
        }
      ]));
    }
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Popover_trigger$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    ref = null,
    type = "button",
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = PopoverTriggerState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, triggerState.props, { type });
  Floating_layer_anchor($$payload, {
    id,
    ref: triggerState.opts.ref,
    children: ($$payload2) => {
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, { props: mergedProps });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<button${spread_attributes({ ...mergedProps })}>`;
        children?.($$payload2);
        $$payload2.out += `<!----></button>`;
      }
      $$payload2.out += `<!--]-->`;
    }
  });
  bind_props($$props, { ref });
  pop();
}
const labelAttrs = createBitsAttrs({ component: "label", parts: ["root"] });
class LabelRootState {
  static create(opts) {
    return new LabelRootState(opts);
  }
  opts;
  constructor(opts) {
    this.opts = opts;
    this.onmousedown = this.onmousedown.bind(this);
  }
  onmousedown(e) {
    if (e.detail > 1) e.preventDefault();
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    [labelAttrs.root]: "",
    onmousedown: this.onmousedown,
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function Label$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    ref = null,
    for: forProp,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = LabelRootState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, rootState.props, { for: forProp });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<label${spread_attributes({ ...mergedProps, for: forProp })}>`;
    children?.($$payload);
    $$payload.out += `<!----></label>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Popover($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop,
    onOpenChangeComplete = noop,
    children
  } = $$props;
  PopoverRootState.create({
    open: box.with(() => open, (v) => {
      open = v;
      onOpenChange(v);
    }),
    onOpenChangeComplete: box.with(() => onOpenChangeComplete)
  });
  Floating_layer($$payload, {
    children: ($$payload2) => {
      children?.($$payload2);
      $$payload2.out += `<!---->`;
    }
  });
  bind_props($$props, { open });
  pop();
}
function Label($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Label$1($$payload2, spread_props([
      {
        "data-slot": "label",
        class: cn("flex select-none items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_1($$payload, $$props) {
  push();
  let {
    ref = null,
    value = void 0,
    placeholder = void 0,
    class: className,
    weekdayFormat = "short",
    buttonVariant = "ghost",
    captionLayout = "label",
    locale = "en-US",
    months: monthsProp,
    years,
    monthFormat: monthFormatProp,
    yearFormat = "numeric",
    day,
    disableDaysOutsideMonth = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const monthFormat = (() => {
    if (monthFormatProp) return monthFormatProp;
    if (captionLayout.startsWith("dropdown")) return "short";
    return "long";
  })();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    {
      let children = function($$payload3, { months, weekdays }) {
        $$payload3.out += `<!---->`;
        Calendar_months($$payload3, {
          children: ($$payload4) => {
            const each_array = ensure_array_like(months);
            $$payload4.out += `<!---->`;
            Calendar_nav($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Calendar_prev_button($$payload5, { variant: buttonVariant });
                $$payload5.out += `<!----> <!---->`;
                Calendar_next_button($$payload5, { variant: buttonVariant });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!--[-->`;
            for (let monthIndex = 0, $$length = each_array.length; monthIndex < $$length; monthIndex++) {
              let month = each_array[monthIndex];
              $$payload4.out += `<!---->`;
              Calendar_month($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Calendar_header($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Calendar_caption($$payload6, {
                        captionLayout,
                        months: monthsProp,
                        monthFormat,
                        years,
                        yearFormat,
                        month: month.value,
                        locale,
                        monthIndex,
                        get placeholder() {
                          return placeholder;
                        },
                        set placeholder($$value) {
                          placeholder = $$value;
                          $$settled = false;
                        }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> <!---->`;
                  Calendar_grid($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Calendar_grid_head($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->`;
                          Calendar_grid_row($$payload7, {
                            class: "select-none",
                            children: ($$payload8) => {
                              const each_array_1 = ensure_array_like(weekdays);
                              $$payload8.out += `<!--[-->`;
                              for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                                let weekday = each_array_1[$$index];
                                $$payload8.out += `<!---->`;
                                Calendar_head_cell($$payload8, {
                                  children: ($$payload9) => {
                                    $$payload9.out += `<!---->${escape_html(weekday.slice(0, 2))}`;
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload8.out += `<!---->`;
                              }
                              $$payload8.out += `<!--]-->`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> <!---->`;
                      Calendar_grid_body($$payload6, {
                        children: ($$payload7) => {
                          const each_array_2 = ensure_array_like(month.weeks);
                          $$payload7.out += `<!--[-->`;
                          for (let $$index_2 = 0, $$length2 = each_array_2.length; $$index_2 < $$length2; $$index_2++) {
                            let weekDates = each_array_2[$$index_2];
                            $$payload7.out += `<!---->`;
                            Calendar_grid_row($$payload7, {
                              class: "mt-2 w-full",
                              children: ($$payload8) => {
                                const each_array_3 = ensure_array_like(weekDates);
                                $$payload8.out += `<!--[-->`;
                                for (let $$index_1 = 0, $$length3 = each_array_3.length; $$index_1 < $$length3; $$index_1++) {
                                  let date = each_array_3[$$index_1];
                                  $$payload8.out += `<!---->`;
                                  Calendar_cell($$payload8, {
                                    date,
                                    month: month.value,
                                    children: ($$payload9) => {
                                      if (day) {
                                        $$payload9.out += "<!--[-->";
                                        day($$payload9, {
                                          day: date,
                                          outsideMonth: !isEqualMonth(date, month.value)
                                        });
                                        $$payload9.out += `<!---->`;
                                      } else {
                                        $$payload9.out += "<!--[!-->";
                                        $$payload9.out += `<!---->`;
                                        Calendar_day($$payload9, {});
                                        $$payload9.out += `<!---->`;
                                      }
                                      $$payload9.out += `<!--]-->`;
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$payload8.out += `<!---->`;
                                }
                                $$payload8.out += `<!--]-->`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!---->`;
                          }
                          $$payload7.out += `<!--]-->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      };
      Calendar$1($$payload2, spread_props([
        {
          weekdayFormat,
          disableDaysOutsideMonth,
          class: cn("bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", className),
          locale,
          monthFormat,
          yearFormat
        },
        restProps,
        {
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          },
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          },
          get placeholder() {
            return placeholder;
          },
          set placeholder($$value) {
            placeholder = $$value;
            $$settled = false;
          },
          children,
          $$slots: { default: true }
        }
      ]));
    }
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, value, placeholder });
  pop();
}
function Calendar_cell($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_cell$1($$payload2, spread_props([
      {
        class: cn("size-(--cell-size) relative p-0 text-center text-sm focus-within:z-20 [&:first-child[data-selected]_[data-bits-day]]:rounded-l-md [&:last-child[data-selected]_[data-bits-day]]:rounded-r-md", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_day($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_day$1($$payload2, spread_props([
      {
        class: cn(
          buttonVariants({ variant: "ghost" }),
          "size-(--cell-size) flex select-none flex-col items-center justify-center gap-1 whitespace-nowrap p-0 font-normal leading-none",
          "[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground [&[data-today][data-disabled]]:text-muted-foreground",
          "data-[selected]:bg-primary dark:data-[selected]:hover:bg-accent/50 data-[selected]:text-primary-foreground",
          // Outside months
          "[&[data-outside-month]:not([data-selected])]:text-muted-foreground [&[data-outside-month]:not([data-selected])]:hover:text-accent-foreground",
          // Disabled
          "data-[disabled]:text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          // Unavailable
          "data-[unavailable]:text-muted-foreground data-[unavailable]:line-through",
          // hover
          "dark:hover:text-accent-foreground",
          // focus
          "focus:border-ring focus:ring-ring/50 focus:relative",
          // inner spans
          "[&>span]:text-xs [&>span]:opacity-70",
          className
        )
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_grid$1($$payload2, spread_props([
      {
        class: cn("mt-4 flex w-full border-collapse flex-col gap-1", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_header($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_header$1($$payload2, spread_props([
      {
        class: cn("h-(--cell-size) flex w-full items-center justify-center gap-1.5 text-sm font-medium", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_months($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(cn("relative flex flex-col gap-4 md:flex-row", className)),
      ...restProps
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_row($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_grid_row$1($$payload2, spread_props([
      { class: cn("flex", className) },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_body($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_grid_body$1($$payload2, spread_props([
      { class: cn(className) },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_head($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_grid_head$1($$payload2, spread_props([
      { class: cn(className) },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_head_cell($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_head_cell$1($$payload2, spread_props([
      {
        class: cn("text-muted-foreground w-(--cell-size) rounded-md text-[0.8rem] font-normal", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Icon($$payload, $$props) {
  push();
  const {
    name,
    color = "currentColor",
    size: size2 = 24,
    strokeWidth = 2,
    absoluteStrokeWidth = false,
    iconNode = [],
    children,
    $$slots,
    $$events,
    ...props
  } = $$props;
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    {
      ...defaultAttributes,
      ...props,
      width: size2,
      height: size2,
      stroke: color,
      "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size2) : strokeWidth,
      class: clsx([
        "lucide-icon lucide",
        name && `lucide-${name}`,
        props.class
      ])
    },
    null,
    void 0,
    void 0,
    3
  )}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [tag, attrs] = each_array[$$index];
    element($$payload, tag, () => {
      $$payload.out += `${spread_attributes({ ...attrs }, null, void 0, void 0, 3)}`;
    });
  }
  $$payload.out += `<!--]-->`;
  children?.($$payload);
  $$payload.out += `<!----></svg>`;
  pop();
}
function Chevron_right($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-right" },
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
function Fallback$1($$payload) {
  Chevron_right($$payload, { class: "size-4" });
}
function Calendar_next_button($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    variant = "ghost",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_next_button$1($$payload2, spread_props([
      {
        class: cn(buttonVariants({ variant }), "size-(--cell-size) select-none bg-transparent p-0 disabled:opacity-50 rtl:rotate-180", className),
        children: children || Fallback$1
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Chevron_left($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-left" },
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
function Fallback($$payload) {
  Chevron_left($$payload, { class: "size-4" });
}
function Calendar_prev_button($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    variant = "ghost",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Calendar_prev_button$1($$payload2, spread_props([
      {
        class: cn(buttonVariants({ variant }), "size-(--cell-size) select-none bg-transparent p-0 disabled:opacity-50 rtl:rotate-180", className),
        children: children || Fallback
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Chevron_down($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-down" },
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
function Calendar_month_select($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    value,
    onchange,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<span${attr_class(clsx(cn("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative flex rounded-md border", className)))}><!---->`;
    {
      let child = function($$payload3, { props, monthItems, selectedMonthItem }) {
        const each_array = ensure_array_like(monthItems);
        $$payload3.out += `<select${spread_attributes({ ...props })}>`;
        $$payload3.select_value = { ...props, value }?.value;
        $$payload3.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let monthItem = each_array[$$index];
          $$payload3.out += `<option${attr("value", monthItem.value)}${maybe_selected($$payload3, monthItem.value)}${attr("selected", value !== void 0 ? monthItem.value === value : monthItem.value === selectedMonthItem.value, true)}>${escape_html(monthItem.label)}</option>`;
        }
        $$payload3.out += `<!--]-->`;
        $$payload3.select_value = void 0;
        $$payload3.out += `</select> <span class="[&amp;>svg]:text-muted-foreground flex h-8 select-none items-center gap-1 rounded-md pl-2 pr-1 text-sm font-medium [&amp;>svg]:size-3.5" aria-hidden="true">${escape_html(monthItems.find((item) => item.value === value)?.label || selectedMonthItem.label)} `;
        Chevron_down($$payload3, { class: "size-4" });
        $$payload3.out += `<!----></span>`;
      };
      Calendar_month_select$1($$payload2, spread_props([
        { class: "absolute inset-0 opacity-0" },
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          },
          child,
          $$slots: { child: true }
        }
      ]));
    }
    $$payload2.out += `<!----></span>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_year_select($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    value,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<span${attr_class(clsx(cn("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative flex rounded-md border", className)))}><!---->`;
    {
      let child = function($$payload3, { props, yearItems, selectedYearItem }) {
        const each_array = ensure_array_like(yearItems);
        $$payload3.out += `<select${spread_attributes({ ...props })}>`;
        $$payload3.select_value = { ...props, value }?.value;
        $$payload3.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let yearItem = each_array[$$index];
          $$payload3.out += `<option${attr("value", yearItem.value)}${maybe_selected($$payload3, yearItem.value)}${attr("selected", value !== void 0 ? yearItem.value === value : yearItem.value === selectedYearItem.value, true)}>${escape_html(yearItem.label)}</option>`;
        }
        $$payload3.out += `<!--]-->`;
        $$payload3.select_value = void 0;
        $$payload3.out += `</select> <span class="[&amp;>svg]:text-muted-foreground flex h-8 select-none items-center gap-1 rounded-md pl-2 pr-1 text-sm font-medium [&amp;>svg]:size-3.5" aria-hidden="true">${escape_html(yearItems.find((item) => item.value === value)?.label || selectedYearItem.label)} `;
        Chevron_down($$payload3, { class: "size-4" });
        $$payload3.out += `<!----></span>`;
      };
      Calendar_year_select$1($$payload2, spread_props([
        { class: "absolute inset-0 opacity-0" },
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          },
          child,
          $$slots: { child: true }
        }
      ]));
    }
    $$payload2.out += `<!----></span>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Calendar_month($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      ...restProps,
      class: clsx(cn("flex flex-col", className))
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_nav($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<nav${spread_attributes(
    {
      ...restProps,
      class: clsx(cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", className))
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></nav>`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_caption($$payload, $$props) {
  push();
  let {
    captionLayout,
    months,
    monthFormat,
    years,
    yearFormat,
    month,
    locale,
    placeholder = void 0,
    monthIndex = 0
  } = $$props;
  function formatYear(date) {
    const dateObj = date.toDate(getLocalTimeZone());
    if (typeof yearFormat === "function") return yearFormat(dateObj.getFullYear());
    return new DateFormatter(locale, { year: yearFormat }).format(dateObj);
  }
  function formatMonth(date) {
    const dateObj = date.toDate(getLocalTimeZone());
    if (typeof monthFormat === "function") return monthFormat(dateObj.getMonth() + 1);
    return new DateFormatter(locale, { month: monthFormat }).format(dateObj);
  }
  function MonthSelect($$payload2) {
    Calendar_month_select($$payload2, {
      months,
      monthFormat,
      value: month.month,
      onchange: (e) => {
        if (!placeholder) return;
        const v = Number.parseInt(e.currentTarget.value);
        const newPlaceholder = placeholder.set({ month: v });
        placeholder = newPlaceholder.subtract({ months: monthIndex });
      }
    });
  }
  function YearSelect($$payload2) {
    Calendar_year_select($$payload2, { years, yearFormat, value: month.year });
  }
  if (captionLayout === "dropdown") {
    $$payload.out += "<!--[-->";
    MonthSelect($$payload);
    $$payload.out += `<!----> `;
    YearSelect($$payload);
    $$payload.out += `<!---->`;
  } else if (captionLayout === "dropdown-months") {
    $$payload.out += "<!--[1-->";
    MonthSelect($$payload);
    $$payload.out += `<!----> `;
    if (placeholder) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(formatYear(placeholder))}`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else if (captionLayout === "dropdown-years") {
    $$payload.out += "<!--[2-->";
    if (placeholder) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(formatMonth(placeholder))}`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    YearSelect($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(formatMonth(month))} ${escape_html(formatYear(month))}`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { placeholder });
  pop();
}
function Popover_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    sideOffset = 4,
    align = "center",
    portalProps,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Portal($$payload2, spread_props([
      portalProps,
      {
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Popover_content$1($$payload3, spread_props([
            {
              "data-slot": "popover-content",
              sideOffset,
              align,
              class: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--bits-popover-content-transform-origin) outline-hidden z-50 w-72 rounded-md border p-4 shadow-md", className)
            },
            restProps,
            {
              get ref() {
                return ref;
              },
              set ref($$value) {
                ref = $$value;
                $$settled = false;
              }
            }
          ]));
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Popover_trigger($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Popover_trigger$1($$payload2, spread_props([
      {
        "data-slot": "popover-trigger",
        class: cn("", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const Root = Popover;
function Calendar($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2"
      }
    ],
    ["path", { "d": "M3 10h18" }]
  ];
  Icon($$payload, spread_props([
    { name: "calendar" },
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
function Setup($$payload, $$props) {
  push();
  const userLocale = typeof navigator !== "undefined" ? navigator.language || "en-US" : "en-US";
  const df = new DateFormatter(userLocale, { dateStyle: "long" });
  const now = today(getLocalTimeZone());
  let birthday = new CalendarDate(now.year - 30, 1, 1);
  let lifeExpectancy = 100;
  let contentRef = null;
  let popoverOpen = false;
  function handleDateSelect(date) {
    birthday = date;
    popoverOpen = false;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="min-h-screen bg-gradient-to-b from-background to-background/95 py-12"><div class="container mx-auto px-4 max-w-md">`;
    Card($$payload2, {
      class: "backdrop-blur-sm bg-background/80 border-muted/20 shadow-xl",
      children: ($$payload3) => {
        Card_header($$payload3, {
          class: "space-y-4 pb-8",
          children: ($$payload4) => {
            Card_title($$payload4, {
              class: "text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Your Life Journey`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Card_description($$payload4, {
              class: "text-center text-base",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Visualize your life in weeks and gain a new perspective on time`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Card_content($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<form class="space-y-8"><div class="space-y-4">`;
            Label($$payload4, {
              for: "birthday",
              class: "text-base",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Your Birthday`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Root($$payload4, {
              get open() {
                return popoverOpen;
              },
              set open($$value) {
                popoverOpen = $$value;
                $$settled = false;
              },
              children: ($$payload5) => {
                Popover_trigger($$payload5, {
                  id: "birthday",
                  class: cn(
                    buttonVariants({
                      variant: "outline",
                      class: "w-full h-12 justify-start text-left font-normal text-base hover:bg-muted/50 transition-colors"
                    }),
                    !birthday && "text-muted-foreground"
                  ),
                  children: ($$payload6) => {
                    Calendar($$payload6, { class: "mr-3 h-5 w-5" });
                    $$payload6.out += `<!----> ${escape_html(birthday ? df.format(birthday.toDate(getLocalTimeZone())) : "Pick your birth date")}`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Popover_content($$payload5, {
                  class: "w-auto p-0",
                  align: "center",
                  get ref() {
                    return contentRef;
                  },
                  set ref($$value) {
                    contentRef = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Calendar_1($$payload6, {
                      captionLayout: "dropdown",
                      type: "single",
                      onSelect: handleDateSelect,
                      class: "rounded-lg border shadow-lg",
                      get value() {
                        return birthday;
                      },
                      set value($$value) {
                        birthday = $$value;
                        $$settled = false;
                      }
                    });
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> <div class="space-y-4">`;
            Label($$payload4, {
              for: "lifeExpectancy",
              class: "text-base",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Life Expectancy (years)`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              type: "number",
              id: "lifeExpectancy",
              min: "1",
              max: "120",
              required: true,
              class: "h-12 text-base",
              placeholder: "Enter your expected lifespan",
              get value() {
                return lifeExpectancy;
              },
              set value($$value) {
                lifeExpectancy = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> <p class="text-sm text-muted-foreground">The average life expectancy is around 80 years, but you can adjust this based on your health and lifestyle.</p></div> `;
            Button($$payload4, {
              type: "submit",
              class: "w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300",
              size: "lg",
              disabled: !birthday,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Start My Journey`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></form>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function _page($$payload) {
  Setup($$payload);
}
export {
  _page as default
};
