const fs = require('fs')
const Papa = require('papaparse')
const CatalogModel = require('../models/CatalogModel')

const readDirectory = async (directoryPath) => {
  const files = await fs.readdirSync(directoryPath)
  return files
}

const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath)
  const csvData = csvFile.toString()
  return new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        resolve(results.data)
      },
    })
  })
}

const getCatalogLabels = (fileNames) => {
  return Object.values(fileNames)
    .filter((fileName) => fileName.includes('catalog'))
    .map((catalogFileName) => catalogFileName.replace(/.csv|catalog/gi, ''))
}

const getCatalogsData = (catalogLabels) => {
  const catalogsData = []
  return new Promise((resolve) => {
    catalogLabels.forEach(async (catalogLabel) => {
      const catalog = await readCSV(
        `${__dirname}/../../input/catalog${catalogLabel}.csv`
      )
      const suppliers = await readCSV(
        `${__dirname}/../../input/suppliers${catalogLabel}.csv`
      )
      const barcodes = await readCSV(
        `${__dirname}/../../input/barcodes${catalogLabel}.csv`
      )
      catalogsData.push(
        new CatalogModel(catalogLabel, catalog, suppliers, barcodes)
      )
      if (catalogsData.length === catalogLabels.length) {
        resolve(catalogsData)
      }
    })
  })
}

module.exports = {
  readDirectory,
  readCSV,
  getCatalogLabels,
  getCatalogsData,
}
