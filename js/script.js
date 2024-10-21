function esOperador(caracter) {
    // Función que verifica si el carácter es un operador matemático
    return ['+', '-', '*', '/'].includes(caracter);
}

function esNumeroPositivo(token) {
    // Función que verifica si el token es un número y positivo
    return !isNaN(token) && parseFloat(token) >= 0;
}

function procesarOperador(operador, pila) {
    // Función que procesa los operadores con dos operandos
    if (pila.length < 2) {
        alert("¡Notación Polaca inválida!");
        return false;
    }
    let operando2 = pila.pop();
    let operando1 = pila.pop();
    pila.push(`(${operando1} ${operador} ${operando2})`);
    return true;
}

function convertirPrefijoATradicional(tokens) {
    let pila = [];
    tokens.reverse(); // Invertir para procesar como prefijo
    for (let token of tokens) {
        if (esNumeroPositivo(token)) {
            pila.push(token);
        } else if (esOperador(token)) {
            if (!procesarOperador(token, pila)) return null;
        } else {
            alert("¡Solo se permiten números positivos!");
            return null;
        }
    }
    return pila.length === 1 ? pila.pop() : null;
}

function convertirPostfijoATradicional(tokens) {
    let pila = [];
    for (let token of tokens) {
        if (esNumeroPositivo(token)) {
            pila.push(token);
        } else if (esOperador(token)) {
            if (!procesarOperador(token, pila)) return null;
        } else {
            alert("¡Solo se permiten números positivos!");
            return null;
        }
    }
    return pila.length === 1 ? pila.pop() : null;
}

function convertir() {
    let expresionEntrada = document.getElementById('expresionEntrada').value.trim();
    let tokens = expresionEntrada.split(' ');
    let resultado = null;
    
    if (esOperador(tokens[0])) {
        // Es notación prefija
        resultado = convertirPrefijoATradicional(tokens);
    } else if (esOperador(tokens[tokens.length - 1])) {
        // Es notación postfija
        resultado = convertirPostfijoATradicional(tokens);
    } else {
        alert("¡La expresión no está en notación polaca válida!");
        return;
    }

    if (resultado !== null) {
        document.getElementById('expresionSalida').innerText = resultado;

        // Evaluar el resultado de la expresión en notación infija
        try {
            let resultadoOperacion = eval(resultado);
            document.getElementById('resultadoOperacion').innerText = resultadoOperacion;
        } catch (error) {
            alert("Error al evaluar la expresión.");
        }
    } else {
        alert("¡Notación Polaca inválida!");
    }
}
