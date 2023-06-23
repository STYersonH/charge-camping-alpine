export const obtenerFechaActual = () => {
	const currentDate = new Date();
	const fecha = `${currentDate.getDate().toString().padStart(2, "0")}/${(
		currentDate.getMonth() + 1
	)
		.toString()
		.padStart(2, "0")}/${currentDate.getFullYear()}`
	return fecha;
};
  