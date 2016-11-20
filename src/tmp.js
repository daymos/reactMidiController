
function finishedLoading(bufferList) {
  window.audioSources = bufferList.map(
    (el,i) => context.createBufferSource().buffer = el
  )
  .forEach((source)=>{
    source.connect(context.destination)
  })
}

init()
