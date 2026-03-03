// Promedios

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

// Escribir en un archivo

const fileSystem = require('fs');

let escribirString = (palabra) => {
  fileSystem.writeFileSync('holi.txt', palabra);
}

escribirString("Hola mundo desde Node");

// Problema de elección: TWO SUM

function twoSum(nums, target){
  const map = new Map();
  
  for(let i = 0; i < nums.length; i++){
    const complemento = target - nums[i];
    
    if(map.has(complemento)){
      return [map.get(complemento), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null;
}

// Prueba
const arreglo = [2, 7, 11, 15];
const target = 9;

console.log('Arreglo:', arreglo);
console.log('Target:', target);

const resultado2 = twoSum(arreglo, target);

if(resultado2){
  console.log('Índices encontrados:', resultado2);
  console.log(`${arreglo[resultado2[0]]} + ${arreglo[resultado2[1]]} = ${target}`);
} 
else{
  console.log('No se encontró solución');
}