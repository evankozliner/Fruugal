<template>
  <a :href="info.url" target="_blank">
    <div class='article' :class="[info.category]">
      <h3>{{info.title}}</h3>
      <p class="description">{{info.description}}</p>
      <p>{{ info.pubDate }}</p>
    </div>
  </a>
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
.good:hover {
  border-left: 10px solid #42b983;
}

.bad {
  border-left: 6px solid #FF6961;
}
.bad:hover {
  border-left: 10px solid #FF6961;
}

.even {
  border-left: 6px solid #F8EC96;
}
.even:hover {
  border-left: 10px solid #F8EC96;
}

.article {
  margin: 12px 5px 5px 5px;
  padding: 1px 4px 1px 4px;
  background: rgba(20,20,20,0.1);
  transition: all 0.15s;
}

p.description {
  padding-left: 20px;
}

a {
  text-decoration: none;
  color: rgba(0,0,0,0.7);
}
</style>
