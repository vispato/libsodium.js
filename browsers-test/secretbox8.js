var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);var ret=fs.readFileSync(filename);return ret};readAsync=(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return new Promise((resolve,reject)=>{fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)reject(err);else resolve(binary?data.buffer:data)})})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=url=>{if(isFileURI(url)){return new Promise((reject,resolve)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){resolve(xhr.response)}reject(xhr.status)};xhr.onerror=reject;xhr.send(null)})}return fetch(url,{credentials:"same-origin"}).then(response=>{if(response.ok){return response.arrayBuffer()}return Promise.reject(new Error(response.status+" : "+response.url))})}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,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cyIDIAlqQQd3IAdzIgcgA2pBCXcgBnMiBiAHakENdyAJcyIJIAZqQRJ3IANzIQMgFCAVakESdyAEcyIEIApqQQd3IAxzIgwgBGpBCXcgC3MiCyAMakENdyAKcyIKIAtqQRJ3IARzIQQgEUECSyARQQJrIRENAAsgACAENgAAIAAgDzYAHCAAIAU2ABggACAGNgAUIAAgBzYAECAAIAE2AAwgACACNgAIIAAgAzYABAsKACAAIAEQB0EACwwAIAAgASACEAhBAAu0AQEBfyAAIAEoAABB////H3E2AgAgACABKAADQQJ2QYP+/x9xNgIEIAAgASgABkEEdkH/gf8fcTYCCCAAIAEoAAlBBnZB///AH3E2AgwgASgADCECIABCADcCFCAAQgA3AhwgAEEANgIkIAAgAkEIdkH//z9xNgIQIAAgASgAEDYCKCAAIAEoABQ2AiwgACABKAAYNgIwIAEoABwhASAAQQA6AFAgAEIANwM4IAAgATYCNEEAC8kFAQN/IwAiBUHAAWtBQHEiBCQAIAQgAygAAEH///8fcTYCQCAEIAMoAANBAnZBg/7/H3E2AkQgBCADKAAGQQR2Qf+B/x9xNgJIIAQgAygACUEGdkH//8AfcTYCTCADKAAMIQYgBEIANwJUIARCADcCXCAEQQA2AmQgBCAGQQh2Qf//P3E2AlAgBCADKAAQNgJoIAQgAygAFDYCbCAEIAMoABg2AnAgAygAHCEDIARBADoAkAEgBEIANwN4IAQgAzYCdCAEQUBrIgMgASACEAggAyAEQTBqIgMQByMAQRBrIgEgADYCDCABIAM2AgggAUEANgIEIAEgASgCBCABKAIMLQAAIAEoAggtAABzcjYCBCABIAEoAgQgASgCDC0AASABKAIILQABc3I2AgQgASABKAIEIAEoAgwtAAIgASgCCC0AAnNyNgIEIAEgASgCBCABKAIMLQADIAEoAggtAANzcjYCBCABIAEoAgQgASgCDC0ABCABKAIILQAEc3I2AgQgASABKAIEIAEoAgwtAAUgASgCCC0ABXNyNgIEIAEgASgCBCABKAIMLQAGIAEoAggtAAZzcjYCBCABIAEoAgQgASgCDC0AByABKAIILQAHc3I2AgQgASABKAIEIAEoAgwtAAggASgCCC0ACHNyNgIEIAEgASgCBCABKAIMLQAJIAEoAggt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";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function getWasmImports(){return{a:wasmImports}}function createWasm(){var info=getWasmImports();function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["d"];updateMemoryViews();addOnInit(wasmExports["e"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}if(!wasmBinaryFile)wasmBinaryFile=findWasmBinary();instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={1224:()=>Module.getRandomValue(),1260:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;crypto_=crypto_===undefined?crypto:crypto_;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var printCharBuffers=[null,[],[]];var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder:undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={c:__emscripten_memcpy_js,b:_emscripten_asm_const_int,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["e"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["f"])(a0,a1);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();Module["onRuntimeInitialized"]?.();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
