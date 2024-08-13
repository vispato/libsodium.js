var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);var ret=fs.readFileSync(filename);return ret};readAsync=(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return new Promise((resolve,reject)=>{fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)reject(err);else resolve(binary?data.buffer:data)})})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=url=>{if(isFileURI(url)){return new Promise((reject,resolve)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){resolve(xhr.response)}reject(xhr.status)};xhr.onerror=reject;xhr.send(null)})}return fetch(url,{credentials:"same-origin"}).then(response=>{if(response.ok){return response.arrayBuffer()}return Promise.reject(new Error(response.status+" : "+response.url))})}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,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";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function getWasmImports(){return{a:wasmImports}}function createWasm(){var info=getWasmImports();function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["d"];updateMemoryViews();addOnInit(wasmExports["e"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}if(!wasmBinaryFile)wasmBinaryFile=findWasmBinary();instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={2592:()=>Module.getRandomValue(),2628:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;crypto_=crypto_===undefined?crypto:crypto_;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var printCharBuffers=[null,[],[]];var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder:undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={c:__emscripten_memcpy_js,b:_emscripten_asm_const_int,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["e"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["f"])(a0,a1);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();Module["onRuntimeInitialized"]?.();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
