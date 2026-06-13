export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).end();
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ error: 'chyba email' });
    const response = await fetch('https://api.ecomail.cz/lists/4/subscribe', {
          method: 'POST',
          headers: {
                  'Content-Type': 'application/json',
                  'key': '26c147e9f3d82297eec0953c679e6552fff7090595b9de49ce47c511e5b94bfe'
          },
          body: JSON.stringify({
                  subscriber_data: { email, name: name || '' },
                  resubscribe: true,
                  trigger_autoresponders: true
          })
    });
    const data = await response.json();
    return res.status(200).json(data);
}
