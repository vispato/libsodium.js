var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABXw9gA39/fwF/YAJ/fwBgAn9/AX9gBH9/fn8Bf2ADf39+AGADf39/AGABfwBgBn9/fn9+fwF/YAR/fn9/AX9gBH9/f38Bf2AAAGAAAX9gA39/fgF/YAN/fn8BfmABfwF/AhMDAWEBYQAJAWEBYgAAAWEBYwAFAxkYAQUBBAEECgYCCwEEBgIMAgMNDgADBwgCBAQBcAALBQcBAYACgIACBggBfwFBoIMGCwcRBAFkAgABZQAJAWYAGgFnAQAJEAEAQQELChcTEhEQGRgVFhQKhTsYCAAgACABEA0LtwUBIH8gAigAFCIVIQsgAigAGCIWIQ8gAigAHCIXIRBB9MqB2QYhBCACKAAQIhghA0Gy2ojLByEMIAEoAAwiGSERIAEoAAgiGiEKIAEoAAQiGyEGIAEoAAAiHCEBQe7IgZkDIQ0gAigADCIdIQcgAigACCIeIQggAigABCIfIQkgAigAACIgIQJB5fDBiwYhBQNAIAIgDWpBB3cgEXMiDiANakEJdyAPcyITIAUgC2pBB3cgB3MiByAFakEJdyAKcyIUIAdqQQ13IAtzIiEgCCADIARqQQd3cyIIIARqQQl3IAZzIgYgCGpBDXcgA3MiCiAGakESdyAEcyIEIAEgDGpBB3cgEHMiA2pBB3dzIgsgBGpBCXdzIg8gC2pBDXcgA3MiECAPakESdyAEcyEEIAogAyADIAxqQQl3IAlzIglqQQ13IAFzIiIgCWpBEncgDHMiASAOakEHd3MiAyABakEJdyAUcyIKIANqQQ13IA5zIhEgCmpBEncgAXMhDCATIA4gE2pBDXcgAnMiDmpBEncgDXMiAiAHakEHdyAicyIBIAJqQQl3IAZzIgYgAWpBDXcgB3MiByAGakESdyACcyENIBQgIWpBEncgBXMiBSAIakEHdyAOcyICIAVqQQl3IAlzIgkgAmpBDXcgCHMiCCAJakESdyAFcyEFIBJBAmoiEkEUSA0ACyAAIARB9MqB2QZqNgA8IAAgECAXajYAOCAAIA8gFmo2ADQgACALIBVqNgAwIAAgAyAYajYALCAAIAxBstqIywdqNgAoIAAgESAZajYAJCAAIAogGmo2ACAgACAGIBtqNgAcIAAgASAcajYAGCAAIA1B7siBmQNqNgAUIAAgByAdajYAECAAIAggHmo2AAwgACAJIB9qNgAIIAAgAiAgajYABCAAIAVB5fDBiwZqNgAAC0MBAn8jAEEQayICJAAgAQRAA0AgAkEAOgAPIAAgA2pB8AkgAkEPakEAEAE6AAAgA0EBaiIDIAFHDQALCyACQRBqJAALpgQCDn4KfyAAKAIkIRIgACgCICETIAAoAhwhFCAAKAIYIRUgACgCFCERIAJCEFoEQCAALQBQRUEYdCEWIAAoAhAiF60hDyAAKAIMIhitIQ0gACgCCCIZrSELIAAoAgQiGq0hCSAaQQVsrSEQIBlBBWytIQ4gGEEFbK0hDCAXQQVsrSEKIAA1AgAhCANAIAEoAANBAnZB////H3EgFWqtIgMgDX4gASgAAEH///8fcSARaq0iBCAPfnwgASgABkEEdkH///8fcSAUaq0iBSALfnwgASgACUEGdiATaq0iBiAJfnwgEiAWaiABKAAMQQh2aq0iByAIfnwgAyALfiAEIA1+fCAFIAl+fCAGIAh+fCAHIAp+fCADIAl+IAQgC358IAUgCH58IAYgCn58IAcgDH58IAMgCH4gBCAJfnwgBSAKfnwgBiAMfnwgByAOfnwgAyAKfiAEIAh+fCAFIAx+fCAGIA5+fCAHIBB+fCIDQhqIQv////8Pg3wiBEIaiEL/////D4N8IgVCGohC/////w+DfCIGQhqIQv////8Pg3wiB0IaiKdBBWwgA6dB////H3FqIhFBGnYgBKdB////H3FqIRUgBadB////H3EhFCAGp0H///8fcSETIAenQf///x9xIRIgEUH///8fcSERIAFBEGohASACQhB9IgJCD1YNAAsLIAAgETYCFCAAIBI2AiQgACATNgIgIAAgFDYCHCAAIBU2AhgLqgMCDH8DfiAAKQM4Ig5CAFIEQCAAQUBrIgIgDqciA2pBAToAACAOQgF8Qg9YBEAgACADakHBAGpBDyADaxANCyAAQQE6AFAgACACQhAQBgsgADUCNCEOIAA1AjAhDyAANQIsIRAgASAAKAIUIAAoAiQgACgCICAAKAIcIAAoAhgiA0EadmoiAkEadmoiBkEadmoiCUEadkEFbGoiBEH///8fcSIFQQVqIgdBGnYgA0H///8fcSAEQRp2aiIEaiIIQRp2IAJB////H3EiCmoiC0EadiAGQf///x9xIgZqIgxBGnYgCUH///8fcWoiDUGAgIAgayICQR91IgMgBHEg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IgMgCWpBB3cgB3MiByADakEJdyAGcyIGIAdqQQ13IAlzIgkgBmpBEncgA3MhAyAUIBVqQRJ3IARzIgQgCmpBB3cgDHMiDCAEakEJdyALcyILIAxqQQ13IApzIgogC2pBEncgBHMhBCARQQJLIQ0gEUECayERIA0NAAsgACAENgAAIAAgDzYAHCAAIAU2ABggACAGNgAUIAAgBzYAECAAIAE2AAwgACACNgAIIAAgAzYABAsKACAAIAEQB0EACwwAIAAgASACEAhBAAu0AQEBfyAAIAEoAABB////H3E2AgAgACABKAADQQJ2QYP+/x9xNgIEIAAgASgABkEEdkH/gf8fcTYCCCAAIAEoAAlBBnZB///AH3E2AgwgASgADCECIABCADcCFCAAQgA3AhwgAEEANgIkIAAgAkEIdkH//z9xNgIQIAAgASgAEDYCKCAAIAEoABQ2AiwgACABKAAYNgIwIAEoABwhASAAQQA6AFAgAEIANwM4IAAgATYCNEEAC80FAQN/IwAiBUHAAWtBQHEiBCQAIAQgAygAAEH///8fcTYCQCAEIAMoAANBAnZBg/7/H3E2AkQgBCADKAAGQQR2Qf+B/x9xNgJIIAQgAygACUEGdkH//8AfcTYCTCADKAAMIQYgBEIANwJUIARCADcCXCAEQQA2AmQgBCAGQQh2Qf//P3E2AlAgBCADKAAQNgJoIAQgAygAFDYCbCAEIAMoABg2AnAgAygAHCEDIARBADoAkAEgBEIANwN4IAQgAzYCdCAEQUBrIgMgASACEAggAyAEQTBqIgMQByMAQRBrIgEgADYCDCABIAM2AgggAUEANgIEIAEgASgCBCABKAIMLQAAIAEoAggtAABzcjYCBCABIAEoAgQgASgCDC0AASABKAIILQABc3I2AgQgASABKAIEIAEoAgwtAAIgASgCCC0AAnNyNgIEIAEgASgCBCABKAIMLQADIAEoAggtAANzcjYCBCABIAEoAgQgASgCDC0ABCABKAIILQAEc3I2AgQgASABKAIEIAEoAgwtAAUgASgCCC0ABXNyNgIEIAEgASgCBCABKAIMLQAGIAEoAggtAAZzcjYCBCABIAEoAgQgASgCDC0AByABKAIILQAHc3I2AgQgASABKAIEIAEoAgwtAAggASgCCC0ACHNyNgIEIAEgASgCBCABKAIMLQAJIAEo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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(binaryFile){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(binaryFile)){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{if(!response["ok"]){throw"failed to load wasm binary file at '"+binaryFile+"'"}return response["arrayBuffer"]()}).catch(()=>getBinary(binaryFile))}else{if(readAsync){return new Promise((resolve,reject)=>{readAsync(binaryFile,response=>resolve(new Uint8Array(response)),reject)})}}}return Promise.resolve().then(()=>getBinary(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>{return WebAssembly.instantiate(binary,imports)}).then(instance=>{return instance}).then(receiver,reason=>{err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(binaryFile)&&!isFileURI(binaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{var result=WebAssembly.instantiateStreaming(response,imports);return result.then(callback,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(binaryFile,imports,callback)})})}else{return instantiateArrayBuffer(binaryFile,imports,callback)}}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["d"];updateMemoryViews();wasmTable=Module["asm"]["g"];addOnInit(Module["asm"]["e"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={1264:()=>{return Module.getRandomValue()},1300:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var readEmAsmArgsArray=[];function readEmAsmArgs(sigPtr,buf){readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray}function runEmAsmFunction(code,sigPtr,argbuf){var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_asm_const_int(code,sigPtr,argbuf){return runEmAsmFunction(code,sigPtr,argbuf)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var printCharBuffers=[null,[],[]];var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function _proc_exit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}function exitJS(status,implicit){EXITSTATUS=status;_proc_exit(status)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmImports={"b":_emscripten_asm_const_int,"c":_emscripten_memcpy_big,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=function(){return(___wasm_call_ctors=Module["asm"]["e"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["f"]).apply(null,arguments)};var ___errno_location=function(){return(___errno_location=Module["asm"]["__errno_location"]).apply(null,arguments)};var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
