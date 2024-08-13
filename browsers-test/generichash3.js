var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);var ret=fs.readFileSync(filename);return ret};readAsync=(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return new Promise((resolve,reject)=>{fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)reject(err);else resolve(binary?data.buffer:data)})})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=url=>{if(isFileURI(url)){return new Promise((reject,resolve)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){resolve(xhr.response)}reject(xhr.status)};xhr.onerror=reject;xhr.send(null)})}return fetch(url,{credentials:"same-origin"}).then(response=>{if(response.ok){return response.arrayBuffer()}return Promise.reject(new Error(response.status+" : "+response.url))})}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,AGFzbQEAAAABXg5gA39/fwF/YAAAYAN/f38AYAF/AX9gBH9/f38Bf2ACf38AYAJ/fwF/YAR/f39/AGAGf39/f39/AX9gAX8AYAd/f39/f39/AX9gA39/fgBgBX9/f39/AGADf35/AX4CHwUBYQFhAAcBYQFiAAQBYQFjAAABYQFkAAIBYQFlAAEDGxoACAEJAAoCCwwCAQUFAAEDAQIGAgMEDQMABgQEAXAABAUHAQGCAoCAAgYIAX8BQeCnBAsHEQQBZgIAAWcAFQFoAB4BaQEACQkBAEEBCwMcHRsKhYIBGoIEAQN/IAJBgARPBEAgACABIAIQAyAADwsgACACaiEDAkAgACABc0EDcUUEQAJAIABBA3FFBEAgACECDAELIAJFBEAgACECDAELIAAhAgNAIAIgAS0AADoAACABQQFqIQEgAkEBaiICQQNxRQ0BIAIgA0kNAAsLIANBfHEhBAJAIANBwABJDQAgAiAEQUBqIgVLDQADQCACIAEoAgA2AgAgAiABKAIENgIEIAIgASgCCDYCCCACIAEoAgw2AgwgAiABKAIQNgIQIAIgASgCFDYCFCACIAEoAhg2AhggAiABKAIcNgIcIAIgASgCIDYCICACIAEoAiQ2AiQgAiABKAIoNgIoIAIgASgCLDYCLCACIAEoAjA2AjAgAiABKAI0NgI0IAIgASgCODYCOCACIAEoAjw2AjwgAUFAayEBIAJBQGsiAiAFTQ0ACwsgAiAETw0BA0AgAiABKAIANgIAIAFBBGohASACQQRqIgIgBEkNAAsMAQsgA0EESQRAIAAhAgwBCyAAIANBBGsiBEsEQCAAIQIMAQsgACECA0AgAiABLQAAOgAAIAIgAS0AAToAASACIAEtAAI6AAIgAiABLQADOgADIAFBBGohASACQQRqIgIgBE0NAAsLIAIgA0kEQANAIAIgAS0AADoAACABQQFqIQEgAkEBaiICIANHDQALCyAAC+EFAgR+An9BfyEKAkAgAkHAAEsNACADQcEAa0FASQ0AAkAgAUEAIAIbRQRAAn8gA0H/AXEiAUHBAGtB/wFxQb8BSwRAAn4gBEUEQEKf2PnZwpHagpt/IQZC0YWa7/rPlIfRAAwBCyAEKQAIQp/Y+dnCkdqCm3+FIQYgBCkAAELRhZrv+s+Uh9EAhQshCAJ+IAVFBEBC+cL4m5Gjs/DbACEHQuv6htq/tfbBHwwBCyAFKQAIQvnC+JuRo7Pw2wCFIQcgBSkAAELr+obav7X2wR+FCyEJIABBQGtBAEGlAhAJGiAAIAc3ADggACAJNwAwIAAgBjcAKCAAIAg3ACAgAELx7fT4paf9p6V/NwAYIABCq/DT9K/uvLc8NwAQIABCu86qptjQ67O7fzcACCAAIAGtQoiS95X/zPmE6gCFNwAAQQAMAQsQDwALRQ0BDAILAn8gAkH/AXEhAiMAQYABayILJAACQCADQf8BcSIDQcEAa0H/AXFBvwFNDQAgAUUNACACQcEAa0H/AXFBvwFNDQACfiAERQRAQp/Y+dnCkdqCm38hBkLRhZrv+s+Uh9EADAELIAQpAAhCn9j52cKR2oKbf4UhBiAEKQAAQtGFmu/6z5SH0QCFCyEIAn4gBUUEQEL5wvibkaOz8NsAIQdC6/qG2r+19sEfDAELIAUpAAhC+cL4m5Gjs/DbAIUhByAFKQAAQuv6htq/tfbBH4ULIQkgAEFAa0EAQaUCEAkaIAAgBzcAOCAAIAk3ADAgACAGNwAoIAAgCDcAICAAQvHt9Pilp/2npX83ABggAEKr8NP0r+68tzw3ABAgAEK7zqqm2NDrs7t/NwAIIAAgA60gAq1CCIaEQoiS95X/zPmE6gCFNwAAIABB4ABqIAtBAEGAARAJIAEgAhAFIgFBgAEQBRogACAAKADgAkGAAWo2AOACIAFBgAEQESABQYABaiQAQQAMAQsQDwALDQELQQAhCgsgCgvEAQEBfwJAAkBB/BYoAgAiAEEATgRAIABFDQFB5B4oAgAgAEH/////A3FHDQELAkBBgBcoAgBBCkYNAEHEFigCACIAQcAWKAIARg0AQcQWIABBAWo2AgAgAEEKOgAADAILEBMMAQtB/BZB/BYoAgAiAEH/////AyAAGzYCAAJAAkBBgBcoAgBBCkYNAEHEFigCACIAQcAWKAIARg0AQcQWIABBAWo2AgAgAEEKOgAADAELEBMLQfwWKAIAGkH8FkEANgIACwvEAgEFfyMAQRBrIgMkACADIAA2AgwjAEHQAWsiASQAIAEgADYCzAEgAUGgAWoiAEEAQSgQCRogASABKALMATYCyAECQEEAIAFByAFqIAFB0ABqIAAQGkEASA0AQfwWKAIAQQBIQbAWQbAWKAIAIgRBX3E2AgACfwJAAkBB4BYoAgBFBEBB4BZB0AA2AgBBzBZBADYCAEHAFkIANwMAQdwWKAIAIQJB3BYgATYCAAwBC0HAFigCAA0BC0F/QbAWEBQNARoLQbAWIAFByAFqIAFB0ABqIAFBoAFqEBoLIQUgAgR/QbAWQQBBAEHUFigCABEAABpB4BZBADYCAEHcFiACNgIAQcwWQQA2AgBBxBYoAgAaQcAWQgA3AwBBAAUgBQsaQbAWQbAWKAIAIARBIHFyNgIADQALIAFB0AFqJAAgA0EQaiQAC/ICAgJ/AX4CQCACRQ0AIAAgAToAACAAIAJqIgNBAWsgAToAACACQQNJDQAgACABOgACIAAgAToAASADQQNrIAE6AAAgA0ECayABOgAAIAJBB0kNACAAIAE6AAMgA0EEayABOgAAIAJBCUkNACAAQQAgAGtBA3EiBGoiAyABQf8BcUGBgoQIbCIBNgIAIAMgAiAEa0F8cSIEaiICQQRrIAE2AgAgBEEJSQ0AIAMgATYCCCADIAE2AgQgAkEIayABNgIAIAJBDGsgATYCACAEQRlJDQAgAyABNgIYIAMgATYCFCADIAE2AhAgAyABNgIMIAJBEGsgATYCACACQRRrIAE2AgAgAkEYayABNgIAIAJBHGsgATYCACAEIANBBHFBGHIiBGsiAkEgSQ0AIAGtQoGAgIAQfiEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkEgayICQR9LDQALCyAAC54HAgN/BX5BfyEHAkAgAUHBAGtBQEkNACAEQcAASw0AAn8gAUH/AXEhByAEQf8BcSEEQsAAIQwjACIBIQkgAUGABGtBQHEiASQAAkAgAkUNACAARQ0AIAdBwQBrQf8BcUG/AU0NACADRSIIQQAgBBsNACAEQcEATw0AAn8gBARAIAgNAgJ+IAVFBEBCn9j52cKR2oKbfyEKQtGFmu/6z5SH0QAMAQsgBSkACEKf2PnZwpHagpt/hSEKIAUpAABC0YWa7/rPlIfRAIULIQ0CfiAGRQRAQvnC+JuRo7Pw2wAhC0Lr+obav7X2wR8MAQsgBikACEL5wvibkaOz8NsAhSELIAYpAABC6/qG2r+19sEfhQshDiABQUBrQQBBpQIQCRogASALNwM4IAEgDjcDMCABIAo3AyggASANNwMgIAFC8e30+KWn/aelfzcDGCABQqvw0/Sv7ry3PDcDECABQrvOqqbY0Ouzu383AwggASAHrSAErUIIhoRCiJL3lf/M+YTqAIU3AwAgAUGAA2oiBSAEakEAQYABIARrEAkaIAUgAyAEEAUaIAFB4ABqIAVBgAEQBRogAUGAATYC4AIgBUGAARARQYABDAELAn4gBUUEQEKf2PnZwpHagpt/IQpC0YWa7/rPlIfRAAwBCyAFKQAIQp/Y+dnCkdqCm3+FIQogBSkAAELRhZrv+s+Uh9EAhQshDQJ+IAZFBEBC+cL4m5Gjs/DbACELQuv6htq/tfbBHwwBCyAGKQAIQvnC+JuRo7Pw2wCFIQsgBikAAELr+obav7X2wR+FCyEOIAFBQGtBAEGlAhAJGiABIAs3AzggASAONwMwIAEgCjcDKCABIA03AyAgAULx7fT4paf9p6V/NwMYIAFCq/DT9K/uvLc8NwMQIAFCu86qptjQ67O7fzcDCCABIAetQoiS95X/zPmE6gCFNwMAQQALIQMgAUHgAWohCCABQeAAaiEEA0ACQCADIARqIQZBgAIgA2siBa0iCiAMWgRAIAYgAiAMpyICEAUaIAEgASgC4AIgAmo2AuACDAELIAYgAiAFEAUaIAEgASgC4AIgBWo2AuACIAEgASkDQCILQoABfDcDQCABIAEpA0ggC0L/flatfDcDSCABIAQQECAEIAhBgAEQBRogASABKALgAkGAAWsiAzYC4AIgAiAFaiECIAwgCn0iDEIAUg0BCwsgASAAIAcQFiAJJABBAAwBCxAPAAshBwsgBwsmACACQYACTwRAQfwJQbgJQesAQeoIEAAACyAAIAEgAkH/AXEQFgvQAQIFfwJ+IAJCAFIEQAJAIABB4AFqIQcgAEHgAGohAyAAKADgAiEEA0AgAyAEaiEGQYACIARrIgWtIgggAloEQCAGIAEgAqciARAFGiAAIAAoAOACIAFqNgDgAgwCCyAGIAEgBRAFGiAAIAAoAOACIAVqNgDgAiAAIAApAEAiCUKAAXw3AEAgACAAKQBIIAlC/35WrXw3AEggACADEBAgAyAHQYABEAUaIAAgACgA4AJBgAFrIgQ2AOACIAEgBWohASACIAh9IgJCAFINAAsLCwtrAQF/IwBBgAJrIgUkAAJAIAIgA0wNACAEQYDABHENACAFIAEgAiADayIDQYACIANBgAJJIgEbEAkaIAFFBEADQCAAIAVBgAIQDiADQYACayIDQf8BSw0ACwsgACAFIAMQDgsgBUGAAmokAAsXACAALQAAQSBxRQRAIAEgAiAAEBIaCwsXAQF/QfQdKAIAIgAEQCAAEQEACxAEAAuILgElfiAAIAEpACgiICABKQBoIhggASkAQCIaIAEpACAiGSAYIAEpAHgiHCABKQBYIiEgASkAUCIbICAgACkAECAZIAApADAiHXx8IhV8IB0gACkAUCAVhULr+obav7X2wR+FQiCJIhVCq/DT9K/uvLc8fCIehUIoiSIdfCIWIBWFQjCJIgYgHnwiBCAdhUIBiSIXIAEpABgiHSAAKQAIIiUgASkAECIVIAApACgiHnx8IiJ8IAApAEggIoVCn9j52cKR2oKbf4VCIIkiA0LFsdXZp6+UzMQAfSIFIB6FQiiJIgJ8Igd8fCIjfCAXICMgASkACCIeIAApAAAiJiABKQAAIiIgACkAICIkfHwiH3wgJCAAKQBAIB+FQtGFmu/6z5SH0QCFQiCJIh9CiJLznf/M+YTqAHwiCIVCKIkiC3wiDCAfhUIwiSIJhUIgiSIfIAEpADgiIyAAKQAYIAEpADAiJCAAKQA4Igp8fCINfCAKIAApAFggDYVC+cL4m5Gjs/DbAIVCIIkiDUKPkouH2tiC2NoAfSIOhUIoiSIKfCIQIA2FQjCJIg0gDnwiDnwiEYVCKIkiF3wiEiAfhUIwiSITIBF8IhEgF4VCAYkiFCABKQBIIhd8IBggASkAYCIfIBYgCiAOhUIBiSIKfHwiFnwgFiADIAeFQjCJIgOFQiCJIgcgCCAJfCIIfCIJIAqFQiiJIgp8Ig58Ig98IA8gHCABKQBwIhYgECAIIAuFQgGJIgh8fCILfCAGIAuFQiCJIgYgAyAFfCIDfCIFIAiFQiiJIgh8IgsgBoVCMIkiBoVCIIkiECAXIBogAiADhUIBiSIDIAx8fCICfCADIAQgAiANhUIgiSICfCIEhUIoiSIDfCIMIAKFQjCJIgIgBHwiBHwiDSAUhUIoiSIUfCIPICF8IAsgGCAHIA6FQjCJIgcgCXwiCSAKhUIBiSIKfHwiCyAkfCAKIAIgC4VCIIkiAiARfCILhUIoiSIKfCIOIAKFQjCJIgIgC3wiCyAKhUIBiSIKfCIRICN8IAogBSAGfCIGIAiFQgGJIgUgDCAWfHwiCCAbfCAFIAggE4VCIIkiCCAJfCIMhUIoiSIFfCIJIAiFQjCJIgggDHwiDCARIBogGSADIASFQgGJIgR8IBJ8IgN8IAQgBiADIAeFQiCJIgN8IgaFQiiJIgR8IgcgA4VCMIkiA4VCIIkiEXwiEoVCKIkiCnwiEyARhUIwiSIRIBJ8IhIgCoVCAYkiCiAcfCAdICAgBSAMhUIBiSIFIA58fCIMfCAFIAwgDyAQhUIwiSIOhUIgiSIMIAMgBnwiBnwiA4VCKIkiBXwiEHwiDyAEIAaFQgGJIgYgHnwgCXwiBCAffCAGIAIgBIVCIIkiBCANIA58IgJ8IgmFQiiJIgZ8Ig0gBIVCMIkiBIVCIIkiDiAVIAIgFIVCAYkiAiAHfCAifCIHfCACIAcgCIVCIIkiByALfCIIhUIoiSICfCILIAeFQjCJIgcgCHwiCHwiFCAKhUIoiSIKIA98fCIPIBogBSADIAwgEIVCMIkiBXwiA4VCAYkiDCANICF8fCINfCAMIAcgDYVCIIkiByASfCIMhUIoiSINfCIQIAeFQjCJIgcgDHwiDCANhUIBiSINfCAXfCISfCANIBIgICACIAiFQgGJIgIgE3x8IgggFXwgAiAFIAiFQiCJIgUgBCAJfCIEfCIIhUIoiSICfCIJIAWFQjCJIgWFQiCJIhIgBCAGhUIBiSIGIB98IAt8IgQgInwgBiADIAQgEYVCIIkiBHwiA4VCKIkiBnwiCyAEhUIwiSIEIAN8IgN8IhGFQiiJIg18IhMgHiAJIAogDiAPhUIwiSIKIBR8Ig6FQgGJIhR8ICN8Igl8IAQgCYVCIIkiBCAMfCIMIBSFQiiJIgl8IhQgBIVCMIkiBCAMfCIMIAmFQgGJIgl8ICF8Ig8gFnwgCSAPIBYgECADIAaFQgGJIgZ8IBt8IgN8IAYgAyAKhUIgiSIGIAUgCHwiA3wiBYVCKIkiCHwiCSAGhUIwiSIGhUIgiSIKIA4gByACIAOFQgGJIgMgCyAdfHwiAoVCIIkiB3wiCyADhUIoiSIDIAJ8ICR8IgIgB4VCMIkiByALfCILfCIOhUIoiSIQfCIPIA0gESASIBOFQjCJIg18IhGFQgGJIhIgCSAjfHwiCSAXfCAHIAmFQiCJIgcgDHwiDCAShUIoiSIJfCISIAeFQjCJIgcgDHwiDCAJhUIBiSIJfCAcfCITfCAJIBMgDSAYIAMgC4VCAYkiA3wgFHwiC4VCIIkiDSAFIAZ8IgZ8IgUgA4VCKIkiAyALfCAffCILIA2FQjCJIg2FQiCJIhMgHiAGIAiFQgGJIgYgHXwgAnwiAnwgBiARIAIgBIVCIIkiBHwiAoVCKIkiBnwiCCAEhUIwiSIEIAJ8IgJ8IhGFQiiJIgl8IhQgDCAEIAogD4VCMIkiCiAOfCIOIBCFQgGJIhAgCyAZfHwiC4VCIIkiBHwiDCAQhUIoiSIQIAt8ICJ8IgsgBIVCMIkiBCAMfCIMIBCFQgGJIhB8IBt8Ig8gHHwgECAPIBIgAiAGhUIBiSIGfCAVfCICICR8IAYgAiAKhUIgiSICIAUgDXwiBXwiCoVCKIkiBnwiDSAChUIwiSIChUIgiSISICAgAyAFhUIBiSIDIAh8fCIFIBt8IAMgBSAHhUIgiSIFIA58IgeFQiiJIgN8IgggBYVCMIkiBSAHfCIHfCIOhUIoiSIQfCIPIAkgEyAUhUIwiSIJIBF8IhGFQgGJIhMgDSAXfHwiDSAifCAFIA2FQiCJIgUgDHwiDCAThUIoiSINfCITIAWFQjCJIgUgDHwiDCANhUIBiSINfCAdfCIUfCANIBQgAyAHhUIBiSIDIBV8IAt8IgcgGXwgAyAHIAmFQiCJIgcgAiAKfCICfCILhUIoiSIDfCIJIAeFQjCJIgeFQiCJIgogICACIAaFQgGJIgZ8IAh8IgIgI3wgBiARIAIgBIVCIIkiBHwiAoVCKIkiBnwiCCAEhUIwiSIEIAJ8IgJ8Ig2FQiiJIhF8IhQgCoVCMIkiCiADIAcgC3wiA4VCAYkiByAIICF8fCIIIB98IAcgDyAShUIwiSILIA58Ig4gBSAIhUIgiSIFfCIIhUIoiSIHfCISIAWFQjCJIgUgCHwiCCAHhUIBiSIHICJ8IAkgDiAQhUIBiSIJfCAkfCIOIBp8IAkgBCAOhUIgiSIEIAx8IgyFQiiJIgl8Ig58IhCFQiCJIg8gHiATIAIgBoVCAYkiBnwgFnwiAnwgBiADIAIgC4VCIIkiBnwiA4VCKIkiAnwiCyAGhUIwiSIGIAN8IgN8IhMgB4VCKIkiByAQfCAhfCIQIA+FQjCJIg8gE3wiEyAHhUIBiSIHIAIgA4VCAYkiAyASfCAkfCICIBt8IAMgCiANfCIKIAQgDoVCMIkiBCAChUIgiSICfCINhUIoiSIDfCIOfCAjfCISfCAHIBIgCiARhUIBiSIKIAsgFXx8IgsgH3wgCiAFIAuFQiCJIgUgBCAMfCIEfCILhUIoiSIMfCIKIAWFQjCJIgWFQiCJIhEgBCAJhUIBiSIEIBp8IBR8IgkgHXwgBCAGIAmFQiCJIgYgCHwiCIVCKIkiBHwiCSAGhUIwiSIGIAh8Igh8IhKFQiiJIgd8IhQgEYVCMIkiESASfCISIAeFQgGJIgcgCiADIAIgDoVCMIkiAyANfCIChUIBiSINfCAZfCIKIBh8IAYgCoVCIIkiBiATfCIKIA2FQiiJIg18Ig4gBoVCMIkiBiAKfCIKIAIgDyAFIAt8IgUgDIVCAYkiAiAJIB58fCILhUIgiSIMfCIJIAKFQiiJIgIgC3wgF3wiCyAMhUIwiSIMIBAgBCAIhUIBiSIEfCAcfCIIIBZ8IAQgBSADIAiFQiCJIgN8IgWFQiiJIgR8IgggByAWfHwiB4VCIIkiEHwiE4VCKIkiDyATIBAgDyAYfCAHfCIHhUIwiSIQfCIThUIBiSIPIBIgBiAZIAQgAyAIhUIwiSIEIAV8IgOFQgGJIgV8IAt8IgiFQiCJIgZ8IgsgBiAFIAuFQiiJIgUgG3wgCHwiCIVCMIkiBnwiCyACIAkgDHwiDIVCAYkiAiAOIB98fCIJIBGFQiCJIg4gAyAOfCIDIAKFQiiJIgIgIHwgCXwiCYVCMIkiDiAKIA2FQgGJIgogDCAEIAogHnwgFHwiCoVCIIkiBHwiDIVCKIkiDSAcfCAKfCIKIA8gJHx8IhGFQiCJIhJ8IhSFQiiJIg8gFCASIA8gHXwgEXwiEYVCMIkiEnwiFIVCAYkiDyATIAYgCSAiIA0gDCAEIAqFQjCJIgR8IgyFQgGJIgl8fCIKhUIgiSIGfCINIAYgCSANhUIoiSIJICN8IAp8IgqFQjCJIgZ8Ig0gECAIIBogAiADIA58IgOFQgGJIgJ8fCIIhUIgiSIOIAggAiAMIA58IgiFQiiJIgIgIXx8IgyFQjCJIg4gBSALhUIBiSIFIAMgBCAFIBd8IAd8IgWFQiCJIgR8IgOFQiiJIgcgFXwgBXwiBSAPIB98fCILhUIgiSIQfCIThUIoiSIPIBMgECAPIB58IAt8IguFQjCJIhB8IhOFQgGJIg8gFCAGIB0gByADIAQgBYVCMIkiBHwiA4VCAYkiBXwgDHwiB4VCIIkiBnwiDCAGIAUgDIVCKIkiBSAXfCAHfCIHhUIwiSIGfCIMIBIgAiAIIA58IgiFQgGJIgIgGHwgCnwiCoVCIIkiDiACIAMgDnwiA4VCKIkiAiAhfCAKfCIKhUIwiSIOIAkgDYVCAYkiCSAIIAQgCSAjfCARfCIJhUIgiSIEfCIIhUIoiSINIBZ8IAl8IgkgDyAcfHwiEYVCIIkiEnwiFIVCKIkiDyAUIBIgDyAZfCARfCIRhUIwiSISfCIUhUIBiSIPIBMgBiAgIA0gCCAEIAmFQjCJIgR8IgiFQgGJIgl8IAp8IgqFQiCJIgZ8Ig0gBiAJIA2FQiiJIgkgInwgCnwiCoVCMIkiBnwiDSAQIBUgAiADIA58IgOFQgGJIgJ8IAd8IgeFQiCJIg4gByACIAggDnwiB4VCKIkiAiAbfHwiCIVCMIkiDiAFIAyFQgGJIgUgAyAEIAUgGnwgC3wiBYVCIIkiBHwiA4VCKIkiCyAkfCAFfCIFIA8gIXx8IgyFQiCJIhB8IhOFQiiJIg8gEyAQIA8gHXwgDHwiDIVCMIkiEHwiE4VCAYkiDyAUIAYgIiALIAMgBCAFhUIwiSIEfCIDhUIBiSIFfCAIfCIIhUIgiSIGfCILIAYgBSALhUIoiSIFIBp8IAh8IgiFQjCJIgZ8IgsgEiACIAcgDnwiB4VCAYkiAiAkfCAKfCIKhUIgiSIOIAIgAyAOfCIDhUIoiSICIBx8IAp8IgqFQjCJIg4gCSANhUIBiSIJIAcgBCAJIBZ8IBF8IgmFQiCJIgR8IgeFQiiJIg0gF3wgCXwiCSAPIBh8fCIRhUIgiSISfCIUhUIoiSIPIBQgEiAPICN8IBF8IhGFQjCJIhJ8IhSFQgGJIg8gEyAGIB8gDSAHIAQgCYVCMIkiBHwiB4VCAYkiCXwgCnwiCoVCIIkiBnwiDSAGIAkgDYVCKIkiCSAVfCAKfCIKhUIwiSIGfCINIBAgGyACIAMgDnwiA4VCAYkiAnwgCHwiCIVCIIkiDiACIAcgDnwiB4VCKIkiAiAgfCAIfCIIhUIwiSIOIAUgC4VCAYkiBSADIAQgBSAefCAMfCIFhUIgiSIEfCIDhUIoiSILIBl8IAV8IgUgDyAjfHwiDIVCIIkiEHwiE4VCKIkiDyATIBAgDyAkfCAMfCIMhUIwiSIQfCIThUIBiSIPIBQgBiAeIAsgAyAEIAWFQjCJIgR8IgOFQgGJIgV8IAh8IgiFQiCJIgZ8IgsgBiAFIAuFQiiJIgUgIHwgCHwiCIVCMIkiBnwiCyASIAIgByAOfCIHhUIBiSICIBt8IAp8IgqFQiCJIg4gAiADIA58IgOFQiiJIgIgFXwgCnwiCoVCMIkiDiAJIA2FQgGJIgkgByAEIAkgGnwgEXwiCYVCIIkiBHwiB4VCKIkiDSAZfCAJfCIJIA8gF3x8IhGFQiCJIhJ8IhSFQiiJIg8gFCASIA8gFnwgEXwiEYVCMIkiEnwiFIVCAYkiDyATIAYgHCANIAcgBCAJhUIwiSIEfCIHhUIBiSIJfCAKfCIKhUIgiSIGfCINIAYgCSANhUIoiSIJICF8IAp8IgqFQjCJIgZ8Ig0gECAYIAIgAyAOfCIDhUIBiSICfCAIfCIIhUIgiSIOIAIgByAOfCIHhUIoiSICICJ8IAh8IgiFQjCJIg4gBSALhUIBiSIFIAMgBCAFIB18IAx8IgWFQiCJIgR8IgOFQiiJIgsgH3wgBXwiBSAPIBl8fCIMhUIgiSIQfCIThUIoiSIPIBMgECAPICB8IAx8IgyFQjCJIhB8IhOFQgGJIg8gFCAGICQgCyADIAQgBYVCMIkiBHwiA4VCAYkiBXwgCHwiCIVCIIkiBnwiCyAGIAUgC4VCKIkiBSAjfCAIfCIIhUIwiSIGfCILIBIgAiAHIA58IgeFQgGJIgIgInwgCnwiCoVCIIkiDiACIAMgDnwiA4VCKIkiAiAefCAKfCIKhUIwiSIOIAkgDYVCAYkiCSAHIAQgCSAVfCARfCIJhUIgiSIEfCIHhUIoiSINIB18IAl8IgkgDyAbfHwiEYVCIIkiEnwiFIVCKIkiDyAUIBIgDyAhfCARfCIRhUIwiSISfCIUhUIBiSIPIBMgBiAaIA0gByAEIAmFQjCJIgR8IgeFQgGJIgl8IAp8IgqFQiCJIgZ8Ig0gBiAJIA2FQiiJIgkgF3wgCnwiCoVCMIkiBnwiDSAQIBYgAiADIA58IgOFQgGJIgJ8IAh8IgiFQiCJIg4gAiAHIA58IgeFQiiJIgIgHHwgCHwiCIVCMIkiDiAFIAuFQgGJIgUgAyAEIAUgH3wgDHwiBYVCIIkiBHwiA4VCKIkiCyAYfCAFfCIFIA8gF3x8IheFQiCJIgx8IhCFQiiJIhMgECAMIBMgHHwgF3wiHIVCMIkiF3wiDIVCAYkiECAUIAYgGCALIAMgBCAFhUIwiSIEfCIDhUIBiSIFfCAIfCIYhUIgiSIGfCIIIAYgGCAkIAUgCIVCKIkiJHx8IhiFQjCJIgZ8IgUgEiAWIAIgByAOfCIHhUIBiSICfCAKfCIWhUIgiSIIIBYgGyACIAMgCHwiFoVCKIkiA3x8IhuFQjCJIgIgGiAJIA2FQgGJIgggByAEIAggGXwgEXwiGYVCIIkiBHwiB4VCKIkiCHwgGXwiGiAQICJ8fCIZhUIgiSIifCILhUIoiSIJIBV8IBl8IhkgJYUgByAEIBqFQjCJIhp8IhUgFyAYICAgAyACIBZ8IhiFQgGJIhZ8fCIghUIgiSIXfCIEIBcgICAdIAQgFoVCKIkiHXx8IiCFQjCJIhd8IhaFNwAIIAAgGCAaIBwgISAFICSFQgGJIhx8fCIhhUIgiSIafCIYIBogIyAYIByFQiiJIhh8ICF8IhyFQjCJIhp8IiEgJiAfIAggFYVCAYkiFSAMIAYgFSAefCAbfCIbhUIgiSIVfCIehUIoiSIjfCAbfCIbhYU3AAAgACAeIBUgG4VCMIkiG3wiFSAcIAApABCFhTcAECAAIBkgIoVCMIkiGSAAKQAgIBYgHYVCAYmFhTcAICAAIAsgGXwiGSAgIAApABiFhTcAGCAAIAApACggFSAjhUIBiYUgGoU3ACggACAAKQA4IBggIYVCAYmFIBuFNwA4IAAgACkAMCAJIBmFQgGJhSAXhTcAMAsLACAAQQAgARAJGgvCAQEDfwJAIAEgAigCECIDBH8gAwUgAhAUDQEgAigCEAsgAigCFCIEa0sEQCACIAAgASACKAIkEQAADwsCQAJAIAIoAlBBAEgNACABRQ0AIAEhAwNAIAAgA2oiBUEBay0AAEEKRwRAIANBAWsiAw0BDAILCyACIAAgAyACKAIkEQAAIgQgA0kNAiABIANrIQEgAigCFCEEDAELIAAhBUEAIQMLIAQgBSABEAUaIAIgAigCFCABajYCFCABIANqIQQLIAQLhAEBAn8jAEEQayIAJAAgAEEKOgAPAkACQEHAFigCACIBBH8gAQVBsBYQFA0CQcAWKAIAC0HEFigCACIBRg0AQYAXKAIAQQpGDQBBxBYgAUEBajYCACABQQo6AAAMAQtBsBYgAEEPakEBQdQWKAIAEQAAQQFHDQAgAC0ADxoLIABBEGokAAtZAQF/IAAgACgCSCIBQQFrIAFyNgJIIAAoAgAiAUEIcQRAIAAgAUEgcjYCAEF/DwsgAEIANwIEIAAgACgCLCIBNgIcIAAgATYCFCAAIAEgACgCMGo2AhBBAAsTAEGsH0G0HjYCAEHkHkEqNgIAC+8CAgN/An4jAEFAaiIDJAACQCACQcEAa0H/AXFBvwFLBEAgACkAUFAEQCAAKADgAiIEQYEBTwRAIAAgACkAQCIGQoABfDcAQCAAIAApAEggBkL/flatfDcASCAAIABB4ABqIgUQECAAIAAoAOACQYABayIENgDgAiAEQYEBTw0DIAUgAEHgAWogBBAFGiAAKADgAiEECyAAIAApAEAiBiAErXwiBzcAQCAAIAApAEggBiAHVq18NwBIIAAtAOQCBEAgAEJ/NwBYCyAAQn83AFAgAEHgAGoiBSAEakEAQYACIARrEAkaIAAgBRAQIAMgACkAADcDACADIAApAAg3AwggAyAAKQAQNwMQIAMgACkAGDcDGCADIAApACA3AyAgAyAAKQAoNwMoIAMgACkAMDcDMCADIAApADg3AzggASADIAIQBRogAEHAABARIAVBgAIQEQsgA0FAayQADwsQDwALQZAKQYsJQbICQf0IEAAAC5cCACAARQRAQQAPCwJ/AkAgAAR/IAFB/wBNDQECQEGsHygCACgCAEUEQCABQYB/cUGAvwNGDQMMAQsgAUH/D00EQCAAIAFBP3FBgAFyOgABIAAgAUEGdkHAAXI6AABBAgwECyABQYBAcUGAwANHIAFBgLADT3FFBEAgACABQT9xQYABcjoAAiAAIAFBDHZB4AFyOgAAIAAgAUEGdkE/cUGAAXI6AAFBAwwECyABQYCABGtB//8/TQRAIAAgAUE/cUGAAXI6AAMgACABQRJ2QfABcjoAACAAIAFBBnZBP3FBgAFyOgACIAAgAUEMdkE/cUGAAXI6AAFBBAwECwtBkB5BGTYCAEF/BUEBCwwBCyAAIAE6AABBAQsLtAIAAkACQAJAAkACQAJAAkACQAJAAkACQCABQQlrDhIACAkKCAkBAgMECgkKCggJBQYHCyACIAIoAgAiAUEEajYCACAAIAEoAgA2AgAPCyACIAIoAgAiAUEEajYCACAAIAEyAQA3AwAPCyACIAIoAgAiAUEEajYCACAAIAEzAQA3AwAPCyACIAIoAgAiAUEEajYCACAAIAEwAAA3AwAPCyACIAIoAgAiAUEEajYCACAAIAExAAA3AwAPCyACIAIoAgBBB2pBeHEiAUEIajYCACAAIAErAwA5AwAPCwALDwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMAC28BBX8gACgCACIDLAAAQTBrIgFBCUsEQEEADwsDQEF/IQQgAkHMmbPmAE0EQEF/IAEgAkEKbCIFaiABIAVB/////wdzSxshBAsgACADQQFqIgU2AgAgAywAASAEIQIgBSEDQTBrIgFBCkkNAAsgAguLFQITfwJ+QaAIIQUjAEFAaiIGJAAgBkGgCDYCPCAGQSdqIRQgBkEoaiEPAkACQAJAAkADQEEAIQQDQCAFIQkgBCAMQf////8Hc0oNAiAEIAxqIQwCQAJAAkACQCAFIgQtAAAiCgRAA0ACQAJAIApB/wFxIgVFBEAgBCEFDAELIAVBJUcNASAEIQoDQCAKLQABQSVHBEAgCiEFDAILIARBAWohBCAKLQACIApBAmoiBSEKQSVGDQALCyAEIAlrIgQgDEH/////B3MiFUoNCSAABEAgACAJIAQQDgsgBA0HIAYgBTYCPCAFQQFqIQRBfyEOAkAgBSwAAUEwayIHQQlLDQAgBS0AAkEkRw0AIAVBA2ohBEEBIRAgByEOCyAGIAQ2AjxBACELAkAgBCwAACIKQSBrIgVBH0sEQCAEIQcMAQsgBCEHQQEgBXQiBUGJ0QRxRQ0AA0AgBiAEQQFqIgc2AjwgBSALciELIAQsAAEiCkEgayIFQSBPDQEgByEEQQEgBXQiBUGJ0QRxDQALCwJAIApBKkYEQAJ/AkAgBywAAUEwayIEQQlLDQAgBy0AAkEkRw0AAn8gAEUEQCADIARBAnRqQQo2AgBBAAwBCyACIARBA3RqKAIACyENIAdBA2ohBUEBDAELIBANBiAHQQFqIQUgAEUEQCAGIAU2AjxBACEQQQAhDQwDCyABIAEoAgAiBEEEajYCACAEKAIAIQ1BAAshECAGIAU2AjwgDUEATg0BQQAgDWshDSALQYDAAHIhCwwBCyAGQTxqEBkiDUEASA0KIAYoAjwhBQtBACEEQX8hCAJ/QQAgBS0AAEEuRw0AGiAFLQABQSpGBEACfwJAIAUsAAJBMGsiB0EJSw0AIAUtAANBJEcNACAFQQRqIQUCfyAARQRAIAMgB0ECdGpBCjYCAEEADAELIAIgB0EDdGooAgALDAELIBANBiAFQQJqIQVBACAARQ0AGiABIAEoAgAiB0EEajYCACAHKAIACyEIIAYgBTYCPCAIQQBODAELIAYgBUEBajYCPCAGQTxqEBkhCCAGKAI8IQVBAQshEQNAIAQhEkEcIQcgBSIWLAAAIgRB+wBrQUZJDQsgBUEBaiEFIAQgEkE6bGpBjxJqLQAAIgRBAWtBCEkNAAsgBiAFNgI8AkAgBEEbRwRAIARFDQwgDkEATgRAIABFBEAgAyAOQQJ0aiAENgIADAwLIAYgAiAOQQN0aikDADcDMAwCCyAARQ0IIAZBMGogBCABEBgMAQsgDkEATg0LQQAhBCAARQ0ICyAALQAAQSBxDQsgC0H//3txIgogCyALQYDAAHEbIQtBACEOQaUIIRMgDyEHAkACQAJ/AkACQAJAAkACQAJAAn8CQAJAAkACQAJAAkACQCAWLAAAIgRBU3EgBCAEQQ9xQQNGGyAEIBIbIgRB2ABrDiEEFhYWFhYWFhYQFgkGEBAQFgYWFhYWAgUDFhYKFgEWFgQACwJAIARBwQBrDgcQFgsWEBAQAAsgBEHTAEYNCwwVCyAGKQMwIRdBpQgMBQtBACEEAkACQAJAAkACQAJAAkAgEkH/AXEOCAABAgMEHAUGHAsgBigCMCAMNgIADBsLIAYoAjAgDDYCAAwaCyAGKAIwIAysNwMADBkLIAYoAjAgDDsBAAwYCyAGKAIwIAw6AAAMFwsgBigCMCAMNgIADBYLIAYoAjAgDKw3AwAMFQtBCCAIIAhBCE0bIQggC0EIciELQfgAIQQLIA8hCSAGKQMwIhdCAFIEQCAEQSBxIQUDQCAJQQFrIgkgF6dBD3FBoBZqLQAAIAVyOgAAIBdCD1YgF0IEiCEXDQALCyAGKQMwUA0DIAtBCHFFDQMgBEEEdkGlCGohE0ECIQ4MAwsgDyEEIAYpAzAiF0IAUgRAA0AgBEEBayIEIBenQQdxQTByOgAAIBdCB1YgF0IDiCEXDQALCyAEIQkgC0EIcUUNAiAIIA8gBGsiBEEBaiAEIAhIGyEIDAILIAYpAzAiF0IAUwRAIAZCACAXfSIXNwMwQQEhDkGlCAwBCyALQYAQcQRAQQEhDkGmCAwBC0GnCEGlCCALQQFxIg4bCyETIA8hBQJAIBdCgICAgBBUBEAgFyEYDAELA0AgBUEBayIFIBcgF0IKgCIYQgp+fadBMHI6AAAgF0L/////nwFWIBghFw0ACwsgGEIAUgRAIBinIQkDQCAFQQFrIgUgCSAJQQpuIgRBCmxrQTByOgAAIAlBCUsgBCEJDQALCyAFIQkLIBEgCEEASHENESALQf//e3EgCyARGyELAkAgBikDMCIXQgBSDQAgCA0AIA8hCUEAIQgMDgsgCCAXUCAPIAlraiIEIAQgCEgbIQgMDQsgBikDMCEXDAsLAn9B/////wcgCCAIQf////8HTxsiCyIFQQBHIQcCQAJAAkAgBigCMCIEQboSIAQbIgkiBEEDcUUNACAFRQ0AA0AgBC0AAEUNAiAFQQFrIgVBAEchByAEQQFqIgRBA3FFDQEgBQ0ACwsgB0UNAQJAIAQtAABFDQAgBUEESQ0AA0BBgIKECCAEKAIAIgdrIAdyQYCBgoR4cUGAgYKEeEcNAiAEQQRqIQQgBUEEayIFQQNLDQALCyAFRQ0BCwNAIAQgBC0AAEUNAhogBEEBaiEEIAVBAWsiBQ0ACwtBAAsiBCAJayALIAQbIgQgCWohByAIQQBOBEAgCiELIAQhCAwMCyAKIQsgBCEIIActAAANDwwLCyAGKQMwIhdCAFINAUIAIRcMCQsgCARAIAYoAjAMAgtBACEEIABBICANQQAgCxANDAILIAZBADYCDCAGIBc+AgggBiAGQQhqIgQ2AjBBfyEIIAQLIQpBACEEA0ACQCAKKAIAIglFDQAgBkEEaiAJEBciCUEASA0PIAkgCCAEa0sNACAKQQRqIQogBCAJaiIEIAhJDQELC0E9IQcgBEEASA0MIABBICANIAQgCxANIARFBEBBACEEDAELQQAhByAGKAIwIQoDQCAKKAIAIglFDQEgBkEEaiIIIAkQFyIJIAdqIgcgBEsNASAAIAggCRAOIApBBGohCiAEIAdLDQALCyAAQSAgDSAEIAtBgMAAcxANIA0gBCAEIA1IGyEEDAgLIBEgCEEASHENCUE9IQcgBisDMAALIAQtAAEhCiAEQQFqIQQMAAsACyAADQkgEEUNA0EBIQQDQCADIARBAnRqKAIAIgAEQCACIARBA3RqIAAgARAYQQEhDCAEQQFqIgRBCkcNAQwLCwsgBEEKTwRAQQEhDAwKCwNAIAMgBEECdGooAgANAUEBIQwgBEEBaiIEQQpHDQALDAkLQRwhBwwGCyAGIBc8ACdBASEIIBQhCSAKIQsLIAggByAJayIKIAggCkobIgggDkH/////B3NKDQNBPSEHIA0gCCAOaiIFIAUgDUgbIgQgFUoNBCAAQSAgBCAFIAsQDSAAIBMgDhAOIABBMCAEIAUgC0GAgARzEA0gAEEwIAggCkEAEA0gACAJIAoQDiAAQSAgBCAFIAtBgMAAcxANIAYoAjwhBQwBCwsLQQAhDAwDC0E9IQcLQZAeIAc2AgALQX8hDAsgBkFAayQAIAwLBABCAAsEAEEAC/ACAQd/IwBBIGsiAyQAIAMgACgCHCIENgIQIAAoAhQhBSADIAI2AhwgAyABNgIYIAMgBSAEayIBNgIUIAEgAmohBUECIQcCfwJAAkACQCAAKAI8IANBEGoiAUECIANBDGoQASIEBH9BkB4gBDYCAEF/BUEACwRAIAEhBAwBCwNAIAUgAygCDCIGRg0CIAZBAEgEQCABIQQMBAsgASAGIAEoAgQiCEsiCUEDdGoiBCAGIAhBACAJG2siCCAEKAIAajYCACABQQxBBCAJG2oiASABKAIAIAhrNgIAIAUgBmshBSAAKAI8IAQiASAHIAlrIgcgA0EMahABIgYEf0GQHiAGNgIAQX8FQQALRQ0ACwsgBUF/Rw0BCyAAIAAoAiwiATYCHCAAIAE2AhQgACABIAAoAjBqNgIQIAIMAQsgAEEANgIcIABCADcDECAAIAAoAgBBIHI2AgBBACAHQQJGDQAaIAIgBCgCBGsLIANBIGokAAvfFAIEfwJ+QQAhAUHwHSgCAAR/QQEFIwBBEGsiACQAIABBADoAD0HkFyAAQQ9qQQAQAhogAEEQaiQAIwBBEGsiACQAA0AgAEEAOgAPIAFBgB5qQcAXIABBD2pBABACOgAAIAFBAWoiAUEQRw0ACyAAQRBqJABB8B1BATYCAEEACwR/QeMABSMAIgAhBSAAQcAGa0FAcSIBJAAgAUGACCkDADcDsAMgAUGICCkDADcDuAMgAUGYCCkDADcDqAMgAUGQCCkDADcDoAMgAUK48ujZw6ePnz83A5gCIAFCsOLImcOmjZs3NwOQAiABQqjSqNnCpYuXLzcDiAIgAUKgwoiZwqSJkyc3A4ACIAFCmLLo2MGjh48fNwP4ASABQpCiyJjBooWLFzcD8AEgAUKIkqjYwKGDhw83A+gBIAFCgIKImMCggYMHNwPgAUEBIQIDQCABQeACaiIEIAanaiAGPAAAIAFBwANqIgAgAUHgAWogBkIBfCIHpyIDIAMgAUGwA2ogAUGgA2oQBhogACAEIAYQDCAAIAFBoAJqIAMQC0EAIQADQCABIAFBoAJqIgMgAGotAAA2AtABIAFB0AFqEAggAEEBaiIAIAJHDQALEAcgAkEBaiECIAciBkLAAFINAAsgAUIANwPYAiABQgA3A9ACIAFCADcDyAIgAUIANwPAAiABQgA3A7gCIAFCADcDsAIgAUIANwOoAiABQgA3A6ACQQAhACABQcADaiICIAFB4AFqQQBBwAAgAUGwA2ogAUGgA2oQBhogAiABQeACakLAABAMIAIgA0HAABALA0AgASABQaACaiIDIABqLQAANgLAASABQcABahAIIABBAWoiAEHAAEcNAAsQByABQgA3A9gCIAFCADcD0AIgAUIANwPIAiABQgA3A8ACIAFCADcDuAIgAUIANwOwAiABQgA3A6gCIAFCADcDoAJBACEAIAFBwANqIgJBAEEBQcAAIAFBsANqIAFBoANqEAYaIAIgAUHgAmpCwAAQDCACIANBwAAQCwNAIAEgAUGgAmoiAyAAai0AADYCsAEgAUGwAWoQCCAAQQFqIgBBwABHDQALEAcgAUIANwPYAiABQgA3A9ACIAFCADcDyAIgAUIANwPAAiABQgA3A7gCIAFCADcDsAIgAUIANwOoAiABQgA3A6ACQQAhACABQcADaiICIAFB4AFqQcAAQcAAQQAgAUGgA2oQBhogAiABQeACakLAABAMIAIgA0HAABALA0AgASABQaACaiIDIABqLQAANgKgASABQaABahAIIABBAWoiAEHAAEcNAAsQByABQgA3A9gCIAFCADcD0AIgAUIANwPIAiABQgA3A8ACIAFCADcDuAIgAUIANwOwAiABQgA3A6gCIAFCADcDoAJBACEAIAFBwANqIgIgAUHgAWpBwABBwAAgAUGwA2pBABAGGiACIAFB4AJqQsAAEAwgAiADQcAAEAsDQCABIAFBoAJqIgIgAGotAAA2ApABIAFBkAFqEAggAEEBaiIAQcAARw0ACxAHIAFCADcD2AIgAUIANwPQAiABQgA3A8gCIAFCADcDwAIgAUIANwO4AiABQgA3A7ACIAFCADcDqAIgAUIANwOgAkEAIQAgAkHAACABQeACaiABQeABakEAIAFBsANqIAFBoANqEAoaA0AgASABQaACaiICIABqLQAANgKAASABQYABahAIIABBAWoiAEHAAEcNAAsQByABQgA3A9gCIAFCADcD0AIgAUIANwPIAiABQgA3A8ACIAFCADcDuAIgAUIANwOwAiABQgA3A6gCIAFCADcDoAJBACEAIAJBwAAgAUHgAmpBAEEAIAFBsANqIAFBoANqEAoaA0AgASABQaACaiICIABqLQAANgJwIAFB8ABqEAggAEEBaiIAQcAARw0ACxAHIAFCADcD2AIgAUIANwPQAiABQgA3A8gCIAFCADcDwAIgAUIANwO4AiABQgA3A7ACIAFCADcDqAIgAUIANwOgAiACQcAAIAFB4AJqIAFB4AFqQcAAIAFBsANqIAFBoANqEAoaQQAhAANAIAEgAUGgAmoiAiAAai0AADYCYCABQeAAahAIIABBAWoiAEHAAEcNAAsQByABQgA3A9gCIAFCADcD0AIgAUIANwPIAiABQgA3A8ACIAFCADcDuAIgAUIANwOwAiABQgA3A6gCIAFCADcDoAJBACEAIAJBwAAgAUHgAmogAUHgAWpBwABBACABQaADahAKGgNAIAEgAUGgAmoiAiAAai0AADYCUCABQdAAahAIIABBAWoiAEHAAEcNAAsQByABQgA3A9gCIAFCADcD0AIgAUIANwPIAiABQgA3A8ACIAFCADcDuAIgAUIANwOwAiABQgA3A6gCIAFCADcDoAJBACEAIAJBwAAgAUHgAmogAUHgAWpBwAAgAUGwA2pBABAKGgNAIAEgAUGgAmoiBCAAai0AADYCQCABQUBrEAggAEEBaiIAQcAARw0ACxAHAkACQAJAAkACQAJAAkACQEEAQQAgAUHgAmoiAiABQeABaiIDQcAAQQBBABAKQX9GBEBBAEHBACACIANBwABBAEEAEApBf0cNAUEAIQBBAEHAACACIANBwQBBAEEAEApBf0cNAiABQcADaiIDQQBBAEEgQQAgAUGgA2oQBhogAyACQsAAEAwgAyAEQcAAEAsDQCABIAFBoAJqIgMgAGotAAA2AjAgAUEwahAIIABBAWoiAEHAAEcNAAsQB0EAIQAgAUHAA2oiAkEAQQBBICABQbADakEAEAYaIAIgAUHgAmpCwAAQDCACIANBwAAQCwNAIAEgAUGgAmogAGotAAA2AiAgAUEgahAIIABBAWoiAEHAAEcNAAsQByABQcADaiIAIAFB4AFqIgJBwABBAEEAQQAQBkF/Rw0DIAAgAkHAAEHBAEEAQQAQBkF/Rw0EIAAgAkHBAEHAAEEAQQAQBkF/Rw0FIAAgAkHAAEEgQQAgAUGgA2oQBg0GIAAgAkHAAEEgIAFBsANqQQAQBg0HIAUkAAwIC0HNDEHtCUGIAUHkCBAAAAtBsgtB7QlBjAFB5AgQAAALQcYOQe0JQZABQeQIEAAAC0H6D0HtCUGlAUHkCBAAAAtByQ1B7QlBpwFB5AgQAAALQbAKQe0JQakBQeQIEAAAC0HQEEHtCUGsAUHkCBAAAAtBvxFB7QlBrgFB5AgQAAALQfwWKAIAGgJAAn8CfwJAAkBBqhIiAUEDcUUNAEEAQaoSLQAARQ0CGgNAIAFBAWoiAUEDcUUNASABLQAADQALDAELA0AgASIAQQRqIQFBgIKECCAAKAIAIgJrIAJyQYCBgoR4cUGAgYKEeEYNAAsDQCAAIgFBAWohACABLQAADQALCyABQaoSawsiAAJ/QfwWKAIAQQBIBEBBqhIgAEGwFhASDAELQaoSIABBsBYQEgsiASAARg0AGiABCyAARw0AAkBBgBcoAgBBCkYNAEHEFigCACIAQcAWKAIARg0AQcQWIABBAWo2AgAgAEEKOgAADAELEBMLQQALCwvDDRMAQYAIC8AKNWI2YjQxZWQ5YjM0M2ZlMDUxMjZmYjJhMzc0MDBkMmElMDJ4AC0rICAgMFgweABjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9zdGF0ZWJ5dGVzKCkgPj0gc2l6ZW9mIHN0AHhtYWluAGNyeXB0b19nZW5lcmljaGFzaF9ibGFrZTJiX2ZpbmFsAGNyeXB0b19nZW5lcmljaGFzaC9ibGFrZTJiL3JlZi9ibGFrZTJiLXJlZi5jAGNyeXB0b19nZW5lcmljaGFzaC9ibGFrZTJiL3JlZi9nZW5lcmljaGFzaF9ibGFrZTJiLmMAZ2VuZXJpY2hhc2gzLmMAb3V0bGVuIDw9IFVJTlQ4X01BWABTLT5idWZsZW4gPD0gQkxBS0UyQl9CTE9DS0JZVEVTAGNyeXB0b19nZW5lcmljaGFzaF9ibGFrZTJiX2luaXRfc2FsdF9wZXJzb25hbCAoJnN0LCBrLCBjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9LRVlCWVRFU19NQVggKyAxLCBzaXplb2Ygb3V0LCBOVUxMLCBOVUxMKSA9PSAtMQBjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9zYWx0X3BlcnNvbmFsIChndWFyZF9wYWdlLCBjcnlwdG9fZ2VuZXJpY2hhc2hfQllURVNfTUFYICsgMSwgaW4sICh1bnNpZ25lZCBsb25nIGxvbmcpIHNpemVvZiBpbiwgaywgc2l6ZW9mIGssIE5VTEwsIE5VTEwpID09IC0xAGNyeXB0b19nZW5lcmljaGFzaF9ibGFrZTJiX3NhbHRfcGVyc29uYWwgKGd1YXJkX3BhZ2UsIDAsIGluLCAodW5zaWduZWQgbG9uZyBsb25nKSBzaXplb2YgaW4sIGssIHNpemVvZiBrLCBOVUxMLCBOVUxMKSA9PSAtMQBjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9pbml0X3NhbHRfcGVyc29uYWwgKCZzdCwgaywgc2l6ZW9mIGssIGNyeXB0b19nZW5lcmljaGFzaF9ibGFrZTJiX0JZVEVTX01BWCArIDEsIE5VTEwsIE5VTEwpID09IC0xAGNyeXB0b19nZW5lcmljaGFzaF9ibGFrZTJiX3NhbHRfcGVyc29uYWwgKGd1YXJkX3BhZ2UsICh1bnNpZ25lZCBsb25nIGxvbmcpIHNpemVvZiBpbiwgaW4sICh1bnNpZ25lZCBsb25nIGxvbmcpIHNpemVvZiBpbiwgaywgY3J5cHRvX2dlbmVyaWNoYXNoX0tFWUJZVEVTX01BWCArIDEsIE5VTEwsIE5VTEwpID09IC0xAGNyeXB0b19nZW5lcmljaGFzaF9ibGFrZTJiX2luaXRfc2FsdF9wZXJzb25hbCAoJnN0LCBrLCBzaXplb2YgaywgMCwgTlVMTCwgTlVMTCkgPT0gLTEAY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfaW5pdF9zYWx0X3BlcnNvbmFsKCZzdCwgaywgc2l6ZW9mIGssIGNyeXB0b19nZW5lcmljaGFzaF9CWVRFUywgTlVMTCwgcGVyc29uYWwpID09IDAAY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfaW5pdF9zYWx0X3BlcnNvbmFsKCZzdCwgaywgc2l6ZW9mIGssIGNyeXB0b19nZW5lcmljaGFzaF9CWVRFUywgc2FsdCwgTlVMTCkgPT0gMAAtLS0gU1VDQ0VTUyAtLS0AKG51bGwpAEHQEgtBGQALABkZGQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAAZAAoKGRkZAwoHAAEACQsYAAAJBgsAAAsABhkAAAAZGRkAQaETCyEOAAAAAAAAAAAZAAsNGRkZAA0AAAIACQ4AAAAJAA4AAA4AQdsTCwEMAEHnEwsVEwAAAAATAAAAAAkMAAAAAAAMAAAMAEGVFAsBEABBoRQLFQ8AAAAEDwAAAAAJEAAAAAAAEAAAEABBzxQLARIAQdsUCx4RAAAAABEAAAAACRIAAAAAABIAABIAABoAAAAaGhoAQZIVCw4aAAAAGhoaAAAAAAAACQBBwxULARQAQc8VCxUXAAAAABcAAAAACRQAAAAAABQAABQAQf0VCwEWAEGJFgsnFQAAAAAVAAAAAAkWAAAAAAAWAAAWAAAwMTIzNDU2Nzg5QUJDREVGAEGwFgsBBQBBvBYLAQEAQdQWCw4CAAAAAwAAANgPAAAABABB7BYLAQEAQfwWCwX/////Cg==";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function getWasmImports(){return{a:wasmImports}}function createWasm(){var info=getWasmImports();function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["f"];updateMemoryViews();addOnInit(wasmExports["g"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}if(!wasmBinaryFile)wasmBinaryFile=findWasmBinary();instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={3008:()=>Module.getRandomValue(),3044:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;crypto_=crypto_===undefined?crypto:crypto_;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder:undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>{abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])};var __abort_js=()=>{abort("")};var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={a:___assert_fail,e:__abort_js,d:__emscripten_memcpy_js,c:_emscripten_asm_const_int,b:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["g"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["h"])(a0,a1);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();Module["onRuntimeInitialized"]?.();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
