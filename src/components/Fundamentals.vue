<template>
  <div class="info">
    <h1>Fundamentals</h1>
    <transition name="fade" mode="out-in"> <!-- Allows table to transition in -->
      <div v-if="fundData === undefined" class='table-info'>
        <h3>Seems we don't have {{theResponse.answers[0].data.name}}'s financial data.</h3>
        <h3>Sorry about that!</h3>
      </div>
      <div v-else class='table-info'> <!-- Server responded with data -->
        <div class='header'>
          <h3>Financial information for {{theResponse.answers[0].data.name}}</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th v-for="key in fundData['dispKeyGroup']">{{ key[1] }}</th>
            </tr>
          </thead>
          <tbody v-for="(data, category) in fundData">
            <tr v-if="category !== 'keyGroups' && category !== 'dispKeyGroup'">
              <th>{{ category }}</th>
              <td v-for="key in fundData['dispKeyGroup']">{{ data[key[0]] }}</td>
            </tr>
          </tbody>
        </table>

        <div> <!-- For pagination at the bottom of the table -->
          <div id="pagination" v-for="(obj, index) in fundData['keyGroups']">
              <a :class="{active: curPageNum == index}" @click="updatePagination(index)" href="#0">{{ index+1 }}</a>
          </div>
        </div>
      </div> <!-- End of fundamentals data -->
    </transition>
  </div>
</template>

<script>
export default {

  props: ['fundData'],

  data () {
    return {
      currentData: null,
      curPageNum: 0
    }
  },

  computed: {
    // This function sets the data to the data in the store ONLY if the current page is
    // Fundamentals, meaning this is the component that is currently shown
    theResponse: function () {
      var retVal = this.$store.state.fundamentals.data
      return retVal
    }
  },

  methods: {
    // Updates the curPageNum for the pagination tabs so active class can change
    updatePagination: function (index) {
      console.log(index)
      this.fundData['dispKeyGroup'] = this.fundData['keyGroups'][index]
      this.curPageNum = index
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  background: #42b983;
  padding: 5px;
  //width: 100%;
  min-height: 40em;
  margin: auto;
  padding: 20px 2px 20px 2px;
  color: #2c3e50;
  //background: rgba(150, 150, 150, 0.3);
  background: rgba(240,240,240,0.2);
}

.table-info {
  opacity: 1;
}

/* Table styling */
table {
  border-collapse: collapse;
  margin: auto;
  opacity: 1;
}

table, td, th {
  border: 1px solid #2E86AB;
  padding: 8px;
  font-size: 16px;
  text-align: center;
}


/* Pagination styling */
#pagination {
  display: inline-block;
  margin: 20px 0px 20px 0;
  border: 1px rgba(240,240,240,0.2) solid;
}

#pagination a {
  background: rgba(240,240,240,0.4);
  float: left;
  padding: 6px 12px;
  text-decoration: none;
  border: 1px rgba(240,240,240,0.1) solid;
  transition: background-color .2s;
}

#pagination .active {
  background: rgba(240,240,240,0.8);
}

#pagination a:hover {
  background: rgba(240,240,240,0.8);
}


/* Transitions for */
.fade-enter-active {
  transition: all .2s ease;
}
.fade-leave-active {
  transition: all .2s ease;
}

/* For the articles div entrance */
.fade-enter {
  opacity: 0;
}

/* For the loading the page */
.fade-leave-to {
  opacity: 0;
}

</style>
