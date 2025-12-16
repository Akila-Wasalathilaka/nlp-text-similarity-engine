const apiKey = 'FWORVJUVlsI8CNdmwfBwcciPQOWSBOF8';

async function testMistralAPI() {
  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 10
      })
    });

    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', data);
    
    if (response.ok) {
      console.log('✅ API key works!');
    } else {
      console.log('❌ API key failed');
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testMistralAPI();