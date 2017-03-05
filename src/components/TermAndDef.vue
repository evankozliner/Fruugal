//The term and definition is its own vue component so you can add a class to the
//specific one you wanted and for easier selection.

<template>
<div class="totalContainer" v-on:click="changeActive()">
  <div class="name">
    <span>{{ term }}</span>
  </div>
  <div class="definition" v-bind:class="{ active: isActive }">
    <span>{{ definition }}</span>
  </div>
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
    }
  }
}
</script>

<style scoped>
.totalContainer {
  background: #2c3e50;
  font: inherit;
  border-radius: 8px;
  min-width: 100%;
  padding: 10px 5px;
  overflow: hidden;

  transition: all 0.5s;
}

.name{
  font-size: 30px;
  width: auto;
  color: #2E86AB;
}

.definition {
  display: block;
  opacity: 0;
  height: 0px;
  overflow: hidden;
  color: #42b983;

  transition: all 0.5s;
}

.totalContainer.active {
  //flex-grow: 5;
  width: 100%;
  height: 200px;
  overflow: scroll;
}

.definition.active {
  display: block;
  background: #2c3e50;
  opacity: 1;
  height: 100px;
  overflow: auto;
}
</style>
