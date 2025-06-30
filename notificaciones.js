// Array con tus juegos y horarios
const juegos = [
  { nombre: "Escape París", fechaHora: "2025-07-15T15:00:00", info: "Lugar: París, Sala A" },
  { nombre: "Escape Berlín", fechaHora: "2025-07-17T18:30:00", info: "Lugar: Berlín, Sala 3" },
  // Añade aquí todos tus juegos con fechas y horas exactas
];

// Función para pedir permiso de notificaciones
function pedirPermisoNotificaciones() {
  if ("Notification" in window) {
    if (Notification.permission === "default") {
      Notification.requestPermission().then(permiso => {
        if (permiso === "granted") {
          console.log("Permiso de notificaciones concedido");
          programarNotificaciones();
        } else {
          console.log("Permiso de notificaciones denegado");
        }
      });
    } else if (Notification.permission === "granted") {
      programarNotificaciones();
    }
  } else {
    console.log("Tu navegador no soporta notificaciones");
  }
}

// Función que lanza la notificación
function lanzarNotificacion(juego) {
  new Notification(`¡Recordatorio! Juego: ${juego.nombre}`, {
    body: `Comienza en 1 hora. ${juego.info}`,
    icon: '/imagenes/icono-192.png' // Cambia por el icono que uses en tu app
  });
}

// Función que programa las notificaciones 1 hora antes
function programarNotificaciones() {
  const ahora = new Date();

  juegos.forEach(juego => {
    const fechaJuego = new Date(juego.fechaHora);
    const diffMs = fechaJuego - ahora; // ms restantes hasta el juego
    const unaHora = 3600000; // 1 hora en ms

    // Calculamos cuando lanzar la notificación (1 hora antes del juego)
    const tiempoParaNotificar = diffMs - unaHora;

    if (tiempoParaNotificar > 0) {
      setTimeout(() => lanzarNotificacion(juego), tiempoParaNotificar);
      console.log(`Notificación programada para ${juego.nombre} en ${tiempoParaNotificar} ms`);
    }
  });
}

// Al cargar la app pedimos permiso y programamos las notificaciones
pedirPermisoNotificaciones();