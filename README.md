# Wolt technical assignment project
This project is a Cypress test suite for testing key functionalities of food order/delivery platform [Wolt](https://wolt.com/) such as selecting a restaurant and adding a burger to the cart.
## Getting Started

Before running the tests, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)
- Code Editor (Optional)
If you prefer using a code editor for development, it is recommended to use [Visual Studio Code](https://code.visualstudio.com/).

## Installation

1. Clone the repository:
```bash
   git clone https://github.com/pillika/wolt_technical_assignment
```
2. Navigate to the project directory: `cd wolt_technical_assignment`
3. Install necessary dependencies: `npm install`

## Environment variables

Before running the tests, ensure that the required environment variables are set in the `cypress.config.js` file. The provided variables must correspond to a registered user on [Wolt](https://wolt.com/). This user should be capable of logging in to the website using Google credentials and must not have set a work address yet.

### Required Variables:

- **Username**: A valid email address (e.g., `vardas.pavarde@gmail.com`).
- **Password**: A valid password.

Make sure to set these variables in the configuration file to ensure proper authentication during test execution.

**Note**: Before running the test, ensure that the restaurant is open and accepting orders. If not, please change the restaurant name and menu items' names in the variables accordingly.

## Running the tests

1. To run the Cypress test, use the following command: `npm test` or `npx cypress open`
2. Select **E2E** testing configuration
3. Choose browser **Chrome**



