export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch(e) { body = {}; } }
  const email = body && body.email;
  const name = body && body.name || '';
  if (!email) return res.status(400).json({ error: 'chyba email' });
  try {
    const response = await fetch('https://treningovyprogram.ecomailapp.cz/public/subscribe/4/f67e22c6c3dacfc9b77b6b40399abc16', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'email=' + encodeURIComponent(email) + '&name=' + encodeURIComponent(name)
    });
    const text = await response.text();
    return res.status(200).json({ status: response.status, ok: response.ok });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
