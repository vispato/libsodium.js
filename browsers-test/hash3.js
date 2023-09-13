var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABPwpgA39/fwF/YAN/f38AYAF/AX9gBH9/f38Bf2AAAGACf38Bf2AFf39/f38AYAR/f39/AGACf38AYAN/fn8BfgITAwFhAWEAAwFhAWIAAAFhAWMAAQMTEgYBAQcABAIBCAQFAQIDCQIABQQEAXAABAUHAQGAAoCAAgYIAX8BQaCkBAsHEQQBZAIAAWUADAFmABQBZwEACQkBAEEBCwMSExEK2FcSbgEBfyMAQYACayIFJAACQCACIANMDQAgBEGAwARxDQAgBSABQf8BcSACIANrIgNBgAIgA0GAAkkiARsQBSABRQRAA0AgACAFQYACEAQgA0GAAmsiA0H/AUsNAAsLIAAgBSADEAQLIAVBgAJqJAALFwAgAC0AAEEgcUUEQCABIAIgABAHGgsL8AICAn8BfgJAIAJFDQAgACABOgAAIAAgAmoiA0EBayABOgAAIAJBA0kNACAAIAE6AAIgACABOgABIANBA2sgAToAACADQQJrIAE6AAAgAkEHSQ0AIAAgAToAAyADQQRrIAE6AAAgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgA2AgAgAyACIARrQXxxIgJqIgFBBGsgADYCACACQQlJDQAgAyAANgIIIAMgADYCBCABQQhrIAA2AgAgAUEMayAANgIAIAJBGUkNACADIAA2AhggAyAANgIUIAMgADYCECADIAA2AgwgAUEQayAANgIAIAFBFGsgADYCACABQRhrIAA2AgAgAUEcayAANgIAIAIgA0EEcUEYciIBayICQSBJDQAgAK1CgYCAgBB+IQUgASADaiEBA0AgASAFNwMYIAEgBTcDECABIAU3AwggASAFNwMAIAFBIGohASACQSBrIgJBH0sNAAsLC+sXAhB+EH8DQCACIBVBA3QiFmogASAWaikAACIEQjiGIARCgP4Dg0IohoQgBEKAgPwHg0IYhiAEQoCAgPgPg0IIhoSEIARCCIhCgICA+A+DIARCGIhCgID8B4OEIARCKIhCgP4DgyAEQjiIhISENwMAIBVBAWoiFUEQRw0ACyADIAApAwA3AwAgAyAAKQM4NwM4IAMgACkDMDcDMCADIAApAyg3AyggAyAAKQMgNwMgIAMgACkDGDcDGCADIAApAxA3AxAgAyAAKQMINwMIQQAhFgNAIAMgAykDOCAC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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(instance=>instance).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;wasmExports=exports;wasmMemory=wasmExports["d"];updateMemoryViews();wasmTable=wasmExports["g"];addOnInit(wasmExports["e"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={2544:()=>Module.getRandomValue(),2580:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&&buf%8?4:0;readEmAsmArgsArray.push(ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=ch==105?4:8}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var _emscripten_memcpy_big=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var printCharBuffers=[null,[],[]];var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var SYSCALLS={varargs:undefined,get(){var ret=HEAP32[SYSCALLS.varargs>>2];SYSCALLS.varargs+=4;return ret},getp(){return SYSCALLS.get()},getStr(ptr){var ret=UTF8ToString(ptr);return ret}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={b:_emscripten_asm_const_int,c:_emscripten_memcpy_big,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["e"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["f"])(a0,a1);var ___errno_location=()=>(___errno_location=wasmExports["__errno_location"])();function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}try{var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
