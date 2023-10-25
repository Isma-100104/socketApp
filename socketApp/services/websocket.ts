// let messages = ref([]);


// if (process.client) {
//   const socket = new WebSocket('ws://localhost:3000');  

//   socket.onmessage = (event) => {
//     // Обработка входящих сообщений
//     const message = JSON.parse(event.data);
//     messages.value.push(message);
//   };

//   onMounted(() => {
//     // Открыть соединение при монтировании компонента
//     socket.onopen = () => {
//       console.log('WebSocket соединение установлено.');
//     };
//   });

//   onBeforeUnmount(() => {
//     // Закрыть соединение при уничтожении компонента
//     socket.close();
//   });
//   // Далее ваш код WebSocket
// }

// import { ref, onMounted, onBeforeUnmount } from 'vue';


// export { messages };