
'use server';

/**
 * @fileOverview Generates personalized cold emails using AI.
 *
 * - generatePersonalizedEmails - A function that generates personalized cold emails.
 * - GeneratePersonalizedEmailsInput - The input type for the generatePersonalizedEmails function.
 * - GeneratePersonalizedEmailsOutput - The return type for the generatePersonalizedEmails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedEmailsInputSchema = z.object({
  prospectName: z.string().describe('The name of the prospect.'),
  prospectCompany: z.string().describe('The company of the prospect.'),
  prospectJobTitle: z.string().describe('The job title of the prospect.'),
  emailContext: z.string().describe('Information about the prospect to personalize the email.'),
});
export type GeneratePersonalizedEmailsInput = z.infer<
  typeof GeneratePersonalizedEmailsInputSchema
>;

const GeneratePersonalizedEmailsOutputSchema = z.object({
  subjectLine: z.string().describe('The subject line of the email.'),
  body: z.string().describe('The body of the email.'),
});
export type GeneratePersonalizedEmailsOutput = z.infer<
  typeof GeneratePersonalizedEmailsOutputSchema
>;

export async function generatePersonalizedEmails(
  input: GeneratePersonalizedEmailsInput
): Promise<GeneratePersonalizedEmailsOutput> {
  try {
    return await generatePersonalizedEmailsFlow(input);
  } catch (error) {
    console.error('Error in generatePersonalizedEmails flow:', error);
    // Return a structured error or re-throw a custom error
    throw new Error('Failed to generate personalized email. Please try again later.');
  }
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedEmailsPrompt',
  input: {schema: GeneratePersonalizedEmailsInputSchema},
  output: {schema: GeneratePersonalizedEmailsOutputSchema},
  prompt: `You are an elite cold email copywriter with a proven track record of 15%+ reply rates. Your emails are known for being authentic, conversational, and impossible to ignore. Write a compelling, hyper-personalized email that feels like it's from a trusted colleague, not a salesperson.

  **Prospect Information:**
  - **Name:** {{{prospectName}}}
  - **Company:** {{{prospectCompany}}}
  - **Job Title:** {{{prospectJobTitle}}}
  - **Context/Talking Points:** {{#if emailContext}}{{{emailContext}}}{{else}}No additional context provided.{{/if}}

  **Critical Rules:**

  1.  **Subject Line:**
      - Create a curiosity-driven subject line that feels personal and non-salesy
      - Use pattern interrupts: reference something specific about them or their company
      - Keep it under 50 characters
      - Examples: "Noticed your post on [topic]", "Quick thought on [their initiative]", "[Their company] + [your solution]?"
      - NO generic phrases like "Quick question", "Following up", "Reaching out"
      - Capitalize first letter only

  2.  **Opening (First Sentence):**
      - Hook them immediately with a specific observation or compliment
      - Reference something recent and relevant: their LinkedIn post, company news, article they wrote, or achievement
      - Make it about THEM, not you
      - Example: "Saw your recent post about [topic] - the point about [specific detail] really resonated with me."

  3.  **Body (2-3 Short Paragraphs):**
      - **Paragraph 1:** Expand on your opening with genuine insight or a relevant observation about their challenge
      - **Paragraph 2:** Introduce your value proposition naturally, connecting it directly to their specific pain point or goal. Use "you" language, not "we" language
      - **Paragraph 3:** Soft CTA that invites conversation, not commitment

  4.  **Value Proposition:**
      - Focus on the outcome they care about, not your product features
      - Be specific: use numbers, timeframes, or concrete results when possible
      - Frame it as helping them solve a problem they actually have
      - Example: "Most {{{prospectJobTitle}}}s at companies like {{{prospectCompany}}} struggle with [specific challenge]. We've helped similar teams reduce [problem] by 40% in under 30 days."

  5.  **Call to Action:**
      - Ask a thoughtful question that requires more than yes/no
      - Make it about their priorities, not your calendar
      - Examples: "Curious if this is something on your radar for Q4?" or "Would love to hear your thoughts on [specific challenge] - is this something your team is tackling?"
      - NO meeting requests, calendar links, or pushy CTAs

  6.  **Tone & Style:**
      - Write like a human, not a marketing robot
      - Use short sentences (10-15 words max)
      - Keep paragraphs to 2-3 sentences each
      - Total email: 80-120 words maximum
      - Be confident but humble, helpful but not desperate
      - **CRITICAL:** No bullet points, hyphens, em dashes, or lists. Only flowing paragraphs.

  7.  **Formatting:**
      - Use line breaks between paragraphs for readability
      - No formal sign-offs like "Best regards" - keep it casual
      - End with just your name or a simple "Thanks, [Name]"

  Generate a subject line and email body that follows these rules precisely. Make it feel personal, valuable, and impossible to ignore.
  `,
});

const generatePersonalizedEmailsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedEmailsFlow',
    inputSchema: GeneratePersonalizedEmailsInputSchema,
    outputSchema: GeneratePersonalizedEmailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI model failed to generate a response.");
    }
    return output;
  }
);
