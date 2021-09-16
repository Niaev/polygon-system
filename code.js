const calcsin = (angle) => {
    return Math.sin((2*Math.PI*angle)/360);
}

const calccos = (angle) => {
    return Math.cos((2*Math.PI*angle)/360);
}

const polygon = (n, p, color, c) => {
    const as = document.querySelectorAll('.wrap a');
    as.forEach((a) => {
        a.remove();
    });

    const angle = 360/n;
    const perc  = (100 - p) / 2;
    
    const wrap = document.querySelector('.wrap');
    
    if (c) {
        const center    = document.createElement('a');
        const centerDiv = document.createElement('div');

        centerDiv.style.backgroundColor = color;
        center.appendChild(centerDiv);
        center.style.width  = p + '%';
        center.style.height = p + '%';
        center.style.top    = perc + '%';
        center.style.left   = perc + '%';

        wrap.appendChild(center);
    }

    for (let i=0; i<n; i++) {
        const dot    = document.createElement('a');
        const dotDiv = document.createElement('div');

        dotDiv.style.backgroundColor = color;
        dot.className = 'ext';
        dot.appendChild(dotDiv);

        dot.style.width  = p + '%';
        dot.style.height = p + '%';
        dot.style.left   = (perc + perc * calccos(i*angle)).toString() + '%'; 
        dot.style.top    = (perc + perc * calcsin(i*angle)).toString() + '%';

        wrap.appendChild(dot);
    }

}

const vertx   = document.querySelector('#vertx');
const perc    = document.querySelector('#perc');
const color   = document.querySelector('#color');
const central = document.querySelector('#central');
const btn     = document.querySelector('#btn');
const rotate  = document.querySelector('#rotate');

perc.addEventListener('change', () => {
    perc.nextElementSibling.innerHTML = perc.value + '%';
});

btn.addEventListener('click', (e) => {
    e.preventDefault();

    let c = '#ffbaba';
    const regex = /^#[0-9A-F]{6}$/i.test(color.value);
    if (!regex) { color.value = c }

    polygon(
        vertx.value,
        perc.value,
        color.value,
        central.checked
    );
});

const spin = document.querySelector('.wrap');
let s = 0.1
let spinInterval = 0;
const doRotate = () => {
    if (rotate.checked) {
        spinInterval = setInterval(() => {
            spin.style.transform = 'rotate(' + s + 'deg)';
            s += 0.1;
        }, 1);
    }
}
doRotate();

rotate.addEventListener('change', () => {
    doRotate();
    if (!rotate.checked) {
        spin.style.transform = 'rotate(0deg)';
        s = 0.1;
        clearInterval(spinInterval);
    }
});