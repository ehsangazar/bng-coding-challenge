const asyncForEach = require('../utils/asyncForEach')

class CatalogModel {
  constructor() {
    this.products = []
  }

  async addProducts({ source, catalogItems, supplierItems, barcodeItems }) {
    await asyncForEach(catalogItems, async (singleCatalogItem) => {
      const barcodeItemsForThisSKU = barcodeItems.filter(
        (item) => singleCatalogItem.SKU === item.SKU
      )
      const barcodes = []
      const suppliers = []
      await asyncForEach(barcodeItemsForThisSKU, (barcodeItem) => {
        if (!barcodes.includes(barcodeItem.Barcode)) {
          barcodes.push(barcodeItem.Barcode)
        }
        if (!suppliers.includes(barcodeItem.SupplierID)) {
          suppliers.push({
            ID: barcodeItem.SupplierID,
            Name: supplierItems.find(
              (supplerItem) => supplerItem.ID === barcodeItem.SupplierID
            ),
          })
        }
      })
      await this.addProduct({
        SKU: singleCatalogItem.SKU,
        Description: singleCatalogItem.Description,
        Barcodes: barcodes,
        Suppliers: suppliers,
        Source: source,
      })
    })
  }

  async addProduct(newProduct) {
    const checkExistanceFlag = await this.checkExistance(newProduct)
    if (!newProduct.SKU || newProduct.SKU === '') return false
    if (checkExistanceFlag) {
      return false
    }
    this.products.push(newProduct)
    return true
  }

  async checkExistance(newProduct) {
    let checkExistanceFlag = false
    await asyncForEach(newProduct.Barcodes, async (newProductBarCode) => {
      await asyncForEach(this.products, (singleProduct) => {
        if (singleProduct.Barcodes.includes(newProductBarCode)) {
          checkExistanceFlag = true
        }
      })
    })
    return checkExistanceFlag
  }

  getProducts() {
    return this.products
  }

  getOutputJsonData() {
    const jsonData = []
    this.products.map((product) => {
      jsonData.push({
        SKU: product.SKU,
        Description: product.Description,
        Source: product.Source,
      })
    })
    return jsonData
  }
}

module.exports = CatalogModel
