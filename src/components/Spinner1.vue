// Animation and code provided by https://www.w3schools.com/howto/howto_css_loader.asp

<template>
  <div class="loader"></div>
</template>

<style>
.loader {
    border: 10px solid #2E86AB; /* Blue */
    border-top: 10px solid #f3f3f3; /* Light grey */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
