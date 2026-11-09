var EXEC = 'https://script.google.com/macros/s/AKfycbw6vElQIbY4dTt1Azn4M4fqI1byjR2br9To57a82wv-RH0VJAIsZEYE8bzwhRHwAn7L/exec';
function api(p) {
  var q = Object.keys(p).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(p[k]); }).join('&');
  return fetch(EXEC + '?' + q, { cache: 'no-store' }).then(function (r) { return r.json(); });
}
function $(id) { return document.getElementById(id); }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function guardar(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
function leer(k) { try { return sessionStorage.getItem(k) || ''; } catch (e) { return ''; } }
// Dibuja el QR en un canvas con módulos enteros y zona blanca (para que lo lean bien las cámaras).
function dibujarQR(canvas, texto, px) {
  var qr = qrcode(0, 'M'); qr.addData(texto); qr.make();
  var n = qr.getModuleCount(), quiet = 3, m = Math.max(4, Math.floor((px || 520) / (n + quiet * 2))), t = (n + quiet * 2) * m;
  canvas.width = canvas.height = t;
  var g = canvas.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, t, t); g.fillStyle = '#060b5c';
  for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (qr.isDark(r, c)) g.fillRect((c + quiet) * m, (r + quiet) * m, m, m);
  return canvas;
}
