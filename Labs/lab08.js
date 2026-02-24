let calcularPromedio = (nums) => {
  let sum = 0;
  for(let i=0; i<nums.length; i++){
    sum += nums[i];
  }
  const promedio = sum / nums.length;
  return promedio;
}

const resultado = calcularPromedio([10, 20, 30]);
console.log("Resultado:", resultado);

const fileSystem = require('fs');

let escribirString = (palabra) => {
  fileSystem.writeFileSync('holi.txt', palabra);
}

escribirString("Hola mundo desde Node");