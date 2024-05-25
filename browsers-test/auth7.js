var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var read_,readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,AGFzbQEAAAABXQ9gA39/fwF/YAN/f38AYAJ/fwBgAX8Bf2AEf39/fwBgAX8AYAJ/fwF/YAR/f39/AX9gBX9/f39/AGADf39+AGACf34Bf2ACf34AYAAAYAV/f39/fwF/YAN/fn8BfgIZBAFhAWEABwFhAWIAAAFhAWMAAQFhAWQABAMZGAEIAgkBCgIECwADAgEMBQYBAwUNDgMABgQEAXAABAUHAQGCAoCAAgYIAX8BQfCpBAsHEQQBZQIAAWYAEQFnABsBaAEACQkBAEEBCwMZGhgK818Y8AICAn8BfgJAIAJFDQAgACABOgAAIAAgAmoiA0EBayABOgAAIAJBA0kNACAAIAE6AAIgACABOgABIANBA2sgAToAACADQQJrIAE6AAAgAkEHSQ0AIAAgAToAAyADQQRrIAE6AAAgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgA2AgAgAyACIARrQXxxIgJqIgFBBGsgADYCACACQQlJDQAgAyAANgIIIAMgADYCBCABQQhrIAA2AgAgAUEMayAANgIAIAJBGUkNACADIAA2AhggAyAANgIUIAMgADYCECADIAA2AgwgAUEQayAANgIAIAFBFGsgADYCACABQRhrIAA2AgAgAUEcayAANgIAIAIgA0EEcUEYciIBayICQSBJDQAgAK1CgYCAgBB+IQUgASADaiEBA0AgASAFNwMYIAEgBTcDECABIAU3AwggASAFNwMAIAFBIGohASACQSBrIgJBH0sNAAsLC2oBAX8jAEGAAmsiBSQAAkAgAiADTA0AIARBgMAEcQ0AIAUgASACIANrIgNBgAIgA0GAAkkiARsQBCABRQRAA0AgACAFQYACEAggA0GAAmsiA0H/AUsNAAsLIAAgBSADEAgLIAVBgAJqJAALQwECfyMAQRBrIgIkACABBEADQCACQQA6AA8gACADakGwFCACQQ9qQQAQAToAACADQQFqIgMgAUcNAAsLIAJBEGokAAuJBgIHfgN/IwBBwAVrIgskAAJAIAJQDQAgACAAKQNIIgMgAkIDhnwiBDcDSCAAIAApA0AgAyAEVq18IAJCPYh8NwNAIABB0ABqIQpCgAEgA0IDiEL/AIMiBH0iBSACWARAQgAhAyAEQv8AhUIDWgRAIAVC/AGDIQYDQCAKIAMgBHynaiABIAOnai0AADoAACAKIANCAYQiCCAEfKdqIAEgCKdqLQAAOgAAIAogA0IChCIIIAR8p2ogASAIp2otAAA6AAAgCiADQgOEIgggBHynaiABIAinai0AADoAACADQgR8IQMgCUIEfCIJIAZSDQALCyAFQgODIglCAFIEQANAIAogAyAEfKdqIAEgA6dqLQAAOgAAIANCAXwhAyAHQgF8IgcgCVINAAsLIAAgCiALIAtBgAVqIgwQCyABIAWnaiEBIAIgBX0iAkL/AFYEQANAIAAgASALIAwQCyABQYABaiEBIAJCgAF9IgJC/wBWDQALCwJAIAJQDQAgAkIDgyEEQgAhB0IAIQMgAkIEWgRAIAJC/ACDIQVCACECA0AgCiADpyIAaiAAIAFqLQAAOgAAIAogAEEBciIMaiABIAxqLQAAOgAAIAogAEECciIMaiABIAxqLQAAOgAAIAogAEEDciIAaiAAIAFqLQAAOgAAIANCBHwhAyACQgR8IgIgBVINAAsLIARQDQADQCAKIAOnIgBqIAAgAWotAAA6AAAgA0IBfCEDIAdCAXwiByAEUg0ACwsgC0EAQcAFEAQMAQtCACEDIAJCBFoEQCACQnyDIQUDQCAKIAMgBHynaiABIAOnai0AADoAACAKIANCAYQiBiAEfKdqIAEgBqdqLQAAOgAAIAogA0IChCIGIAR8p2ogASAGp2otAAA6AAAgCiADQgOEIgYgBHynaiABIAanai0AADoAACADQgR8IQMgCUIEfCIJIAVSDQALCyACQgODIgJQDQADQCAKIAMgBHynaiABIAOnai0AADoAACADQgF8IQMgB0IBfCIHIAJSDQALCyALQcAFaiQACxcAIAAtAABBIHFFBEAgASACIAAQDRoLC4ADAQZ/IwBBoARrIgMkACADQUBrIgIQFiACIAAgARAHIAIgA0HgA2oiABAKIANBkAJqIgIgAELAABAHIAIgAxAKIABBAEHAABAEIwBBEGsiAEGwHzYCDCAAIAM2AghBACECIABBADYCBANAIAAgACgCBCAAKAIMIAJqLQAAIAAoAgggAmotAABzcjYCBCAAIAAoAgQgAkEBciIEIAAoAgxqLQAAIAAoAgggBGotAABzcjYCBCACQQJqIgJBwABHDQALIAAoAgRBAWtBCHZBAXFBAWshBUEAIQQjAEEQayIAIAM2AgwgAEGwHzYC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";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function getWasmImports(){return{"a":wasmImports}}function createWasm(){var info=getWasmImports();function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["e"];updateMemoryViews();addOnInit(wasmExports["f"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}if(!wasmBinaryFile)wasmBinaryFile=findWasmBinary();instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={2608:()=>Module.getRandomValue(),2644:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>{abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])};var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={d:___assert_fail,c:__emscripten_memcpy_js,b:_emscripten_asm_const_int,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["f"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["g"])(a0,a1);var __emscripten_stack_restore=a0=>(__emscripten_stack_restore=wasmExports["_emscripten_stack_restore"])(a0);var __emscripten_stack_alloc=a0=>(__emscripten_stack_alloc=wasmExports["_emscripten_stack_alloc"])(a0);var _emscripten_stack_get_current=()=>(_emscripten_stack_get_current=wasmExports["emscripten_stack_get_current"])();var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
