"""Construye la app a partir de app-src.html:
  - dist/app.html  -> version para publicar como Artifact (solo contenido, audio en base64)
  - index.html     -> documento completo para abrir localmente o alojar como PWA
Uso: python build.py
"""
import base64, pathlib

ROOT = pathlib.Path(__file__).parent
SND = ROOT / "sounds"

def data_uri(path, mime="audio/mpeg"):
    b64 = base64.b64encode(path.read_bytes()).decode()
    return f"data:{mime};base64,{b64}"

src = (ROOT / "app-src.html").read_text(encoding="utf-8")
src = src.replace("%%FANFARE%%", data_uri(SND / "fanfare.mp3"))
src = src.replace("%%APPLAUSE%%", data_uri(SND / "applause.mp3"))
src = src.replace("%%QR%%", data_uri(ROOT / "qr.png", "image/png"))

dist = ROOT / "dist"
dist.mkdir(exist_ok=True)
(dist / "app.html").write_text(src, encoding="utf-8")

full = f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#17402E">
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icons/icon-180.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
</head>
<body>
{src}
<script>
if ('serviceWorker' in navigator && location.protocol === 'https:') {{
  navigator.serviceWorker.register('sw.js');
}}
</script>
<script data-goatcounter="https://apuntesdomino.goatcounter.com/count" async src="count.js"></script>
</body>
</html>
"""
(ROOT / "index.html").write_text(full, encoding="utf-8")
print("OK: dist/app.html e index.html generados")
