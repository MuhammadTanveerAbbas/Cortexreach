
'use server';

/**
 * @fileOverview Summarizes key insights about specific prospects for tailored outreach.
 *
 * - summarizeProspectInsights - A function that summarizes prospect insights.
 * - SummarizeProspectInsightsInput - The input type for the summarizeProspectInsights function.
 * - SummarizeProspectInsightsOutput - The return type for the summarizeProspectInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProspectInsightsInputSchema = z.object({
  prospectDetails: z
    .string()
    .describe('Detailed information about the prospect, including their background, interests, recent activities, articles they have written, or social media posts.'),
});
export type SummarizeProspectInsightsInput = z.infer<typeof SummarizeProspectInsightsInputSchema>;

const SummarizeProspectInsightsOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary paragraph of the most important, actionable insights about the prospect for a sales outreach email.'),
});
export type SummarizeProspectInsightsOutput = z.infer<typeof SummarizeProspectInsightsOutputSchema>;

export async function summarizeProspectInsights(
  input: SummarizeProspectInsightsInput
): Promise<SummarizeProspectInsightsOutput> {
  try {
    return await summarizeProspectInsightsFlow(input);
  } catch (error) {
    console.error('Error in summarizeProspectInsights flow:', error);
    throw new Error('Failed to summarize prospect insights. Please try again later.');
  }
}

const prompt = ai.definePrompt({
  name: 'summarizeProspectInsightsPrompt',
  input: {schema: SummarizeProspectInsightsInputSchema},
  output: {schema: SummarizeProspectInsightsOutputSchema},
  prompt: `You are an elite sales intelligence analyst specializing in finding the perfect conversation starters for cold outreach. Your job is to analyze prospect data and extract the single most compelling hook that will make them want to reply.

  **Prospect Details:**
  {{{prospectDetails}}}

  **Your Mission:**
  Analyze the prospect data and identify the ONE most powerful insight that can be used as an email hook. Prioritize in this order:

  1. **Recent Activity** (last 30 days): LinkedIn posts, articles published, company announcements, awards, speaking engagements
  2. **Pain Points**: Challenges they've mentioned, problems their company is facing, industry trends affecting them
  3. **Achievements**: Promotions, milestones, successful projects, company growth
  4. **Interests**: Passions mentioned in bio, causes they support, topics they engage with
  5. **Shared Connections**: Mutual contacts, similar backgrounds, shared experiences

  **Output Requirements:**
  - Write a single, concise paragraph (3-5 sentences max)
  - Focus on the most timely and relevant insight
  - Include specific details (dates, numbers, names) when available
  - Frame it as a conversation starter, not just facts
  - Make it actionable for writing a personalized email
  - **CRITICAL:** No bullet points, hyphens, or lists. Only a flowing paragraph.

  **Example Output:**
  "Sarah recently published an article on LinkedIn about the challenges of scaling marketing automation at fast-growing SaaS companies, specifically mentioning the difficulty of maintaining personalization at scale. She emphasized that her team at InnovateTech is currently evaluating new solutions for Q4 to address their 3x growth in leads. This indicates she's actively looking for tools that can help her team work more efficiently while keeping the human touch in their outreach."

  **Actionable Summary:**`,
});

const summarizeProspectInsightsFlow = ai.defineFlow(
  {
    name: 'summarizeProspectInsightsFlow',
    inputSchema: SummarizeProspectInsightsInputSchema,
    outputSchema: SummarizeProspectInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI model failed to generate a response.");
    }
    return output;
  }
);
