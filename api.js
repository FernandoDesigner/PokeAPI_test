// URL de la API de PokeAPI para obtener datos de los Pokémones
const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=150";

// Clase que se encarga de obtener los datos de la API de PokeAPI
class GetPokemons {
    // Método asincrónico que realiza la solicitud a la API y devuelve los resultados
    async fetchPokemons() {
        try {
            // Realiza la solicitud a la API
            const response = await fetch(API_URL);
            // Convierte la respuesta a formato JSON
            const data = await response.json();
            // Devuelve un array con los datos de los Pokémones obtenidos de la API
            return Array.isArray(data) ? data : [data];
        } catch (err) {
            // Muestra un mensaje de error en la consola en caso de fallo
            console.error('Error al obtener datos:', err);
            // Lanza el error para que sea capturado por el bloque catch del método init()
            throw err;
        }
    }
}

// Clase que se encarga de manejar la tabla y mostrar los Pokémones en ella
class TablePokemons {
    constructor(GetPokemons) {
        // Recibe una instancia de la clase GetPokemons como parámetro
        this.GetPokemons = GetPokemons;
        // Inicializa una propiedad para almacenar los Pokémones obtenidos
        this.pokemons = [];
    }

    // Método asincrónico que inicializa el proceso de obtención y muestra de los Pokémones
    async init() {
        try {
            // Obtiene los Pokémones utilizando la clase GetPokemons
            this.pokemons = await this.GetPokemons.fetchPokemons();
            // Llama al método renderTable para mostrar los Pokémones en la tabla
            this.renderTable();
        } catch (err) {
            // Muestra un mensaje de error en la consola en caso de fallo
            console.error("Error al obtener los datos de los pokemones", err);
        }
    }

    // Método que muestra los Pokémones en una tabla HTML
    renderTable() {
        // Obtiene el elemento del cuerpo de la tabla
        const tableBody = document.querySelector('#pokemons_list tbody');
        // Limpia cualquier contenido previo en la tabla
        tableBody.innerHTML = "";

        // Recorre el array de Pokémones y crea una fila para cada uno en la tabla
        this.pokemons.forEach((pokemon) => {
            // Llama al método createTableRow para crear una fila con los datos del Pokémon
            const row = this.createTableRow(pokemon);
            // Agrega la fila a la tabla
            tableBody.appendChild(row);
        });

    }

    // Método que crea una fila con los datos del Pokémon
    createTableRow(pokemon) {
        // Crea un elemento tr (fila) para la tabla
        const row = document.createElement('tr');
        // Crea un elemento img (imagen) para mostrar la imagen del Pokémon
        const imagen = document.createElement('img');
        // Asigna la URL de la imagen a la propiedad src del elemento img
        imagen.src = pokemon.front_default;

        // Crea un elemento td (celda) para mostrar el nombre del Pokémon
        const nombrePkm = document.createElement('td');
        // Asigna el nombre del Pokémon como contenido del elemento td
        nombrePkm.textContent = pokemon.name;

        // Crea un elemento td (celda) para mostrar la imagen del Pokémon
        const imgpkm = document.createElement('td');
        // Agrega la imagen del Pokémon al elemento td
        imgpkm.appendChild(imagen);

        // Agrega las celdas creadas a la fila de la tabla
        row.appendChild(nombrePkm);
        row.appendChild(imgpkm);

        // Devuelve la fila creada
        return row;
    }
}

// Cuando el DOM esté completamente cargado, se ejecuta la función anónima
document.addEventListener('DOMContentLoaded', () => {
    // Crea una instancia de la clase GetPokemons
    const getPokemons = new GetPokemons();
    // Crea una instancia de la clase TablePokemons, pasando la instancia de GetPokemons como parámetro
    const tablePokemons = new TablePokemons(getPokemons);
    // Inicializa el proceso para obtener y mostrar los Pokémones
    tablePokemons.init();
});
