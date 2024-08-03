window.requestMicrophonePermission = async function () {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        console.log("Microphone access granted");
    } catch (err) {
        console.error("Microphone access denied", err);
    }
};
