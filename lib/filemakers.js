var fs = require("fs");

function tryMakeUserDataFile(user) {
  const userString = JSON.stringify(user);
  fs.writeFile(`${user.screen_name}.json`, userString, err => console.log(err));
};

function tryMakeMultipleUserFile(users) {
  const usersString = JSON.stringify(users);
  const firstUserName = users[0].screen_name;
  const lastUserName = users[users.length - 1].screen_name;
  fs.writeFile(`${firstUserName}-${lastUserName}.json`, usersString, err =>
    console.log(err)
  );
};

module.exports ={
  tryMakeUserDataFile,
  tryMakeMultipleUserFile
}