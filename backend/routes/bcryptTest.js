const bcrypt = require("bcryptjs");

const password = "secretsout123--";
const storedHash = "$2b$10$4hwJJAWM7ehFUfGWa6DjI.EfCy0QlV5tAH5lZtfRK6d2LqxvcIYi2"; // Diego's hash from MongoDB

async function testBcrypt() {
  const match = await bcrypt.compare(password, storedHash);
  
  console.log("🟢 Password match:", match);
}

testBcrypt();
