"use client";

import { useEffect, useState } from "react";

/** Barra fixa com o botão de compra no celular: aparece depois do topo e some quando a oferta está na tela. */
export default function StickyCta({ preco }: { preco: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const oferta = document.getElementById("oferta");
    let ofertaVisivel = false;
    const io = new IntersectionObserver(([e]) => {
      ofertaVisivel = e.isIntersecting;
      update();
    });
    if (oferta) io.observe(oferta);
    function update() {
      setShow(window.scrollY > 600 && !ofertaVisivel);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);
  return (
    <div className={`pm-sticky ${show ? "on" : ""}`} aria-hidden={!show}>
      <div>
        <strong>{preco}</strong>
        <span>acesso até a prova</span>
      </div>
      <a href="#oferta" className="pm-btn pm-btn-gold" tabIndex={show ? 0 : -1}>
        Quero meu acesso
      </a>
    </div>
  );
}
