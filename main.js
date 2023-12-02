// main.js

// ID de la carpeta en Google Drive donde se almacenarán las fotos.
const CARPETA_DRIVE_ID = '1NG5Tt9eRlMZqJW78eaXg49yJ00w3O-vf';

// Llama a esta función cuando el usuario selecciona un archivo.
function subirFotos() {
    const archivoInput = document.getElementById('archivoInput');
    
    // Maneja el evento de cambio del input de archivo.
    archivoInput.addEventListener('change', () => {
        const archivo = archivoInput.files[0];

        // Carga la API de Google Drive.
        gapi.load('client', () => {
            // Inicializa la API de Google Drive.
            gapi.client.init({
                apiKey: 'AIzaSyCjFyPkfVYHTg50kcJ_F09sX8ZCU86GwSA',  // Reemplaza con tu API Key
                clientId: '730132363205-9e5p0j5c5gslfndmvpukctfvtvp1b2o6.apps.googleusercontent.com',  // Reemplaza con tu Client ID
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                scope: 'https://www.googleapis.com/auth/drive.file',
            }).then(() => {
                // Autentica al usuario con Google Drive.
                gapi.auth2.getAuthInstance().signIn().then(() => {
                    const metadata = {
                        name: archivo.name,
                        mimeType: archivo.type,
                        parents: [CARPETA_DRIVE_ID],
                    };

                    const form = new FormData();
                    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
                    form.append('file', archivo);

                    // Ejemplo de subida de archivo.
                    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                        method: 'POST',
                        headers: new Headers({
                            Authorization: `Bearer ${gapi.auth.getToken().access_token}`,
                        }),
                        body: form,
                    }).then(response => response.json())
                    .then(data => {
                        console.log('Archivo subido con éxito:', data);

                        // Puedes agregar más lógica aquí si es necesario.

                        // Recarga la página para mostrar la nueva imagen en la galería.
                        location.reload();
                    })
                    .catch(error => {
                        console.error('Error al subir el archivo:', error);
                    });
                });
            });
        });
    });
}

// Llama a la función cuando el documento esté completamente cargado.
document.addEventListener('DOMContentLoaded', subirFotos);
