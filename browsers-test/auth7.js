var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=()=>"[Emscripten Module object]"}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,AGFzbQEAAAABXQ9gA39/fwF/YAN/f38AYAJ/fwBgAX8Bf2AEf39/fwBgAABgAX8AYAJ/fwF/YAR/f39/AX9gBX9/f39/AGADf39+AGACf34Bf2ACf34AYAV/f39/fwF/YAN/fn8BfgIZBAFhAWEACAFhAWIAAAFhAWMAAQFhAWQABAMaGQkCCgEBCwIEAgwFAAMBBQYGBwEDDQ4DAAcEBAFwAAQFBwEBgAKAgAIGCAF/AUHwqQQLBxEEAWUCAAFmABIBZwAcAWgBAAkJAQBBAQsDGhsZCupfGW4BAX8jAEGAAmsiBSQAAkAgAiADTA0AIARBgMAEcQ0AIAUgAUH/AXEgAiADayIDQYACIANBgAJJIgEbEAggAUUEQANAIAAgBUGAAhAHIANBgAJrIgNB/wFLDQALCyAAIAUgAxAHCyAFQYACaiQACwoAIABBACABEAgLnwYCB34EfyMAQcAFayIMJAACQCACUA0AIAAgACkDSCIDIAJCA4Z8IgQ3A0ggAEFAayIKIAopAwAgAyAEVq18IAJCPYh8NwMAIAJCgAEgA0IDiEL/AIMiBH0iBVoEQEIAIQMgBEL/AIVCA1oEQCAFQvwBgyEGIABB0ABqIQoDQCAKIAMgBHynaiABIAOnai0AADoAACAKIANCAYQiCCAEfKdqIAEgCKdqLQAAOgAAIAogA0IChCIIIAR8p2ogASAIp2otAAA6AAAgCiADQgOEIgggBHynaiABIAinai0AADoAACADQgR8IQMgCUIEfCIJIAZSDQALCyAFQgODIglCAFIEQANAIAAgAyAEfKdqIAEgA6dqLQAAOgBQIANCAXwhAyAHQgF8IgcgCVINAAsLIAAgAEHQAGogDCAMQYAFaiIKEAsgASAFp2ohASACIAV9IgJC/wBWBEADQCAAIAEgDCAKEAsgAUGAAWohASACQoABfSICQv8AVg0ACwsCQCACUA0AIAJCA4MhBEIAIQdCACEDIAJCBFoEQCACQnyDIQUgAEHQAGohCkIAIQIDQCAKIAOnIgtqIAEgC2otAAA6AAAgCiALQQFyIg1qIAEgDWotAAA6AAAgCiALQQJyIg1qIAEgDWotAAA6AAAgCiALQQNyIgtqIAEgC2otAAA6AAAgA0IEfCEDIAJCBHwiAiAFUg0ACwsgBFANAANAIAAgA6ciCmogASAKai0AADoAUCADQgF8IQMgB0IBfCIHIARSDQALCyAMQcAFEAUMAQtCACEDIAJCBFoEQCACQnyDIQUgAEHQAGohCgNAIAogAyAEfKdqIAEgA6dqLQAAOgAAIAogA0IBhCIGIAR8p2ogASAGp2otAAA6AAAgCiADQgKEIgYgBHynaiABIAanai0AADoAACAKIANCA4QiBiAEfKdqIAEgBqdqLQAAOgAAIANCBHwhAyAJQgR8IgkgBVINAAsLIAJCA4MiAlANAANAIAAgAyAEfKdqIAEgA6dqLQAAOgBQIANCAXwhAyAHQgF8IgcgAlINAAsLIAxBwAVqJAALFwAgAC0AAEEgcUUEQCABIAIgABAPGgsL8AICAn8BfgJAIAJFDQAgACABOgAAIAAgAmoiA0EBayABOgAAIAJBA0kNACAAIAE6AAIgACABOgABIANBA2sgAToAACADQQJrIAE6AAAgAkEHSQ0AIAAgAToAAyADQQRrIAE6AAAgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgA2AgAgAyACIARrQXxxIgJqIgFBBGsgADYCACACQQlJDQAgAyAANgIIIAMgADYCBCABQQhrIAA2AgAgAUEMayAANgIAIAJBGUkNACADIAA2AhggAyAANgIUIAMgADYCECADIAA2AgwgAUEQayAANgIAIAFBFGsgADYCACABQRhrIAA2AgAgAUEcayAANgIAIAIgA0EEcUEYciIBayICQSBJDQAgAK1CgYCAgBB+IQUgASADaiEBA0AgASAFNwMYIAEgBTcDECABIAU3AwggASAFNwMAIAFBIGohASACQSBrIgJBH0sNAAsLC/4CAQV/IwBBoARrIgMkACADQUBrIgIQFCACIAAgARAGIAIgA0HgA2oiABAKIANBkAJqIgIgAELAABAGIAIgAxAKIABBwAAQBSMAQRBrIgBBsB82AgwgACADNgIIQQAhAiAAQQA2AgQDQCAAIAAoAgQgACgCDCACai0AACAAKAIIIAJqLQAAc3I2AgQgACAAKAIEIAJBAXIiBCAAKAIMai0AACAAKAIIIARqLQAAc3I2AgQgAkECaiICQcAARw0ACyAAKAIEQQFrQQh2QQFxQQFrIQVBACEEIwBBEGsiACADNgIMIABBsB82AghBACECIABBADoABwNAIAAgAC0AByAAKAIMIAJqLQAA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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(binaryFile){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(binaryFile)){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{if(!response["ok"]){throw"failed to load wasm binary file at '"+binaryFile+"'"}return response["arrayBuffer"]()}).catch(()=>getBinary(binaryFile))}else{if(readAsync){return new Promise((resolve,reject)=>{readAsync(binaryFile,response=>resolve(new Uint8Array(response)),reject)})}}}return Promise.resolve().then(()=>getBinary(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>{return WebAssembly.instantiate(binary,imports)}).then(instance=>{return instance}).then(receiver,reason=>{err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(binaryFile)&&!isFileURI(binaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{var result=WebAssembly.instantiateStreaming(response,imports);return result.then(callback,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(binaryFile,imports,callback)})})}else{return instantiateArrayBuffer(binaryFile,imports,callback)}}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["e"];updateMemoryViews();wasmTable=Module["asm"]["h"];addOnInit(Module["asm"]["f"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={2608:()=>{return Module.getRandomValue()},2644:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}var readEmAsmArgsArray=[];function readEmAsmArgs(sigPtr,buf){readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray}function runEmAsmFunction(code,sigPtr,argbuf){var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_asm_const_int(code,sigPtr,argbuf){return runEmAsmFunction(code,sigPtr,argbuf)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var printCharBuffers=[null,[],[]];function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function _proc_exit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}function exitJS(status,implicit){EXITSTATUS=status;_proc_exit(status)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmImports={"d":___assert_fail,"b":_emscripten_asm_const_int,"c":_emscripten_memcpy_big,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=function(){return(___wasm_call_ctors=Module["asm"]["f"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["g"]).apply(null,arguments)};var ___errno_location=function(){return(___errno_location=Module["asm"]["__errno_location"]).apply(null,arguments)};var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
