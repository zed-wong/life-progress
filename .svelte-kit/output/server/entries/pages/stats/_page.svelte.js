import "clsx";
import { a1 as store_get, D as escape_html, P as ensure_array_like, W as attr_class, Q as attr, G as clsx, a2 as stringify, a3 as unsubscribe_stores, y as pop, w as push } from "../../../chunks/index.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content, d as cn } from "../../../chunks/card-title.js";
import { u as userDataStore } from "../../../chunks/stores.js";
function LifeProgressGrid($$payload, $$props) {
  push();
  var $$store_subs;
  const userData = store_get($$store_subs ??= {}, "$userDataStore", userDataStore);
  const birthday = userData?.birthday || "1990-01-01";
  const lifeExpectancy = userData?.lifeExpectancy || 100;
  const weeksLived = Math.floor((Date.now() - new Date(birthday).getTime()) / (7 * 24 * 60 * 60 * 1e3));
  const weeksLeft = lifeExpectancy * 52 - weeksLived;
  const totalWeeks = lifeExpectancy * 52;
  const lifeProgress = weeksLived / totalWeeks * 100;
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
  $$payload.out += `<div class="min-h-screen bg-gradient-to-b from-background to-background/95 py-12"><div class="container mx-auto px-4 max-w-7xl">`;
  Card($$payload, {
    class: "backdrop-blur-sm bg-background/80 border-muted/20 shadow-xl",
    children: ($$payload2) => {
      Card_header($$payload2, {
        class: "space-y-6 pb-8",
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex flex-col items-center gap-6">`;
          Card_title($$payload3, {
            class: "text-center text-2xl font-bold flex flex-col items-center gap-3",
            children: ($$payload4) => {
              $$payload4.out += `<span class="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">${escape_html(lifeProgress.toFixed(1))}%</span> <div class="flex flex-col items-center gap-1 text-muted-foreground"><span class="text-lg">${escape_html(weeksLived.toLocaleString())} weeks lived</span> <span class="text-sm">${escape_html(weeksLeft.toLocaleString())} weeks remaining</span></div>`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----></div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        children: ($$payload3) => {
          const each_array = ensure_array_like(Array.from({ length: Math.ceil(totalWeeks / 52) }, (_, i) => i));
          const each_array_1 = ensure_array_like(weeks);
          $$payload3.out += `<div class="overflow-x-auto"><div class="overflow-x-auto"><div class="flex justify-center"><div class="flex flex-col justify-around pr-4 text-xs text-muted-foreground font-medium"><!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let year = each_array[$$index];
            $$payload3.out += `<div class="h-3 flex items-center">`;
            if (year % 5 === 0) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<span class="bg-background/80 px-2 py-0.5 rounded-full">${escape_html(year)}</span>`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--></div>`;
          }
          $$payload3.out += `<!--]--></div> <div class="grid grid-cols-52 gap-[2px] w-fit bg-muted/10 p-4 rounded-xl shadow-inner"><!--[-->`;
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let week = each_array_1[$$index_1];
            $$payload3.out += `<div${attr_class(clsx(cn("w-3 h-3 rounded-md transition-all duration-300 hover:scale-150 hover:shadow-lg hover:z-10", week.classes)))}${attr("title", `Week ${stringify(week.index + 1)} (Year ${stringify(Math.floor(week.index / 52))})`)}></div>`;
          }
          $$payload3.out += `<!--]--></div></div></div></div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload) {
  LifeProgressGrid($$payload);
}
export {
  _page as default
};
