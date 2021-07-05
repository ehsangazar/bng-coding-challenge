const fs = require('fs')
const Papa = require('papaparse')
const asyncForEach = require('./asyncForEach')

const readDirectory = async (directoryPath) => {
  if (!directoryPath) return []
  if (!fs.existsSync(directoryPath)) return []
  const files = await fs.readdirSync(directoryPath)
  return files
}

const readCSV = async (filePath) => {
  if (!filePath) return []
  if (!fs.existsSync(filePath)) return []
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

const ensureDirSync = (dirPath) => {
  try {
    return fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') console.log('err', err)
  }
}

const generateCSV = async (data) => {
  const csv = Papa.unparse({
    fields: ['SKU', 'Description', 'Source'],
    data: data,
  })
  await ensureDirSync(`${__dirname}/../../output`)
  await fs.writeFileSync(
    `${__dirname}/../../output/result_output.csv`,
    csv,
    'utf8',
    () => {
      console.log("It's saved!")
    }
  )
}

const getSources = (fileNames) => {
  return Object.values(fileNames)
    .filter((fileName) => fileName.includes('catalog'))
    .map((catalogFileName) => catalogFileName.replace(/.csv|catalog/gi, ''))
}

const getCatalogsData = async (sources) => {
  const catalogsData = []
  await asyncForEach(sources, async (source) => {
    const catalogItems = await readCSV(
      `${__dirname}/../../input/catalog${source}.csv`
    )
    const supplierItems = await readCSV(
      `${__dirname}/../../input/suppliers${source}.csv`
    )
    const barcodeItems = await readCSV(
      `${__dirname}/../../input/barcodes${source}.csv`
    )
    catalogsData.push({ source, catalogItems, supplierItems, barcodeItems })
  })
  return catalogsData
}

module.exports = {
  readDirectory,
  readCSV,
  ensureDirSync,
  generateCSV,
  getSources,
  getCatalogsData,
}
