// Contains the methods that are needed to check if a search has
// been perfomed
export default {
  search: {
    StockAnswer: false,
    GeneralInfoAnswer: false,
    FundamentalsAnswer: false
  },

  searchPerformed (classType) {
    console.log('Here in SearchCheck')
    console.log(classType)
    this[classType] = true
    console.log(this[classType])
  },

  canGoToThisComponent (classType) {
    console.log('Here in canGoToThisComponent')
    console.log(classType)
    return this[classType] === true
  }
}
