export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","manifest.json","service-worker.js"]),
	mimeTypes: {".png":"image/png",".json":"application/json",".js":"text/javascript"},
	_: {
		client: {start:"_app/immutable/entry/start.BkExnqG-.js",app:"_app/immutable/entry/app.BtXvUBfk.js",imports:["_app/immutable/entry/start.BkExnqG-.js","_app/immutable/chunks/DZVqBnPh.js","_app/immutable/chunks/BZ5df_zS.js","_app/immutable/entry/app.BtXvUBfk.js","_app/immutable/chunks/BZ5df_zS.js","_app/immutable/chunks/CjeRv1GZ.js","_app/immutable/chunks/DUwy4pNv.js","_app/immutable/chunks/CkGTUoNe.js","_app/immutable/chunks/BRRm81vI.js","_app/immutable/chunks/B8-Ek0X9.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/setup",
				pattern: /^\/setup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/stats",
				pattern: /^\/stats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
