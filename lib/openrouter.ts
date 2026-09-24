const PRIMARY_MODEL = 'google/gemini-2.5-flash-exp:free';
const BACKUP_MODEL = 'meta-llama/llama-3.1-8b-instruct:free';

export async function fetchChatCompletion(messages: { role: string; content: string }[]) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const SITE_NAME = 'One Vision';
  const API_KEY = process.env.OPENROUTER_API_KEY;

  if (!API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not defined in environment variables.');
  }

  const makeRequest = async (model: string) => {
    return fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'HTTP-Referer': SITE_URL,
        'X-Title': SITE_NAME,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
      }),
    });
  };

  let response = await makeRequest(PRIMARY_MODEL);

  if (!response.ok) {
    console.warn(`Primary model ${PRIMARY_MODEL} failed with status ${response.status}. Falling back to ${BACKUP_MODEL}...`);
    response = await makeRequest(BACKUP_MODEL);
    
    if (!response.ok) {
      throw new Error(`Backup model ${BACKUP_MODEL} also failed with status ${response.status}.`);
    }
  }

  return response.json();
}
