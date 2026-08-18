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
const NUMEROS_MAESTROS = [11, 22, 33];

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

function reducir(numero) {
  let resultado = numero;
  while (resultado > 9 && !NUMEROS_MAESTROS.includes(resultado)) {
    resultado = sumarDigitos(resultado);
  }
  return resultado;
}

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

function calcularPerfilCompleto(nombreCompleto, fechaNacimiento) {
  return {
    numero_vida: calcularNumeroVida(fechaNacimiento),
    numero_expresion: calcularNumeroExpresion(nombreCompleto),
    numero_alma: calcularNumeroAlma(nombreCompleto),
  };
}

module.exports = {
  calcularNumeroVida,
  calcularNumeroExpresion,
  calcularNumeroAlma,
  calcularPerfilCompleto,
};
