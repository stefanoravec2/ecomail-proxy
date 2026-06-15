export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch(e) { body = {}; }
  }

  const email = body && body.email;
  const name = body && body.name || '';
  if (!email) return res.status(400).json({ error: 'chyba email' });

  try {
    const response = await fetch('https://api.ecomail.cz/lists/4/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'key': '26c147e9f3d82297eec0953c679e6552fff7090595b9de49ce47c511e5b94bfe'
      },
      body: JSON.stringify({
        subscriber_data: { email, name },
        resubscribe: true,
        trigger_autoresponders: true
      })
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
