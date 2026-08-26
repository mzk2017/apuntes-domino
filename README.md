# Apuntes Dominó 🁢

> © 2026 · Todos los derechos reservados. Prohibida su copia, venta o
> redistribución sin permiso del autor. Ver [LICENSE](LICENSE).

App web para anotar los puntos del dominó: dos equipos, meta de 100/150/200 puntos,
sonido de ganador, ¡pollona con gallina! 🐔, contador de fichas por foto e historial de partidas.

**Abrir la app:** https://mzk2017.github.io/apuntes-domino/

## Cómo se construye

- `app-src.html` — código fuente de la app (todo en un archivo)
- `sounds/` — efectos de sonido (de [Mixkit](https://mixkit.co), licencia gratuita)
- `python build.py` — incrusta los sonidos y genera `index.html` (la página final)
- `manifest.json`, `sw.js`, `icons/` — para instalarla como app (PWA)
