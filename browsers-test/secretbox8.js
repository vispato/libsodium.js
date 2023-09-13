var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABXw9gA39/fwF/YAJ/fwBgAn9/AX9gBH9/fn8Bf2ADf39+AGADf39/AGABfwBgBn9/fn9+fwF/YAR/fn9/AX9gBH9/f38Bf2AAAGAAAX9gA39/fgF/YAN/fn8BfmABfwF/AhMDAWEBYQAJAWEBYgAAAWEBYwAFAxkYAQUBBAEECgYCCwEEBgIMAgMNDgADBwgCBAQBcAALBQcBAYACgIACBggBfwFB8IIGCwcRBAFkAgABZQAJAWYAGgFnAQAJEAEAQQELChcTEhEQGRgVFhQKljwYCAAgACABEA0LtwUBIH8gAigAFCIVIQsgAigAGCIWIQ8gAigAHCIXIRBB9MqB2QYhBCACKAAQIhghA0Gy2ojLByEMIAEoAAwiGSERIAEoAAgiGiEKIAEoAAQiGyEGIAEoAAAiHCEBQe7IgZkDIQ0gAigADCIdIQcgAigACCIeIQggAigABCIfIQkgAigAACIgIQJB5fDBiwYhBQNAIAIgDWpBB3cgEXMiDiANakEJdyAPcyITIAUgC2pBB3cgB3MiByAFakEJdyAKcyIUIAdqQQ13IAtzIiEgCCADIARqQQd3cyIIIARqQQl3IAZzIgYgCGpBDXcgA3MiCiAGakESdyAEcyIEIAEgDGpBB3cgEHMiA2pBB3dzIgsgBGpBCXdzIg8gC2pBDXcgA3MiECAPakESdyAEcyEEIAogAyADIAxqQQl3IAlzIglqQQ13IAFzIiIgCWpBEncgDHMiASAOakEHd3MiAyABakEJdyAUcyIKIANqQQ13IA5zIhEgCmpBEncgAXMhDCATIA4gE2pBDXcgAnMiDmpBEncgDXMiAiAHakEHdyAicyIBIAJqQQl3IAZzIgYgAWpBDXcgB3MiByAGakESdyACcyENIBQgIWpBEncgBXMiBSAIakEHdyAOcyICIAVqQQl3IAlzIgkgAmpBDXcgCHMiCCAJakESdyAFcyEFIBJBAmoiEkEUSA0ACyAAIARB9MqB2QZqNgA8IAAgECAXajYAOCAAIA8gFmo2ADQgACALIBVqNgAwIAAgAyAYajYALCAAIAxBstqIywdqNgAoIAAgESAZajYAJCAAIAogGmo2ACAgACAGIBtqNgAcIAAgASAcajYAGCAAIA1B7siBmQNqNgAUIAAgByAdajYAECAAIAggHmo2AAwgACAJIB9qNgAIIAAgAiAgajYABCAAIAVB5fDBiwZqNgAAC0MBAn8jAEEQayICJAAgAQRAA0AgAkEAOgAPIAAgA2pByAkgAkEPakEAEAE6AAAgA0EBaiIDIAFHDQALCyACQRBqJAALpgQCDn4KfyAAKAIkIRIgACgCICETIAAoAhwhFCAAKAIYIRUgACgCFCERIAJCEFoEQCAALQBQRUEYdCEWIAAoAhAiF60hDyAAKAIMIhitIQ0gACgCCCIZrSELIAAoAgQiGq0hCSAaQQVsrSEQIBlBBWytIQ4gGEEFbK0hDCAXQQVsrSEKIAA1AgAhCANAIAEoAANBAnZB////H3EgFWqtIgMgDX4gASgAAEH///8fcSARaq0iBCAPfnwgASgABkEEdkH///8fcSAUaq0iBSALfnwgASgACUEGdiATaq0iBiAJfnwgEiAWaiABKAAMQQh2aq0iByAIfnwgAyALfiAEIA1+fCAFIAl+fCAGIAh+fCAHIAp+fCADIAl+IAQgC358IAUgCH58IAYgCn58IAcgDH58IAMgCH4gBCAJfnwgBSAKfnwgBiAMfnwgByAOfnwgAyAKfiAEIAh+fCAFIAx+fCAGIA5+fCAHIBB+fCIDQhqIQv////8Pg3wiBEIaiEL/////D4N8IgVCGohC/////w+DfCIGQhqIQv////8Pg3wiB0IaiKdBBWwgA6dB////H3FqIhFBGnYgBKdB////H3FqIRUgBadB////H3EhFCAGp0H///8fcSETIAenQf///x9xIRIgEUH///8fcSERIAFBEGohASACQhB9IgJCD1YNAAsLIAAgETYCFCAAIBI2AiQgACATNgIgIAAgFDYCHCAAIBU2AhgLqgMCDH8DfiAAKQM4Ig5CAFIEQCAAQUBrIgIgDqciA2pBAToAACAOQgF8Qg9YBEAgACADakHBAGpBDyADaxANCyAAQQE6AFAgACACQhAQBgsgADUCNCEOIAA1AjAhDyAANQIsIRAgASAAKAIUIAAoAiQgACgCICAAKAIcIAAoAhgiA0EadmoiAkEadmoiBkEadmoiCUEadkEFbGoiBEH///8fcSIFQQVqIgdBGnYgA0H///8fcSAEQRp2aiIEaiIIQRp2IAJB////H3EiCmoiC0EadiAGQf///x9xIgZqIgxBGnYgCUH///8fcWoiDUGAgIAgayICQR91IgMgBHEg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IBNqQQ13IAxzIgxqQRJ3IANzIgMgCWpBB3cgB3MiByADakEJdyAGcyIGIAdqQQ13IAlzIgkgBmpBEncgA3MhAyAUIBVqQRJ3IARzIgQgCmpBB3cgDHMiDCAEakEJdyALcyILIAxqQQ13IApzIgogC2pBEncgBHMhBCARQQJLIRYgEUECayERIBYNAAsgACAENgAAIAAgDzYAHCAAIAU2ABggACAGNgAUIAAgBzYAECAAIAE2AAwgACACNgAIIAAgAzYABAsKACAAIAEQB0EACwwAIAAgASACEAhBAAu0AQEBfyAAIAEoAABB////H3E2AgAgACABKAADQQJ2QYP+/x9xNgIEIAAgASgABkEEdkH/gf8fcTYCCCAAIAEoAAlBBnZB///AH3E2AgwgASgADCECIABCADcCFCAAQgA3AhwgAEEANgIkIAAgAkEIdkH//z9xNgIQIAAgASgAEDYCKCAAIAEoABQ2AiwgACABKAAYNgIwIAEoABwhASAAQQA6AFAgAEIANwM4IAAgATYCNEEAC80FAQR/IwAiBUHAAWtBQHEiBCQAIAQgAygAAEH///8fcTYCQCAEIAMoAANBAnZBg/7/H3E2AkQgBCADKAAGQQR2Qf+B/x9xNgJIIAQgAygACUEGdkH//8AfcTYCTCADKAAMIQYgBEIANwJUIARCADcCXCAEQQA2AmQgBCAGQQh2Qf//P3E2AlAgBCADKAAQNgJoIAQgAygAFDYCbCAEIAMoABg2AnAgAygAHCEDIARBADoAkAEgBEIANwN4IAQgAzYCdCAEQUBrIgMgASACEAggAyAEQTBqIgMQByMAQRBrIgEgADYCDCABIAM2AgggAUEANgIEIAEgASgCBCABKAIMLQAAIAEoAggtAABzcjYCBCABIAEoAgQgASgCDC0AASABKAIILQABc3I2AgQgASABKAIEIAEoAgwtAAIgASgCCC0AAnNyNgIEIAEgASgCBCABKAIMLQADIAEoAggtAANzcjYCBCABIAEoAgQgASgCDC0ABCABKAIILQAEc3I2AgQgASABKAIEIAEoAgwtAAUgASgCCC0ABXNyNgIEIAEgASgCBCABKAIMLQAGIAEoAggtAAZzcjYCBCABIAEoAgQgASgCDC0AByABKAIILQAHc3I2AgQgASABKAIEIAEoAgwtAAggASgCCC0ACHNyNgIE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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(instance=>instance).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;wasmExports=exports;wasmMemory=wasmExports["d"];updateMemoryViews();wasmTable=wasmExports["g"];addOnInit(wasmExports["e"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={1224:()=>Module.getRandomValue(),1260:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&&buf%8?4:0;readEmAsmArgsArray.push(ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=ch==105?4:8}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var _emscripten_memcpy_big=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var printCharBuffers=[null,[],[]];var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var SYSCALLS={varargs:undefined,get(){var ret=HEAP32[SYSCALLS.varargs>>2];SYSCALLS.varargs+=4;return ret},getp(){return SYSCALLS.get()},getStr(ptr){var ret=UTF8ToString(ptr);return ret}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={b:_emscripten_asm_const_int,c:_emscripten_memcpy_big,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["e"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["f"])(a0,a1);var ___errno_location=()=>(___errno_location=wasmExports["__errno_location"])();function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}try{var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
