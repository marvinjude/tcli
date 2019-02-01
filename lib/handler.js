const Table = require("cli-table");
const color = require("colors");
const client = require("./client");
const isoLangConverter = require("iso-language-converter");
const Spinner = require("cli-spinner").Spinner;
const formatText = require("./format-text")
const {
  tryMakeMultipleUserFile,
  tryMakeUserDataFile
} = require("./filemakers.js");



/**Human Readable Error Messages */
const ERROR_MESSAGES = {
  ENOTFOUND: "Make Sure You have an Internet Connection",
  ETIMEDOUT: "This took too long! Try again."
  //TODO: ADD OTHERS
};

/**
 * @param {yargs} argv
 */
function handler(username, otherUserNames, options) {
  
  var table = new Table();
  var customSpinner = spinner(
    `Wait while i fetch ${
      options.full ? `Full` : `Basic`
    } details for ${color.yellow(username)} 🚀`
  );

  customSpinner.start();

  /**If an array of usernames was passed  */
  if (otherUserNames.length > 0) {
    const usernames = otherUserNames.concat(username);
    client
      .get("users/lookup", {
        screen_name: usernames.join(",")
      })
      .then(users => tryMakeMultipleUserFile(users))
      .catch(error => console.log(error));
  } else {
  /** Fetch user data from twitter */
    const  params = {screen_name: username};
    client
      .get("users/show", params)
      .then(user => {
        /**Create file if --tf or --to-file option was specified */
        if (options.toFile) {
          tryMakeUserDataFile(user);
        }

        if (options.full) {
          table.push({
            Username: user[`screen_name`]
          }, {
            Name: user[`name`]
          }, {
            Location: user[`location`]
          }, {
            Biography: formatText(user[`description`], 50)
          }, {
            Followers: user[`followers_count`]
          }, {
            Following: user[`friends_count`]
          }, {
            Verified: user[`verified`] ? `✔` : `✖`
          }, {
            Favourites: user[`favourites_count`]
          }, {
            Joined: user[`created_at`]
          }, {
            Language: isoLangConverter(user[`lang`])
          }, {
            TweetCount: user["statuses_count"]
          }, {
            Lists: user["listed_count"]
          });
        } else {
          table.push({
            Username: user[`screen_name`]
          }, {
            Name: user[`name`]
          }, {
            Biography: formatText(user[`description`], 50)
          }, {
            Verified: user[`verified`] ? `✔` : `✖`
          }, {
            Followers_Count: user[`followers_count`]
          }, {
            Following: user[`friends_count`]
          }, {
            Additional_Details: `To get the full data on ${
              user["screen_name"]
            }, use the --full option`
          });
        }

        console.log("\n");

        console.log(table.toString());

        console.log("\n");

        /**Stop the spinner */
        customSpinner.stop();
      })
      .catch(error => {
        console.log("\n \n");

        /** Log Error Message
         *  @error in an array when username is incorrect
         */

        if (Array.isArray(error))
          console.log(`Username ${argv.username} is incorrect!`);
        else {
          console.error(`An error occured, ${ERROR_MESSAGES[`${error.code}`]}`);
        }

        console.log("\n \n");

        /**Also Stop spinner When error occurs */
        customSpinner.stop();
      });
  }


}

/**
 * @param {string} msg
 */
function spinner(msg) {
  return new Spinner({
    text: `${msg} %s`,
    stream: process.stderr,
    onTick: function (msg) {
      this.clearLine(this.stream);
      this.stream.write(msg);
    }
  });
}


module.exports = handler;