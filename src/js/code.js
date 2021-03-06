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
        dot.style.left   = (perc + perc * calccos(i*angle - 90)).toString() + '%'; 
        dot.style.top    = (perc + perc * calcsin(i*angle - 90)).toString() + '%';

        wrap.appendChild(dot);
    }
}

const copyclip = (elem) => {
    let txt = elem.innerHTML;
    txt = txt.replaceAll('&lt;','<');
    txt = txt.replaceAll('&gt;','>');
    navigator.clipboard.writeText(txt);
}

const vertx   = document.querySelector('#vertx');
const perc    = document.querySelector('#perc');
const color   = document.querySelector('#color');
const central = document.querySelector('#central');
const btn     = document.querySelector('#btn');
const rotate  = document.querySelector('#rotate');
const taHtml  = document.querySelector('.copy #html');
const cpHtml  = document.querySelector('.copy #copyHtml');
const taCss   = document.querySelector('.copy #css');
const cpCss   = document.querySelector('.copy #copyCss');

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

    const wrap = document.querySelector('.wrap');

    let htmlText = wrap.outerHTML;
    htmlText = htmlText.replaceAll('class="ext"','');
    htmlText = htmlText.replaceAll(`width: ${perc.value}%; height: ${perc.value}%; `, '');
    htmlText = htmlText.replaceAll(/style="background-color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);"/g,'');
    htmlText = htmlText.replace(/style="transform: rotate\(.*\);"/g, '');
    htmlText = htmlText.replaceAll('<','&lt;');
    htmlText = htmlText.replaceAll('>','&gt;');
    taHtml.innerHTML = htmlText;
    taHtml.previousElementSibling.innerHTML = htmlText;
    hljs.highlightElement(taHtml);

    let cssText = `.wrap{
    position:relative;
    width:700px; height:700px;
    margin:0 auto;
}
.wrap a{
    position:absolute;
    left:0; top:0;
    border-radius:50%;
    width: ${perc.value}%;
    height: ${perc.value}%;
}
.wrap a div{
    height:100%;
    border-radius:inherit;
    background-color: ${color.value};
}`;
    taCss.innerHTML = cssText;
    taCss.previousElementSibling.innerHTML = cssText;
    hljs.highlightElement(taCss);
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

cpHtml.addEventListener('click', () => {
    copyclip(taHtml.previousElementSibling);
});

cpCss.addEventListener('click', () => {
    copyclip(taCss.previousElementSibling);
});