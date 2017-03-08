<template>
  <div class='article' :class="[info.category]">
    <h3>{{info.title}}</h3>
    <p class="description">{{info.description}}</p>
    <a :href="info.url">{{info.url}}</a>
  </div>
</template>

<script>
export default {
  props: ['info']

}
</script>

<style scoped>
.good {
  border-left: 6px solid #42b983;
}

.bad {
  border-left: 6px solid #FF6961;
}

.even {
  border-left: 6px solid #F8EC96;
}

.article {
  margin: 12px 5px 5px 5px;
  padding: 1px 4px 1px 4px;
  background: rgba(20,20,20,0.1);
}

p.description {
  padding-left: 20px;
}

.article a, .article h3 {
  text-decoration: none;
  color: rgba(0,0,0,0.7);
}
</style>
