class CatalogModel {
  constructor(catalogLabel, catalog, suppliers, barcodes) {
    this.catalogLabel = catalogLabel
    this.catalog = catalog
    this.suppliers = suppliers
    this.barcodes = barcodes
  }
}

module.exports = CatalogModel
