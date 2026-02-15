const svg = document.getElementById("peonia");
const centerX = 300;
const centerY = 300;
let delay = 0;


const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
defs.innerHTML = `
  <filter id="sombraPetalo" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
    <feOffset dx="1" dy="1" result="offsetblur" />
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.3" />
    </feComponentTransfer>
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
`;
svg.appendChild(defs);

function crearPetaloAnimado(angulo, largo, ancho, color, opacidad) {
    const grupoRotacion = document.createElementNS("http://www.w3.org/2000/svg", "g");
    grupoRotacion.setAttribute("transform", `rotate(${angulo}, ${centerX}, ${centerY})`);

    const grupoEscala = document.createElementNS("http://www.w3.org/2000/svg", "g");
    grupoEscala.style.transformOrigin = `${centerX}px ${centerY}px`;
    grupoEscala.style.transform = "scale(0)";
    grupoEscala.style.transition = "transform 1.8s cubic-bezier(0.19, 1, 0.22, 1)";

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const r = () => (Math.random() - 0.5) * 20;
    
    path.setAttribute("d", `
        M ${centerX} ${centerY}
        C ${centerX - ancho + r()} ${centerY - largo/3}, 
          ${centerX - ancho*1.2 + r()} ${centerY - largo/1.5}, 
          ${centerX - ancho/2} ${centerY - largo + r()}
        C ${centerX - ancho/4} ${centerY - largo - 15 + r()},
          ${centerX + ancho/4} ${centerY - largo - 15 + r()},
          ${centerX + ancho/2} ${centerY - largo + r()}
        C ${centerX + ancho*1.2 + r()} ${centerY - largo/1.5}, 
          ${centerX + ancho + r()} ${centerY - largo/3}, 
          ${centerX} ${centerY}
    `);

   
    path.setAttribute("fill", color);
    path.setAttribute("fill-opacity", opacidad);
    
 
    path.setAttribute("stroke", "#4a001f"); 
    path.setAttribute("stroke-width", "0.4");
    

    path.setAttribute("filter", "url(#sombraPetalo)");

    grupoEscala.appendChild(path);
    grupoRotacion.appendChild(grupoEscala);
    svg.appendChild(grupoRotacion);

    setTimeout(() => {
        grupoEscala.style.transform = "scale(1)";
    }, delay);

    delay += 35;
}

function crearCapa(cantidad, largo, ancho, color, opacidad) {
    for (let i = 0; i < cantidad; i++) {
        const angulo = (360 / cantidad) * i + (Math.random() * 15);
        crearPetaloAnimado(angulo, largo, ancho, color, opacidad);
    }
}

crearCapa(12, 240, 115, "#ff8bb4", 0.6); 
crearCapa(15, 200, 105, "#f06292", 0.7); 
crearCapa(18, 160, 90, "#e91e63", 0.8);
crearCapa(22, 120, 70, "#c2185b", 0.9);
crearCapa(25, 80, 50, "#880e4f", 1.0); 


setTimeout(() => {
    for(let i = 0; i < 25; i++) {
        const p = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const dist = Math.random() * 20;
        const ang = Math.random() * 360;
        p.setAttribute("cx", centerX + Math.cos(ang) * dist);
        p.setAttribute("cy", centerY + Math.sin(ang) * dist);
        p.setAttribute("r", 1.5 + Math.random() * 2);
        p.setAttribute("fill", "#fff176"); 
        p.setAttribute("stroke", "#fbc02d");
        p.setAttribute("stroke-width", "0.5");
        p.style.transformOrigin = `${centerX}px ${centerY}px`;
        p.style.transform = "scale(0)";
        p.style.transition = "transform 0.6s ease-out";
        svg.appendChild(p);
        setTimeout(() => p.style.transform = "scale(1)", 50);
    }
}, delay);


function generarLluvia() {
    const p = document.createElement("div");
    p.className = "petal-rain";
    p.style.left = Math.random() * window.innerWidth + "px";
    p.style.top = "-20px";
    const duracion = 5 + Math.random() * 5;
    p.style.animation = `fall ${duracion}s linear forwards`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), duracion * 1000);
}

setInterval(generarLluvia, 400);
