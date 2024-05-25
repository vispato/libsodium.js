var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var read_,readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,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ASgCDC0AASABKAIILQABc3I6AAcgASABLQAHIAEoAgwtAAIgASgCCC0AAnNyOgAHIAEgAS0AByABKAIMLQADIAEoAggtAANzcjoAByABIAEtAAcgASgCDC0ABCABKAIILQAEc3I6AAcgASABLQAHIAEoAgwtAAUgASgCCC0ABXNyOgAHIAEgAS0AByABKAIMLQAGIAEoAggtAAZzcjoAByABIAEtAAcgASgCDC0AByABKAIILQAHc3I6AAcgASABLQAHIAEoAgwtAAggASgCCC0ACHNyOgAHIAEgAS0AByABKAIMLQAJIAEoAggtAAlzcjoAByABIAEtAAcgASgCDC0ACiABKAIILQAKc3I6AAcgASABLQAHIAEoAgwtAAsgASgCCC0AC3NyOgAHIAEgAS0AByABKAIMLQAMIAEoAggtAAxzcjoAByABIAEtAAcgASgCDC0ADSABKAIILQANc3I6AAcgASABLQAHIAEoAgwtAA4gASgCCC0ADnNyOgAHIAEgAS0AByABKAIMLQAPIAEoAggtAA9zcjoAByABLQAHQQFrQYACcUUNAiABIAIgBGo2AgwgAUGQETYCCCABQQA6AAcgASABLQAHIAEoAgwtAAAgASgCCC0AAHNyOgAHIAEgAS0AByABKAIMLQABIAEoAggtAAFzcjoAByABIAEtAAcgASgCDC0AAiABKAIILQACc3I6AAcgASABLQAHIAEoAgwtAAMgASgCCC0AA3NyOgAHIAEgAS0AByABKAIMLQAEIAEoAggtAARzcjoAByABIAEtAAcgASgCDC0ABSABKAIILQAFc3I6AAcgASABLQAHIAEoAgwtAAYgASgCCC0ABnNyOgAHIAEgAS0AByABKAIMLQAHIAEoAggtAAdzcjoAByABIAEtAAcgASgCDC0ACCABKAIILQAIc3I6AAcgASABLQAHIAEoAgwtAAkgASgCCC0ACXNyOgAHIAEgAS0AByABKAIMLQAKIAEoAggtAApzcjoAByABIAEtAAcgASgCDC0ACyABKAIILQALc3I6AAcgASABLQAHIAEoAgwtAAwgASgCCC0ADHNyOgAHIAEgAS0AByABKAIMLQANIAEoAggtAA1zcjoAByABIAEtAAcgASgCDC0ADiABKAIILQAOc3I6AAcgASABLQAHIAEoAgwtAA8gASgCCC0AD3NyOgAH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QXxxIgVBwABJDQAgACAFQUBqIgZLDQADQCAAIAIoAgA2AgAgACACKAIENgIEIAAgAigCCDYCCCAAIAIoAgw2AgwgACACKAIQNgIQIAAgAigCFDYCFCAAIAIoAhg2AhggACACKAIcNgIcIAAgAigCIDYCICAAIAIoAiQ2AiQgACACKAIoNgIoIAAgAigCLDYCLCAAIAIoAjA2AjAgACACKAI0NgI0IAAgAigCODYCOCAAIAIoAjw2AjwgAkFAayECIABBQGsiACAGTQ0ACwsgACAFTw0BA0AgACACKAIANgIAIAJBBGohAiAAQQRqIgAgBUkNAAsMAQsgA0EESQ0AIAAgA0EEayIFSw0AA0AgACACLQAAOgAAIAAgAi0AAToAASAAIAItAAI6AAIgACACLQADOgADIAJBBGohAiAAQQRqIgAgBU0NAAsLIAAgA0kEQANAIAAgAi0AADoAACACQQFqIQIgAEEBaiIAIANHDQALCwtB/AlB/AkoAgAgAWo2AgAgASAEaiEDCyADC2MBAX9BsApBsAooAgAiAEEBayAAcjYCAEHoCSgCACIAQQhxBEBB6AkgAEEgcjYCAEF/DwtB7AlCADcCAEGECkGUCigCACIANgIAQfwJIAA2AgBB+AkgAEGYCigCAGo2AgBBAAvyAgICfwF+AkAgAkUNACAAIAE6AAAgACACaiIDQQFrIAE6AAAgAkEDSQ0AIAAgAToAAiAAIAE6AAEgA0EDayABOgAAIANBAmsgAToAACACQQdJDQAgACABOgADIANBBGsgAToAACACQQlJDQAgAEEAIABrQQNxIgRqIgMgAUH/AXFBgYKECGwiATYCACADIAIgBGtBfHEiBGoiAkEEayABNgIAIARBCUkNACADIAE2AgggAyABNgIEIAJBCGsgATYCACACQQxrIAE2AgAgBEEZSQ0AIAMgATYCGCADIAE2AhQgAyABNgIQIAMgATYCDCACQRBrIAE2AgAgAkEUayABNgIAIAJBGGsgATYCACACQRxrIAE2AgAgBCADQQRxQRhyIgRrIgJBIEkNACABrUKBgICAEH4hBSADIARqIQEDQCABIAU3AxggASAFNwMQIAEgBTcDCCABIAU3AwAgAUEgaiEBIAJBIGsiAkEfSw0ACwsgAAsFABAEAAsEAEIACwQAQQAL9AIBCH8jAEEgayIDJAAgAyAAKAIcIgQ2AhAgACgCFCEFIAMgAjYCHCADIAE2AhggAyAFIARrIgE2AhQgASACaiEFQQIhBwJ/AkACQAJAIAAoAjwgA0EQaiIBQQIgA0EMahABIgQEf0GgESAENgIAQX8FQQALBEAgASEEDAELA0AgBSADKAIMIgZGDQIgBkEASARAIAEhBAwECyABIAYgASgCBCIISyIJQQN0aiIEIAYgCEEAIAkbayIIIAQoAgBqNgIAIAFBDEEEIAkbaiIBIAEoAgAgCGs2AgAgBSAGayEFIAAoAjwgBCIBIAcgCWsiByADQQxqEAEiBgR/QaARIAY2AgBBfwVBAAtFDQALCyAFQX9HDQELIAAgACgCLCIBNgIcIAAgATYCFCAAIAEgACgCMGo2AhAgAgwBCyAAQQA2AhwgAEIANwMQIAAgACgCAEEgcjYCAEEAIAdBAkYNABogAiAEKAIEawshCiADQSBqJAAgCgvoBAEJf0GAESgCAAR/QQEFIwBBEGsiACQAIABBADoAD0GgCyAAQQ9qQQAQABogAEEQaiQAQZARQRAQC0GAEUEBNgIAQQALBH9B4wAFQRAQBiEFQRAQBiEGQSAQBiECQSAQBiEDQcAAEAYhAEHAABAGIQEDQCAFQRAQCyACQSAQCyAAQcAAEAsgBiAFKQAINwAIIAYgBSkAADcAACADIAIpABg3ABggAyACKQAQNwAQIAMgAikACDcACCADIAIpAAA3AAAgASAAKQA4NwA4IAEgACkAMDcAMCABIAApACg3ACggASAAKQAgNwAgIAEgACkAGDcAGCABIAApABA3ABAgASAAKQAINwAIIAEgACkAADcAAAJAAkAgBSAGEBINACACIAMQEA0AIAAgARAPDQAgBSAGQRAQBw0AIAIgA0EgEAcNACAAIAFBwAAQB0UNAQtBwggQCgsgBEEBaiIEQZDOAEcNAAtB0QkQCgNAEA4hBxAOIgRB/wFxBEAgBiAHQQ9xaiIIIAgtAAAgBHM6AAAgAyAHQR9xaiIJIAktAAAgBHM6AAAgASAHQT9xaiIHIActAAAgBHM6AAACQAJAIAUgBhASQX9HDQAgAiADEBBBf0cNACAAIAEQD0F/Rw0AIAUgBkEQEAdBf0cNACACIANBIBAHQX9HDQAgACABQcAAEAdBf0YNAQtBwggQCgsgCCAILQAAIARzOgAAIAkgCS0AACAEczoAACAHIActAAAgBHM6AAALIApBAWoiCkGgjQZHDQALQdEJEAogBRAJIAYQCSACEAkgAxAJIAAQCSABEAlB1AkQCkEACwsLqAIHAEGACAvjAV91bnByb3RlY3RlZF9wdHJfZnJvbV91c2VyX3B0cih1c2VyX3B0cikgPT0gdW5wcm90ZWN0ZWRfcHRyAHhtYWluAEZhaWxlZABfc29kaXVtX21hbGxvYwBzb2RpdW0vdXRpbHMuYwB2ZXJpZnkxLmMAY3J5cHRvX3ZlcmlmeV8xNl9ieXRlcygpID09IDE2VQBjcnlwdG9fdmVyaWZ5XzY0X2J5dGVzKCkgPT0gNjRVAGNyeXB0b192ZXJpZnlfMzJfYnl0ZXMoKSA9PSAzMlUAT0sALS0tIFNVQ0NFU1MgLS0tAEHoCQsBBQBB9AkLAQEAQYwKCw4CAAAAAwAAALgIAAAABABBpAoLAQEAQbQKCwX/////CgBB+AoLA7AOAQ==";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function getWasmImports(){return{"a":wasmImports}}function createWasm(){var info=getWasmImports();function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["g"];updateMemoryViews();addOnInit(wasmExports["h"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}if(!wasmBinaryFile)wasmBinaryFile=findWasmBinary();instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={1404:()=>Module.getRandomValue(),1440:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>{abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])};var __abort_js=()=>{abort("")};var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var getHeapMax=()=>2147483648;var growMemory=size=>{var b=wasmMemory.buffer;var pages=(size-b.byteLength+65535)/65536;try{wasmMemory.grow(pages);updateMemoryViews();return 1}catch(e){}};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}var alignUp=(x,multiple)=>x+(multiple-x%multiple)%multiple;for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement){return true}}return false};var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={f:___assert_fail,e:__abort_js,d:__emscripten_memcpy_js,a:_emscripten_asm_const_int,c:_emscripten_resize_heap,b:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["h"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["i"])(a0,a1);var __emscripten_stack_restore=a0=>(__emscripten_stack_restore=wasmExports["_emscripten_stack_restore"])(a0);var __emscripten_stack_alloc=a0=>(__emscripten_stack_alloc=wasmExports["_emscripten_stack_alloc"])(a0);var _emscripten_stack_get_current=()=>(_emscripten_stack_get_current=wasmExports["emscripten_stack_get_current"])();var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
