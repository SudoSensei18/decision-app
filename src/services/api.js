const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

function callApi(prompt) {
  return fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "https://decision-app-iota.vercel.app/",
      "Content-Type": "application/json",
      "X-Title": "decision-app"
    },
    body: JSON.stringify({
      "model": "xiaomi/mimo-v2-flash:free",
      "messages": [
        {
          "role": "user",
          "content": prompt
        }
      ]
    })
  });
}

export async function generateRecommendations(decisionPayload) {
  console.log('Building prompt with payload:', decisionPayload);
  const prompt = buildPrompt(decisionPayload);
  console.log('Prompt:', prompt);
  
  console.log('Calling OpenRouter API...');
  const response = await callApi(prompt);
  
  console.log('Response status:', response.status);
  
  // Check if request was successful
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API Error Response:', errorData);
    
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a few minutes and try again, or consider using a paid model.');
    }
    
    throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
  }
  
  const data = await response.json();
  console.log('Full API Response:', data);
  
  // Check if response has the expected structure
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error('Unexpected response structure:', data);
    throw new Error('Received an unexpected response format from the API');
  }
  
  const aiResponse = data.choices[0].message.content;
  console.log('AI Response Content:', aiResponse);
  
  return parseAIResponse(aiResponse, decisionPayload);
}

function buildPrompt(payload) {
  const { category, customCategory, factors, customFactors, options, textfield } = payload;
  const categoryText = category === 'other' ? customCategory : category;
  const allFactors = [...(factors || []), ...(customFactors || [])].filter(Boolean);
  
  return `You are a decision-making assistant. A user needs help making a decision in the following category: "${categoryText}".

**Key Factors the user cares about:**
${allFactors.length > 0 ? allFactors.map(f => `- ${f}`).join('\n') : '- General decision quality'}

${options && options.length > 0 ? `**Options they're considering:**
${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}
` : ''}

${textfield ? `**Additional Context:**
${textfield}
` : ''}

Please provide 3 different recommendation options. For each recommendation:
1. Give it a clear title
2. Provide a brief description (2-3 sentences)
3. Assign a score out of 100
4. List 3-4 pros
5. List 2-3 cons

Also provide 3-4 key insights.

CRITICAL: Respond ONLY with valid JSON in this exact structure (no markdown, no code blocks):
{
  "recommendations": [
    {
      "title": "string",
      "description": "string",
      "score": number,
      "pros": ["string"],
      "cons": ["string"]
    }
  ],
  "insights": ["string"]
}`;
}

function parseAIResponse(responseText, payload) {
  try {
    let jsonText = responseText.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    // Try to find JSON object if there's extra text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }

    const parsed = JSON.parse(jsonText);

    // Validate structure
    if (!parsed.recommendations || !Array.isArray(parsed.recommendations)) {
      throw new Error('Response missing recommendations array');
    }

    // Add IDs and ensure all fields exist
    parsed.recommendations = parsed.recommendations.map((rec, index) => ({
      id: index + 1,
      title: rec.title || `Recommendation ${index + 1}`,
      description: rec.description || 'No description provided',
      score: Math.min(100, Math.max(0, rec.score || 75)),
      pros: Array.isArray(rec.pros) ? rec.pros : ['No pros listed'],
      cons: Array.isArray(rec.cons) ? rec.cons : ['No cons listed']
    }));

    // Ensure insights exist
    parsed.insights = Array.isArray(parsed.insights) ? parsed.insights : ['No insights provided'];

    return parsed;

  } catch (error) {
    console.error('Failed to parse AI response:', error);
    console.log('Raw response that failed:', responseText);
    
    // Return fallback data
    return {
      recommendations: [
        {
          id: 1,
          title: 'Unable to Parse Response',
          description: 'The AI generated a response, but we had trouble understanding its format. Please try again with more specific inputs.',
          score: 50,
          pros: ['AI responded to your request', 'You can try again'],
          cons: ['Response format was unclear', 'May need to adjust your inputs']
        }
      ],
      insights: [
        'The AI had trouble formatting its response correctly.',
        'Try providing more specific details about your decision.',
        'You can click "Refine Decision" to try again.'
      ]
    };
  }
}