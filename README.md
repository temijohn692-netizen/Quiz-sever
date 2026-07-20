# Quiz Server

Runs on your phone via Termux. Test-takers open a link in their own
browser (no install needed on their end) to take the quiz. Their answers
are scored automatically and saved on your phone, and you'll see each
submission printed live in Termux as it happens.

## Setup (one-time, in Termux)

1. Get this folder onto your phone (see "Getting the files onto your
   phone" below), then move into it:
   ```
   cd quiz-server
   ```

2. Install the one dependency:
   ```
   npm install
   ```

## Running it

```
node server.js
```

You'll see something like:
```
Quiz server running.
On this phone: http://localhost:3000
On the same WiFi, others can use your phone's local IP, e.g. http://<your-phone-ip>:3000
```

- **To test it yourself first**, open `http://localhost:3000` in your
  phone's browser.
- **To let someone else on the same WiFi take it**, find your phone's
  local IP address (Settings > About phone > Status, or run `ifconfig`
  in Termux) and send them `http://<that-ip>:3000`.
- **To reach someone NOT on your WiFi** (different network entirely),
  your phone needs to be reachable from the internet, which it isn't by
  default — you'd need a tunnel tool (like ngrok or Cloudflare Tunnel).
  Ask me and I'll walk you through that separately once this local
  version is working.

Keep Termux running (don't force-close the app) while people are taking
the quiz — the server stops if Termux is killed.

## Checking results

Open `http://localhost:3000/results` in your own phone's browser at
any time to see everyone's scores, most recent first. Results are also
saved permanently to `results.json` in this folder.

## Editing the questions

Open `quiz-data.js` and edit the list — each question needs `text`, an
`options` array of exactly 4 choices, and `correctIndex` (0 = first
option, 1 = second, etc.).

## Getting the files onto your phone

Easiest way: download the zip through your phone's browser (wherever
you're receiving this from), then in Termux run:
```
termux-setup-storage
```
(grant the permission it asks for), then:
```
cd storage/downloads
unzip quiz-server.zip
cd quiz-server
```
If `unzip` isn't found, install it first: `pkg install unzip`
