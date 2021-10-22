//index.html スクロールすると動く部分

  // 動きのきっかけとなるアニメーションの名前を定義
  function fadeAnime() {

    //動くきっかけのクラス名と動きのクラス名の設定
    $('.smoothTrigger').each(function () {
      //smoothTriggerというクラス名が
      var elemPos = $(this).offset().top - 30;
       //要素より、50px上の
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight) {
        $(this).addClass('smooth');
        // 画面内に入ったらfadeInというクラス名を追記
      } else {
        $(this).removeClass('smooth');
        // 画面外に出たらfadeInというクラス名を外す
      }
    });

    //関数でまとめることでこの後に違う動きを追加することが出来ます
    $('.flipDownTrigger').each(function () {
       //flipDownTriggerというクラス名が
      var elemPos = $(this).offset().top - 60;
       //要素より、50px上の
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight) {
        $(this).addClass('flipDown');
        // 画面内に入ったらfadeDownというクラス名を追記
      } else {
        $(this).removeClass('flipDown');
        // 画面外に出たらfadeDownというクラス名を外す
      }
    });
  }

  //ここまで動くきっかけのクラス名と動きのクラス名の設定

  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function () {
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  fadeAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述


//モーダルの動き
$(function () {
  $('.js-modal-open').on('click', function () {
    $('.js-modal').fadeIn();
    return false;
  });
  $('.js-modal-close').on('click', function () {
    $('.js-modal').fadeOut();
    return false;
  });
});

  // index.htmlのギラギラボタン
  $('.fun-btn').on('click', function (event) {
    $(this).toggleClass('start-fun');
    var $page = $('.page');
    $page.toggleClass('color-bg-start')
      .toggleClass('bg-animate-color');

    //change text when when button is clicked
    $(this).hasClass('start-fun') ?
      $(this).text('stop the fun') :
      $(this).text('start the fun');
  });


  //index.htmlからmouce.htmlへの画面遷移

  $(window).on('load', function () {
    $("#splash").delay(300).fadeOut('slow', function () {//ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述
      $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与
      var h = $(window).height();//ブラウザの高さを取得
      $(".splashbg").css({
        "border-width": h,//ボーダーの太さにブラウザの高さを代入
        "animation-name": "backBoxAnime"//animation-nameを定義
      });
    });
    $("#splash-logo").delay(1200).fadeOut('slow');//ロゴを1.2秒でフェードアウトする記述
  });

  // mouse.htmlの文字をカーブ
  $(function () {
    $('#main_header').arctext({ radius: 600 });
  });


  //マウスを乗せたら猫がでる
    $('#cheese').hover(function () {

      //マウスを乗せたとき
      $('#main_header').css('color', '#ed254e')
        .text('!?');
      $('#mouse').css('transform', 'scale(0.5)');
      $('#cat_01').toggleClass('show');
      // $('#cat_01').feedIn(1500);

        //マウスを離したとき
    }, function () {

      //色指定を空欄にすれば元の色に戻る
      $('#main_header').css('color', '')
        .text('Cheese academy?');
      $('#mouse').css('transform', 'scale(1)');
      $('#cat_01').removeClass('show');
      $('#cat_01').addClass('delete');
      
      
    });


var unit = 100,
  canvasList, // キャンバスの配列
  info = {}, // 全キャンバス共通の描画情報
  colorList; // 各キャンバスの色情報

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
  info.seconds = 0;
  info.t = 0;
  canvasList = [];
  colorList = [];
  // canvas1個めの色指定
  canvasList.push(document.getElementById("waveCanvas"));
  colorList.push(['#43c0e4']);
  // 各キャンバスの初期化
  for (var canvasIndex in canvasList) {
    var canvas = canvasList[canvasIndex];
    canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
    canvas.height = 200;//波の高さ
    canvas.contextCache = canvas.getContext("2d");
  }
  // 共通の更新処理呼び出し
  update();
}

function update() {
  for (var canvasIndex in canvasList) {
    var canvas = canvasList[canvasIndex];
    // 各キャンバスの描画
    draw(canvas, colorList[canvasIndex]);
  }
  // 共通の描画情報の更新
  info.seconds = info.seconds + .014;
  info.t = info.seconds * Math.PI;
  // 自身の再起呼び出し
  setTimeout(update, 35);
}

/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
function draw(canvas, color) {
  // 対象のcanvasのコンテキストを取得
  var context = canvas.contextCache;
  // キャンバスの描画をクリア
  context.clearRect(0, 0, canvas.width, canvas.height);

  //波を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
  drawWave(canvas, color[0], 1, 3, 0);//drawWave(canvas, color[0],0.5, 3, 0);とすると透過50%の波が出来る
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
  var context = canvas.contextCache;
  context.fillStyle = color;//塗りの色
  context.globalAlpha = alpha;
  context.beginPath(); //パスの開始
  drawSine(canvas, info.t / 0.5, zoom, delay);
  context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
  context.lineTo(0, canvas.height); //パスをCanvasの左下へ
  context.closePath() //パスを閉じる
  context.fill(); //波を塗りつぶす
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawSine(canvas, t, zoom, delay) {
  var xAxis = Math.floor(canvas.height / 2);
  var yAxis = 0;
  var context = canvas.contextCache;
  // Set the initial x and y, starting at 0,0 and translating to the origin on
  // the canvas.
  var x = t; //時間を横の位置とする
  var y = Math.sin(x) / zoom;
  context.moveTo(yAxis, unit * y + xAxis); //スタート位置にパスを置く

  // Loop to draw segments (横幅の分、波を描画)
  for (i = yAxis; i <= canvas.width + 10; i += 10) {
    x = t + (-yAxis + i) / unit / zoom;
    y = Math.sin(x - delay) / 3;
    context.lineTo(i, unit * y + xAxis);
  }
}

init();



