import { ChatGroq } from "@langchain/groq";
import * as z from "zod";
import dotenv from "dotenv";
import { tool } from "@langchain/core/tools";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

dotenv.config();

// ---- Model setup ----
const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-70b-8192",
});

//-----------1. Define functions---------------
// 1.1 Rating
const ratingSearch = async ({ rating }) => {
  try {
    const res = await fetch(`http://localhost:8080/rating/${rating}`);
    return await res.json();
  } catch (err) {
    console.error("rating fetching error:", err);
    return { error: err.message };
  }
};
// 1.2 Year
const yearSearch = async ({ year }) => {
  try {
    const res = await fetch(`http://localhost:8080/year/${year}`);
    return await res.json();
  } catch (err) {
    console.error("year fetching error:", err);
    return { error: err.message };
  }
};
// 1.3 Title
const titleSearch = async ({ title }) => {
  try {
    const res = await fetch(`http://localhost:8080/title/${title}`);
    return await res.json();
  } catch (err) {
    console.error("title fetching error:", err);
    return { error: err.message };
  }
};
// 1.4 Genre
const genreSearch = async ({ genre }) => {
  try {
    const res = await fetch(`http://localhost:8080/genre/${genre}`);
    return await res.json();
  } catch (err) {
    console.error("genre fetching error:", err);
    return { error: err.message };
  }
};

//------------2. Define schemas--------------------
const ratingschema = z.object({
  rating: z.number().min(0).max(10),
});
const yearSchema = z.object({
  year: z.number().int().min(1900).max(new Date().getFullYear()),
});
const titleSchema = z.object({
  title: z.coerce.string().min(1, "Title must be at least 1 character"),
});
const genreSchema = z.object({
  genre: z
    .string()
    .min(3, "Genre must be at least 3 characters long")
    .max(20, "Genre cannot exceed 20 characters"),
});

//------3. Create tools---------//
const ratingfindTool = tool(ratingSearch, {
  name: "searchRating",
  schema: ratingschema,
  description: `Find rating number from search input between 0-10.`,
});
const yearfindTool = tool(yearSearch, {
  name: "yearSearch",
  schema: yearSchema,
  description: "Find 4-digit year from search.",
});
const titleFindTool = tool(titleSearch, {
  name: "titleSearch",
  schema: titleSchema,
  description: `Recognize when user wants to search by movie/film title.`,
});
const genreSearchTool = tool(genreSearch, {
  name: "genreSearch",
  schema: genreSchema,
  description: `Find genre (Action, Comedy, Drama, Horror, etc.) from search.`,
});

//4. Pack tools
const tools = [ratingfindTool, yearfindTool, titleFindTool, genreSearchTool];

export async function callmassag(input) {
  try {
    const groqWithTools = groq.bindTools(tools);

    const messages = [
      new SystemMessage(
        `You are a helpful assistant. 
        - If user provides a rating (0-10), call searchRating. 
        - If user provides a year (4-digit), call yearSearch. 
        - If user provides a genre (Action, Drama, Horror...), call genreSearch. 
        - If user provides a movie title, call titleSearch. 
        - If user asks a general/natural question, just respond normally without calling any tool.`
      ),
      new HumanMessage(input),
    ];

    const aiMessage = await groqWithTools.invoke(messages);
    console.log("Full AI Message:", JSON.stringify(aiMessage, null, 2));

    // Check for tool calls
    const toolCalls =
      aiMessage.tool_calls || aiMessage.additional_kwargs?.tool_calls || [];

    if (toolCalls.length > 0) {
      const toolCall = toolCalls[0];
      const toolToRun = tools.find((tool) => tool.name === toolCall.name);

      if (!toolToRun) return [{ error: "Tool not found." }];

      const result = await toolToRun.func(toolCall.args);
      const name = toolCall.name;

      if (!result || result.length === 0) {
        return [{ message: "No movies found for your search." }];
      }

      // ---- Format responses ----
      if (name === "titleSearch") {
        return [
          { message: "In this title matching movies are:" },
          ...result.map((m) => ({
            title: m.title,
            description: m.description,
            year: m.year,
            genre: m.genre,
            rating: m.rating,
          })),
        ];
      }

      if (name === "searchRating") {
        return [
          {
            message: `This rating (${toolCall.args.rating}) and above movies are:`,
          },
          ...result.map((m) => ({
            title: m.title,
            description: m.description,
            year: m.year,
            genre: m.genre,
            rating: m.rating,
          })),
        ];
      }

      if (name === "yearSearch") {
        return [
          { message: `In this year (${toolCall.args.year}) movies are:` },
          ...result.map((m) => ({
            title: m.title,
            description: m.description,
            year: m.year,
            genre: m.genre,
            rating: m.rating,
          })),
        ];
      }

      if (name === "genreSearch") {
        return [
          { message: `In this genre (${toolCall.args.genre}) movies are:` },
          ...result.map((m) => ({
            title: m.title,
            description: m.description,
            year: m.year,
            genre: m.genre,
            rating: m.rating,
          })),
        ];
      }
    }

    // ---- Normal response (no tools triggered) ----
    return [{ message: aiMessage.content || "Here’s my answer:" }];
  } catch (error) {
    console.error("AI error:", error);
    return [{ error: error.message }];
  }
}
