# Project Title

A brief description of what this project does and who it's for

## Run Locally

Clone the project

```bash
  git clone https://github.com/ehsangazar/bng-merger.git
```

Go to the project directory

```bash
  cd bng-merger
```

Install dependencies

```bash
  npm install
```

Run for development with nodemon

```bash
  npm run dev
```

Run for generate output from input folder

```bash
  npm run start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Things to know about

Since this project is to generate CSV output as a result of merging products in Catalogs, you need to follow these steps:

- ### You can upload as many as you want in to your upload foloders if you have all three files with this format

  - catalog{LABEL}.csv
  - barcodes{LABEL}.csv
  - suppliers{LABEL}.csv

- ### If a product has different SKUs but even one single barcode, they are same products

- ### In this repo, It's been assumed even in one catalog we might have similar products by mistake of suppliers

## Authors

- [@ehsangazar](https://www.github.com/ehsangazar)
