var numeral = require('numeral')

var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December' ]

export default {

  /*
   * Process the fundamentals data returned from the server into the workable pieces
   */
  processFundData (result) {
    // var retVal = {'assets': [], 'cashCarry': [], 'liabilities': [], 'keyGroups': [], 'dispKeyGroup': []}
    // var assets = {}
    // var cashCarry = {}
    // var liabilities = {}
    var keyGroups = []
    var dispKeyGroup = []

    // var cashCarryNums = result['CashAndCashEquivalentsAtCarryingValue']
    // var assetsNums = result['Assets']
    // var liabilitiesNums = result['LiabilitiesCurrent']

    // Get all of the timestamps to be keys, and get the date that will be displayed
    var keys = []
    var categories = Object.keys(result)  // Get a key from the result so we can get the timestamps
    var aCategory = null
    if (categories.length > 0) {
      aCategory = categories[0]
    }
    console.log(aCategory)
    for (var obj in result[aCategory]) {
      var date = new Date(obj * 1000)
      var dateToDisplay = monthNames[date.getMonth() - 1] + ' ' + date.getFullYear()
      keys.unshift([obj, dateToDisplay])  // Add this array to the keys
    }
    // Slice the keys array into the pagination sections of size 4 each
    var i = 0
    while (keys.length > 0) {
      keyGroups[i] = keys.splice(0, 4)
      i++
    }
    dispKeyGroup = keyGroups[0]  // Set the first group to display

    // Loop through each category that is in the returned data
    for (var category in result) {
      // For each key in this category, change the number that corresponds to this key
      for (var key in result[category]) {
        if (result[category][key] !== 'Unknown') {
          var num1 = numeral(result[category][key]).format('$0,0[.]00')
          result[category][key] = num1
        } else {
          result[category][key] = '-'
        }
      }
    }

    // Now need to add spaces between the words in the keys
    for (var name in result) {
      console.log(name)
      var nameWithSpaces = name.split(/(?=[A-Z])/).join(' ')
      result[nameWithSpaces] = result[name]
      delete result[name]
    }

    // The incoming data has now been processed to correct format
    // Still need to add keyGroups and dispKeyGroup
    result['keyGroups'] = keyGroups
    result['dispKeyGroup'] = dispKeyGroup

    console.log(result)

    return result
  }
}
