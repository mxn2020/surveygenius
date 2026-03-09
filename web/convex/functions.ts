import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const saveSurvey = mutation({
  args: { goal: v.string(), audience: v.optional(v.string()), type: v.optional(v.string()), title: v.string(), intro: v.string(), questions: v.array(v.object({ question: v.string(), type: v.string(), options: v.optional(v.array(v.string())), required: v.boolean(), reasoning: v.string() })), tips: v.array(v.string()) },
  handler: async (ctx, args) => await ctx.db.insert("surveys", { ...args, createdAt: Date.now() }),
});
export const getRecent = query({ args: {}, handler: async (ctx) => await ctx.db.query("surveys").order("desc").take(20) });
export const getStatus = query({ args: {}, handler: async () => ({ status: "Online", timestamp: Date.now() }) });
