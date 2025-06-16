import { z as head, A as slot, y as pop, w as push } from "../../chunks/index.js";
import "clsx";
function TopBar($$payload) {
  $$payload.out += `<nav class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"><div class="container mx-auto px-4"><div class="flex h-16 items-center"><a href="/" class="text-lg font-semibold">Life Progress</a></div></div></nav>`;
}
function _layout($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Your Life in Weeks</title>`;
    $$payload2.out += `<meta name="description" content="Visualize your life journey in weeks - gain perspective and make the most of your time"/> <link rel="manifest" href="/manifest.json"/> <meta name="theme-color" content="#ffffff"/> <meta name="apple-mobile-web-app-capable" content="yes"/> <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/> <meta name="apple-mobile-web-app-title" content="Life Progress"/> <link rel="apple-touch-icon" href="/icons/icon-192x192.png"/> <meta name="format-detection" content="telephone=no"/>`;
  });
  $$payload.out += `<div class="min-h-screen bg-background">`;
  TopBar($$payload);
  $$payload.out += `<!----> <main class="container h-[calc(100vh-100px)] mx-auto"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></main></div>`;
  pop();
}
export {
  _layout as default
};
