/*eslint no-unused-vars: "off"*/

/* Helper function for getting the category and confidence level for that category
 * for an individual article.
 *
 * @params obj
 *  An article object form the 'docs' array in the returned RAR server response
 *
 * @returns
 *  An object containing 'category' and 'confidence' keys, each holding their
 *  respective decisions
 *
 * Algorithm:
 *  'bad' category: Chosen if average of anger and disgust is greater than the other
 *    categories by more than .1
 *  'good' category: Chosen if joy is greater than the other categories by more than .1
 *  'even' category: Chosen if the difference between the 'bad' and 'good' category is
 *    less than or equal to .1
 */
function getCategory (obj) {
  var retCat, retConf
  var angerConfidence = obj.anger
  var disgustConfidence = obj.disgust
  var joyConfidence = obj.joy

  // 'good' confidence. Just use joy confidence
  var goodConfidence = joyConfidence
  // Average anger and disgust for 'bad' confidence
  var badConfidence = (angerConfidence + disgustConfidence) / 2

  // If there is .1 or less difference between the two, we will say 'even' category
  if (Math.abs(goodConfidence - badConfidence) <= 0.1) {
    // Use the average for the 'even' confidence
    var evenConfidence = (goodConfidence + badConfidence) / 2
    retConf = evenConfidence
    retCat = 'even'
  } else if (goodConfidence > badConfidence) {
    // 'good' category the best
    retConf = goodConfidence
    retCat = 'good'
  } else {
    // 'bad' category best
    retConf = badConfidence
    retCat = 'bad'
  }

  return {'category': retCat, 'confidence': retConf}
}

export default {

  /* Sorts the articles returned by the solr cluster into categories based on the
   * sentiment analysis done for each article.
   *
   * @params response
   *  The 'docs' object from the JSON response returned from the live RAR server
   *
   * @returns
   *  A java script object containing 3 keys: 'good', 'bad', 'even'.  Each key
   * contains the documents, a count of the number of documents in that list, and
   * its confidence score in that category
   */
  sortBySentiment (response) {
    var retObj = {
      'good': [],
      'bad': [],
      'even': []
    }

    for (var i = 0; i < response.length; i++) {
      var article = response[i]
      console.log(article)
      // Get the category
      var catAndConf = getCategory(article)

      // Create object to add to this category with info we need
      var stripedArticle = {
        'title': article.title[0],
        'url': article.url,
        'confidence': catAndConf.confidence,
        'category': catAndConf.category,
        'description': article.description[0]
      }
      // Add this object to the correct key
      retObj[catAndConf.category].push(stripedArticle)
    }

    return retObj
  }

}
