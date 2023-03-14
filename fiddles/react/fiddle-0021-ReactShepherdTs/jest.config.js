module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "json",
      "node"
    ],
  }