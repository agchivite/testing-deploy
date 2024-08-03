// Asegúrate de que el script se cargue correctamente
window.addEventListener("load", () => {
    const ws = new WebSocket("ws://wewiza.ddns.net:8089/ws/room"); // Cambia la URL si es necesario

    ws.onopen = () => {
        console.log("WebSocket connection established");
    };

    ws.onmessage = (message) => {
        console.log("Message from server", message.data);
    };

    ws.onerror = (error) => {
        console.error("WebSocket error", error);
    };

    ws.onclose = () => {
        console.log("WebSocket connection closed");
    };

    // Obtener el flujo de audio del micrófono
    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = function (event) {
                if (event.data.size > 0) {
                    const reader = new FileReader();
                    reader.onload = function () {
                        ws.send(reader.result); // Envía datos a través de WebSocket
                    };
                    reader.readAsArrayBuffer(event.data);
                }
            };

            mediaRecorder.start(100); // Graba en fragmentos de 100 ms
        })
        .catch((err) => {
            console.error("Failed to get user media", err);
        });
});
