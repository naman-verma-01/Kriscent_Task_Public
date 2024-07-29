
## Installation

To install dependencies for this project run

```bash
  npm install
```

## Set up Requirements
- 1. Checkout the ```./.env.example``` file for setting up .env file.
- 2. Project also requires a google's firebase storage bucket, so set one up using the official firebase storage documentation.
- 3. Once firebase storage set up is done, download its credentials.json file and place it in the ./Utils folder. 
- 4. Open ./Utils/uploadFirebase.js file and make pointed out changes.
```
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "//NAME_OF_YOUR_STORAGE_BUCKET_COMES_HERE"
});
```
## Start

To start this project on localhost run

```bash
  npm start
```

## Main .JS Files

The main .js files

### Entry Point
```bash
  cd ./index.js
```
### Controllers/Express Route Files
```bash
  cd ./API/
```




