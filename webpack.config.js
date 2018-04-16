
var path = require('path')

var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  //1. entry  入口  打包什么文件
  entry:path.join(__dirname,'./src/js/main.js'),

  //2. ouput 出口  打包到哪里
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js'
  },
  //3. loader  加载器  主要处理 非.js
  module:{
    rules:[
      //.js
      {test:/\.js$/,use:['babel-loader'],exclude:/node_modules/},
      // css
      {test:/\.css$/,use:['style-loader','css-loader']},
      // jpg/png
      {test:/\.(jpg|png)$/,use:['url-loader']},
    ]
  },
  //4. plugins 插件  处理内存 压缩 抽离
  plugins:[
    new htmlWebpackPlugin({
      template:path.join(__dirname,'./src/index.html'),
      filename:'index.html'
    })
  ],

  // webpack 的代理
  devServer: {
    // 真实接口:'https://api.douban.com/v2/movie/in_theaters'
    // https://webpack.js.org/configuration/dev-server/#devserver-proxy
    // http://www.jianshu.com/p/3bdff821f859
    // proxy: 代理 
    proxy: {
      // 使用：/api/movie/in_theaters
      // 访问 ‘/api/movie/in_theaters’ ==> 'https://api.douban.com/v2/movie/in_theaters'
      '/api': {
        target: 'https://api.douban.com/v2',
        // https请求需要次设置
        secure: false,
        // 必须设置该项
        changeOrigin: true,
        // '/api/movie/in_theaters' 路径重写为：'/movie/in_theaters'
        pathRewrite: {"^/api" : ""}
      }
    }
  },
}