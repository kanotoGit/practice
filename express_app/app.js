/************** 必須モジュール ************/

// HTTPのエラーに関するモジュール
var createError = require('http-errors');
// Express本体
var express = require('express');
// ファイルパス（ルーティング）
var path = require('path');
// cookie関連
var cookieParser = require('cookie-parser');
// ログ出力
var logger = require('morgan');

/************ ページファイルの読み込み **********/
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var helloRouter = require('./routes/hello');
var formRouter = require('./routes/form');
var apiRouter = require('./routes/api');

/************ Expressオブジェクトの生成 ************/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/************ ミドルウェアの設定 ************/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/******* ルーティング ********/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', helloRouter);
app.use('/form', formRouter);
app.use('/api', apiRouter);

/******* エラーハンドリング ********/
// 404エラーの場合
app.use(function(req, res, next) {
  next(createError(404));
});

// 404エラー以外の場合
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
