const calcsin = (angulo) => {
    return Math.sin((2*Math.PI*angulo)/360);
}

const calccos = (angulo) => {
    return Math.cos((2*Math.PI*angulo)/360);
}

const poligono = (n, p) => {
    const as = document.querySelectorAll('.wrap a');
    as.forEach((a) => {
        a.remove();
    });

    const angulo = 360/n;

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
        const ponto    = document.createElement('a');
        const pontoDiv = document.createElement('div');

        ponto.className = 'ext';
        ponto.appendChild(pontoDiv);

        ponto.style.width  = p + '%';
        ponto.style.height = p + '%';
        ponto.style.left   = (perc + perc * calccos(i*angulo)).toString() + '%'; 
        ponto.style.top    = (perc + perc * calcsin(i*angulo)).toString() + '%';

        wrap.appendChild(ponto);
    }

}

const lados = document.querySelector('#lados');
const perc  = document.querySelector('#perc');
const btn   = document.querySelector('#btn');

btn.addEventListener('click', (e) => {
    e.preventDefault();

    n = lados.value;
    p = perc.value;

    poligono(n, p);
});

const gira = document.querySelector('.wrap');
let g = 0.1;
setInterval(() => {
    gira.style.transform = 'rotate(' + g + 'deg)';
    g += 0.1;
}, 1);