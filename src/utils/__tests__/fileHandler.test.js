const fileHandler = require('../fileHandler')
const testDirectoryPath1 = __dirname + '/../../../mock/input1'

describe('readFile', () => {
  test('readDirectory should work as expected', async () => {
    const fileNames = await fileHandler.readDirectory(testDirectoryPath1)
    expect(fileNames.length).toBe(6)
  })
  test('readDirectory should work without testDirectoryPath1', async () => {
    const fileNames = await fileHandler.readDirectory()
    expect(fileNames.length).toBe(0)
  })
  test('readDirectory should work with fake path', async () => {
    const fileNames = await fileHandler.readDirectory('/fake path')
    expect(fileNames.length).toBe(0)
  })
  test('readCSV should work as expected', async () => {
    const csvData = await fileHandler.readCSV(
      `${testDirectoryPath1}/catalogA.csv`
    )
    expect(csvData.length).toBe(6)
  })
  test('readCSV should work without filePath', async () => {
    const csvData = await fileHandler.readCSV()
    expect(csvData.length).toBe(0)
  })
  test('readCSV should work without fake filePath', async () => {
    const csvData = await fileHandler.readCSV('/fake path')
    expect(csvData.length).toBe(0)
  })
  test('ensureDirSync should work as expected', async () => {
    expect(fileHandler.ensureDirSync).toBeDefined()
  })
  test('generateCSV should work as expected', async () => {
    expect(fileHandler.generateCSV).toBeDefined()
  })
  test('getSources should work as expected', async () => {
    const fileNames = await fileHandler.readDirectory(testDirectoryPath1)
    const sources = fileHandler.getSources(fileNames)
    expect(sources[0]).toBe('A')
    expect(sources[1]).toBe('B')
  })
  test('getCatalogsData should work as expected', async () => {
    const fileNames = await fileHandler.readDirectory(testDirectoryPath1)
    const sources = fileHandler.getSources(fileNames)
    expect(sources[0]).toBe('A')
    expect(sources[1]).toBe('B')
  })
  test('getCatalogsData should work as expected', async () => {
    expect(fileHandler.getCatalogsData).toBeDefined()
  })
})
