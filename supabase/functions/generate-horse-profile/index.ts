import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { responses, horseName, interviewType = 'full' } = await req.json();

    if (!responses || responses.length === 0) {
      throw new Error('Interview responses are required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Construct the prompt based on interview responses
    const interviewData = responses.join(' ');
    
    const systemPrompt = `You are an expert equine marketer and horse sales specialist. Based on the interview responses about a horse, generate a compelling and accurate profile that will attract the right buyers.

The horse's name is: ${horseName || 'the horse'}

Please analyze the interview responses and generate:
1. A list of 4-6 key strengths/pros
2. A list of 2-4 honest considerations/cons
3. A detailed description (2-3 paragraphs)
4. Best suited for (ideal rider/use)
5. Suggested disciplines (from: dressage, jumping, eventing, western, racing, trail, other)
6. Experience level needed (beginner, intermediate, advanced, professional)

Be honest and balanced - include both positives and areas of consideration. Focus on helping buyers understand if this horse is right for them.

Return the response as a JSON object with these exact keys:
- pros: array of strings
- cons: array of strings  
- description: string
- bestFor: array of strings
- disciplines: array of strings
- experienceLevel: string
- keyStrengths: array of strings`;

    const userPrompt = `Interview responses about the horse: ${interviewData}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    try {
      const profileData = JSON.parse(generatedContent);
      
      // Validate required fields
      const requiredFields = ['pros', 'cons', 'description', 'bestFor', 'disciplines', 'experienceLevel', 'keyStrengths'];
      for (const field of requiredFields) {
        if (!profileData[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          profile: profileData,
          metadata: {
            model: 'gpt-4o-mini',
            timestamp: new Date().toISOString(),
            tokensUsed: data.usage?.total_tokens || 0
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );

    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.log('Raw AI response:', generatedContent);
      
      // Fallback: return structured but generic response
      return new Response(
        JSON.stringify({
          success: true,
          profile: {
            pros: ['Well-trained', 'Good temperament', 'Suitable for various activities'],
            cons: ['Requires experienced handler', 'May need specific care'],
            description: generatedContent.slice(0, 500) + '...',
            bestFor: ['Intermediate riders', 'Experienced horsemen'],
            disciplines: ['trail', 'other'],
            experienceLevel: 'intermediate',
            keyStrengths: ['Responsive', 'Reliable', 'Well-mannered']
          },
          metadata: {
            model: 'gpt-4o-mini',
            timestamp: new Date().toISOString(),
            fallback: true
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

  } catch (error) {
    console.error('Error in generate-horse-profile function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});