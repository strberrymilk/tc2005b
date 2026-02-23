let app = document.getElementById ('typewriter');

let typewriter = new Typewriter(app,{
    loop: true,
    delay: 75,
});

typewriter
.pauseFor(1000)
.typeString('Soy Camila Cuevas')
.pauseFor(1500)
.deleteChars(10)
.start();

let miImage = document.getElementById("fotoexperiencia");
miImage.onclick = function () {
  let miSrc = miImage.getAttribute("src");
  if (miSrc === "tecnologías.png") {
    miImage.setAttribute("src", "logoomm.png");
  } else {
    miImage.setAttribute("src", "tecnologías.png");
  }
};

// LAB 04

// Exercise 1
const ex1 = () => {
  const n = prompt("Ingresa un número");

  let table = "<table><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>";

  for(let i = 1; i <= n; i++){
    table += `<tr><td>${i}</td><td>${i**2}</td><td>${i**3}</td></tr>`;
  }
  table += "</table>";

  document.getElementById("ex1").innerHTML = table;
}

// Exercise 2

let ex2 = () => {
  let start = performance.now() / 1000;

  let a = Math.floor(Math.random() * (100000)) + 1;
  let b = Math.floor(Math.random() * (100000)) + 1;

  let suma = prompt(`Ingresa el resultado de la suma: ${a} + ${b}`);

  let end = performance.now() / 1000;

  if(suma != (a+b)){
    document.getElementById("ex2").innerHTML = `<p>Incorrecto!</p><p>Tardaste ${end-start} segundos</p>`;
  }
  else{
    document.getElementById("ex2").innerHTML = `<p>Correcto! :)</p></p> ${end-start}`;
  }
}

// Exercise 3

let ex3 = () => {
  let nums = prompt("Ingresa los números del arreglo, separados por un espacio.");
  let arr = nums.trim().split(/\s+/);

  let n = 0;
  let ceros = 0;
  let p = 0;

    for(let i=0; i<arr.length; i++){
        if(arr[i]>0){
          p++;
        }
        else if(arr[i]<0){
          n++;
        }
        else{
          ceros++;
        }
    }

    document.getElementById("ex3").innerHTML=`<p>Números negativos: ${n}</p><p>Ceros: ${ceros}</p><p>Números positivos: ${p}</p>`;
}

// Exercise 4

let ex4 = () => {
  // Función: promedios. Parámetros: Un arreglo de arreglos de números. Regresa: Un arreglo con los promedios de cada uno de los renglones de la matriz.
  let input = prompt("Ingresa los números de la matriz, separados por espacios. Usa ';' para separar los renglones.");
  let rows = input.trim().split(";");
  let matrix = rows.map(row => row.trim().split(/\s+/).map(Number));

  let promedios = matrix.map(row => {
    let sum = row.reduce((acc, val) => acc + val, 0);
    return sum / row.length;
  });

  document.getElementById("ex4").innerHTML = `<p>Promedios: ${promedios.join(", ")}</p>.`;
}

// Exercise 5

let ex5 = () => {
  let num = prompt("Ingresa el número a voltear: ");
  let ans = "";

  for(let i = num.length - 1; i>=0; i--){
    ans += num.charAt(i);
  }

  document.getElementById("ex5").innerHTML = `<p>${ans}</p>`
}

// Exercise 6

class TwoSumSolver{

  constructor(nums, target){
    this.nums = nums.map(Number); 
    this.target = Number(target);
  }

  solve(){
    const map = {};

    for(let i=0; i<this.nums.length; i++){
      const complemento = this.target - this.nums[i];

      if(map.hasOwnProperty(complemento)){
        return [map[complemento], i];
      }

      map[this.nums[i]] = i;
    }

    return null;
  }

  showResult(elementId){
    const result = this.solve();
    const element = document.getElementById(elementId);

    if(result){
      element.innerHTML = `<p>Índices encontrados: ${result[0]}, ${result[1]}</p>`;
    } 
    else{
      element.innerHTML = `<p>No se encontró solución.</p>`;
    }
  }
}

let ex6 = () => {
  let x = prompt("Ingresa números diferentes separados por espacio:");
  let nums = x.trim().split(/\s+/);
  let target = prompt("Ingresa el número objetivo:");

  const solver = new TwoSumSolver(nums, target);
  solver.showResult("ex6");
}