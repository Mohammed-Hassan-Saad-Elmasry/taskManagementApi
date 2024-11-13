import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
} from "graphql";
import { Task } from "./controller/task"; 

const taskController = new Task();


const TaskType = new GraphQLObjectType({
  name: "gettask",
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});


export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "apitaskroute",
    description: "",
    fields: {
      sayHello: {
        type: GraphQLString,
        resolve: () => "hello Ali",
      },
      gettaskById: {
        type: TaskType,
        args: { taskId: { type: GraphQLID } }, 
        resolve: async (_, { taskId }, context) => {
          return await taskController.gettaskById(
            { taskId },
            context.req.user.id
          );
        },
      },
    },
  })
});
