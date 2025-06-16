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
		client: {start:"_app/immutable/entry/start.BeXBc-2e.js",app:"_app/immutable/entry/app.D9TAvCwh.js",imports:["_app/immutable/entry/start.BeXBc-2e.js","_app/immutable/chunks/CEnHubyn.js","_app/immutable/chunks/tTZFMyAP.js","_app/immutable/chunks/DWC-V1wo.js","_app/immutable/chunks/a6Uz_wLh.js","_app/immutable/entry/app.D9TAvCwh.js","_app/immutable/chunks/tTZFMyAP.js","_app/immutable/chunks/BME1a6OC.js","_app/immutable/chunks/GnSoj_qc.js","_app/immutable/chunks/UJ4YTwLa.js","_app/immutable/chunks/DoPv7fNm.js","_app/immutable/chunks/a6Uz_wLh.js","_app/immutable/chunks/DF1ALDou.js","_app/immutable/chunks/DWC-V1wo.js","_app/immutable/chunks/BttyRCdn.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
