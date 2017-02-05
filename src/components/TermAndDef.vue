//The term and definition is its own vue component so you can add a class to the
//specific one you wanted and for easier selection.

<template>
<div class="totalContainer" v-bind:class="{ active: isActive }" v-on:click="changeActive()">
  <span class="name">{{ term }}</span>
  <br />
  <span v-bind:class="{ active: isActive }" class="definition">{{ definition }}</span>
</div>
</template>

<script>
export default {

  props: ['term', 'definition'],

  data: function () {
    return {
      isActive: false
    }
  },

  methods: {
    changeActive: function () {
      this.isActive = !this.isActive
      console.log('here')
    }
  }
}
</script>

<style scoped>
.totalContainer {
  background: #2c3e50;
  font: inherit;
  color: #42b983;
  border-radius: 8px;
  width: 150px;
  padding: 10px 5px;
  overflow: hidden;

  transition: all 0.5s;
}

.name{
  font-size: 30px;
}

.definition {
  display: none;
  opacity: 0;
  overflow: hidden;
  transition: opacity 0.5s;
}

.totalContainer.active {
  flex-grow: 5;
  width: 100%;
}

.active {
  display: block;
  opacity: 1;
}
</style>
