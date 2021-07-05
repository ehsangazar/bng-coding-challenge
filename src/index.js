const readFiles = require('./utils/readFiles')
const inputDirectoryPath = __dirname + '/../input'

const runApp = async () => {
  // 1. Read
  const fileNames = await readFiles.readDirectory(inputDirectoryPath)
  const catalogLabels = readFiles.getCatalogLabels(fileNames)
  const catalogsData = await readFiles.getCatalogsData(catalogLabels)

  // 2. Process / Merge
  console.log('catalogsData', catalogsData)

  console.log('success!')
}

try {
  runApp()
} catch (err) {
  console.log('err', err)
}
