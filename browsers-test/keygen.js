var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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ByABIAEtAAcgASgCDC0AAiABKAIILQACc3I6AAcgASABLQAHIAEoAgwtAAMgASgCCC0AA3NyOgAHIAEgAS0AByABKAIMLQAEIAEoAggtAARzcjoAByABIAEtAAcgASgCDC0ABSABKAIILQAFc3I6AAcgASABLQAHIAEoAgwtAAYgASgCCC0ABnNyOgAHIAEgAS0AByABKAIMLQAHIAEoAggtAAdzcjoAByABIAEtAAcgASgCDC0ACCABKAIILQAIc3I6AAcgASABLQAHIAEoAgwtAAkgASgCCC0ACXNyOgAHIAEgAS0AByABKAIMLQAKIAEoAggtAApzcjoAByABIAEtAAcgASgCDC0ACyABKAIILQALc3I6AAcgASABLQAHIAEoAgwtAAwgASgCCC0ADHNyOgAHIAEgAS0AByABKAIMLQANIAEoAggtAA1zcjoAByABIAEtAAcgASgCDC0ADiABKAIILQAOc3I6AAcgASABLQAHIAEoAgwtAA8gASgCCC0AD3NyOgAHIAEtAAdBAWtBgAJxRQ0CIAEgAiAEajYCDCABQfAVNgIIIAFBADoAByABIAEtAAcgASgCDC0AACABKAIILQAAc3I6AAcgASABLQAHIAEoAgwtAAEgASgCCC0AAXNyOgAHIAEgAS0AByABKAIMLQACIAEoAggtAAJzcjoAByABIAEtAAcgASgCDC0AAyABKAIILQADc3I6AAcgASABLQAHIAEoAgwtAAQgASgCCC0ABHNyOgAHIAEgAS0AByABKAIMLQAFIAEoAggtAAVzcjoAByABIAEtAAcgASgCDC0ABiABKAIILQAGc3I6AAcgASABLQAHIAEoAgwtAAcgASgCCC0AB3NyOgAHIAEgAS0AByABKAIMLQAIIAEoAggtAAhzcjoAByABIAEtAAcgASgCDC0ACSABKAIILQAJc3I6AAcgASABLQAHIAEoAgwtAAogASgCCC0ACnNyOgAHIAEgAS0AByABKAIMLQALIAEoAggtAAtzcjoAByABIAEtAAcgASgCDC0ADCABKAIILQAMc3I6AAcgASABLQAHIAEoAgwtAA0gASgCCC0ADXNyOgAHIAEgAS0AByABKAIMLQAOIAEoAggtAA5zcjoAByABIAEtAAcgASgCDC0ADyABKAIILQAPc3I6AAcgAS0AB0EBa0GAAnFFDQIgAkEA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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(binaryFile){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(binaryFile)){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{if(!response["ok"]){throw"failed to load wasm binary file at '"+binaryFile+"'"}return response["arrayBuffer"]()}).catch(()=>getBinary(binaryFile))}else{if(readAsync){return new Promise((resolve,reject)=>{readAsync(binaryFile,response=>resolve(new Uint8Array(response)),reject)})}}}return Promise.resolve().then(()=>getBinary(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>{return WebAssembly.instantiate(binary,imports)}).then(instance=>{return instance}).then(receiver,reason=>{err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(binaryFile)&&!isFileURI(binaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{var result=WebAssembly.instantiateStreaming(response,imports);return result.then(callback,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(binaryFile,imports,callback)})})}else{return instantiateArrayBuffer(binaryFile,imports,callback)}}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["g"];updateMemoryViews();wasmTable=Module["asm"]["j"];addOnInit(Module["asm"]["h"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={2012:()=>{return Module.getRandomValue()},2048:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}function _abort(){abort("")}var readEmAsmArgsArray=[];function readEmAsmArgs(sigPtr,buf){readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray}function runEmAsmFunction(code,sigPtr,argbuf){var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_asm_const_int(code,sigPtr,argbuf){return runEmAsmFunction(code,sigPtr,argbuf)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}function getHeapMax(){return 2147483648}function emscripten_realloc_buffer(size){var b=wasmMemory.buffer;try{wasmMemory.grow(size-b.byteLength+65535>>>16);updateMemoryViews();return 1}catch(e){}}function _emscripten_resize_heap(requestedSize){var oldSize=HEAPU8.length;requestedSize=requestedSize>>>0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}let alignUp=(x,multiple)=>x+(multiple-x%multiple)%multiple;for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=emscripten_realloc_buffer(newSize);if(replacement){return true}}return false}var printCharBuffers=[null,[],[]];function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function _proc_exit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}function exitJS(status,implicit){EXITSTATUS=status;_proc_exit(status)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmImports={"f":___assert_fail,"b":_abort,"c":_emscripten_asm_const_int,"e":_emscripten_memcpy_big,"d":_emscripten_resize_heap,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=function(){return(___wasm_call_ctors=Module["asm"]["h"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["i"]).apply(null,arguments)};var ___errno_location=function(){return(___errno_location=Module["asm"]["__errno_location"]).apply(null,arguments)};var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
