var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);var ret=fs.readFileSync(filename);return ret};readAsync=(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return new Promise((resolve,reject)=>{fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)reject(err);else resolve(binary?data.buffer:data)})})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=url=>{if(isFileURI(url)){return new Promise((reject,resolve)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){resolve(xhr.response)}reject(xhr.status)};xhr.onerror=reject;xhr.send(null)})}return fetch(url,{credentials:"same-origin"}).then(response=>{if(response.ok){return response.arrayBuffer()}return Promise.reject(new Error(response.status+" : "+response.url))})}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,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QANAIAIgAS0AADoAACABQQFqIQEgAkEBaiICIANHDQALCwsCAAv5EwEIfyMAQRBrIgEkAAJAAkAgAARAIABBEGsiA0GAgHxxIgRBgIAITQ0BIARBgIAIayIAKAIAIQJBkBVBNDYCACABIAM2AgwgAUGAFTYCCCABQQA6AAcgASABLQAHIAEoAgwtAAAgASgCCC0AAHNyOgAHIAEgAS0AByABKAIMLQABIAEoAggtAAFzcjoAByABIAEtAAcgASgCDC0AAiABKAIILQACc3I6AAcgASABLQAHIAEoAgwtAAMgASgCCC0AA3NyOgAHIAEgAS0AByABKAIMLQAEIAEoAggtAARzcjoAByABIAEtAAcgASgCDC0ABSABKAIILQAFc3I6AAcgASABLQAHIAEoAgwtAAYgASgCCC0ABnNyOgAHIAEgAS0AByABKAIMLQAHIAEoAggtAAdzcjoAByABIAEtAAcgASgCDC0ACCABKAIILQAIc3I6AAcgASABLQAHIAEoAgwtAAkgASgCCC0ACXNyOgAHIAEgAS0AByABKAIMLQAKIAEoAggtAApzcjoAByABIAEtAAcgASgCDC0ACyABKAIILQALc3I6AAcgASABLQAHIAEoAgwtAAwgASgCCC0ADHNyOgAHIAEgAS0AByABKAIMLQANIAEoAggtAA1zcjoAByABIAEtAAcgASgCDC0ADiABKAIILQAOc3I6AAcgASABLQAHIAEoAgwtAA8gASgCCC0AD3NyOgAHIAEtAAdBAWtBgAJxRQ0CIAEgAiAEajYCDCABQYAVNgIIIAFBADoAByABIAEtAAcgASgCDC0AACABKAIILQAAc3I6AAcgASABLQAHIAEoAgwtAAEgASgCCC0AAXNyOgAHIAEgAS0AByABKAIMLQACIAEoAggtAAJzcjoAByABIAEtAAcgASgCDC0AAyABKAIILQADc3I6AAcgASABLQAHIAEoAgwtAAQgASgCCC0ABHNyOgAHIAEgAS0AByABKAIMLQAFIAEoAggtAAVzcjoAByABIAEtAAcgASgCDC0ABiABKAIILQAGc3I6AAcgASABLQAHIAEoAgwtAAcgASgCCC0AB3NyOgAHIAEgAS0AByABKAIMLQAIIAEoAggtAAhzcjoAByABIAEtAAcgASgCDC0ACSABKAIILQAJc3I6AAcgASABLQAH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";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function getWasmImports(){return{a:wasmImports}}function createWasm(){var info=getWasmImports();function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["g"];updateMemoryViews();addOnInit(wasmExports["h"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}if(!wasmBinaryFile)wasmBinaryFile=findWasmBinary();instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={1852:()=>Module.getRandomValue(),1888:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;crypto_=crypto_===undefined?crypto:crypto_;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder:undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>{abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])};var __abort_js=()=>{abort("")};var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var getHeapMax=()=>2147483648;var growMemory=size=>{var b=wasmMemory.buffer;var pages=(size-b.byteLength+65535)/65536;try{wasmMemory.grow(pages);updateMemoryViews();return 1}catch(e){}};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}var alignUp=(x,multiple)=>x+(multiple-x%multiple)%multiple;for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement){return true}}return false};var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={c:___assert_fail,f:__abort_js,e:__emscripten_memcpy_js,b:_emscripten_asm_const_int,d:_emscripten_resize_heap,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["h"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["i"])(a0,a1);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();Module["onRuntimeInitialized"]?.();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
