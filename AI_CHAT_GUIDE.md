# AI Chat Feature Guide

## How the AI Chat Works

The AI chat feature on the Grant's Estate Agents website provides property-specific responses based on actual property data.

### Current Implementation

1. **Property Data Integration**: The AI receives real property data including:
   - Price (sale or lease)
   - Number of bedrooms, bathrooms, car spaces
   - Property type (house, unit, etc.)
   - Suburb location
   - Land size
   - Features and description

2. **Smart Responses**: The AI generates contextual responses based on the question and property data:
   - **Price queries**: Returns actual property price with market context
   - **Room/layout queries**: Provides exact bedroom/bathroom count
   - **Area queries**: Uses the specific suburb name
   - **Investment queries**: Differentiates between sale and lease properties

### Example Responses

**Question**: "How much is this property?"
- **For Sale Property**: "This property is priced at $650,000. Based on recent sales in the area, this represents good value. Would you like information about comparable sales or market trends in Berwick?"
- **For Lease Property**: "This property is available for lease at $600 per week. This is competitive for the area. The bond requirement is typically 4 weeks rent. Would you like to know about other costs like utilities or council rates?"

**Question**: "How many bedrooms?"
- **Response**: "This house features 4 bedrooms, 2 bathrooms, and 2 car spaces. Key features include: modern kitchen, ducted heating, split system cooling. Would you like to know more about the layout or specific rooms?"

### Current Limitations

1. **Simulated Responses**: Currently uses setTimeout to simulate AI thinking (1-2 seconds delay)
2. **Pattern Matching**: Uses keyword detection rather than true AI understanding
3. **No Real AI Integration**: Responses are generated locally, not from an AI service

### To Connect Real AI

To connect to a real AI service (like OpenAI, Claude API, or custom LLM):

1. **Update the handleSendMessage function** in `src/components/AskAI.tsx`:
```typescript
const handleSendMessage = async () => {
  // Instead of setTimeout simulation:
  const response = await fetch('/api/ai-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: userMessage,
      propertyData: propertyData,
      context: messages // Previous conversation
    })
  });
  const data = await response.json();
  setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
};
```

2. **Create an API endpoint** at `src/app/api/ai-chat/route.ts`:
```typescript
export async function POST(request: Request) {
  const { message, propertyData, context } = await request.json();
  
  // Call your AI service here
  const aiResponse = await callOpenAI({
    messages: [
      { role: 'system', content: `You are a helpful real estate assistant for Grant's Estate Agents. Property details: ${JSON.stringify(propertyData)}` },
      ...context,
      { role: 'user', content: message }
    ]
  });
  
  return Response.json({ response: aiResponse });
}
```

### Property-Specific Information

The AI has access to:
- **Exact pricing**: Shows correct weekly rent for lease properties
- **Property features**: Bedrooms, bathrooms, car spaces
- **Location data**: Suburb name for local information
- **Property type**: House, unit, townhouse, etc.
- **Land size**: For investment discussions

This ensures the AI gives accurate, property-specific responses rather than generic answers.