# 📱 Guida Installazione Viewer 360 Pro su iPad

## 🎯 Come installare e usare offline

### Metodo 1: Aggiungi alla schermata Home (CONSIGLIATO per iPad)

1. **Apri Safari** sull'iPad
2. **Vai all'URL** dove hai caricato i file:
   - `viewer-360-perfect.html`
   - `sw.js`
   - `manifest.json`

3. **Tocca il pulsante Condividi** (icona quadrato con freccia verso l'alto)

4. **Scorri e seleziona "Aggiungi a Home"**

5. **Conferma** - l'icona apparirà sulla Home

6. **Apri l'app** dalla Home - funziona come app nativa!

### ✅ Vantaggi modalità offline:

- ✅ **Funziona senza internet** dopo la prima apertura
- ✅ **Icona sulla Home** come app nativa
- ✅ **Schermo intero** senza barra Safari
- ✅ **Avvio istantaneo**
- ✅ **Immagini salvate** nella cache del browser

---

## 📋 File necessari sul server:

Assicurati che questi 3 file siano nella STESSA cartella sul server:

```
/tua-cartella/
  ├── viewer-360-perfect.html
  ├── sw.js
  ├── manifest.json
```

---

## 🔧 Configurazione server (opzionale ma consigliato)

Se hai accesso al server, aggiungi questi header HTTP:

```
# .htaccess (Apache)
<IfModule mod_headers.c>
    Header set Cache-Control "max-age=31536000, public"
    <FilesMatch "\.(html)$">
        Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
    </FilesMatch>
</IfModule>

# Service Worker deve essere servito con MIME type corretto
<FilesMatch "sw\.js$">
    Header set Service-Worker-Allowed "/"
    Header set Content-Type "application/javascript"
</FilesMatch>
```

---

## 🧪 Test funzionalità offline:

1. Apri l'app sul Safari iPad
2. Carica un'immagine 360°
3. **Attiva la modalità aereo** sull'iPad
4. Ricarica la pagina - dovrebbe funzionare!
5. Le immagini caricate IN QUESTA SESSIONE rimangono disponibili

---

## ⚠️ Note importanti:

### Limitazioni iOS/Safari:
- **Le immagini caricate** non sono salvate permanentemente (solo cache temporanea)
- **Three.js** viene cachato e funziona offline
- **Service Worker** funziona solo su HTTPS (o localhost)

### Per salvare immagini permanentemente:
Le immagini che carichi vengono salvate nella cache del browser, ma:
- Se chiudi tutti i tab Safari, potrebbero essere eliminate
- iOS può pulire la cache quando serve spazio

### Soluzione per uso professionale:
Se vuoi che le immagini rimangano SEMPRE disponibili:
1. Carica le immagini 360° sul server insieme all'app
2. Modifica `sw.js` per cachare anche quelle immagini
3. Oppure usa IndexedDB per storage persistente

---

## 🚀 Uso quotidiano:

### Prima volta:
1. Apri con connessione internet
2. Safari carica tutto
3. Aggiungi a Home

### Ogni volta dopo:
1. Apri l'icona dalla Home
2. Funziona anche offline!
3. Carica le tue immagini 360°

---

## 🔍 Verifica installazione:

Apri Safari Developer Tools (dal Mac):
1. Safari → Preferenze → Avanzate → "Mostra menu Sviluppo"
2. Sviluppo → [Il tuo iPad] → [viewer-360-perfect.html]
3. Console: dovrebbe mostrare "✅ Service Worker registrato"

---

## 💡 Tips:

- **Funziona meglio in modalità schermo intero** (aggiungi a Home)
- **HTTPS richiesto** per Service Worker (tranne localhost)
- **Cache automatica** di Three.js per velocità
- **Nessun limite** di immagini caricabili (limitato solo da RAM)

---

## 🆘 Troubleshooting:

**"Service Worker fallito"**
→ Verifica HTTPS o usa localhost

**"App non va offline"**
→ Apri almeno una volta con internet

**"Immagini sparite"**
→ iOS ha pulito cache, ricaricale

**"Non si installa"**
→ Usa Safari (non Chrome/Firefox su iOS)

---

## 📱 Compatibilità:

✅ iPad con iOS 11.3+
✅ Safari su iOS
✅ Modalità Standalone
✅ Service Worker
✅ Giroscopio
✅ Touch controls
✅ Pinch zoom

---

Buon divertimento con il tuo Viewer 360 Pro! 🎉
