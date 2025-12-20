let comentarios = [
  {
    id: 1,
    username: "elvis",
    commentDate: "1 month ago",
    avatar: "./images/avatars/image-amyrobson.png",
    comment:
      "¡Impresionante! Aunque parece que la función de arrastre podría mejorarse. Pero, en general, tiene un aspecto increíble. Has acertado de pleno con el diseño y la capacidad de respuesta en varios puntos de ruptura funciona muy bien.",
    upvotes: 0,
    // NOTA: NO estamos usando esto, solo es un ejemplo para que puedan ver que dentro de objeto también pueden existir funciones
    incrementar: function () {
      this.upvotes++;
    },
    decrementar: function () {
      this.upvotes--;
    }
  },
  {
    id: 2,
    username: "maxblagun",
    commentDate: "2 weeks ago",
    avatar: "./images/avatars/image-maxblagun.png",
    comment:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    upvotes: 0,
    incrementar: function () {
      this.upvotes++;
    },
    decrementar: function () {
      this.upvotes--;
    }
  },
];