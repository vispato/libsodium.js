var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var read_,readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,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";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function getWasmImports(){return{"a":wasmImports}}function createWasm(){var info=getWasmImports();function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["d"];updateMemoryViews();addOnInit(wasmExports["e"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}if(!wasmBinaryFile)wasmBinaryFile=findWasmBinary();instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={1944:()=>Module.getRandomValue(),1980:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var printCharBuffers=[null,[],[]];var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={c:__emscripten_memcpy_js,b:_emscripten_asm_const_int,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["e"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["f"])(a0,a1);var __emscripten_stack_restore=a0=>(__emscripten_stack_restore=wasmExports["_emscripten_stack_restore"])(a0);var __emscripten_stack_alloc=a0=>(__emscripten_stack_alloc=wasmExports["_emscripten_stack_alloc"])(a0);var _emscripten_stack_get_current=()=>(_emscripten_stack_get_current=wasmExports["emscripten_stack_get_current"])();var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
