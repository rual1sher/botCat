export const keyboardCat = (index: number, totalCats: number) => {
  const menu = [{ text: `${index}/${totalCats}`, callback_data: "dummy" }];

  if (index < totalCats) {
    menu.push({ text: "Вперёд 👉", callback_data: "next_cat" });
  }

  if (index > 1) {
    menu.unshift({ text: "Назад 👈", callback_data: "prev_cat" });
  }

  return {
    inline_keyboard: [menu, [{ text: "Приютить 😻", callback_data: "order" }]],
  };
};

export const keyboardOrder = (price?: string) => {
  return {
    inline_keyboard: [
      [
        {
          text: `${price} 👇`,
          web_app: { url: "https://magical-raindrop-e58e32.netlify.app/" },
        },
      ],
    ],
  };
};
