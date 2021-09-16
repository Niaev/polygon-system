const calcsin = (angle) => {
    return Math.sin((2*Math.PI*angle)/360);
}

const calccos = (angle) => {
    return Math.cos((2*Math.PI*angle)/360);
}

const polygon = (n, p) => {
    const as = document.querySelectorAll('.wrap a');
    as.forEach((a) => {
        a.remove();
    });

    const angle = 360/n;

    const wrap      = document.querySelector('.wrap');
    const center    = document.createElement('a');
    const centerDiv = document.createElement('div');
    
    const perc = (100 - p) / 2;

    center.appendChild(centerDiv);
    center.style.width  = p + '%';
    center.style.height = p + '%';
    center.style.top    = perc + '%';
    center.style.left   = perc + '%';

    wrap.appendChild(center);

    for (let i=0; i<n; i++) {
        const dot    = document.createElement('a');
        const dotDiv = document.createElement('div');

        dot.className = 'ext';
        dot.appendChild(dotDiv);

        dot.style.width  = p + '%';
        dot.style.height = p + '%';
        dot.style.left   = (perc + perc * calccos(i*angle)).toString() + '%'; 
        dot.style.top    = (perc + perc * calcsin(i*angle)).toString() + '%';

        wrap.appendChild(dot);
    }

}

const vertx = document.querySelector('#vertx');
const perc  = document.querySelector('#perc');
const btn   = document.querySelector('#btn');

perc.addEventListener('change', () => {
    perc.nextElementSibling.innerHTML = perc.value + '%';
});

btn.addEventListener('click', (e) => {
    e.preventDefault();

    n = vertx.value;
    p = perc.value;

    polygon(n, p);
});

const spin = document.querySelector('.wrap');
let s = 0.1;
setInterval(() => {
    spin.style.transform = 'rotate(' + s + 'deg)';
    s += 0.1;
}, 1);