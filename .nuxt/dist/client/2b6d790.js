/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{311:function(t,e,n){"use strict";(function(t,r){n.d(e,"a",(function(){return d})),n.d(e,"b",(function(){return m})),n.d(e,"c",(function(){return h})),n.d(e,"d",(function(){return _})),n.d(e,"e",(function(){return w})),n.d(e,"f",(function(){return c})),n.d(e,"g",(function(){return l}));const o=function(t){const e=[];let p=0;for(let i=0;i<t.length;i++){let n=t.charCodeAt(i);n<128?e[p++]=n:n<2048?(e[p++]=n>>6|192,e[p++]=63&n|128):55296==(64512&n)&&i+1<t.length&&56320==(64512&t.charCodeAt(i+1))?(n=65536+((1023&n)<<10)+(1023&t.charCodeAt(++i)),e[p++]=n>>18|240,e[p++]=n>>12&63|128,e[p++]=n>>6&63|128,e[p++]=63&n|128):(e[p++]=n>>12|224,e[p++]=n>>6&63|128,e[p++]=63&n|128)}return e};function c(){return"object"==typeof indexedDB}function l(){return new Promise(((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(r);o.onsuccess=()=>{o.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},o.onupgradeneeded=()=>{n=!1},o.onerror=()=>{var t;e((null===(t=o.error)||void 0===t?void 0:t.message)||"")}}catch(t){e(t)}}))}function h(){return!("undefined"==typeof navigator||!navigator.cookieEnabled)}class d{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"==typeof t&&(this.promise.catch((()=>{})),1===t.length?t(e):t(e,n))}}}class f extends Error{constructor(code,t,e){super(t),this.code=code,this.customData=e,this.name="FirebaseError",Object.setPrototypeOf(this,f.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,m.prototype.create)}}class m{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(code,...data){const t=data[0]||{},e=`${this.service}/${code}`,template=this.errors[code],n=template?function(template,data){return template.replace(v,((t,e)=>{const n=data[e];return null!=n?String(n):`<${e}?>`}))}(template,t):"Error",r=`${this.serviceName}: ${n} (${e}).`;return new f(e,r,t)}}const v=/\{\$([^}]+)}/g;function _(a,b){if(a===b)return!0;const t=Object.keys(a),e=Object.keys(b);for(const n of t){if(!e.includes(n))return!1;const t=a[n],r=b[n];if(E(t)&&E(r)){if(!_(t,r))return!1}else if(t!==r)return!1}for(const n of e)if(!t.includes(n))return!1;return!0}function E(t){return null!==t&&"object"==typeof t}function w(t){return t&&t._delegate?t._delegate:t}}).call(this,n(27),n(135))},361:function(t,e,n){"use strict";(function(t,r){n.d(e,"a",(function(){return c}));const o=function(t){const e=[];let p=0;for(let i=0;i<t.length;i++){let n=t.charCodeAt(i);n<128?e[p++]=n:n<2048?(e[p++]=n>>6|192,e[p++]=63&n|128):55296==(64512&n)&&i+1<t.length&&56320==(64512&t.charCodeAt(i+1))?(n=65536+((1023&n)<<10)+(1023&t.charCodeAt(++i)),e[p++]=n>>18|240,e[p++]=n>>12&63|128,e[p++]=n>>6&63|128,e[p++]=63&n|128):(e[p++]=n>>12|224,e[p++]=n>>6&63|128,e[p++]=63&n|128)}return e};class c{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"==typeof t&&(this.promise.catch((()=>{})),1===t.length?t(e):t(e,n))}}}Error}).call(this,n(27),n(135))},370:function(t,e,n){"use strict";n.r(e);var r=n(274);n(361);class o{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}var c=n(311);const l=[];var h;!function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"}(h||(h={}));const d={debug:h.DEBUG,verbose:h.VERBOSE,info:h.INFO,warn:h.WARN,error:h.ERROR,silent:h.SILENT},f=h.INFO,m={[h.DEBUG]:"log",[h.VERBOSE]:"log",[h.INFO]:"info",[h.WARN]:"warn",[h.ERROR]:"error"},v=(t,e,...n)=>{if(e<t.logLevel)return;const r=(new Date).toISOString(),o=m[e];if(!o)throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);console[o](`[${r}]  ${t.name}:`,...n)};var _=n(275);class E{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}n(278);const w="@firebase/performance",I="0.5.17",T=I,y="FB-PERF-TRACE-MEASURE",S="_wt_",R="_fcp",A="_fid",N="@firebase/performance/config",O="@firebase/performance/configexpire",M="Performance",k={"trace started":"Trace {$traceName} was started before.","trace stopped":"Trace {$traceName} is not running.","nonpositive trace startTime":"Trace {$traceName} startTime should be positive.","nonpositive trace duration":"Trace {$traceName} duration should be positive.","no window":"Window is not available.","no app id":"App id is not available.","no project id":"Project id is not available.","no api key":"Api key is not available.","invalid cc log":"Attempted to queue invalid cc event","FB not default":"Performance can only start when Firebase app instance is the default one.","RC response not ok":"RC response is not ok","invalid attribute name":"Attribute name {$attributeName} is invalid.","invalid attribute value":"Attribute value {$attributeValue} is invalid.","invalid custom metric name":"Custom metric name {$customMetricName} is invalid","invalid String merger input":"Input for String merger is invalid, contact support team to resolve.","already initialized":"initializePerformance() has already been called with different options. To avoid this error, call initializePerformance() with the same options as when it was originally called, or call getPerformance() to return the already initialized instance."},C=new c.b("performance",M,k),L=new class{constructor(t){this.name=t,this._logLevel=f,this._logHandler=v,this._userLogHandler=null,l.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in h))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel="string"==typeof t?d[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,h.DEBUG,...t),this._logHandler(this,h.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,h.VERBOSE,...t),this._logHandler(this,h.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,h.INFO,...t),this._logHandler(this,h.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,h.WARN,...t),this._logHandler(this,h.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,h.ERROR,...t),this._logHandler(this,h.ERROR,...t)}}(M);let P,U,B,F;L.logLevel=h.INFO;class j{constructor(t){if(this.window=t,!t)throw C.create("no window");this.performance=t.performance,this.PerformanceObserver=t.PerformanceObserver,this.windowLocation=t.location,this.navigator=t.navigator,this.document=t.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=t.localStorage),t.perfMetrics&&t.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=t.perfMetrics.onFirstInputDelay)}getUrl(){return this.windowLocation.href.split("?")[0]}mark(t){this.performance&&this.performance.mark&&this.performance.mark(t)}measure(t,e,n){this.performance&&this.performance.measure&&this.performance.measure(t,e,n)}getEntriesByType(t){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(t):[]}getEntriesByName(t){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(t):[]}getTimeOrigin(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)}requiredApisAvailable(){return fetch&&Promise&&Object(c.c)()?!!Object(c.f)()||(L.info("IndexedDB is not supported by current browswer"),!1):(L.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),!1)}setupObserver(t,e){if(!this.PerformanceObserver)return;new this.PerformanceObserver((t=>{for(const n of t.getEntries())e(n)})).observe({entryTypes:[t]})}static getInstance(){return void 0===P&&(P=new j(U)),P}}function D(){return B}function $(t,e){const n=t.length-e.length;if(n<0||n>1)throw C.create("invalid String merger input");const r=[];for(let i=0;i<t.length;i++)r.push(t.charAt(i)),e.length>i&&r.push(e.charAt(i));return r.join("")}class H{constructor(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=$("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=$("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}getFlTransportFullUrl(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)}static getInstance(){return void 0===F&&(F=new H),F}}var V;!function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.VISIBLE=1]="VISIBLE",t[t.HIDDEN=2]="HIDDEN"}(V||(V={}));const W=["firebase_","google_","ga_"],x=new RegExp("^[a-zA-Z]\\w*$");function z(){const t=j.getInstance().navigator;return(null==t?void 0:t.serviceWorker)?t.serviceWorker.controller?2:3:1}function K(){switch(j.getInstance().document.visibilityState){case"visible":return V.VISIBLE;case"hidden":return V.HIDDEN;default:return V.UNKNOWN}}function J(){const t=j.getInstance().navigator.connection;switch(t&&t.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}function G(t){var e;const n=null===(e=t.options)||void 0===e?void 0:e.appId;if(!n)throw C.create("no app id");return n}const Y="0.0.1",Z={loggingEnabled:!0},Q="FIREBASE_INSTALLATIONS_AUTH";function X(t,e){const n=function(){const t=j.getInstance().localStorage;if(!t)return;const e=t.getItem(O);if(!(e&&(n=e,Number(n)>Date.now())))return;var n;const r=t.getItem(N);if(!r)return;try{return JSON.parse(r)}catch(t){return}}();return n?(et(n),Promise.resolve()):function(t,e){return function(t){const e=t.getToken();return e.then((t=>{})),e}(t.installations).then((n=>{const r=function(t){var e;const n=null===(e=t.options)||void 0===e?void 0:e.projectId;if(!n)throw C.create("no project id");return n}(t.app),o=function(t){var e;const n=null===(e=t.options)||void 0===e?void 0:e.apiKey;if(!n)throw C.create("no api key");return n}(t.app),c=new Request(`https://firebaseremoteconfig.googleapis.com/v1/projects/${r}/namespaces/fireperf:fetch?key=${o}`,{method:"POST",headers:{Authorization:`${Q} ${n}`},body:JSON.stringify({app_instance_id:e,app_instance_id_token:n,app_id:G(t.app),app_version:T,sdk_version:Y})});return fetch(c).then((t=>{if(t.ok)return t.json();throw C.create("RC response not ok")}))})).catch((()=>{L.info(tt)}))}(t,e).then(et).then((t=>function(t){const e=j.getInstance().localStorage;if(!t||!e)return;e.setItem(N,JSON.stringify(t)),e.setItem(O,String(Date.now()+60*H.getInstance().configTimeToLive*60*1e3))}(t)),(()=>{}))}const tt="Could not fetch config, will use default configs";function et(t){if(!t)return t;const e=H.getInstance(),n=t.entries||{};return void 0!==n.fpr_enabled?e.loggingEnabled="true"===String(n.fpr_enabled):e.loggingEnabled=Z.loggingEnabled,n.fpr_log_source?e.logSource=Number(n.fpr_log_source):Z.logSource&&(e.logSource=Z.logSource),n.fpr_log_endpoint_url?e.logEndPointUrl=n.fpr_log_endpoint_url:Z.logEndPointUrl&&(e.logEndPointUrl=Z.logEndPointUrl),n.fpr_log_transport_key?e.transportKey=n.fpr_log_transport_key:Z.transportKey&&(e.transportKey=Z.transportKey),void 0!==n.fpr_vc_network_request_sampling_rate?e.networkRequestsSamplingRate=Number(n.fpr_vc_network_request_sampling_rate):void 0!==Z.networkRequestsSamplingRate&&(e.networkRequestsSamplingRate=Z.networkRequestsSamplingRate),void 0!==n.fpr_vc_trace_sampling_rate?e.tracesSamplingRate=Number(n.fpr_vc_trace_sampling_rate):void 0!==Z.tracesSamplingRate&&(e.tracesSamplingRate=Z.tracesSamplingRate),e.logTraceAfterSampling=nt(e.tracesSamplingRate),e.logNetworkAfterSampling=nt(e.networkRequestsSamplingRate),t}function nt(t){return Math.random()<=t}let it,ot=1;function st(t){return ot=2,it=it||function(t){return function(){const t=j.getInstance().document;return new Promise((e=>{if(t&&"complete"!==t.readyState){const n=()=>{"complete"===t.readyState&&(t.removeEventListener("readystatechange",n),e())};t.addEventListener("readystatechange",n)}else e()}))}().then((()=>function(t){const e=t.getId();return e.then((t=>{B=t})),e}(t.installations))).then((e=>X(t,e))).then((()=>at()),(()=>at()))}(t),it}function at(){ot=3}const ct=1e4;let lt,ut=3,ht=[],pt=!1;function gt(t){setTimeout((()=>{if(0!==ut)return ht.length?void function(){const t=ht.splice(0,1e3),e=t.map((t=>({source_extension_json_proto3:t.message,event_time_ms:String(t.eventTime)})));(function(data,t){return function(data){const t=H.getInstance().getFlTransportFullUrl();return fetch(t,{method:"POST",body:JSON.stringify(data)})}(data).then((t=>(t.ok||L.info("Call to Firebase backend failed."),t.json()))).then((e=>{const n=Number(e.nextRequestWaitMillis);let r=ct;isNaN(n)||(r=Math.max(n,r));const o=e.logResponseDetails;Array.isArray(o)&&o.length>0&&"RETRY_REQUEST_LATER"===o[0].responseAction&&(ht=[...t,...ht],L.info("Retry transport request later.")),ut=3,gt(r)}))})({request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:H.getInstance().logSource,log_event:e},t).catch((()=>{ht=[...t,...ht],ut--,L.info(`Tries left: ${ut}.`),gt(ct)}))}():gt(ct)}),t)}function ft(t){return(...e)=>{!function(t){if(!t.eventTime||!t.message)throw C.create("invalid cc log");ht=[...ht,t]}({message:t(...e),eventTime:Date.now()})}}function mt(t,e){lt||(lt=ft(_t)),lt(t,e)}function vt(t){const e=H.getInstance();!e.instrumentationEnabled&&t.isAuto||(e.dataCollectionEnabled||t.isAuto)&&j.getInstance().requiredApisAvailable()&&(t.isAuto&&K()!==V.VISIBLE||(3===ot?bt(t):st(t.performanceController).then((()=>bt(t)),(()=>bt(t)))))}function bt(t){if(!D())return;const e=H.getInstance();e.loggingEnabled&&e.logTraceAfterSampling&&setTimeout((()=>mt(t,1)),0)}function _t(t,e){return 0===e?function(t){const e={url:t.url,http_method:t.httpMethod||0,http_response_code:200,response_payload_bytes:t.responsePayloadBytes,client_start_time_us:t.startTimeUs,time_to_response_initiated_us:t.timeToResponseInitiatedUs,time_to_response_completed_us:t.timeToResponseCompletedUs},n={application_info:Et(t.performanceController.app),network_request_metric:e};return JSON.stringify(n)}(t):function(t){const e={name:t.name,is_auto:t.isAuto,client_start_time_us:t.startTimeUs,duration_us:t.durationUs};0!==Object.keys(t.counters).length&&(e.counters=t.counters);const n=t.getAttributes();0!==Object.keys(n).length&&(e.custom_attributes=n);const r={application_info:Et(t.performanceController.app),trace_metric:e};return JSON.stringify(r)}(t)}function Et(t){return{google_app_id:G(t),app_instance_id:D(),web_app_info:{sdk_version:T,page_url:j.getInstance().getUrl(),service_worker_status:z(),visibility_state:K(),effective_connection_type:J()},application_process_state:0}}const wt=["_fp",R,A];class It{constructor(t,e,n=!1,r){this.performanceController=t,this.name=e,this.isAuto=n,this.state=1,this.customAttributes={},this.counters={},this.api=j.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark=`FB-PERF-TRACE-START-${this.randomId}-${this.name}`,this.traceStopMark=`FB-PERF-TRACE-STOP-${this.randomId}-${this.name}`,this.traceMeasure=r||`FB-PERF-TRACE-MEASURE-${this.randomId}-${this.name}`,r&&this.calculateTraceMetrics())}start(){if(1!==this.state)throw C.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2}stop(){if(2!==this.state)throw C.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),vt(this)}record(t,e,n){if(t<=0)throw C.create("nonpositive trace startTime",{traceName:this.name});if(e<=0)throw C.create("nonpositive trace duration",{traceName:this.name});if(this.durationUs=Math.floor(1e3*e),this.startTimeUs=Math.floor(1e3*t),n&&n.attributes&&(this.customAttributes=Object.assign({},n.attributes)),n&&n.metrics)for(const t of Object.keys(n.metrics))isNaN(Number(n.metrics[t]))||(this.counters[t]=Math.floor(Number(n.metrics[t])));vt(this)}incrementMetric(t,e=1){void 0===this.counters[t]?this.putMetric(t,e):this.putMetric(t,this.counters[t]+e)}putMetric(t,e){if(n=t,r=this.name,0===n.length||n.length>100||!(r&&r.startsWith(S)&&wt.indexOf(n)>-1)&&n.startsWith("_"))throw C.create("invalid custom metric name",{customMetricName:t});var n,r;this.counters[t]=function(t){const e=Math.floor(t);return e<t&&L.info(`Metric value should be an Integer, setting the value as : ${e}.`),e}(null!=e?e:0)}getMetric(t){return this.counters[t]||0}putAttribute(t,e){const n=!(0===(r=t).length||r.length>40||W.some((t=>r.startsWith(t)))||!r.match(x));var r;const o=function(t){return 0!==t.length&&t.length<=100}(e);if(n&&o)this.customAttributes[t]=e;else{if(!n)throw C.create("invalid attribute name",{attributeName:t});if(!o)throw C.create("invalid attribute value",{attributeValue:e})}}getAttribute(t){return this.customAttributes[t]}removeAttribute(t){void 0!==this.customAttributes[t]&&delete this.customAttributes[t]}getAttributes(){return Object.assign({},this.customAttributes)}setStartTime(t){this.startTimeUs=t}setDuration(t){this.durationUs=t}calculateTraceMetrics(){const t=this.api.getEntriesByName(this.traceMeasure),e=t&&t[0];e&&(this.durationUs=Math.floor(1e3*e.duration),this.startTimeUs=Math.floor(1e3*(e.startTime+this.api.getTimeOrigin())))}static createOobTrace(t,e,n,r){const o=j.getInstance().getUrl();if(!o)return;const c=new It(t,S+o,!0),l=Math.floor(1e3*j.getInstance().getTimeOrigin());c.setStartTime(l),e&&e[0]&&(c.setDuration(Math.floor(1e3*e[0].duration)),c.putMetric("domInteractive",Math.floor(1e3*e[0].domInteractive)),c.putMetric("domContentLoadedEventEnd",Math.floor(1e3*e[0].domContentLoadedEventEnd)),c.putMetric("loadEventEnd",Math.floor(1e3*e[0].loadEventEnd)));if(n){const t=n.find((t=>"first-paint"===t.name));t&&t.startTime&&c.putMetric("_fp",Math.floor(1e3*t.startTime));const e=n.find((t=>"first-contentful-paint"===t.name));e&&e.startTime&&c.putMetric(R,Math.floor(1e3*e.startTime)),r&&c.putMetric(A,Math.floor(1e3*r))}vt(c)}static createUserTimingTrace(t,e){vt(new It(t,e,!1,e))}}function Tt(t,e){const n=e;if(!n||void 0===n.responseStart)return;const r=j.getInstance().getTimeOrigin(),o=Math.floor(1e3*(n.startTime+r)),c=n.responseStart?Math.floor(1e3*(n.responseStart-n.startTime)):void 0,l=Math.floor(1e3*(n.responseEnd-n.startTime));!function(t){const e=H.getInstance();if(!e.instrumentationEnabled)return;const n=t.url,r=e.logEndPointUrl.split("?")[0],o=e.flTransportEndpointUrl.split("?")[0];n!==r&&n!==o&&e.loggingEnabled&&e.logNetworkAfterSampling&&setTimeout((()=>mt(t,0)),0)}({performanceController:t,url:n.name&&n.name.split("?")[0],responsePayloadBytes:n.transferSize,startTimeUs:o,timeToResponseInitiatedUs:c,timeToResponseCompletedUs:l})}function yt(t){D()&&(setTimeout((()=>function(t){const e=j.getInstance(),n=e.getEntriesByType("navigation"),r=e.getEntriesByType("paint");if(e.onFirstInputDelay){let o=setTimeout((()=>{It.createOobTrace(t,n,r),o=void 0}),5e3);e.onFirstInputDelay((e=>{o&&(clearTimeout(o),It.createOobTrace(t,n,r,e))}))}else It.createOobTrace(t,n,r)}(t)),0),setTimeout((()=>function(t){const e=j.getInstance(),n=e.getEntriesByType("resource");for(const e of n)Tt(t,e);e.setupObserver("resource",(e=>Tt(t,e)))}(t)),0),setTimeout((()=>function(t){const e=j.getInstance(),n=e.getEntriesByType("measure");for(const e of n)St(t,e);e.setupObserver("measure",(e=>St(t,e)))}(t)),0))}function St(t,e){const n=e.name;n.substring(0,y.length)!==y&&It.createUserTimingTrace(t,n)}class Rt{constructor(t,e){this.app=t,this.installations=e,this.initialized=!1}_init(t){this.initialized||(void 0!==(null==t?void 0:t.dataCollectionEnabled)&&(this.dataCollectionEnabled=t.dataCollectionEnabled),void 0!==(null==t?void 0:t.instrumentationEnabled)&&(this.instrumentationEnabled=t.instrumentationEnabled),j.getInstance().requiredApisAvailable()?Object(c.g)().then((t=>{t&&(pt||(gt(5500),pt=!0),st(this).then((()=>yt(this)),(()=>yt(this))),this.initialized=!0)})).catch((t=>{L.info(`Environment doesn't support IndexedDB: ${t}`)})):L.info('Firebase Performance cannot start if the browser does not support "Fetch" and "Promise", or cookies are disabled.'))}set instrumentationEnabled(t){H.getInstance().instrumentationEnabled=t}get instrumentationEnabled(){return H.getInstance().instrumentationEnabled}set dataCollectionEnabled(t){H.getInstance().dataCollectionEnabled=t}get dataCollectionEnabled(){return H.getInstance().dataCollectionEnabled}}const At=(t,{options:e})=>{const n=t.getProvider("app").getImmediate(),r=t.getProvider("installations-internal").getImmediate();if("[DEFAULT]"!==n.name)throw C.create("FB not default");if("undefined"==typeof window)throw C.create("no window");!function(t){U=t}(window);const o=new Rt(n,r);return o._init(e),o};Object(_._registerComponent)(new E("performance",At,"PUBLIC")),Object(_.registerVersion)(w,I),Object(_.registerVersion)(w,I,"esm2017");class Nt{constructor(t,e){this.app=t,this._delegate=e}get instrumentationEnabled(){return this._delegate.instrumentationEnabled}set instrumentationEnabled(t){this._delegate.instrumentationEnabled=t}get dataCollectionEnabled(){return this._delegate.dataCollectionEnabled}set dataCollectionEnabled(t){this._delegate.dataCollectionEnabled=t}trace(t){return e=this._delegate,n=t,e=Object(c.e)(e),new It(e,n);var e,n}}function Ot(t){const e=t.getProvider("app-compat").getImmediate(),n=t.getProvider("performance").getImmediate();return new Nt(e,n)}var Mt;(Mt=r.a).INTERNAL.registerComponent(new o("performance-compat",Ot,"PUBLIC")),Mt.registerVersion("@firebase/performance-compat","0.1.17")}}]);