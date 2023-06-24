
export const obtenerFechaActual = () => {
  const currentDate = new Date();
  const fecha = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${currentDate.getDate().toString().padStart(2, "0")}`;
  return fecha;
};

export const formatearFecha = (fecha) => {
	const date = new Date(fecha);
	const dia = date.getDate().toString().padStart(2, "0");
	const mes = (date.getMonth() + 1).toString().padStart(2, "0");
	const anio = date.getFullYear();

	console.log("fecha", fecha, "-> ", `${dia}/${mes}/${anio}`);
	return `${dia}/${mes}/${anio}`;
};

export const obtenerHoraActual = () => {
	const hora = new Date();
	const opciones = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
	const horaFormateada = hora.toLocaleTimeString(undefined, opciones);
	return horaFormateada;
}

console.log(obtenerHoraActual());