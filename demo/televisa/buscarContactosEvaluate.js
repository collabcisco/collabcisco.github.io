// 1. Parsear el JSON
var data = JSON.parse(rawData);

// 2. Definir lo que vamos a buscar usando tu variable dinámica
var searchName = (nombreBuscado || "").toLowerCase();

// 3. Arreglo temporal para guardar todas las coincidencias
var listaContactos = [];

// 4. Validar que exista el arreglo de resultados y que la variable no esté vacía
if (data && data.result && data.result.length > 0 && searchName !== "") {
    
    // 5. Iterar sobre los registros
    for (var i = 0; i < data.result.length; i++) {
        var contact = data.result[i];
        
        var firstNameStr = contact.firstName ? contact.firstName.toLowerCase() : "";
        var displayNameStr = contact.displayName ? contact.displayName.toLowerCase() : "";

        // Si hay coincidencia en firstName o displayName
        if (firstNameStr.indexOf(searchName) !== -1 || displayNameStr.indexOf(searchName) !== -1) {
            
            // Extraer el valor del teléfono de forma segura
            var phoneValue = "";
            if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
                phoneValue = contact.phoneNumbers[0].value || "";
            }

            // Guardar los datos solicitados en nuestro arreglo (incluyendo companyName)
            listaContactos.push({
                firstName: contact.firstName || "",
                lastName: contact.lastName || "",
                companyName: contact.companyName || "", // <-- Aquí agregamos companyName
                displayName: contact.displayName || "",
                phoneNumber: phoneValue
            });
        }
    }
}

// 6. Guardar los resultados en variables para Webex Connect
// Convertimos el arreglo a string para que Webex Connect lo pueda transportar a otros nodos
resultadoBusqueda = JSON.stringify(listaContactos);

// Variable extra muy útil para saber cuántos se encontraron (puedes usarla en un nodo Branch)
totalEncontrados = listaContactos.length;

// 7. Terminar el script
1;