'use strict'
import   BufferLoader  from './bufferLoaderClass.js'
console.log('here', BufferLoader)
var context;
var bufferLoader;


function init() {
  // Fix up prefixing
  console.log('argumetns', arguments)
  console.log('init is runnign')
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      'http://localhost:3002/128_C_MelodyWoody_SP_01.wav',
      'http://localhost:3002/128_Bm_BassFluffy_SP_01.wav',
      'http://localhost:3002/128_C_ArpWaver_SP_01.wav',
      'http://localhost:3002/128_C_MelodyWoody_SP_01.wav',
      'http://localhost:3002/128_D_MelodyAaahFixed_SP_01.wav',
      'http://localhost:3002/128_DrumsNourished_SP_01.wav',
      'http://localhost:3002/128_Drums_SP_10.wav',
      'http://localhost:3002/128_Percloop_SP_02.wav',
      'http://localhost:3002/140_DrumsCut_SP_01.wav',
      'http://localhost:3002/85_Drums_SP_01.wav'    ],
      finishedLoading
  )
  bufferLoader.load()

}

function finishedLoading(bufferList) {
  window.a = bufferList.map(
    (el,i) => context.createBufferSource()).map((l, k)=>{
      l.buffer = bufferList[k]
      return l
    })
  window.a.forEach((source)=>{
    source.connect(context.destination)
    console.log('here')
  })
}

init()

