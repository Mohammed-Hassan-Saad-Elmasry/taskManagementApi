"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const task_1 = require("./controller/task");
const taskController = new task_1.Task();
const TaskType = new graphql_1.GraphQLObjectType({
    name: "gettask",
    fields: {
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: "apitaskroute",
        description: "",
        fields: {
            sayHello: {
                type: graphql_1.GraphQLString,
                resolve: () => "hello Ali",
            },
            gettaskById: {
                type: TaskType,
                args: { taskId: { type: graphql_1.GraphQLID } },
                resolve: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { taskId }, context) {
                    return yield taskController.gettaskById({ taskId }, context.req.user.id);
                }),
            },
        },
    })
});
