import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
export default defineSchema({
  ...authTables,
  surveys: defineTable({
    goal: v.string(), audience: v.optional(v.string()), type: v.optional(v.string()),
    title: v.string(), intro: v.string(),
    questions: v.array(v.object({ question: v.string(), type: v.string(), options: v.optional(v.array(v.string())), required: v.boolean(), reasoning: v.string() })),
    tips: v.array(v.string()), createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
