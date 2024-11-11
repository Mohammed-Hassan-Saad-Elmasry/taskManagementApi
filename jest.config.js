// jest.config.js
module.exports = {
  preset: "ts-jest", // إذا كنت تستخدم TypeScript
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest", // تحويل ملفات JavaScript
    "^.+\\.ts$": "ts-jest", // تحويل ملفات TypeScript
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/"],
};
