// Contains the methods that are needed to check if a search has
// been perfomed
export default {
  search: {
    sp: false,
    mostRecentClass: ''
  },

  searchPerformed (classType) {
    console.log('Here in SearchCheck')
    console.log(classType)
    this.search.sp = true
    this.search.mostRecentClass = classType
    console.log(this.search.mostRecentClass)
  },

  searchHasBeenPerformed () {
    console.log('Here in SearchCheck')
    console.log(this.search.mostRecentClass)
    return this.search.sp
  }
}
