const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    baseUrl: "https://www.wolt.com",
    env:{
      email:"validusername",
      password: "validpassword"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // Falowed by this example: https://medium.com/@neeleshrauniyar/log-in-through-facebook-using-cypress-b3a6d9490cfc
    experimentalSessionAndOrigin: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    watchForFileChanges: false,
    
  },
});
