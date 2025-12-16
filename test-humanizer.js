import 'dotenv/config';

const testText = `Additionally, it is important to note that machine learning algorithms demonstrate significant potential in various applications. Furthermore, these systems can process vast amounts of data efficiently. Moreover, the implementation of such technologies requires careful consideration of multiple factors.`;

async function testHumanizer() {
  try {
    const response = await fetch('http://localhost:3001/rewrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: testText,
        mode: 'professional'
      })
    });

    const result = await response.json();
    console.log('✅ Humanizer Result:');
    console.log('Original:', testText);
    console.log('\nHumanized:', result.data?.rewrittenText);
    console.log('\nMetrics:', result.data?.metrics);
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testHumanizer();