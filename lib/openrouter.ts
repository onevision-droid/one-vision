const PRIMARY_MODEL = 'google/gemini-2.0-flash-exp:free';
const BACKUP_MODEL = 'meta-llama/llama-3.1-8b-instruct:free';

export async function fetchChatCompletion(messages: { role: string; content: string }[]) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const SITE_NAME = 'One Vision';
  const API_KEY = process.env.OPENROUTER_API_KEY;

  if (!API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not defined in environment variables.');
  }

  const makeRequest = async (model: string) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
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
      const data = await res.json();
      clearTimeout(timeoutId);
      if (!res.ok || data.error) {
        throw new Error(data.error?.message || `HTTP ${res.status}`);
      }
      return data;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  };

  try {
    return await makeRequest(PRIMARY_MODEL);
  } catch (err) {
    console.warn(`Primary model ${PRIMARY_MODEL} failed. Falling back to ${BACKUP_MODEL}...`, err);
    return await makeRequest(BACKUP_MODEL);
  }
}
