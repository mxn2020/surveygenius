import { action } from "./_generated/server";
import { v } from "convex/values";
export const generateSurvey = action({
    args: { goal: v.string(), audience: v.optional(v.string()), type: v.optional(v.string()) },
    handler: async (_ctx, args) => {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) throw new Error("OPENAI_API_KEY not configured");
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-4o", messages: [
                    {
                        role: "system", content: `You are SurveyGenius, an expert survey designer. Create the optimal survey based on the user's goal. Use best practices: avoid leading questions, use proper scales, include a mix of question types. Output JSON:
{"title":"","intro":"<welcome text>","questions":[{"question":"","type":"multiple-choice|rating-scale|open-ended|yes-no|likert|ranking","options":["<if applicable>"],"required":<bool>,"reasoning":"<why this question>"}],"tips":[""]}
Generate 8-15 questions.` },
                    { role: "user", content: `Goal: ${args.goal}${args.audience ? `\nAudience: ${args.audience}` : ''}${args.type ? `\nSurvey type: ${args.type}` : ''}` },
                ], temperature: 0.6, max_tokens: 3000, response_format: { type: "json_object" }
            }),
        });
        if (!r.ok) throw new Error(`API error`);
        return JSON.parse((await r.json() as any).choices?.[0]?.message?.content ?? "{}");
    },
});
