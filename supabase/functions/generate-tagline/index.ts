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
    const { horseData } = await req.json();

    if (!horseData) {
      throw new Error('Horse data is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { horseName, barnName, breed, age, disciplines, price, description } = horseData;

    const systemPrompt = `You are an expert equine marketing specialist. Create compelling, concise taglines for horse sales listings that grab buyer attention and highlight the horse's unique selling points.

Generate 5 different tagline options that:
- Are 8-15 words maximum
- Highlight unique selling points
- Create emotional connection
- Use action words and vivid descriptors
- Avoid clichés and generic phrases
- Appeal to the target buyer market

Return only a JSON array of 5 tagline strings, no other text.`;

    const userPrompt = `Create taglines for this horse:
Name: ${horseName || barnName || 'Horse'}
Breed: ${breed || 'Mixed'}
Age: ${age || 'Unknown'} years old
Disciplines: ${Array.isArray(disciplines) ? disciplines.join(', ') : disciplines || 'Various'}
Price: ${price ? `$${price.toLocaleString()}` : 'Contact for price'}
Description: ${description || 'No description provided'}`;

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
        temperature: 0.8,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    try {
      const taglines = JSON.parse(generatedContent);
      
      if (!Array.isArray(taglines) || taglines.length === 0) {
        throw new Error('Invalid taglines format');
      }

      return new Response(
        JSON.stringify({
          success: true,
          taglines: taglines.slice(0, 5), // Ensure max 5 taglines
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
      
      // Fallback: provide generic taglines
      const fallbackTaglines = [
        `${horseName || 'Beautiful Horse'} - Ready for New Adventures`,
        `Exceptional ${breed || 'Horse'} - Perfect Partner Awaits`,
        `${age ? `${age}-Year-Old` : 'Stunning'} ${breed || 'Horse'} Seeking Forever Home`,
        `Dream Horse Alert - ${horseName || 'This One'} Won't Last Long`,
        `Quality ${breed || 'Horse'} - Serious Inquiries Welcome`
      ];
      
      return new Response(
        JSON.stringify({
          success: true,
          taglines: fallbackTaglines,
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
    console.error('Error in generate-tagline function:', error);
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