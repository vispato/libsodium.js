var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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BH9B4wAFIwAiACEFIABBwAZrQUBxIgEkACABQYAIKQMANwOwAyABQYgIKQMANwO4AyABQZgIKQMANwOoAyABQZAIKQMANwOgAyABQrjy6NnDp4+fPzcDmAIgAUKw4siZw6aNmzc3A5ACIAFCqNKo2cKli5cvNwOIAiABQqDCiJnCpImTJzcDgAIgAUKYsujYwaOHjx83A/gBIAFCkKLImMGihYsXNwPwASABQoiSqNjAoYOHDzcD6AEgAUKAgoiYwKCBgwc3A+ABQQEhAwNAIAFB4AJqIgYgB6dqIAI6AAAgAUHAA2oiACABQeABaiAHQgF8IginIgQgBCABQbADaiABQaADahAGGiAAIAYgBxAMIAAgAUGgAmogBBALIAJBAWohAkEAIQADQCABIAFBoAJqIgQgAGotAAA2AtABIAFB0AFqEAggAEEBaiIAIANHDQALEAcgA0EBaiEDIAgiB0LAAFINAAsgAUIANwPYAiABQgA3A9ACIAFCADcDyAIgAUIANwPAAiABQgA3A7gCIAFCADcDsAIgAUIANwOoAiABQgA3A6ACQQAhACABQcADaiICIAFB4AFqQQBBwAAgAUGwA2ogAUGgA2oQBhogAiABQeACakLAABAMIAIgBEHAABALA0AgASABQaACaiIDIABqLQAANgLAASABQcABahAIIABBAWoiAEHAAEcNAAsQByABQgA3A9gCIAFCADcD0AIgAUIANwPIAiABQgA3A8ACIAFCADcDuAIgAUIANwOwAiABQgA3A6gCIAFCADcDoAJBACEAIAFBwANqIgJBAEEBQcAAIAFBsANqIAFBoANqEAYaIAIgAUHgAmpCwAAQDCACIANBwAAQCwNAIAEgAUGgAmoiAyAAai0AADYCsAEgAUGwAWoQCCAAQQFqIgBBwABHDQALEAcgAUIANwPYAiABQgA3A9ACIAFCADcDyAIgAUIANwPAAiABQgA3A7gCIAFCADcDsAIgAUIANwOoAiABQgA3A6ACQQAhACABQcADaiICIAFB4AFqQcAAQcAAQQAgAUGgA2oQBhogAiABQeACakLAABAMIAIgA0HAABALA0AgASABQaACaiIDIABqLQAANgKgASABQaABahAIIABBAWoiAEHAAEcNAAsQByABQgA3A9gCIAFCADcD0AIgAUIANwPIAiABQgA3A8ACIAFCADcDuAIgAUIANwOwAiABQgA3A6gCIAFCADcDoAJBACEAIAFBwANqIgIgAUHgAWpBwABBwAAgAUGwA2pBABAGGiACIAFB4AJqQsAAEAwgAiADQcAAEAsDQCABIAFBoAJqIgIgAGotAAA2ApABIAFBkAFqEAggAEEBaiIAQcAARw0ACxAHIAFCADcD2AIgAUIANwPQAiABQgA3A8gCIAFCADcDwAIgAUIANwO4AiABQgA3A7ACIAFCADcDqAIgAUIANwOgAkEAIQAgAkHAACABQeACaiABQeABakEAIAFBsANqIAFBoANqEAoaA0AgASABQaACaiICIABqLQAANgKAASABQYABahAIIABBAWoiAEHAAEcNAAsQByABQgA3A9gCIAFCADcD0AIgAUIANwPIAiABQgA3A8ACIAFCADcDuAIgAUIANwOwAiABQgA3A6gCIAFCADcDoAJBACEAIAJBwAAgAUHgAmpBAEEAIAFBsANqIAFBoANqEAoaA0AgASABQaACaiICIABqLQAANgJwIAFB8ABqEAggAEEBaiIAQcAARw0ACxAHIAFCADcD2AIgAUIANwPQAiABQgA3A8gCIAFCADcDwAIgAUIANwO4AiABQgA3A7ACIAFCADcDqAIgAUIANwOgAiACQcAAIAFB4AJqIAFB4AFqQcAAIAFBsANqIAFBoANqEAoaQQAhAANAIAEgAUGgAmoiAiAAai0AADYCYCABQeAAahAIIABBAWoiAEHAAEcNAAsQByABQgA3A9gCIAFCADcD0AIgAUIANwPIAiABQgA3A8ACIAFCADcDuAIgAUIANwOwAiABQgA3A6gCIAFCADcDoAJBACEAIAJBwAAgAUHgAmogAUHgAWpBwABBACABQaADahAKGgNAIAEgAUGgAmoiAiAAai0AADYCUCABQdAAahAIIABBAWoiAEHAAEcNAAsQByABQgA3A9gCIAFCADcD0AIgAUIANwPIAiABQgA3A8ACIAFCADcDuAIgAUIANwOwAiABQgA3A6gCIAFCADcDoAJBACEAIAJBwAAgAUHgAmogAUHgAWpBwAAgAUGwA2pBABAKGgNAIAEgAUGgAmoiBCAAai0AADYCQCABQUBrEAggAEEBaiIAQcAARw0ACxAHAkACQAJAAkACQAJAAkACQEEAQQAgAUHgAmoiAiABQeABaiIDQcAAQQBBABAKQX9GBEBBAEHBACACIANBwABBAEEAEApBf0cNAUEAIQBBAEHAACACIANBwQBBAEEAEApBf0cNAiABQcADaiIDQQBBAEEgQQAgAUGgA2oQBhogAyACQsAAEAwgAyAEQcAAEAsDQCABIAFBoAJqIgMgAGotAAA2AjAgAUEwahAIIABBAWoiAEHAAEcNAAsQB0EAIQAgAUHAA2oiAkEAQQBBICABQbADakEAEAYaIAIgAUHgAmpCwAAQDCACIANBwAAQCwNAIAEgAUGgAmogAGotAAA2AiAgAUEgahAIIABBAWoiAEHAAEcNAAsQByABQcADaiIAIAFB4AFqIgJBwABBAEEAQQAQBkF/Rw0DIAAgAkHAAEHBAEEAQQAQBkF/Rw0EIAAgAkHBAEHAAEEAQQAQBkF/Rw0FIAAgAkHAAEEgQQAgAUGgA2oQBg0GIAAgAkHAAEEgIAFBsANqQQAQBg0HIAUkAAwIC0HNDEHtCUGIAUHkCBAAAAtBsgtB7QlBjAFB5AgQAAALQcYOQe0JQZABQeQIEAAAC0H6D0HtCUGlAUHkCBAAAAtByQ1B7QlBpwFB5AgQAAALQbAKQe0JQakBQeQIEAAAC0HQEEHtCUGsAUHkCBAAAAtBvxFB7QlBrgFB5AgQAAALQfwWKAIAGgJAQX9BAAJ/An8CQAJAQaoSIgFBA3FFDQBBAEGqEi0AAEUNAhoDQCABQQFqIgFBA3FFDQEgAS0AAA0ACwwBCwNAIAEiAEEEaiEBIAAoAgAiAkF/cyACQYGChAhrcUGAgYKEeHFFDQALA0AgACIBQQFqIQAgAS0AAA0ACwsgAUGqEmsLIgACf0H8FigCAEEASARAQaoSIABBsBYQEgwBC0GqEiAAQbAWEBILIgEgAEYNABogAQsgAEcbQQBIDQACQEGAFygCAEEKRg0AQcQWKAIAIgBBwBYoAgBGDQBBxBYgAEEBajYCACAAQQo6AAAMAQsQEwtBAAsLC8MNEwBBgAgLwAo1YjZiNDFlZDliMzQzZmUwNTEyNmZiMmEzNzQwMGQyYSUwMngALSsgICAwWDB4AGNyeXB0b19nZW5lcmljaGFzaF9ibGFrZTJiX3N0YXRlYnl0ZXMoKSA+PSBzaXplb2Ygc3QAeG1haW4AY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfZmluYWwAY3J5cHRvX2dlbmVyaWNoYXNoL2JsYWtlMmIvcmVmL2JsYWtlMmItcmVmLmMAY3J5cHRvX2dlbmVyaWNoYXNoL2JsYWtlMmIvcmVmL2dlbmVyaWNoYXNoX2JsYWtlMmIuYwBnZW5lcmljaGFzaDMuYwBvdXRsZW4gPD0gVUlOVDhfTUFYAFMtPmJ1ZmxlbiA8PSBCTEFLRTJCX0JMT0NLQllURVMAY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfaW5pdF9zYWx0X3BlcnNvbmFsICgmc3QsIGssIGNyeXB0b19nZW5lcmljaGFzaF9ibGFrZTJiX0tFWUJZVEVTX01BWCArIDEsIHNpemVvZiBvdXQsIE5VTEwsIE5VTEwpID09IC0xAGNyeXB0b19nZW5lcmljaGFzaF9ibGFrZTJiX3NhbHRfcGVyc29uYWwgKGd1YXJkX3BhZ2UsIGNyeXB0b19nZW5lcmljaGFzaF9CWVRFU19NQVggKyAxLCBpbiwgKHVuc2lnbmVkIGxvbmcgbG9uZykgc2l6ZW9mIGluLCBrLCBzaXplb2YgaywgTlVMTCwgTlVMTCkgPT0gLTEAY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfc2FsdF9wZXJzb25hbCAoZ3VhcmRfcGFnZSwgMCwgaW4sICh1bnNpZ25lZCBsb25nIGxvbmcpIHNpemVvZiBpbiwgaywgc2l6ZW9mIGssIE5VTEwsIE5VTEwpID09IC0xAGNyeXB0b19nZW5lcmljaGFzaF9ibGFrZTJiX2luaXRfc2FsdF9wZXJzb25hbCAoJnN0LCBrLCBzaXplb2YgaywgY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfQllURVNfTUFYICsgMSwgTlVMTCwgTlVMTCkgPT0gLTEAY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfc2FsdF9wZXJzb25hbCAoZ3VhcmRfcGFnZSwgKHVuc2lnbmVkIGxvbmcgbG9uZykgc2l6ZW9mIGluLCBpbiwgKHVuc2lnbmVkIGxvbmcgbG9uZykgc2l6ZW9mIGluLCBrLCBjcnlwdG9fZ2VuZXJpY2hhc2hfS0VZQllURVNfTUFYICsgMSwgTlVMTCwgTlVMTCkgPT0gLTEAY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfaW5pdF9zYWx0X3BlcnNvbmFsICgmc3QsIGssIHNpemVvZiBrLCAwLCBOVUxMLCBOVUxMKSA9PSAtMQBjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9pbml0X3NhbHRfcGVyc29uYWwoJnN0LCBrLCBzaXplb2YgaywgY3J5cHRvX2dlbmVyaWNoYXNoX0JZVEVTLCBOVUxMLCBwZXJzb25hbCkgPT0gMABjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9pbml0X3NhbHRfcGVyc29uYWwoJnN0LCBrLCBzaXplb2YgaywgY3J5cHRvX2dlbmVyaWNoYXNoX0JZVEVTLCBzYWx0LCBOVUxMKSA9PSAwAC0tLSBTVUNDRVNTIC0tLQAobnVsbCkAQdASC0EZAAoAGRkZAAAAAAUAAAAAAAAJAAAAAAsAAAAAAAAAABkAEQoZGRkDCgcAAQAJCxgAAAkGCwAACwAGGQAAABkZGQBBoRMLIQ4AAAAAAAAAABkACg0ZGRkADQAAAgAJDgAAAAkADgAADgBB2xMLAQwAQecTCxUTAAAAABMAAAAACQwAAAAAAAwAAAwAQZUUCwEQAEGhFAsVDwAAAAQPAAAAAAkQAAAAAAAQAAAQAEHPFAsBEgBB2xQLHhEAAAAAEQAAAAAJEgAAAAAAEgAAEgAAGgAAABoaGgBBkhULDhoAAAAaGhoAAAAAAAAJAEHDFQsBFABBzxULFRcAAAAAFwAAAAAJFAAAAAAAFAAAFABB/RULARYAQYkWCycVAAAAABUAAAAACRYAAAAAABYAABYAADAxMjM0NTY3ODlBQkNERUYAQbAWCwEFAEG8FgsBAQBB1BYLDgIAAAADAAAAqA8AAAAEAEHsFgsBAQBB/BYLBf////8K";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(instance=>instance).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;wasmExports=exports;wasmMemory=wasmExports["f"];updateMemoryViews();wasmTable=wasmExports["i"];addOnInit(wasmExports["g"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={3008:()=>Module.getRandomValue(),3044:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>{abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])};var _abort=()=>{abort("")};var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&&buf%8?4:0;readEmAsmArgsArray.push(ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=ch==105?4:8}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var _emscripten_memcpy_big=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var SYSCALLS={varargs:undefined,get(){var ret=HEAP32[SYSCALLS.varargs>>2];SYSCALLS.varargs+=4;return ret},getp(){return SYSCALLS.get()},getStr(ptr){var ret=UTF8ToString(ptr);return ret}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={a:___assert_fail,e:_abort,c:_emscripten_asm_const_int,d:_emscripten_memcpy_big,b:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["g"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["h"])(a0,a1);var ___errno_location=()=>(___errno_location=wasmExports["__errno_location"])();function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}try{var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
