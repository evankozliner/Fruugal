# Overhauled Fruugal Architecture based on [this blog post](https://medium.com/@sagarjauhari/quick-n-clean-way-to-deploy-vue-webpack-apps-on-heroku-b522d3904bc8#.nfswykqek)

Repo accompanying the blog post [Quick-n-clean way to deploy Vue + Webpack apps on Heroku
](https://medium.com/@sagarjauhari/quick-n-clean-way-to-deploy-vue-webpack-apps-on-heroku-b522d3904bc8#.xexhdzg4x)

# The NLC dat
https://docs.google.com/spreadsheets/d/17DcpNrKuUywuIAbrOT1cr-jj-mgLrKoB0lx1e9yRGhY/edit#gid=0

# Starting the app

Note: Run all of these in different terminals

```bash
npm run dev 

npm start

cd rar_orchestrator && python rar_live_server.py

cd fundamentals_extractor && python fundamentals_service.py

```

## Build Setup

``` bash
# install dependencies
npm install

# serve front end with hot reload at localhost:8080
npm run dev

# serve API 
npm start

# build for production with minification
npm run build

# deploy dist folder to Heroku
npm run deploy
```

For detailed explanation on how things work, checkout the [guide](https://github.com/vuejs-templates/webpack#vue-webpack-boilerplate) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Guides

## [Adding Environment Variables](https://github.com/evankozliner/Fruugal/wiki/Adding-Environment-Variables-for-Watson-Functionality)

## [How to Make an Addition with Git](https://github.com/evankozliner/Fruugal/wiki/Making-a-New-Change-with-Git)

## [Viewing other people's work with Git](https://github.com/evankozliner/Fruugal/wiki/Viewing-Other-People's-work-with-Git)

## [Making requests to the RAR server](https://github.com/evankozliner/Fruugal/wiki/How-to-use-the-RAR-server)
