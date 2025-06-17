import "clsx";
import { w as push, J as spread_attributes, K as clsx, M as bind_props, y as pop, N as derived, O as run, P as props_id, I as escape_html, Q as ensure_array_like, A as attr, R as maybe_selected, z as spread_props, S as copy_payload, T as assign_payload, D as attr_class } from "../../../chunks/index.js";
import { c as cn, b as buttonVariants, B as Button } from "../../../chunks/button.js";
import "../../../chunks/client.js";
import { c as createSubscriber } from "../../../chunks/stores.js";
import { d as defaultWindow, c as createBitsAttrs, w as watch, a as afterTick, A as ARROW_DOWN, b as ARROW_UP, e as ARROW_LEFT, f as ARROW_RIGHT, E as ENTER, S as SPACE, i as isHTMLElement, g as isBrowser, h as getDataReadonly, j as getDataDisabled, k as getDataInvalid, C as Context, u as useId, D as DOMContext, l as attachRef, m as getDataSelected, n as getDataUnavailable, o as getAriaDisabled, p as getAriaSelected, q as getAriaReadonly, r as noop, s as box, t as resolveLocaleProp, v as mergeProps, x as createId, y as cssToStyleObj, z as isNotNull, B as styleToString, F as getWindow, G as Scroll_lock, H as Focus_scope, I as Escape_layer, J as Dismissible_layer, T as Text_selection_layer, P as Presence_layer, O as OpenChangeComplete, K as isElement, L as getDataOpenClosed, M as getAriaExpanded, N as Portal } from "../../../chunks/scroll-lock.js";
import "style-to-object";
import { CalendarDateTime, CalendarDate, getLocalTimeZone, ZonedDateTime, parseZonedDateTime, parseDateTime, parseDate, toCalendar, getDayOfWeek, DateFormatter, startOfMonth, endOfMonth, isSameDay, isSameMonth, isToday, isEqualMonth, today } from "@internationalized/date";
import { I as Icon } from "../../../chunks/Icon.js";
import { computePosition, offset, shift, flip, size, arrow, hide, limitShift } from "@floating-ui/dom";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../chunks/card-title.js";
import { C as Card_description } from "../../../chunks/card-description.js";
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
function isFunction(value) {
  return typeof value === "function";
}
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
    const element = get$1(this.#node);
    if (!element || !this.#window) {
      return;
    }
    const offsetWidth = element.offsetWidth;
    const offsetHeight = element.offsetHeight;
    if (this.#options.box === "border-box") {
      return { width: offsetWidth, height: offsetHeight };
    }
    const style = this.#window.getComputedStyle(element);
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
  const element = daysInView[0];
  const value = element?.getAttribute("data-value");
  const type = element?.getAttribute("data-type");
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
function getDPR(element) {
  if (typeof window === "undefined") return 1;
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
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
    isValidEvent = () => false,
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
                  isValidEvent,
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
    isValidEvent = () => false,
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
          isValidEvent,
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
    isValidEvent = () => false,
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
      isValidEvent,
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
  let birthday = new CalendarDate(now.year - 30, now.month, now.day);
  let lifeExpectancy = 100;
  let contentRef = null;
  let popoverOpen = false;
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
                      ref: contentRef,
                      locale: userLocale,
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
