<template>
  <div class='article' :class='[category]'>
    <h3>{{this.title}}</h3>
    <p class="description">{{this.description}}</p>
    <a :href="this.url">{{this.url}}</a>
  </div>
</template>

<script>

  props: ['info'],

  data () {
    return {
      title: info.title
      description: info.description
      url: info.url
      position: info.position
      category: info.category
    }
  }
</script>
