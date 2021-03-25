# Interview Scheduler

## LighthouseLabs Week 8 - Scheduler React Project - Gavin Swan

- Scheduler is a single page web app that students can use to book one hour time slots with interviewers from Monday to Friday, 12pm to 5pm.  The user is able to select a time and an interviewer from a list of options. Once created, they can use the app to edit or cancel their interviews.

- The scheduler app was built using Create React App and components were built in isolation using Storybook. Data is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format. Jest tests are used throughout and Cypress is used for end-to-end testing.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
