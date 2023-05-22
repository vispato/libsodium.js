var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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IANBfHEiAEHAAEkNACACIABBQGoiBEsNAANAIAIgASgCADYCACACIAEoAgQ2AgQgAiABKAIINgIIIAIgASgCDDYCDCACIAEoAhA2AhAgAiABKAIUNgIUIAIgASgCGDYCGCACIAEoAhw2AhwgAiABKAIgNgIgIAIgASgCJDYCJCACIAEoAig2AiggAiABKAIsNgIsIAIgASgCMDYCMCACIAEoAjQ2AjQgAiABKAI4NgI4IAIgASgCPDYCPCABQUBrIQEgAkFAayICIARNDQALCyAAIAJNDQEDQCACIAEoAgA2AgAgAUEEaiEBIAJBBGoiAiAASQ0ACwwBCyADQQRJBEAgACECDAELIAAgA0EEayIESwRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAiABLQABOgABIAIgAS0AAjoAAiACIAEtAAM6AAMgAUEEaiEBIAJBBGoiAiAETQ0ACwsgAiADSQRAA0AgAiABLQAAOgAAIAFBAWohASACQQFqIgIgA0cNAAsLC78BAQN/AkAgASACKAIQIgMEfyADBSACEAwNASACKAIQCyACKAIUIgVrSwRAIAIgACABIAIoAiQRAAAPCwJAIAIoAlBBAEgEQEEAIQMMAQsgASEEA0AgBCIDRQRAQQAhAwwCCyAAIANBAWsiBGotAABBCkcNAAsgAiAAIAMgAigCJBEAACIEIANJDQEgACADaiEAIAEgA2shASACKAIUIQULIAUgACABEAogAiACKAIUIAFqNgIUIAEgA2ohBAsgBAtZAQF/IAAgACgCSCIBQQFrIAFyNgJIIAAoAgAiAUEIcQRAIAAgAUEgcjYCAEF/DwsgAEIANwIEIAAgACgCLCIBNgIcIAAgATYCFCAAIAEgACgCMGo2AhBBAAvwAgICfwF+AkAgAkUNACAAIAE6AAAgACACaiIDQQFrIAE6AAAgAkEDSQ0AIAAgAToAAiAAIAE6AAEgA0EDayABOgAAIANBAmsgAToAACACQQdJDQAgACABOgADIANBBGsgAToAACACQQlJDQAgAEEAIABrQQNxIgRqIgMgAUH/AXFBgYKECGwiADYCACADIAIgBGtBfHEiAmoiAUEEayAANgIAIAJBCUkNACADIAA2AgggAyAANgIEIAFBCGsgADYCACABQQxrIAA2AgAgAkEZSQ0AIAMgADYCGCADIAA2AhQgAyAANgIQIAMgADYCDCABQRBrIAA2AgAgAUEUayAANgIAIAFBGGsgADYCACABQRxrIAA2AgAgAiADQQRxQRhyIgFrIgJBIEkNACAArUKBgICAEH4hBSABIANqIQEDQCABIAU3AxggASAFNwMQIAEgBTcDCCABIAU3AwAgAUEgaiEBIAJBIGsiAkEfSw0ACwsLEwBBsCFBuCA2AgBB6CBBKjYCAAv3AgEFfyMAQZACayIEJAAgBEEgaiIDEBEgAyABIAIQBiADIARB8AFqIgEQCCAEQYgBaiIDIAFCIBAGIAMgBBAIIAFBIBAEIwBBEGsiASAANgIMIAEgBDYCCEEAIQMgAUEANgIEA0AgASABKAIEIAEoAgwgA2otAAAgASgCCCADai0AAHNyNgIEIAEgASgCBCADQQFyIgUgASgCDGotAAAgASgCCCAFai0AAHNyNgIEIANBAmoiA0EgRw0ACyABKAIEQQFrQQh2QQFxQQFrIQYjAEEQayIBIAQ2AgwgASAANgIIQQAhAyABQQA6AAdBACEFA0AgASABLQAHIAEoAgwgA2otAAAgASgCCCADai0AAHNyOgAHIAEgAS0AByADQQFyIgcgASgCDGotAAAgASgCCCAHai0AAHNyOgAHIANBAmohAyAFQQJqIgVBIEcNAAsgAS0AB0EBa0EIdkEBcUEBayEBIARBkAJqJAAgAUF/IAYgACAERhtyC5cCACAARQRAQQAPCwJ/AkAgAAR/IAFB/wBNDQECQEGwISgCACgCAEUEQCABQYB/cUGAvwNGDQMMAQsgAUH/D00EQCAAIAFBP3FBgAFyOgABIAAgAUEGdkHAAXI6AABBAgwECyABQYBAcUGAwANHIAFBgLADT3FFBEAgACABQT9xQYABcjoAAiAAIAFBDHZB4AFyOgAAIAAgAUEGdkE/cUGAAXI6AAFBAwwECyABQYCABGtB//8/TQRAIAAgAUE/cUGAAXI6AAMgACABQRJ2QfABcjoAACAAIAFBBnZBP3FBgAFyOgACIAAgAUEMdkE/cUGAAXI6AAFBBAwECwtBgBhBGTYCAEF/BUEBCwwBCyAAIAE6AABBAQsLzAUBB38jAEHgAGsiASQAIABCADcDICAAQfAIKQMANwMAIABB+AgpAwA3AwggAEGACSkDADcDECAAQYgJKQMANwMYIAFCtuzYsePGjZs2NwNYIAFCtuzYsePGjZs2NwNQIAFCtuzYsePGjZs2NwNIIAFBQGsiBEK27Nix48aNmzY3AwAgAUK27Nix48aNmzY3AzggAUK27Nix48aNmzY3AzAgAUK27Nix48aNmzY3AyggAUK27Nix48aNmzY3AyADQCABQSBqIgUgAmoiAyADLQAAIAJBkBBqLQAAczoAACAFIAJBAXIiA2oiByAHLQAAIANBkBBqLQAAczoAACAFIAJBAnIiA2oiByAHLQAAIANBkBBqLQAAczoAACAFIAJBA3IiA2oiBSAFLQAAIANBkBBqLQAAczoAACACQQRqIQIgBkEEaiIGQSBHDQALIAAgAUEgakLAABAGIABB6ABqIgUiAEIANwMgIABB8AgpAwA3AwAgAEH4CCkDADcDCCAAQYAJKQMANwMQIABBiAkpAwA3AxggAULcuPHixYuXrtwANwNYIAFC3Ljx4sWLl67cADcDUCABQty48eLFi5eu3AA3A0ggBELcuPHixYuXrtwANwMAIAFC3Ljx4sWLl67cADcDOCABQty48eLFi5eu3AA3AzAgAULcuPHixYuXrtwANwMoIAFC3Ljx4sWLl67cADcDIEEAIQJBACEGA0AgAUEgaiIAIAJqIgQgBC0AACACQZAQai0AAHM6AAAgACACQQFyIgRqIgMgAy0AACAEQZAQai0AAHM6AAAgACACQQJyIgRqIgMgAy0AACAEQZAQai0AAHM6AAAgACACQQNyIgRqIgAgAC0AACAEQZAQai0AAHM6AAAgAkEEaiECIAZBBGoiBkEgRw0ACyAFIAFBIGoiAELAABAGIABBwAAQBCABQSAQBCABQeAAaiQAC7oCAAJAAkACQAJAAkACQAJAAkACQAJAAkAgAUEJaw4SAAgJCggJAQIDBAoJCgoICQUGBwsgAiACKAIAIgFBBGo2AgAgACABKAIANgIADwsgAiACKAIAIgFBBGo2AgAgACABMgEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMwEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMAAANwMADwsgAiACKAIAIgFBBGo2AgAgACABMQAANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKwMAOQMADwsgABogAhoACw8LIAIgAigCACIBQQRqNgIAIAAgATQCADcDAA8LIAIg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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(binaryFile){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(binaryFile)){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{if(!response["ok"]){throw"failed to load wasm binary file at '"+binaryFile+"'"}return response["arrayBuffer"]()}).catch(()=>getBinary(binaryFile))}else{if(readAsync){return new Promise((resolve,reject)=>{readAsync(binaryFile,response=>resolve(new Uint8Array(response)),reject)})}}}return Promise.resolve().then(()=>getBinary(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>{return WebAssembly.instantiate(binary,imports)}).then(instance=>{return instance}).then(receiver,reason=>{err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(binaryFile)&&!isFileURI(binaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{var result=WebAssembly.instantiateStreaming(response,imports);return result.then(callback,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(binaryFile,imports,callback)})})}else{return instantiateArrayBuffer(binaryFile,imports,callback)}}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["e"];updateMemoryViews();wasmTable=Module["asm"]["h"];addOnInit(Module["asm"]["f"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={2240:()=>{return Module.getRandomValue()},2276:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}var readEmAsmArgsArray=[];function readEmAsmArgs(sigPtr,buf){readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray}function runEmAsmFunction(code,sigPtr,argbuf){var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_asm_const_int(code,sigPtr,argbuf){return runEmAsmFunction(code,sigPtr,argbuf)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var printCharBuffers=[null,[],[]];function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function _proc_exit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}function exitJS(status,implicit){EXITSTATUS=status;_proc_exit(status)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmImports={"d":___assert_fail,"b":_emscripten_asm_const_int,"c":_emscripten_memcpy_big,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=function(){return(___wasm_call_ctors=Module["asm"]["f"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["g"]).apply(null,arguments)};var ___errno_location=function(){return(___errno_location=Module["asm"]["__errno_location"]).apply(null,arguments)};var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
