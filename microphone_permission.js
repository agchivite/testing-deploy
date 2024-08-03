function getLocalStream() {
    // Verifica si el elemento <audio> existe y créalo si no
    if (!window.localAudio) {
        window.localAudio = document.createElement("audio");
        window.localAudio.id = "localAudio";
        document.body.appendChild(window.localAudio);
    }

    // Solicita acceso al micrófono
    navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
            window.localStream = stream; // Guarda el stream en window.localStream
            window.localAudio.srcObject = stream; // Asigna el stream al elemento <audio>
            window.localAudio.autoplay = true; // Reproduce el audio automáticamente
        })
        .catch((err) => {
            console.error(`you got an error: ${err}`);
        });
}

getLocalStream();
