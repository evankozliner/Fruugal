var numeral = require('numeral')

var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
                 'July', 'August', 'September', 'October', 'November', 'December' ]

export default {

  /*
   * Process the fundamentals data returned from the server into the workable pieces
   */
  processFundData (result) {
    var retVal = {'assets': [], 'cashCarry': [], 'liabilities': [], 'keyGroups': [], 'dispKeyGroup': []}
    var assets = {}
    var cashCarry = {}
    var liabilities = {}
    var keyGroups = []
    var dispKeyGroup = []

    var cashCarryNums = result['CashAndCashEquivalentsAtCarryingValue']
    var assetsNums = result['Assets']
    var liabilitiesNums = result['LiabilitiesCurrent']
    // Get all of the timestamps to be keys, and get the date that will be displayed
    var keys = []
    for (var obj in assetsNums) {
      var date = new Date(obj * 1000)
      var dateToDisplay = monthNames[date.getMonth() - 1] + ' ' + date.getFullYear()
      keys.unshift([obj, dateToDisplay])
    }
    // Slice the keys array into the pagination sections of size 6 each
    var i = 0
    while (keys.length > 0) {
      keyGroups[i] = keys.splice(0, 4)
      i++
    }
    dispKeyGroup = keyGroups[0]  // Set the first group to display

    // Go through each array and change all numbers to currency
    for (var key1 in assetsNums) {
      if (assetsNums[key1] !== 'Unknown') {
        var num1 = numeral(assetsNums[key1]).format('$0,0[.]00')
        assets[key1] = num1
      } else {
        assets[key1] = '-'
      }
    }

    for (var key2 in cashCarryNums) {
      if (cashCarryNums[key2] !== 'Unknown') {
        var num2 = numeral(cashCarryNums[key2]).format('$0,0[.]00')
        cashCarry[key2] = num2
      } else {
        cashCarry[key2] = '-'
      }
    }

    for (var key3 in liabilitiesNums) {
      if (liabilitiesNums[key3] !== 'Unknown') {
        var num3 = numeral(liabilitiesNums[key3]).format('$0,0[.]00')
        liabilities[key3] = num3
      } else {
        liabilities[key3] = '-'
      }
    }

    // Need to set the return object to all of the arrays
    retVal['assets'] = assets
    retVal['cashCarry'] = cashCarry
    retVal['liabilities'] = liabilities
    retVal['keyGroups'] = keyGroups
    retVal['dispKeyGroup'] = dispKeyGroup

    return retVal
  }
}
