<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

let messages = ref([]);
let socket = null;

const connectWebSocket = () => {
  return new Promise((resolve, reject) => {
    const currentProtocol = window.location.protocol;
    const useSecureWebSocket = currentProtocol === 'https:';

    // Используем "ws" для HTTP и "wss" для HTTPS
    const socketProtocol = useSecureWebSocket ? 'wss' : 'ws';
    const socketUrl = `${socketProtocol}://localhost:3000/`;

    socket = new WebSocket(socketUrl);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      messages.value.push(message);
    };

    socket.onopen = () => {

      console.log('WebSocket соединение установлено.');
      resolve(socket);
    };

    socket.onclose = () => {
      console.log('WebSocket соединение закрыто.');
      // Если нужно, можно здесь обработать закрытие WebSocket соединения
    };

    socket.onerror = (error) => {
      console.error('Ошибка WebSocket соединения:', error);
      reject(error);
    };
  });
};

onMounted(async () => {
  try {
    const socket = await connectWebSocket();
    // Здесь можно выполнять дополнительные действия с socket
  } catch (error) {
    console.error('Ошибка при установке WebSocket соединения:', error);
  }
});

onBeforeUnmount(() => {
  if (socket) {
    // Закрыть соединение при уничтожении компонента
    socket.close();
  }
});
</script>

<template>
  <div>
    <h1>Hello</h1>
    <div v-for="message in messages" :key="message.id">{{ message.text }}</div>
  </div>
</template>
