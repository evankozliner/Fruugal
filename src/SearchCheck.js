// Contains the methods that are needed to check if a search has
// been perfomed
export default {
  search: {
    sp: false
  },

  searchPerfomed () {
    this.search.sP = true
  },

  searchHasBeenPerformed () {
    return this.search.sp
  }
}
