
'use server';

/**
 * @fileOverview An AI agent for rating the effectiveness of an email.
 *
 * - rateEmailEffectiveness - A function that rates the effectiveness of an email.
 * - RateEmailEffectivenessInput - The input type for the rateEmailEffectiveness function.
 * - RateEmailEffectivenessOutput - The return type for the rateEmailEffectiveness function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RateEmailEffectivenessInputSchema = z.object({
  emailContent: z.string().describe('The content of the email to be rated, including subject and body.'),
  targetAudience: z.string().describe('The job title or role of the target audience for the email.'),
  goal: z.string().describe('The primary goal of the email (e.g., to get a reply, to schedule a meeting, to drive a click).'),
});
export type RateEmailEffectivenessInput = z.infer<typeof RateEmailEffectivenessInputSchema>;

const RateEmailEffectivenessOutputSchema = z.object({
  effectivenessScore: z.number().describe('A score from 0 to 100 representing the predicted effectiveness of the email, where 100 is perfect.'),
  engagementPredictions: z.object({
    openRate: z.number().describe('The predicted open rate of the email (as a percentage, e.g., 45.5 for 45.5%).'),
    clickThroughRate: z.number().describe('The predicted click through rate of the email (as a percentage).'),
    conversionRate: z.number().describe('The predicted conversion rate of the email (as a percentage, based on the stated goal).'),
  }).describe('Predictions of key engagement metrics for the email.'),
  suggestions: z.array(z.string()).describe('A list of specific, actionable suggestions for improving the email, phrased as clear instructions.'),
});
export type RateEmailEffectivenessOutput = z.infer<typeof RateEmailEffectivenessOutputSchema>;

export async function rateEmailEffectiveness(input: RateEmailEffectivenessInput): Promise<RateEmailEffectivenessOutput> {
  try {
    return await rateEmailEffectivenessFlow(input);
  } catch (error) {
    console.error('Error in rateEmailEffectiveness flow:', error);
    throw new Error('Failed to rate email effectiveness. Please try again later.');
  }
}

const prompt = ai.definePrompt({
  name: 'rateEmailEffectivenessPrompt',
  input: {schema: RateEmailEffectivenessInputSchema},
  output: {schema: RateEmailEffectivenessOutputSchema},
  prompt: `You are an elite email performance analyst with 10+ years of experience optimizing cold outreach campaigns. You've analyzed over 100,000 emails and know exactly what drives replies. Provide a brutally honest, data-driven assessment of this email.

  **Email Content to Analyze:**
  {{{emailContent}}}

  **Target Audience:** {{{targetAudience}}}
  **Primary Goal:** {{{goal}}}

  **Evaluation Criteria:**

  1.  **Effectiveness Score (0-100):**
      - Score based on proven cold email best practices
      - Consider: personalization depth, value clarity, CTA strength, length, tone
      - Be harsh but fair: 90+ is exceptional, 70-89 is good, 50-69 needs work, below 50 is poor
      - Scoring factors:
        * Subject line: curiosity + relevance (20 points)
        * Opening hook: personalization + engagement (25 points)
        * Value proposition: clarity + relevance (25 points)
        * CTA: low-friction + compelling (20 points)
        * Overall: length, tone, readability (10 points)

  2.  **Engagement Predictions (%):**
      - **Open Rate:** Based on subject line quality, sender reputation, and timing
        * Excellent subject (personalized, curious): 45-60%
        * Good subject (relevant, clear): 30-45%
        * Average subject (generic): 15-30%
        * Poor subject (salesy, boring): 5-15%
      
      - **Click Through Rate:** Based on CTA clarity and email engagement
        * Strong CTA with engaged reader: 15-25%
        * Decent CTA: 8-15%
        * Weak CTA: 2-8%
      
      - **Conversion Rate (Reply Rate):** Based on overall email quality
        * Exceptional personalization + value: 12-20%
        * Good personalization: 6-12%
        * Average: 2-6%
        * Poor: 0-2%

  3.  **Actionable Improvement Suggestions:**
      - Provide exactly 3-5 specific, high-impact improvements
      - Each suggestion must be one clear sentence
      - Prioritize changes that will have the biggest impact on reply rates
      - Be direct and prescriptive: "Change X to Y" or "Add Z to improve A"
      - Focus on: personalization gaps, value clarity, CTA optimization, length reduction
      - Examples:
        * "Replace the generic opening with a specific reference to their recent LinkedIn post about [topic]"
        * "Shorten the email from 150 words to 80 words by removing the second paragraph"
        * "Change the CTA from asking for a meeting to asking a thought-provoking question about their priorities"

  **Critical Analysis Rules:**
  - Be honest: if it's bad, say it's bad and explain why
  - Use real benchmarks from successful cold email campaigns
  - Consider the target audience's likely inbox behavior
  - Assume they receive 100+ emails per day
  - **CRITICAL:** Write suggestions as clear, direct sentences. No bullet formatting in the output.

  Provide your expert assessment now.
`,
});

const rateEmailEffectivenessFlow = ai.defineFlow(
  {
    name: 'rateEmailEffectivenessFlow',
    inputSchema: RateEmailEffectivenessInputSchema,
    outputSchema: RateEmailEffectivenessOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI model failed to generate a response.");
    }
    return output;
  }
);
