const fileHandler = require('./utils/fileHandler')
const CatalogModel = require('./models/CatalogModel')
const asyncForEach = require('./utils/asyncForEach')

const readStep = async (inputDirectoryPath) => {
  const fileNames = await fileHandler.readDirectory(inputDirectoryPath)
  const sources = fileHandler.getSources(fileNames)
  const catalogsData = await fileHandler.getCatalogsData(sources)
  return catalogsData
}

const processStep = async (catalogsData) => {
  const catalogObject = new CatalogModel()
  await asyncForEach(catalogsData, async (catalogData) => {
    await catalogObject.addProducts(catalogData)
  })
  return catalogObject
}

const runApp = async () => {
  // 1. Read
  const inputDirectoryPath = __dirname + '/../input'
  const catalogsData = await readStep(inputDirectoryPath)

  // 2. Process / Merge
  const mergedCatalogObject = await processStep(catalogsData)

  // 3. Generate Output
  await fileHandler.generateCSV(mergedCatalogObject.getOutputJsonData())

  console.log('success!')
}

try {
  runApp()
} catch (err) {
  console.log('err', err)
}
