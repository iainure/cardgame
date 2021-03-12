# card game

A quite boring game of matching 3 cards in a row by suit or type.

This game was built by Iain Ure with the intention of dabbling in:
* Svelte and Sapper
* Typescript
* Foundation CSS framework
* AWS API, Lambda and DynamoDB services

## setup and start
`npm install` in the directory

Update `const awsKey = 'AWS_API_KEY'` in [api.ts](https://github.com/iainure/cardgame/blob/main/src/api/api.ts) with the AWS key.

`npm run build` to generate the files.

Then `npm run start` to begin a local server on `http://localhost:3000`.

## development

`npm run dev` will start a server on `http://localhost:3000` which will hot reload.

Run `npm run validate` to check the code for typescript errors. You can also use `npm run validateWatch` to watch for changes and validate.
