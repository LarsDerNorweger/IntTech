/*------------------------------------------------
/*  BA-Glauchau Beleg Internettechnologien
/*
/*  Autoren: Colin Böttger
/*------------------------------------------------*/

export { Vektor };

export type vektor = number[];

class Vektor {
  static create(...args: number[]): vektor {
    return new Array(...args);
  }

  static scale(vector: vektor, scale: number) { return vector.map(x => x / scale) }

  static add(vector1: vektor, vector2: vektor) {
    if (vector1.length != vector2.length)
      throw Error("dimensions are not Equal");
    return vector1.map((v, i) => v + vector2[i]);
  }
  static subtract(vector1: vektor, vector2: vektor) {
    if (vector1.length != vector2.length)
      throw Error("dimensions are not Equal");
    return vector1.map((v, i) => v - vector2[i]);
  }
  static lenght(vector1: vektor) {
    return Math.sqrt(vector1.reduce((p, v) => p + v));
  }
}