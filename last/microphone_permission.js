let ws;

function connectWebSocket(roomId) {
    ws = new WebSocket(`ws://wewiza.ddns.net:8089/ws/${roomId}`);

    ws.onopen = function () {
        console.log("WebSocket is open.");
    };

    ws.onmessage = function (event) {
        console.log("Message from server: ", event.data);
    };

    ws.onclose = function (event) {
        console.log("WebSocket is closed. Reconnecting...", event.reason);
        setTimeout(() => connectWebSocket(roomId), 5000); // Reconnect after 5 seconds
    };

    ws.onerror = function (error) {
        console.error("WebSocket Error: ", error);
    };
}

function handleData(data) {
    const reader = new FileReader();

    reader.onload = function () {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(reader.result); // Send data through WebSocket
        } else {
            console.warn("WebSocket is not open. Ready state:", ws.readyState);
        }
    };

    reader.readAsArrayBuffer(data); // Read data as ArrayBuffer
}

// Esta función se llamará después de generar la sala
function onRoomGenerated(roomId) {
    connectWebSocket(roomId);
}
