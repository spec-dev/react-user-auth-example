# React app with Spec auth

This React app demonstrates how to use Spec for web3 auth (i.e. wallet sign-in).

## Setup

1) Clone this repository.

```
$ git clone https://github.com/spec-dev/react-user-auth-example && cd react-user-auth-example
```

2) Install dependencies

```
$ npm install
```

3) Using your preferred method, ensure the following environment variables are set.

- `REACT_APP_SPEC_URL`: Your Spec project's URL (e.g. `https://<your-project-id>.spec.dev`).

- `REACT_APP_SPEC_KEY`: Your Spec project's public anon key.

- `REACT_APP_INFURA_ID`: Your infura API key.

## Quickstart

Start the app:

```
$ npm start
```

## Contents

This app consists of the following key files:

[`App.js`](src/App.js) - The React app.

[`spec.js`](src/lib/spec.js) - Creates and exports your Spec client with base configuration.

[`useAuthUser.js`](src/lib/hooks/useAuthUser.js) - Custom React hook to manage the state of the currently signed-in user.

## License

MIT