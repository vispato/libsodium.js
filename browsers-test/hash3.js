var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABPwpgA39/fwF/YAN/f38AYAF/AX9gBH9/f38Bf2AAAGACf38Bf2AFf39/f38AYAR/f39/AGACf38AYAN/fn8BfgITAwFhAWEAAwFhAWIAAAFhAWMAAQMTEgYBAQcABAIBCAQFAQIDCQIABQQEAXAABAUHAQGAAoCAAgYIAX8BQaCkBAsHEQQBZAIAAWUADAFmABQBZwEACQkBAEEBCwMSExEKuVcSbgEBfyMAQYACayIFJAACQCACIANMDQAgBEGAwARxDQAgBSABQf8BcSACIANrIgNBgAIgA0GAAkkiARsQBSABRQRAA0AgACAFQYACEAQgA0GAAmsiA0H/AUsNAAsLIAAgBSADEAQLIAVBgAJqJAALFwAgAC0AAEEgcUUEQCABIAIgABAHGgsL8AICAn8BfgJAIAJFDQAgACABOgAAIAAgAmoiA0EBayABOgAAIAJBA0kNACAAIAE6AAIgACABOgABIANBA2sgAToAACADQQJrIAE6AAAgAkEHSQ0AIAAgAToAAyADQQRrIAE6AAAgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgA2AgAgAyACIARrQXxxIgJqIgFBBGsgADYCACACQQlJDQAgAyAANgIIIAMgADYCBCABQQhrIAA2AgAgAUEMayAANgIAIAJBGUkNACADIAA2AhggAyAANgIUIAMgADYCECADIAA2AgwgAUEQayAANgIAIAFBFGsgADYCACABQRhrIAA2AgAgAUEcayAANgIAIAIgA0EEcUEYciIBayICQSBJDQAgAK1CgYCAgBB+IQUgASADaiEBA0AgASAFNwMYIAEgBTcDECABIAU3AwggASAFNwMAIAFBIGohASACQSBrIgJBH0sNAAsLC+sXAhB+EH8DQCACIBVBA3QiFmogASAWaikAACIEQjiGIARCgP4Dg0IohoQgBEKAgPwHg0IYhiAEQoCAgPgPg0IIhoSEIARCCIhCgICA+A+DIARCGIhCgID8B4OEIARCKIhCgP4DgyAEQjiIhISENwMAIBVBAWoiFUEQRw0ACyADIAApAwA3AwAgAyAAKQM4NwM4IAMgACkDMDcDMCADIAApAyg3AyggAyAAKQMgNwMgIAMgACkDGDcDGCADIAApAxA3AxAgAyAAKQMINwMIQQAhFgNAIAMgAykDOCAC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BABCAAsEAEEAC/QCAQd/IwBBIGsiAyQAIAMgACgCHCIENgIQIAAoAhQhBSADIAI2AhwgAyABNgIYIAMgBSAEayIBNgIUIAEgAmohBUECIQcCfwJAAkACQCAAKAI8IANBEGoiAUECIANBDGoQACIEBH9B0BogBDYCAEF/BUEACwRAIAEhBAwBCwNAIAUgAygCDCIGRg0CIAZBAEgEQCABIQQMBAsgASAGIAEoAgQiCEsiCUEDdGoiBCAGIAhBACAJG2siCCAEKAIAajYCACABQQxBBCAJG2oiASABKAIAIAhrNgIAIAUgBmshBSAAKAI8IAQiASAHIAlrIgcgA0EMahAAIgYEf0HQGiAGNgIAQX8FQQALRQ0ACwsgBUF/Rw0BCyAAIAAoAiwiATYCHCAAIAE2AhQgACABIAAoAjBqNgIQIAIMAQsgAEEANgIcIABCADcDECAAIAAoAgBBIHI2AgBBACAHQQJGDQAaIAIgBCgCBGsLIQAgA0EgaiQAIAALwBYCB34GfyMAQRBrIg0kAEHjACEJQbAaKAIABH9BAQUjAEEQayIAJAAgAEEAOgAPQZQUIABBD2pBABABGiAAQRBqJABBACEBIwBBEGsiACQAA0AgAEEAOgAPIAFBwBpqQfATIABBD2pBABABOgAAIAFBAWoiAUEQRw0ACyAAQRBqJABBsBpBATYCAEEAC0UEQCMAQdABayIBJAAgAUIANwNIIAFBuAgpAwA3AwggAUHACCkDADcDECABQcgIKQMANwMYIAFB0AgpAwA3AyAgAUHYCCkDADcDKCABQeAIKQMANwMwIAFB6AgpAwA3AzggAUIANwNAIAFBsAgpAwA3AwAjAEHABWsiCSQAIAEgASkDSCICQkB9IgM3A0ggAUFAayIAIAApAwAgAiADVq18NwMAAkBCgAEgAkIDiEL/AIMiA30iBkIIWARAQgAhAiADQv8AhUIDWgRAIAZC/AGDIQggAUHQAGohAANAIAAgAiADfKdqIAKnQdASai0AADoAACAAIAJCAYQiByADfKdqIAenQdASai0AADoAACAAIAJCAoQiByADfKdqIAenQdASai0AADoAACAAIAJCA4QiByADfKdqIAenQdASai0AADoAACACQgR8IQIgBUIEfCIFIAhSDQALCyAGQgODIgVCAFIEQANAIAEgAiADfKdqIAKnQdASai0AADoAUCACQgF8IQIgBEIBfCIEIAVSDQALCyABIAFB0ABqIAkgCUGABWoiChAGIAanQdASaiEAQgggBn0iA0L/AFYEQANAIAEgACAJIAoQBiAAQYABaiEAIANCgAF9IgNC/wBWDQALCwJAIANQDQAgA0IDgyEFQgAhBEIAIQIgA0IEWgRAIANCfIMhBiABQdAAaiEKQgAhAwNAIAogAqciC2ogACALai0AADoAACAKIAtBAXIiDGogACAMai0AADoAACAKIAtBAnIiDGogACAMai0AADoAACAKIAtBA3IiC2ogACALai0AADoAACACQgR8IQIgA0IEfCIDIAZSDQALCyAFUA0AA0AgASACpyIKaiAAIApqLQAAOgBQIAJCAXwhAiAEQgF8IgQgBVINAAsLIAlBwAUQCwwBC0IAIQIgAUHQAGohAANAIAAgAiADfKdqIAKnQdASai0AADoAACAAIAJCAYQiBCADfKdqIASnQdASai0AADoAACAAIAJCAoQiBCADfKdqIASnQdASai0AADoAACAAIAJCA4QiBCADfKdqIASnQdASai0AADoAACACQgR8IQIgBUIEfCIFQghSDQALCyAJQcAFaiQAIwBBwAVrIgAkACABKAJIQQN2Qf8AcSIJIAFqQdAAaiEKAkAgCUHvAE0EQCAKQfANQfAAIAlrEAoMAQsgCkHwDUGAASAJaxAKIAEgAUHQAGoiCSAAIABBgAVqEAYgCUEAQfAAEAULIAEgASkDQCICQjiGIAJCgP4Dg0IohoQgAkKAgPwHg0IYhiACQoCAgPgPg0IIhoSEIAJCCIhCgICA+A+DIAJCGIhCgID8B4OEIAJCKIhCgP4DgyACQjiIhISENwDAASABIAEpA0giAkI4hiACQoD+A4NCKIaEIAJCgID8B4NCGIYgAkKAgID4D4NCCIaEhCACQgiIQoCAgPgPgyACQhiIQoCA/AeDhCACQiiIQoD+A4MgAkI4iISEhDcAyAEgASABQdAAaiAAIABBgAVqEAZB8BkgASkDACICQjiGIAJCgP4Dg0IohoQgAkKAgPwHg0IYhiACQoCAgPgPg0IIhoSEIAJCCIhCgICA+A+DIAJCGIhCgID8B4OEIAJCKIhCgP4DgyACQjiIhISENwAAQfgZIAEpAwgiAkI4hiACQoD+A4NCKIaEIAJCgID8B4NCGIYg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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(binaryFile){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(binaryFile)){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{if(!response["ok"]){throw"failed to load wasm binary file at '"+binaryFile+"'"}return response["arrayBuffer"]()}).catch(()=>getBinary(binaryFile))}else{if(readAsync){return new Promise((resolve,reject)=>{readAsync(binaryFile,response=>resolve(new Uint8Array(response)),reject)})}}}return Promise.resolve().then(()=>getBinary(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>{return WebAssembly.instantiate(binary,imports)}).then(instance=>{return instance}).then(receiver,reason=>{err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(binaryFile)&&!isFileURI(binaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{var result=WebAssembly.instantiateStreaming(response,imports);return result.then(callback,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(binaryFile,imports,callback)})})}else{return instantiateArrayBuffer(binaryFile,imports,callback)}}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["d"];updateMemoryViews();wasmTable=Module["asm"]["g"];addOnInit(Module["asm"]["e"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={2544:()=>{return Module.getRandomValue()},2580:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var readEmAsmArgsArray=[];function readEmAsmArgs(sigPtr,buf){readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray}function runEmAsmFunction(code,sigPtr,argbuf){var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_asm_const_int(code,sigPtr,argbuf){return runEmAsmFunction(code,sigPtr,argbuf)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var printCharBuffers=[null,[],[]];var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function _proc_exit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}function exitJS(status,implicit){EXITSTATUS=status;_proc_exit(status)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmImports={"b":_emscripten_asm_const_int,"c":_emscripten_memcpy_big,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=function(){return(___wasm_call_ctors=Module["asm"]["e"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["f"]).apply(null,arguments)};var ___errno_location=function(){return(___errno_location=Module["asm"]["__errno_location"]).apply(null,arguments)};var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
