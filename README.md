# Authress Starter Kit: Vue

A repository that contains an Vue example that uses Authress to Login.

## Getting Started

Run `yarn` and then `yarn start`. Or use pnpm to install dependencies and then `start` the site.

### File Directory

* `src`
  * `main.ts` - Application Root and contains all the routes of the starter kit application
  * `authressClient.ts` - Configuration for Authress for users to login
  * `routes`
    * `home.ts` - Landing page which has login and logout buttons
    * `protected.ts` - Page protected by user login via the login guard defined in the `main.ts` file
