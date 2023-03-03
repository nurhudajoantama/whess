const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const generateToken = () => {
  const length = 32;
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

const variableName = "USER_TOKEN";
const newValue = generateToken();

// Read the contents of the .env file
fs.readFile(".env", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the contents into an array of lines
  const lines = data.split("\n");

  // Find the line with the variable you want to replace
  const variableIndex = lines.findIndex((line) => line.startsWith(`${variableName}=`));

  if (variableIndex === -1) {
    console.error(`Variable ${variableName} not found in .env file`);
    return;
  }

  // Replace the value of the variable
  lines[variableIndex] = `${variableName}=${newValue}`;

  // Join the lines back into a single string
  const newData = lines.join("\n");

  // Write the new contents to the .env file
  fs.writeFile(".env", newData, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(newValue);
  });
});
