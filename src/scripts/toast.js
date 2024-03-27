export const toast = (mensagem, color) => {
  Toastify({
    text: mensagem,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color //"linear-gradient(to right, #00b09b, #96c93d)",
    }
  }).showToast();
}



