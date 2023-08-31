export const checkPort = (port) => {
  if (!port || !port.trim() === "") {
    console.error(
      "La variable de entorno PORT no está definida en el archivo .env o está vacía."
    );
    process.exit(1);
  }
};

export const checkUrl = (url) => {
  if (!url || !url.trim() === "") {
    console.error(
      "La variable de entorno URL no está definida en el archivo .env o está vacía."
    );
    process.exit(1);
  }
};
