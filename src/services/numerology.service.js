// Fase 3: algoritmos de numerología (Camino de Vida, Expresión, Alma).
// Fase 4: se agrega calcularPuntajeCompatibilidad, usada por el endpoint
// /api/v1/compatibility/check para comparar dos perfiles ya calculados.

// Sistema pitagórico: cada letra del alfabeto vale un número del 1 al 9.
const VALORES_LETRAS = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

const VOCALES = ['a', 'e', 'i', 'o', 'u'];

// Los números 11, 22 y 33 se consideran "maestros" y no se reducen a un solo dígito.
const NUMEROS_MAESTROS = [11, 22, 33];

// Quita acentos y cualquier caracter que no sea letra, para poder mapear
// cada letra a su valor numérico sin importar mayúsculas ni tildes.
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '');
}

function sumarDigitos(numero) {
  return String(numero)
    .split('')
    .reduce((acumulado, digito) => acumulado + Number(digito), 0);
}

// Reduce cualquier número a un solo dígito, salvo que sea número maestro.
function reducir(numero) {
  let resultado = numero;
  while (resultado > 9 && !NUMEROS_MAESTROS.includes(resultado)) {
    resultado = sumarDigitos(resultado);
  }
  return resultado;
}

// Camino de Vida: se calcula a partir de la fecha de nacimiento.
// Se reduce día, mes y año por separado, y luego se suma y reduce el total.
function calcularNumeroVida(fechaNacimiento) {
  const fecha = new Date(fechaNacimiento);

  if (Number.isNaN(fecha.getTime())) {
    throw new Error('Fecha de nacimiento inválida');
  }

  const dia = fecha.getUTCDate();
  const mes = fecha.getUTCMonth() + 1;
  const anio = fecha.getUTCFullYear();

  const diaReducido = reducir(sumarDigitos(dia));
  const mesReducido = reducir(sumarDigitos(mes));
  const anioReducido = reducir(sumarDigitos(anio));

  return reducir(diaReducido + mesReducido + anioReducido);
}

// Expresión (o Destino): se calcula sumando el valor de TODAS las letras
// del nombre completo (consonantes y vocales).
function calcularNumeroExpresion(nombreCompleto) {
  const letras = normalizar(nombreCompleto);

  if (!letras) {
    throw new Error('Nombre inválido para el cálculo de expresión');
  }

  const suma = letras
    .split('')
    .reduce((acumulado, letra) => acumulado + (VALORES_LETRAS[letra] || 0), 0);

  return reducir(suma);
}

// Alma (o Urgencia del Alma): igual que Expresión, pero sumando SOLO las vocales.
function calcularNumeroAlma(nombreCompleto) {
  const letras = normalizar(nombreCompleto);

  if (!letras) {
    throw new Error('Nombre inválido para el cálculo de alma');
  }

  const suma = letras
    .split('')
    .filter((letra) => VOCALES.includes(letra))
    .reduce((acumulado, letra) => acumulado + (VALORES_LETRAS[letra] || 0), 0);

  return reducir(suma);
}

// Usada por POST /numerology/calculate para obtener los 3 números en un solo paso.
function calcularPerfilCompleto(nombreCompleto, fechaNacimiento) {
  return {
    numero_vida: calcularNumeroVida(fechaNacimiento),
    numero_expresion: calcularNumeroExpresion(nombreCompleto),
    numero_alma: calcularNumeroAlma(nombreCompleto),
  };
}

// Entre más cerca estén dos números, más puntos aporta esa comparación.
// Diferencia 0 = puntaje máximo de esa categoría, diferencia >= 10 = 0 puntos.
function diferenciaANumero(a, b) {
  return Math.max(0, 40 - Math.abs(a - b) * 4);
}

// Puntaje de compatibilidad (0-100) entre dos perfiles ya calculados.
// Camino de Vida pesa más (40 puntos), Expresión y Alma pesan menos (30 c/u).
function calcularPuntajeCompatibilidad(perfilA, perfilB) {
  const puntosVida = perfilA.numero_vida === perfilB.numero_vida
    ? 40
    : diferenciaANumero(perfilA.numero_vida, perfilB.numero_vida);

  const puntosExpresion = perfilA.numero_expresion === perfilB.numero_expresion
    ? 30
    : diferenciaANumero(perfilA.numero_expresion, perfilB.numero_expresion) * 0.75;

  const puntosAlma = perfilA.numero_alma === perfilB.numero_alma
    ? 30
    : diferenciaANumero(perfilA.numero_alma, perfilB.numero_alma) * 0.75;

  const total = puntosVida + puntosExpresion + puntosAlma;

  return Math.max(0, Math.min(100, Math.round(total)));
}

module.exports = {
  calcularNumeroVida,
  calcularNumeroExpresion,
  calcularNumeroAlma,
  calcularPerfilCompleto,
  calcularPuntajeCompatibilidad,
};
