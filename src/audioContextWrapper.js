import   BufferLoader  from './bufferLoaderClass.js'
console.log('here', BufferLoader)
var context;
var bufferLoader;


function init() {
  // Fix up prefixing
  console.log('init is runnign')
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      'http://localhost:3002/128_C_MelodyWoody_SP_01.wav',
      'http://localhost:3002/128_C_MelodyWoody_SP_01.wav',
    ],
    finishedLoading
  )
  console.log(bufferLoader)
  bufferLoader.load()

}

function finishedLoading(bufferList) {
  console.log('done loading', bufferList)

  var source1 = context.createBufferSource();
  var source2 = context.createBufferSource();
  source1.buffer = bufferList[0];
  source2.buffer = bufferList[1];

  source1.connect(context.destination);
  source2.connect(context.destination);
  return [source1, source2]
}

init()

