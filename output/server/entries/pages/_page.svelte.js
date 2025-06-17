import "clsx";
import { y as pop, w as push } from "../../chunks/index.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../chunks/card-title.js";
import { C as Card_description } from "../../chunks/card-description.js";
import { B as Button } from "../../chunks/button.js";
import { g as goto } from "../../chunks/client.js";
function Landing($$payload, $$props) {
  push();
  function handleStart() {
    goto();
  }
  $$payload.out += `<div class="mx-auto flex items-center justify-center h-full p-4">`;
  Card($$payload, {
    class: "w-full max-w-2xl",
    children: ($$payload2) => {
      Card_header($$payload2, {
        class: "text-center",
        children: ($$payload3) => {
          Card_title($$payload3, {
            class: "text-4xl font-bold mb-4",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Your Life in Weeks`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card_description($$payload3, {
            class: "text-lg",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Visualize your life journey in a simple, powerful way. See your past, present, and future laid out in weeks, helping you gain perspective and make the most of your time.`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        class: "flex justify-center pt-6",
        children: ($$payload3) => {
          Button($$payload3, {
            size: "lg",
            onclick: handleStart,
            class: "text-lg px-8 py-6",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Visualize Your Life`;
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
  $$payload.out += `<!----></div>`;
  pop();
}
function _page($$payload) {
  Landing($$payload);
}
export {
  _page as default
};
