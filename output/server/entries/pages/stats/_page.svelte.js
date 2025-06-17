import "clsx";
import { J as spread_attributes, K as clsx, M as bind_props, y as pop, w as push, N as derived, O as run, P as props_id, z as spread_props, S as copy_payload, T as assign_payload, V as store_get, I as escape_html, Q as ensure_array_like, D as attr_class, A as attr, E as stringify, W as unsubscribe_stores } from "../../../chunks/index.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../chunks/card-title.js";
import { c as cn, b as buttonVariants, B as Button } from "../../../chunks/button.js";
import { u as userDataStore } from "../../../chunks/stores.js";
import { g as goto } from "../../../chunks/client.js";
import { C as Context, O as OpenChangeComplete, s as box, c as createBitsAttrs, S as SPACE, E as ENTER, L as getDataOpenClosed, l as attachRef, M as getAriaExpanded, r as noop, x as createId, v as mergeProps, P as Presence_layer, H as Focus_scope, a as afterTick, I as Escape_layer, J as Dismissible_layer, T as Text_selection_layer, G as Scroll_lock, N as Portal } from "../../../chunks/scroll-lock.js";
import "style-to-object";
function Card_footer($$payload, $$props) {
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
      "data-slot": "card-footer",
      class: clsx(cn("[.border-t]:pt-6 flex items-center px-6", className)),
      ...restProps
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
const dialogAttrs = createBitsAttrs({
  component: "dialog",
  parts: [
    "content",
    "trigger",
    "overlay",
    "title",
    "description",
    "close",
    "cancel",
    "action"
  ]
});
const DialogRootContext = new Context("Dialog.Root | AlertDialog.Root");
class DialogRootState {
  static create(opts) {
    return DialogRootContext.set(new DialogRootState(opts));
  }
  opts;
  triggerNode = null;
  contentNode = null;
  descriptionNode = null;
  contentId = void 0;
  titleId = void 0;
  triggerId = void 0;
  descriptionId = void 0;
  cancelNode = null;
  constructor(opts) {
    this.opts = opts;
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    new OpenChangeComplete({
      ref: box.with(() => this.contentNode),
      open: this.opts.open,
      enabled: true,
      onComplete: () => {
        this.opts.onOpenChangeComplete.current(this.opts.open.current);
      }
    });
  }
  handleOpen() {
    if (this.opts.open.current) return;
    this.opts.open.current = true;
  }
  handleClose() {
    if (!this.opts.open.current) return;
    this.opts.open.current = false;
  }
  getBitsAttr = (part) => {
    return dialogAttrs.getAttr(part, this.opts.variant.current);
  };
  #sharedProps = derived(() => ({
    "data-state": getDataOpenClosed(this.opts.open.current)
  }));
  get sharedProps() {
    return this.#sharedProps();
  }
  set sharedProps($$value) {
    return this.#sharedProps($$value);
  }
}
class DialogTriggerState {
  static create(opts) {
    return new DialogTriggerState(opts, DialogRootContext.get());
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
    if (e.button > 0) return;
    this.root.handleOpen();
  }
  onkeydown(e) {
    if (this.opts.disabled.current) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.root.handleOpen();
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "aria-haspopup": "dialog",
    "aria-expanded": getAriaExpanded(this.root.opts.open.current),
    "aria-controls": this.root.contentId,
    [this.root.getBitsAttr("trigger")]: "",
    onkeydown: this.onkeydown,
    onclick: this.onclick,
    disabled: this.opts.disabled.current ? true : void 0,
    ...this.root.sharedProps,
    ...attachRef(this.opts.ref, (v) => run(() => {
      this.root.triggerNode = v;
      this.root.triggerId = v?.id;
    }))
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class DialogActionState {
  static create(opts) {
    return new DialogActionState(opts, DialogRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    [this.root.getBitsAttr("action")]: "",
    ...this.root.sharedProps,
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class DialogTitleState {
  static create(opts) {
    return new DialogTitleState(opts, DialogRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "heading",
    "aria-level": this.opts.level.current,
    [this.root.getBitsAttr("title")]: "",
    ...this.root.sharedProps,
    ...attachRef(this.opts.ref, (v) => this.root.titleId = v?.id)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class DialogDescriptionState {
  static create(opts) {
    return new DialogDescriptionState(opts, DialogRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    [this.root.getBitsAttr("description")]: "",
    ...this.root.sharedProps,
    ...attachRef(this.opts.ref, (v) => {
      this.root.descriptionNode = v;
      this.root.descriptionId = v?.id;
    })
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class DialogContentState {
  static create(opts) {
    return new DialogContentState(opts, DialogRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
  }
  #snippetProps = derived(() => ({ open: this.root.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: this.root.opts.variant.current === "alert-dialog" ? "alertdialog" : "dialog",
    "aria-modal": "true",
    "aria-describedby": this.root.descriptionId,
    "aria-labelledby": this.root.titleId,
    [this.root.getBitsAttr("content")]: "",
    style: {
      pointerEvents: "auto",
      outline: this.root.opts.variant.current === "alert-dialog" ? "none" : void 0
    },
    tabindex: this.root.opts.variant.current === "alert-dialog" ? -1 : void 0,
    ...this.root.sharedProps,
    ...attachRef(this.opts.ref, (v) => {
      this.root.contentNode = v;
      this.root.contentId = v?.id;
    })
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class DialogOverlayState {
  static create(opts) {
    return new DialogOverlayState(opts, DialogRootContext.get());
  }
  opts;
  root;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
  }
  #snippetProps = derived(() => ({ open: this.root.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    [this.root.getBitsAttr("overlay")]: "",
    style: { pointerEvents: "auto" },
    ...this.root.sharedProps,
    ...attachRef(this.opts.ref)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class AlertDialogCancelState {
  static create(opts) {
    return new AlertDialogCancelState(opts, DialogRootContext.get());
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
    if (e.button > 0) return;
    this.root.handleClose();
  }
  onkeydown(e) {
    if (this.opts.disabled.current) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.root.handleClose();
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    [this.root.getBitsAttr("cancel")]: "",
    onclick: this.onclick,
    onkeydown: this.onkeydown,
    tabindex: 0,
    ...this.root.sharedProps,
    ...attachRef(this.opts.ref, (v) => this.root.cancelNode = v)
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function Alert_dialog($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop,
    onOpenChangeComplete = noop,
    children
  } = $$props;
  DialogRootState.create({
    variant: box.with(() => "alert-dialog"),
    open: box.with(() => open, (v) => {
      open = v;
      onOpenChange(v);
    }),
    onOpenChangeComplete: box.with(() => onOpenChangeComplete)
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { open });
  pop();
}
function Dialog_title($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    child,
    children,
    level = 2,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const titleState = DialogTitleState.create({
    id: box.with(() => id),
    level: box.with(() => level),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, titleState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_action$1($$payload, $$props) {
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
  const actionState = DialogActionState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, actionState.props);
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
function Alert_dialog_cancel$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    children,
    child,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const cancelState = AlertDialogCancelState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, cancelState.props);
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
function shouldTrapFocus({ forceMount, present, trapFocus, open }) {
  if (forceMount)
    return open && trapFocus;
  return present && trapFocus && open;
}
function Alert_dialog_content$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    children,
    child,
    ref = null,
    forceMount = false,
    interactOutsideBehavior = "ignore",
    onCloseAutoFocus = noop,
    onEscapeKeydown = noop,
    onOpenAutoFocus = noop,
    onInteractOutside = noop,
    preventScroll = true,
    trapFocus = true,
    restoreScrollDelay = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = DialogContentState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  {
    let presence = function($$payload2) {
      {
        let focusScope = function($$payload3, { props: focusScopeProps }) {
          Escape_layer($$payload3, spread_props([
            mergedProps,
            {
              enabled: contentState.root.opts.open.current,
              ref: contentState.opts.ref,
              onEscapeKeydown: (e) => {
                onEscapeKeydown(e);
                if (e.defaultPrevented) return;
                contentState.root.handleClose();
              },
              children: ($$payload4) => {
                Dismissible_layer($$payload4, spread_props([
                  mergedProps,
                  {
                    ref: contentState.opts.ref,
                    enabled: contentState.root.opts.open.current,
                    interactOutsideBehavior,
                    onInteractOutside: (e) => {
                      onInteractOutside(e);
                      if (e.defaultPrevented) return;
                      contentState.root.handleClose();
                    },
                    children: ($$payload5) => {
                      Text_selection_layer($$payload5, spread_props([
                        mergedProps,
                        {
                          ref: contentState.opts.ref,
                          enabled: contentState.root.opts.open.current,
                          children: ($$payload6) => {
                            if (child) {
                              $$payload6.out += "<!--[-->";
                              if (contentState.root.opts.open.current) {
                                $$payload6.out += "<!--[-->";
                                Scroll_lock($$payload6, { preventScroll, restoreScrollDelay });
                              } else {
                                $$payload6.out += "<!--[!-->";
                              }
                              $$payload6.out += `<!--]--> `;
                              child($$payload6, {
                                props: mergeProps(mergedProps, focusScopeProps),
                                ...contentState.snippetProps
                              });
                              $$payload6.out += `<!---->`;
                            } else {
                              $$payload6.out += "<!--[!-->";
                              Scroll_lock($$payload6, { preventScroll });
                              $$payload6.out += `<!----> <div${spread_attributes(
                                {
                                  ...mergeProps(mergedProps, focusScopeProps)
                                }
                              )}>`;
                              children?.($$payload6);
                              $$payload6.out += `<!----></div>`;
                            }
                            $$payload6.out += `<!--]-->`;
                          },
                          $$slots: { default: true }
                        }
                      ]));
                    },
                    $$slots: { default: true }
                  }
                ]));
              },
              $$slots: { default: true }
            }
          ]));
        };
        Focus_scope($$payload2, {
          ref: contentState.opts.ref,
          loop: true,
          trapFocus: shouldTrapFocus({
            forceMount,
            present: contentState.root.opts.open.current,
            trapFocus,
            open: contentState.root.opts.open.current
          }),
          id,
          onCloseAutoFocus: (e) => {
            onCloseAutoFocus(e);
            if (e.defaultPrevented) return;
            contentState.root.triggerNode?.focus();
          },
          onOpenAutoFocus: (e) => {
            onOpenAutoFocus(e);
            if (e.defaultPrevented) return;
            e.preventDefault();
            afterTick(() => {
              contentState.opts.ref.current?.focus();
            });
          },
          focusScope
        });
      }
    };
    Presence_layer($$payload, {
      forceMount,
      open: contentState.root.opts.open.current || forceMount,
      ref: contentState.opts.ref,
      presence
    });
  }
  bind_props($$props, { ref });
  pop();
}
function Dialog_overlay($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    forceMount = false,
    child,
    children,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const overlayState = DialogOverlayState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, overlayState.props);
  {
    let presence = function($$payload2) {
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, {
          props: mergeProps(mergedProps),
          ...overlayState.snippetProps
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div${spread_attributes({ ...mergeProps(mergedProps) })}>`;
        children?.($$payload2, overlayState.snippetProps);
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]-->`;
    };
    Presence_layer($$payload, {
      open: overlayState.root.opts.open.current || forceMount,
      ref: overlayState.opts.ref,
      presence
    });
  }
  bind_props($$props, { ref });
  pop();
}
function Dialog_trigger($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    children,
    child,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = DialogTriggerState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, triggerState.props);
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
function Dialog_description($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    children,
    child,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const descriptionState = DialogDescriptionState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, descriptionState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_trigger($$payload, $$props) {
  push();
  let { ref = null, $$slots, $$events, ...restProps } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_trigger($$payload2, spread_props([
      { "data-slot": "alert-dialog-trigger" },
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
function Alert_dialog_title($$payload, $$props) {
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
    Dialog_title($$payload2, spread_props([
      {
        "data-slot": "alert-dialog-title",
        class: cn("text-lg font-semibold", className)
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
function Alert_dialog_action($$payload, $$props) {
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
    Alert_dialog_action$1($$payload2, spread_props([
      {
        "data-slot": "alert-dialog-action",
        class: cn(buttonVariants(), className)
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
function Alert_dialog_cancel($$payload, $$props) {
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
    Alert_dialog_cancel$1($$payload2, spread_props([
      {
        "data-slot": "alert-dialog-cancel",
        class: cn(buttonVariants({ variant: "outline" }), className)
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
function Alert_dialog_footer($$payload, $$props) {
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
      "data-slot": "alert-dialog-footer",
      class: clsx(cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)),
      ...restProps
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_header($$payload, $$props) {
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
      "data-slot": "alert-dialog-header",
      class: clsx(cn("flex flex-col gap-2 text-center sm:text-left", className)),
      ...restProps
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_overlay($$payload, $$props) {
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
    Dialog_overlay($$payload2, spread_props([
      {
        "data-slot": "alert-dialog-overlay",
        class: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className)
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
function Alert_dialog_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
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
          Alert_dialog_overlay($$payload3, {});
          $$payload3.out += `<!----> <!---->`;
          Alert_dialog_content$1($$payload3, spread_props([
            {
              "data-slot": "alert-dialog-content",
              class: cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className)
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
function Alert_dialog_description($$payload, $$props) {
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
    Dialog_description($$payload2, spread_props([
      {
        "data-slot": "alert-dialog-description",
        class: cn("text-muted-foreground text-sm", className)
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
const Root = Alert_dialog;
function LifeProgressGrid($$payload, $$props) {
  push();
  var $$store_subs;
  const userData = store_get($$store_subs ??= {}, "$userDataStore", userDataStore);
  const birthday = userData?.birthday;
  const lifeExpectancy = userData?.lifeExpectancy;
  function handleReset() {
    userDataStore.set(null);
    goto();
  }
  const weeksLived = birthday ? Math.floor((Date.now() - new Date(birthday).getTime()) / (7 * 24 * 60 * 60 * 1e3)) : 0;
  const weeksLeft = lifeExpectancy ? lifeExpectancy * 52 - weeksLived : 0;
  const totalWeeks = lifeExpectancy ? lifeExpectancy * 52 : 0;
  const lifeProgress = totalWeeks ? weeksLived / totalWeeks * 100 : 0;
  const colorPeriods = [
    {
      start: 0,
      end: 9,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      pastColor: "bg-gradient-to-br from-blue-400 to-blue-600",
      futureColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
      start: 10,
      end: 19,
      color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      pastColor: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      futureColor: "bg-emerald-50 dark:bg-emerald-950/30"
    },
    {
      start: 20,
      end: 29,
      color: "bg-gradient-to-br from-amber-400 to-amber-600",
      pastColor: "bg-gradient-to-br from-amber-400 to-amber-600",
      futureColor: "bg-amber-50 dark:bg-amber-950/30"
    },
    {
      start: 30,
      end: 39,
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
      pastColor: "bg-gradient-to-br from-orange-400 to-orange-600",
      futureColor: "bg-orange-50 dark:bg-orange-950/30"
    },
    {
      start: 40,
      end: 49,
      color: "bg-gradient-to-br from-rose-400 to-rose-600",
      pastColor: "bg-gradient-to-br from-rose-400 to-rose-600",
      futureColor: "bg-rose-50 dark:bg-rose-950/30"
    },
    {
      start: 50,
      end: 59,
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      pastColor: "bg-gradient-to-br from-purple-400 to-purple-600",
      futureColor: "bg-purple-50 dark:bg-purple-950/30"
    },
    {
      start: 60,
      end: 69,
      color: "bg-gradient-to-br from-cyan-400 to-cyan-600",
      pastColor: "bg-gradient-to-br from-cyan-400 to-cyan-600",
      futureColor: "bg-cyan-50 dark:bg-cyan-950/30"
    },
    {
      start: 70,
      end: 79,
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
      pastColor: "bg-gradient-to-br from-pink-400 to-pink-600",
      futureColor: "bg-pink-50 dark:bg-pink-950/30"
    },
    {
      start: 80,
      end: 89,
      color: "bg-gradient-to-br from-teal-400 to-teal-600",
      pastColor: "bg-gradient-to-br from-teal-400 to-teal-600",
      futureColor: "bg-teal-50 dark:bg-teal-950/30"
    },
    {
      start: 90,
      end: 99,
      color: "bg-gradient-to-br from-violet-400 to-violet-600",
      pastColor: "bg-gradient-to-br from-violet-400 to-violet-600",
      futureColor: "bg-violet-50 dark:bg-violet-950/30"
    }
  ];
  function getWeekClasses(weekIndex) {
    const year = Math.floor(weekIndex / 52);
    const period = colorPeriods.find((p) => year >= p.start && year <= p.end);
    if (!period) return "bg-gray-50 dark:bg-gray-900/30";
    const isPast = weekIndex < weeksLived;
    return isPast ? period.pastColor : period.futureColor;
  }
  const weeks = Array.from({ length: totalWeeks }, (_, i) => ({ index: i, classes: getWeekClasses(i) }));
  if (userData) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="min-h-screen bg-gradient-to-b from-background to-background/95 py-4 sm:py-12 pt-[env(safe-area-inset-top)] px-[env(safe-area-inset-left)] pb-[env(safe-area-inset-bottom)]"><div class="container mx-auto px-2 sm:px-4">`;
    Card($$payload, {
      class: "backdrop-blur-sm bg-background/80 border-muted/20 shadow-xl py-4",
      children: ($$payload2) => {
        Card_header($$payload2, {
          class: "space-y-4 pb-4 sm:pb-8 pt-2 sm:pt-4",
          children: ($$payload3) => {
            $$payload3.out += `<div class="flex flex-col items-center gap-4 sm:gap-6">`;
            Card_title($$payload3, {
              class: "text-center text-xl sm:text-2xl font-bold flex flex-col items-center gap-2 sm:gap-3",
              children: ($$payload4) => {
                $$payload4.out += `<span class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-6">${escape_html(lifeProgress.toFixed(1))}%</span> <div class="flex flex-col items-center gap-1 text-muted-foreground"><span class="text-xs sm:text-sm">${escape_html(weeksLived.toLocaleString())} weeks lived</span> <span class="text-xs sm:text-sm">${escape_html(weeksLeft.toLocaleString())} weeks remaining</span></div>`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----></div>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> `;
        Card_content($$payload2, {
          class: "p-2 sm:p-4",
          children: ($$payload3) => {
            const each_array = ensure_array_like(Array.from({ length: Math.ceil(totalWeeks / 52) }, (_, i) => i));
            const each_array_1 = ensure_array_like(weeks);
            $$payload3.out += `<div class="flex flex-col gap-4"><div class="flex flex-col gap-2"><div class="flex items-center justify-between"><h3 class="text-sm sm:text-base font-medium">Your Life in Weeks</h3> <div class="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"><div class="flex items-center gap-1"><div class="w-2 h-2 rounded-sm bg-primary"></div> <span>Lived</span></div> <div class="flex items-center gap-1"><div class="w-2 h-2 rounded-sm bg-muted"></div> <span>Remaining</span></div></div></div> <div class="relative overflow-x-auto -mx-2 sm:mx-0"><div class="flex gap-2 min-w-max px-2 sm:px-0"><div class="flex flex-col justify-around pr-2 sm:pr-4 text-[10px] sm:text-xs text-muted-foreground font-medium"><!--[-->`;
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let year = each_array[$$index];
              $$payload3.out += `<div class="h-2 sm:h-3 flex items-center">`;
              if (year % 5 === 0) {
                $$payload3.out += "<!--[-->";
                $$payload3.out += `<span class="bg-background/80 px-1 sm:px-2 py-0.5 rounded-full">${escape_html(year)}</span>`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--></div>`;
            }
            $$payload3.out += `<!--]--></div> <div class="grid grid-cols-52 gap-[1px] sm:gap-[2px] w-fit bg-muted/10 p-2 sm:p-4 rounded-xl shadow-inner"><!--[-->`;
            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
              let week = each_array_1[$$index_1];
              $$payload3.out += `<div${attr_class(clsx(cn("w-2 h-2 sm:w-3 sm:h-3 rounded-sm sm:rounded-md transition-all duration-300 hover:scale-150 hover:shadow-lg hover:z-10", week.classes)))}${attr("title", `Week ${stringify(week.index + 1)} (Year ${stringify(Math.floor(week.index / 52))})`)}></div>`;
            }
            $$payload3.out += `<!--]--></div></div></div></div></div>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> `;
        Card_footer($$payload2, {
          class: "flex justify-end border-t pt-4 sm:pt-6 px-4 sm:px-6",
          children: ($$payload3) => {
            Root($$payload3, {
              children: ($$payload4) => {
                Alert_dialog_trigger($$payload4, {
                  children: ($$payload5) => {
                    Button($$payload5, {
                      variant: "outline",
                      class: "text-muted-foreground hover:text-destructive text-sm sm:text-base",
                      children: ($$payload6) => {
                        $$payload6.out += `<!---->Reset Data`;
                      },
                      $$slots: { default: true }
                    });
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----> `;
                Alert_dialog_content($$payload4, {
                  class: "w-[95vw] max-w-md mx-2 sm:mx-auto",
                  children: ($$payload5) => {
                    Alert_dialog_header($$payload5, {
                      children: ($$payload6) => {
                        Alert_dialog_title($$payload6, {
                          class: "text-lg sm:text-xl",
                          children: ($$payload7) => {
                            $$payload7.out += `<!---->Reset Your Data?`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!----> `;
                        Alert_dialog_description($$payload6, {
                          class: "text-sm sm:text-base",
                          children: ($$payload7) => {
                            $$payload7.out += `<!---->This will clear your current life journey data and take you back to the setup page. This action cannot be undone.`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload5.out += `<!----> `;
                    Alert_dialog_footer($$payload5, {
                      class: "gap-2 sm:gap-3",
                      children: ($$payload6) => {
                        Alert_dialog_cancel($$payload6, {
                          class: "text-sm sm:text-base",
                          children: ($$payload7) => {
                            $$payload7.out += `<!---->Cancel`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!----> `;
                        Alert_dialog_action($$payload6, {
                          class: "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-sm sm:text-base",
                          onclick: handleReset,
                          children: ($$payload7) => {
                            $$payload7.out += `<!---->Reset`;
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
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload) {
  LifeProgressGrid($$payload);
}
export {
  _page as default
};
