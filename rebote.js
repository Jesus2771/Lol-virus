// Definir el array para almacenar los mensajes
var mensajes = [];
var rebotesEsquina = 0; // Contador para los rebotes contra las esquinas
var velocidadBase = 10;  // Velocidad inicial de los mensajes

// Funci��n para generar un color aleatorio
function obtenerColorAleatorio() {
    var colores = ["#FF5733", "#33FF57", "#3357FF", "#F033FF", "#33FFF6", "#F1C40F"];
    return colores[Math.floor(Math.random() * colores.length)];
}

// Funci��n para crear un nuevo mensaje
function crearMensaje() {
    var mensaje = document.createElement("div");
    mensaje.className = "mensaje";
    mensaje.innerText = "Virus Detectado";  // El mensaje ahora es "Virus Detectado"
    mensaje.style.position = "absolute";
    mensaje.style.fontSize = "20px";
    mensaje.style.color = obtenerColorAleatorio();  // Color aleatorio para cada mensaje
    mensaje.style.backgroundColor = "black";
    mensaje.style.padding = "10px";
    mensaje.style.borderRadius = "5px";
    mensaje.style.transition = "all 0.1s"; // Transici��n r��pida para los cambios visuales
    document.body.appendChild(mensaje);

    // Establecer posici��n y direcci��n inicial
    mensaje.posX = 0;
    mensaje.posY = 100;
    mensaje.velocidad = velocidadBase; // Asignar la velocidad actual
    mensaje.direccionX = 1; // Direcci��n en X (1 es hacia la derecha, -1 hacia la izquierda)
    mensaje.direccionY = 1; // Direcci��n en Y (1 es hacia abajo, -1 hacia arriba)

    mensajes.push(mensaje);
}

// Crear un mensaje inicial
crearMensaje();

// Funci��n para mostrar la pantalla azul falsa
function mostrarPantallaAzul() {
    var pantallaAzul = document.createElement("div");
    pantallaAzul.style.position = "absolute";
    pantallaAzul.style.top = "0";
    pantallaAzul.style.left = "0";
    pantallaAzul.style.width = "100%";
    pantallaAzul.style.height = "100%";
    pantallaAzul.style.backgroundColor = "#0000A0"; // Azul oscuro
    pantallaAzul.style.color = "white";
    pantallaAzul.style.fontSize = "30px";
    pantallaAzul.style.display = "flex";
    pantallaAzul.style.justifyContent = "center";
    pantallaAzul.style.alignItems = "center";
    pantallaAzul.style.zIndex = "9999";
    pantallaAzul.innerHTML = "<b>ERROR: Virus detectado</b><br/>Tu computadora ha encontrado un problema y necesita reiniciarse.";

    document.body.appendChild(pantallaAzul);

    // Detener el movimiento de los mensajes al mostrar la pantalla azul
    clearInterval(movimientoMensajes);
}

// Funci��n para mover los mensajes
function moverMensajes() {
    for (var i = 0; i < mensajes.length; i++) {
        var mensaje = mensajes[i];
        var posX = mensaje.posX;
        var posY = mensaje.posY;
        var maxX = window.innerWidth - mensaje.offsetWidth;  // Ancho m��ximo de la ventana
        var maxY = window.innerHeight - mensaje.offsetHeight;  // Altura m��xima de la ventana

        // Si el mensaje llega a la esquina derecha o izquierda, cambia la direcci��n
        if (posX >= maxX || posX <= 0) {
            mensaje.direccionX *= -1;  // Cambia la direcci��n en X
            // Duplicar el mensaje al golpear la esquina
            if (mensaje.direccionX === 1) {
                crearMensaje();  // Duplicar mensaje cuando golpea la esquina izquierda
                rebotesEsquina++; // Aumentar contador de rebotes
            }
            // Cambiar el color aleatoriamente al rebotar
            mensaje.style.color = obtenerColorAleatorio();
        }

        // Si el mensaje llega a la parte superior o inferior, cambia la direcci��n
        if (posY >= maxY || posY <= 0) {
            mensaje.direccionY *= -1;  // Cambia la direcci��n en Y
            // Duplicar el mensaje al golpear la esquina
            if (mensaje.direccionY === 1) {
                crearMensaje();  // Duplicar mensaje cuando golpea la parte superior
                rebotesEsquina++; // Aumentar contador de rebotes
            }
            // Cambiar el color aleatoriamente al rebotar
            mensaje.style.color = obtenerColorAleatorio();
        }

        // Si hay m��s de 5 rebotes en las esquinas, muestra la pantalla azul falsa
        if (rebotesEsquina > 5) {
            mostrarPantallaAzul();
            return; // Detener la ejecuci��n de m��s movimientos
        }

        // Mover el mensaje
        mensaje.posX += mensaje.velocidad * mensaje.direccionX;
        mensaje.posY += mensaje.velocidad * mensaje.direccionY;

        // Actualizar la posici��n del mensaje en el DOM
        mensaje.style.left = mensaje.posX + 'px';
        mensaje.style.top = mensaje.posY + 'px';
    }
}

// Llamar a la funci��n moverMensajes cada 10 milisegundos para actualizar la posici��n
var movimientoMensajes = setInterval(moverMensajes, 10);

// Aumentar la velocidad de los mensajes al hacer clic en la p��gina
document.body.addEventListener('click', function() {
    velocidadBase += 2;  // Aumentar la velocidad en 2 unidades por cada clic
    // Cambiar la velocidad de los mensajes existentes
    for (var i = 0; i < mensajes.length; i++) {
        mensajes[i].velocidad = velocidadBase;
    }
});
