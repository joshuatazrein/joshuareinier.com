class Scroller {
  constructor() {

    // make sound list

    this.ctx = new AudioContext();
    
    const listener = this.ctx.listener;
    
    this.sounds = $('pre').toArray().map(x => 
      this.generate(x, 'sound')
    );

    // set up visuals
    this.lines = [];
    this.nextLine = 0;

    while (this.nextLine < 0.9) {
      this.generateLine();
    }

    // set scroll
    this.sounds.forEach(x => {
      x[0].css('display', 'none');
      x[0].css('opacity', x[0].attr('v'));
      x[0].css('top', (x[0].attr('t') * 100) + 'vh');
    });
    $(window).on('scroll', () => this.process());
    $(window).on('click', (ev) => {
      if (ev.metaKey) this.locate(ev)
      else this.previousClick = document.body.scrollTop;
    });

    console.log(this.sounds);

    this.process();
  }

  autoScroll() {
    const change = 5;
    const interval = 1;
    this.autoScrolling = setInterval(() => {
      document.body.scrollTop += change;
      if (document.body.scrollTop <= $(document).height() * 0.97) {
        document.body.scrollTop = 0;
      }
      this.process();
      console.log(document.body.scrollTop);
    }, interval);
  }

  generate(el, type) {
    el = $(el);

    const effects = {};
    const ctx = this.ctx;

    var pitch = 440 * 2 ** ( ((1 - el.attr('t')) * 128 - 69) / 12 );
    
    if (type == 'sound') {
      const noiseLength = 10;
      const bufferSize = ctx.sampleRate * noiseLength;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0); // get data

      // fill the buffer with noise
      for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      noise.start();
      effects.sound = noise;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = pitch;
      bandpass.Q.value = 1;
      effects.bandpass = bandpass;
      
    } else if (type === 'line') {

      const line = ctx.createOscillator('sine');
      line.frequency.value = pitch;
      line.start();

      effects.sound = line;

    }

    const gain = ctx.createGain();
    gain.gain.value = Number(el.attr('v'));
    effects.gain = gain;

    const pan = ctx.createStereoPanner();
    effects.pan = pan;

    if (type === 'sound') {
      effects.sound.connect(gain).connect(effects.bandpass)
        .connect(pan).connect(ctx.destination);
    } else if (type === 'line') {
      effects.sound.connect(gain).connect(pan).connect(ctx.destination);
    }

    return [el, effects];
  }

  generateLine() {
    // features: top, spread, opacity, thickness, length
    const top = Math.random();
    const thickness = range(1, 10);
    const spread = range(0.001, 0.03);
    const opacity = Math.random() * 0.5;
    const length = range(0.05, 0.5) * window.innerWidth;

    const svg = $(
      `<svg 
        l=${this.nextLine} s=${spread} t=${top} v=${opacity}
        height=${thickness} width=${length} 
        style='top:${top & window.innerHeight};position:fixed;'
      >
        <line 
          x1=0 y1=0 x2=${length} y2=0
          stroke-linecap:"round"  
          style='opacity:${opacity};stroke:#ffffff;
          stroke-width:${thickness}'
        ></line>
      </svg>`)
    $('body').append(svg);

    this.sounds.push(this.generate(svg, 'line'));
    this.findNextLine();
  }

  findNextLine() {
    if (this.nextLine === undefined) this.nextLine = 0;
    this.nextLine += Math.random() * 0.005;
  }

  getLocation() {
    return document.body.scrollTop / ($(document).height() * 0.97);
  }

  process() {
    const location = this.getLocation();

    // change sound volume
    this.sounds.forEach(x => {
      const text = x[0];
      const audio = x[1];
      const l = Number(text.attr('l'));
      const s = Number(text.attr('s'));
      if (location > l && location < l + s) {
        // calculate how far in it is
        // 100%: l + s, 0%: l
        const progress = (location - l) / s;
        text.css('display', 'block');
        const textWidth = text.width();
        const totalWidth = window.innerWidth + textWidth;
        text.css('right', (progress * totalWidth - textWidth) + 'px');

        // audio effects
        const volume = (1 - 2 * Math.abs(progress - 0.5)) * text.attr('v');
        audio.gain.gain.value = volume;

        audio.pan.pan.value = 1 - progress * 2;
      } else if (audio.gain.gain.value !== 0) {
        text.css('display', 'none');
        audio.gain.gain.value = 0;
      }
    });

  }

  locate(ev) {
    const l = String(document.body.scrollTop / ($(document).height() * 0.97))
      .slice(0, 5);
    const t = String(ev.clientY / window.innerHeight).slice(0, 4);
    if (this.previousClick) {
      const prevSpread = this.previousClick / ($(document).height() * 0.97);
      var s = String(Math.abs(l - prevSpread)).slice(0, 5);
    } else {
      var s = '0.';
    }
    const v = String(ev.clientX / window.innerWidth).slice(0, 4);
    const locator = `<pre l='${l}' s='${s}' t=${t} v='${v}' style=''></pre>`;
    alert(locator);
    this.previousClick = undefined;
  }
}

function start() {
  const scroller = new Scroller();
}
