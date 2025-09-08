import { ChatGroq } from "@langchain/groq";
import * as z from "zod";
import dotenv from "dotenv";
import { tool } from "@langchain/core/tools";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
dotenv.config();
//model=groq=lloma
const groq = new ChatGroq({
  apiKey: "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",
  model: "llama-3.1-8b-instant",
});
//-----------1.define funtion---------------
// 1.1==rating funtion
const ratingSearch = async ({ rating }) => {
  try {
    const res = await fetch(`http://localhost:8080/rating/${rating}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("rating fetching error:", err);
    return { error: err.message };
  }
};
// 1.2 year frind funtion
const yearSearch = async ({ year }) => {
  try {
    const res = await fetch(`http://localhost:8080/year/${year}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("year fatching err:", err);
    return { error: err.message };
  }
};
// 1.3 title find funtion
const titleSearch = async ({ title }) => {
  try {
    const res = await fetch(`http://localhost:8080/title/${title}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("title fatching err:", err);
    return { error: err.message };
  }
};
// 1.4 genre find funtion
const genreSearch = async ({ genre }) => {
  try {
    let res = await fetch(`http://localhost:8080/genre/${genre}`);
    let data = await res.json();
    return data;
  } catch (err) {
    console.error("genre fatching err:", err);
    return { error: err.message };
  }
};
//------------2.define schema--------------------
// 2.1 for rating
const ratingschema = z.object({
  rating: z.number().min(0).max(10),
});
//2.2 for movies year
const yearSchema = z.object({
  year: z.number().int().min(1900).max(new Date().getFullYear()),
});
//2.3  for titleSchema
const titleSchema = z.object({
  title: z.coerce
    .string()
    .min(1, "String must be at least 1 characters long")
});
// 2.4 for genreSchema
const genreSchema = z.object({
  genre: z.string()
    .min(2, "String must be at least 2 characters long")
    .max(20, "String cannot exceed 20 characters")
});

//------3. create tool---------//

//toolname = too(function,metadata)
// 3.1 ratingfindTool
const ratingfindTool = tool(ratingSearch, {
  name: "searchRating",
  schema: ratingschema,
  description: `find rating  number from  search input meassage 
   which must have between 0-10.user  when searh like movie rating or rating then call  searchRating route.`,
});
// 3.2 yearfindTool
const yearfindTool = tool(yearSearch, {
  name: "yearSearch",
  schema: yearSchema,
  description: "find year from search and that have strcitly number of 4 digit or  user type in search  year ,4 digit number input.",
});
// 3.3 titleFindTool
const titleFindTool = tool(titleSearch,
  {
    name: "titleSearch",
    schema: titleSchema,
    description: `Automatically recognize  from search message that user want search 
                   title/name/movie/film  from search message  that title are  string 
                  from 1 charter to 20 charter  inside tha search massage of user`
  }
)
// 3.4 genreSearchTool
const genreSearchTool = tool(genreSearch,
  {
    name: "genreSearch",
    schema: genreSchema,
    description: ` Automatically find  form search the genre(s) one or more of the following genres based Action,
     Adventure, Comedy, Drama,Horror,Thriller, Science Fiction, Fantasy, Romance, Mystery, Crime, Musical,
      Documentary,Animation, War, Western.The output may include combinations of genres
       ( Action-Thriller or Romantic Comedy) and \closely related sub-genres or tags thats relevant.
        its run only whan than inculids thease charters `
  }
)

//4.pack/combine all tools i one
const tools = [ratingfindTool, yearfindTool, titleFindTool, genreSearchTool];

export async function callmassag(input) {
  try {
    //5.Tool Binding
    const groqWithTools = groq.bindTools(tools);
    const messages = [
      new SystemMessage(
        `You are a helpful assistant that can call routes based on user search input message  
        and also assistant for Greeting, General Message and General Query.
        call ratingfindTool if the user gives a number between 0-10.or call  yearfindTool
        if the user gives a 4-digit year. call   genreSearchTool if user give relateted charter of genre
         description or related this if genre not match than go on titleSearch  .
        and call titleSearch search when user search movie name,film,title name or string etc. 
        first match from over database collection input  match this string/charter in over
        database title .if not match  any and any response handler than reply gernal
         than just respond normally ai. `
      ),
      new HumanMessage(input),
    ];

    // 6.tool executing
    const aiMessage = await groqWithTools.invoke(messages);
    console.log(aiMessage.tool_calls.length);
    // this is wrong part for this solve first console aimessage
    console.log("aiMessage is : ", aiMessage.content);

    if (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
      // for diffcent think that only one tool call have
      const toolCall = aiMessage.tool_calls[0];
      const toolToRun = tools.find((tool) => tool.name === toolCall.name);

      if (toolToRun) {
        const result = await toolToRun.func(toolCall.args);
        console.log()
        const name = toolCall.name;
  
        if (name === "titleSearch") {
          if (result.length > 0) {
            return `movie which you are searching with "${toolCall.args.title}": ` +
              result.map(movie => `${movie.title}: in this movie ${movie.description} \n`)
          } 
        }

        if (name === "searchRating") {
          
          if (result.length > 0) {
            const data=result
            return `Movies with rating ${toolCall.args.rating} or above: ` +
              result.map(movie => `${movie.title}: in this movie ${movie.description}`);
          }
        }

        if (name === "yearSearch") {
          if (result.length > 0) {
            return `Movies released in the year ${toolCall.args.year}: ` +
              result.map(movie => `${movie.title}: in this movie ${movie.description} `);
          }
        }

        if (name === "genreSearch") {
          if (result.length > 0) {
            return `Movies in the genre "${toolCall.args.genre}": ` +
              result.map(movie => `${movie.title}: in this movie ${movie.description}`);
          } 
        }

        return { error: " sorry not routes match with your message please specify your query we happy to respond you." };
      } else {
        return { error: "Tool not found in registered tools." };
      }
    }

 return { message: aiMessage.content || "tool not idintyfiying." };
  } catch (error) {
    console.error("AI error:", error);
    return { error: error.message };
  }
}
