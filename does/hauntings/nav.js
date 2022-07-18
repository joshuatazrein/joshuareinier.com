// install a nav bar
const pieces = [
  "wake",
  "flickering",
  "more",
  "flurry",
  "heirloom",
  "being",
  "space",
  "conceived",
  "face",
  "other",
  "glass",
  "fire",
  "frame",
  "you",
  "posture",
  "recognition",
  "time",
  "this",
  "forgive",
  "fractured",
  "echoes",
  "crepuscule",
  "fade",
  "end",
];

const title = $("title").html();
const navBar = `<div class="navbar"><a href="index.html" title="index">index</a><span style="font-weight: bold">${title}</span><a href="${
  pieces[pieces.indexOf(title) + 1] || "index"
}.html">next</a></div>`;

$("body").prepend(navBar);
