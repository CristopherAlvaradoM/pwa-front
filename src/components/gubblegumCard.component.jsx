import React from 'react';

function GubblegumCard({ src, titulo }) {
  return (
    <article className="gubblegum-card flex flex-col items-center justify-center w-[300px] h-[400px] bg-contrastPrimary rounded-lg shadow-lg p-4">
      <img src={src} alt={titulo} className="gubblegum-card__image w-full h-auto rounded-md" />
      <h3 className="gubblegum-card__title text-center mt-2 text-lg">{titulo}</h3>
    </article>
  );
}

export default GubblegumCard;
