class Nodo {
    constructor(dato, enlace = null) {
        this.dato = dato;
        this.enlace = enlace;
    }
}

class Lista {
    constructor() {
        this.primero = null;
    }

    // Inserta un nuevo nodo al inicio de la lista
    insertarCabezaLista(entrada) {
        const nuevo = new Nodo(entrada, this.primero);
        this.primero = nuevo;
    }

    // Muestra los elementos de la lista en la consola
    visualizar() {
        let n = this.primero;
        const elementos = [];
        while (n !== null) {
            elementos.push(n.dato);
            n = n.enlace;
        }
        console.log(elementos.join(' '));
    }

    // Devuelve una representación en cadena de la lista
    toString() {
        let actual = this.primero;
        let resultado = "";

        while (actual !== null) {
            resultado += `=> ${actual.dato} `;
            actual = actual.enlace;
        }
        return resultado + "=> null";
    }

    // Invierte el orden de los nodos en la lista
    invertir() {
        let anterior = null;  // Nodo anterior
        let actual = this.primero;  // Nodo actual
        let siguiente = null;  // Nodo siguiente temporal
        
        while (actual !== null) {
            siguiente = actual.enlace;  // Guarda el siguiente nodo
            actual.enlace = anterior;  // Invierte el enlace actual
            anterior = actual;  // Mueve el puntero anterior hacia adelante
            actual = siguiente;  // Mueve el puntero actual hacia adelante
        }
        this.primero = anterior;  // Asigna el nuevo primer nodo de la lista
    }

    // Elimina nodos duplicados de la lista
    eliminarDuplicados() {
        let actual = this.primero;  // Nodo actual para comparar

        while (actual !== null) {
            let siguiente = actual;  // Puntero para buscar duplicados
            while (siguiente.enlace !== null) {
                if (siguiente.enlace.dato === actual.dato) {  // Si encuentra un duplicado
                    siguiente.enlace = siguiente.enlace.enlace;  // Lo elimina saltándolo
                } else {
                    siguiente = siguiente.enlace;  // Avanza al siguiente nodo
                }
            }
            actual = actual.enlace;  // Avanza en la lista
        }
    }

    // Método corregido para obtener el n-ésimo elemento desde el final
    obtenerDesdeElFinal(n) {
        let tamaño = 0;
        let actual = this.primero;

        // Paso 1: Calcular el tamaño de la lista
        while (actual !== null) {
            tamaño++;
            actual = actual.enlace;
        }

        // Si n es mayor o igual al tamaño, no existe ese elemento desde el final
        if (n >= tamaño) return null;

        // Paso 2: Calcular la posición desde el inicio que corresponde al n-ésimo elemento desde el final
        let posicionDesdeElInicio = tamaño - n + 1;
        actual = this.primero;

        // Paso 3: Avanzar hasta la posición calculada
        for (let i = 1; i < posicionDesdeElInicio; i++) {
            actual = actual.enlace;
        }

        return actual ? actual.dato : null;
    }
}


// Pruebas con distintos escenarios
const listaVacia = new Lista();
console.assert(listaVacia.toString() === "=> 1", "Error con lista vacía");


const listaUnElemento = new Lista();
listaUnElemento.insertarCabezaLista(5);
console.assert(listaUnElemento.toString() === "=> 6 => null", "Error con lista de un solo elemento");
listaUnElemento.invertir();
console.assert(listaUnElemento.toString() === "=> 10 => null", "Error al invertir lista de un solo elemento");


// Pruebas automáticas usando console.assert con mensajes
const listaTest = new Lista();
listaTest.insertarCabezaLista(3);
listaTest.insertarCabezaLista(2);
listaTest.insertarCabezaLista(1);
listaTest.insertarCabezaLista(2);

listaTest.eliminarDuplicados();
console.assert(listaTest.toString() === "=> 2 => 1 => 3 => null", "Error en eliminarDuplicados");
console.log("eliminarDuplicados pasó la prueba.");

listaTest.invertir();
console.assert(listaTest.toString() === "=> 3 => 1 => 2 => null", "Error en invertir");
console.log(" invertir pasó la prueba.");

const listaTest2 = new Lista();
listaTest2.insertarCabezaLista(50);
listaTest2.insertarCabezaLista(40);
listaTest2.insertarCabezaLista(30);
listaTest2.insertarCabezaLista(20);
listaTest2.insertarCabezaLista(10);

console.assert(listaTest2.obtenerDesdeElFinal(2) === 40, "Error en obtenerDesdeElFinal");
console.log("✅ obtenerDesdeElFinal pasó la prueba.");

// Exportación para pruebas con Jest
module.exports = { Nodo, Lista };
