// locator

var lastclick = ['0', '0']
var lastitem = [0, 0]
var svgmargin = 30
var sounds = []
var sounding = false // logs if sounds exist yet

var htmlcol = document.getElementsByTagName("pre")
var htmlcol2 = document.getElementsByTagName("svg")

function createSounds() {
  if (sounding == false) {
    const snds = Array.from($('[snd]'))
    for (let snd of snds) {
      const newsnd = $('<audio></audio>')
      newsnd.attr('top', $(snd).offset().top + $(snd).height() / 2)
      newsnd.attr('left', $(snd).offset().left + $(snd).width() / 2)
      newsnd.attr('src', 'sounds/' + document.title + '/' + $(snd).attr('snd') +
        '.mp3')
      newsnd.attr('loop', 'true')
      $(snd).before(newsnd)
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const audioCtx = new AudioContext()
      const audioNode = audioCtx.createMediaElementSource(newsnd[0])
      const gainNode = audioCtx.createGain()
      const panNode = audioCtx.createPanner();
      audioNode.connect(gainNode).connect(panNode).connect(audioCtx.destination)
      sounds.push([$(newsnd), gainNode, panNode, audioCtx]) // adds to array of sounds along w pan + gain
      console.log([$(newsnd), gainNode, panNode, audioCtx]);
    }
    for (let snd of sounds) {
      snd[3].resume()
      snd[0][0].play()
    }
    // play or pause track depending on state

    scrollSounds()
    sounding = true
  }
}

function scrollSounds(ev) {
  const distX = window.innerWidth / 2 + 100
  const distY = window.innerHeight / 2 + 100
  const centX = $(document).scrollLeft() + window.innerWidth / 2
  const centY = $(document).scrollTop() + window.innerHeight / 2
  const sawsounds = []
  for (let snd of sounds) {
    // tests to see whether it's within ellipse
    if (snd[0].attr('top') > (centY - distY) && snd[0].attr('top') < (centY + distY)
      && snd[0].attr('left') > (centX - distX) && snd[0].attr('left') < (centX +
      distX)) {
      sawsounds.push(snd[0])
      // change volume
      const heightvol = Math.abs(snd[0].attr('top') - centY) / distY
      const widthvol = Math.abs(snd[0].attr('left') - centX) / distX
      if (snd[0].attr('src') == 'sounds/more/fire.mp3') {
      }
      snd[1].gain.value = Math.pow(1.0 - Math.max(heightvol, widthvol), 2)
      snd[2].setPosition((snd[0].attr('left') - centX) / distX,
        (snd[0].attr('top') - centX) / distY,
        Math.pow(1.0 - Math.max(heightvol, widthvol), 2))
    } else {
      snd[1].gain.value = 0
    }
  }
}

function divlogupdate(i) {
  lastitem = [parseInt(i.style.left.slice(0,-2)), parseInt(
    i.style.top.slice(0,-2))]
  for (let j = 0; j < 2; j ++) {
    if (isNaN(lastitem[j])) {
      lastitem[j] = 0
    }
  }
  lastitem[2] = i.innerHTML
}

for (let i of htmlcol) {
  i.onclick = function (event) {
    if (! event.metaKey) {
      divlogupdate(i)
    }
  }
}
for (let i of htmlcol2) {
  i.onclick = function () {
    divlogupdate(i)
  }
}

document.addEventListener("click", (event) => {
  if (event.metaKey) {
    let pageY = event.pageY - 16
    let pageX = event.pageX - 8
    let body = document.body
    let xdif = Math.abs(Math.ceil((Math.max(pageX, lastclick[0]) -
      Math.min(pageX, lastclick[0])) / 10) * 10)
    let ydif = Math.abs(Math.ceil((Math.max(pageY, lastclick[1]) -
      Math.min(pageY, lastclick[1])) / 10) * 10)
    let xdifreg = Math.ceil((pageX - lastclick[0]) / 10) * 10
    let ydifreg = Math.ceil((pageY - lastclick[1]) / 10) * 10
    let left = Math.min(pageX, lastclick[0]) - 10 - 50
    let top = Math.min(pageY, lastclick[1]) - 10 - 36
    let startX, startY, endX, endY, Qx, Qy
    if (lastclick[0] < pageX) { startX = svgmargin; endX = xdif
    } else { startX = xdif;  endX = svgmargin}
    if (lastclick[1] < pageY) { startY = svgmargin; endY = ydif
    } else { startY = ydif; endY = svgmargin }
    Qy = svgmargin
    let clicks = [lastclick, [pageX, pageY]].sort(
      function(a, b){return a[0] - b[0]})
    if (clicks[0][1] > clicks[1][1]) /* upwards diagonal */{
      Qx = svgmargin } else { Qx = xdif }
    // for WAKE
    let rotateby = Math.atan((pageY - 984) / (pageX - 1000))
    if (pageX < 1000) /* left side */ { rotateby += Math.PI }
    rotateby = rotateby.toFixed(2)
    // for FLURRY
    let localrotate = Math.atan(
      (pageY - lastclick[1]) / (pageX - lastclick[0]))
    if (pageX > lastclick[0]) {localrotate += Math.PI}
    let hypotenuse = Math.ceil(Math.sqrt(Math.pow((pageX - lastclick[0]), 2) +
      Math.pow((pageY - lastclick[1]), 2)))
    let hypotenuseabs = Math.ceil(Math.sqrt(Math.pow((pageX - 1000), 2) +
      Math.pow((pageY - 1000), 2)))
    alert(
      lastitem[2] + "\n" +
        "left:" + (xdifreg + lastitem[0]) + "pxtop:" + (ydifreg +
        lastitem[1]) + "px\n" + xdifreg + "," + ydifreg +
      /* DEFAULT */ "\n<pre style=\"left:" + (pageX) + "pxtop:" +
        (pageY) + "px\"></pre>" +
      /* Circles (conceived uses hypotenuseabs) */
      "\n<svg width=\"" + (2 * hypotenuse) + "\" height=\"" +
        (2 * hypotenuse) + "\" style=\"top:" +
        (lastclick[1] - (hypotenuse)) + "left:" + (lastclick[0] -
        (hypotenuse)) + "transform:rotate(" + rotateby + "rad)" +
        "\"><circle id=\"\" cx=\"" + hypotenuse +
        "\" cy=\"" + hypotenuse + "\" r=\"" + (hypotenuse - 20) +
        "\" /><text><textPath href=\"#\"></textPath></text></svg>" +
      // /* FRACTURED */ "\n<pre style=\"left:" + (pageX) + "pxtop:" +
      //   (pageY) + "pxtransform:rotate(" + String(localrotate).slice(0,5) +
      //   "rad)letter-spacing:" + String(hypotenuse / 5).slice(0,4) +
      //   "px\" class=\"rotated\"></pre>" +
      /* FLURRY */ "\n<pre style=\"left:" + (pageX) + "pxtop:" +
        (pageY) + "pxtransform:rotate(" + String(localrotate).slice(
        0,5) + "rad)" + "\" class=\"rotated\"></pre>" +
      // /* FIRE */ "\n<pre style=\"left:" + (pageX) + "pxtop:" + (pageY) +
      //   "pxtransform:rotate(" + String(rotateby).slice(0,5) + "rad)" +
      //   "\" class=\"rotated\"></pre>" +
      // WAKE "\n<pre style=\"left:" + (pageX) + "pxtop:" +
      //   (pageY) +
      //   "pxtransform:rotate(" + String(rotateby).slice(0,5) + "rad) " +
      //   "opacity:" + String((Math.sqrt(Math.pow((pageX - 1020), 2) +
      //     Math.pow((pageY - 1030), 2))) / 1000).slice(0,4) +
      //   "\" class=\"rotated\"></pre>" +
      "\n" + window.scrollX + " " + window.scrollY +
      // _INDEX "\n" + "<svg width=\"" + (xdif + 10) + "\" height=\"" +
        // (ydif + 10) +
        //   "\" style=\"left:" + (Math.min(pageX, lastclick[0]) - 10 -
        // 50) +
        //   "pxtop:" + (Math.min(pageY, lastclick[1]) - 36) +
        // "px\"><line marker-end=\"url(#arrowhead)\" x1=\"" +
        // String(Math.abs(xdif) + 15) +
        //   "\" y1=\"0\" x2=\"10\" y2=\"" + String(Math.abs(ydif) + 10) +
        // "\" /></svg>"
      "\n" + "<svg width=\"" + (xdif + svgmargin) + "\" height=\"" + (ydif +
        svgmargin) +
        "\" style=\"left:" + left +
        "pxtop:" + top + "px\"><path style=\"stroke:white\" id=\"\" d=\"M" +
        startX + "," + startY + " Q" + Qx + "," + Qy + " " + endX + "," +
        endY + "\" /><text><textPath href=\"#\"></textPath></text></svg>"
    )
  } else {
    lastclick = [event.pageX, event.pageY]
  }
})

// page loader

function getOffset(element) {
  let offset = [0, 0]
  let curparent = element
  while (curparent != document.body) {
    offset[0] += curparent.offsetLeft
    offset[1] += curparent.offsetTop
    curparent = curparent.parentElement
  }
  // scalefactor = $('body').css('zoom')
  // offset.forEach(i => { i /= scalefactor })
  // console.log(scalefactor, offset)
  return offset
}

$(window).on('load', function() {
  if (window.location.href.includes("#")) {
    let loadeditem = document.getElementById(window.location.href.slice(
      window.location.href.lastIndexOf("#") + 1))
    let load = loadeditem.getAttribute("load").split(" ")
    if (load[2] != "-") {
      if (load[2] == "fit") { // establishes fit for item
        load[2] = Math.round(
          window.innerWidth / loadeditem.clientWidth * 100 - 2)
      }
      // rearrange zoom of webpage
      $('body').css('zoom', load[2] + "%") /* Webkit browsers */
      $('body').css('zoom', load[2] / 100) /* Other non-webkit browsers */
      $('body').css('-moz-transform', "scale(" + load[2] / 10 + ", " +
        load[2] / 100 + ")") /* Moz-browsers */
    } else {load[2] = 100}
    if (load[0] == "c") {
      load[0] = (getOffset(loadeditem)[0] - (window.innerWidth -
        loadeditem.clientWidth) / 2) * (load[2] / 100)
    }
    if (load[1] == "c") {
      load[1] = (getOffset(loadeditem)[1] - (window.innerHeight -
        loadeditem.clientHeight) / 2) * (load[2] / 100)
    }
    if (load[0] != "-") {document.scrollingElement.scrollLeft = load[0] *
      (load[2] / 100)}
    if (load[1] != "-") {document.scrollingElement.scrollTop = load[1] *
      (load[2] / 100)}
  } else {
    window.scrollTo(0, 0)
  }
})

document.onscroll = function() {scrollSounds(event)}
