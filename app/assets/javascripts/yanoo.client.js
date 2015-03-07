
var Yanoo = typeof Yanoo === 'object' || {};

/**
 * Websocketクライアント
 */
Yanoo.Client = function(url, theta_id, sender_id) {
    var This = this;

    /**
     * ブロードキャストした際に自分のリクエストか他人のリクエストか見分けるためのID
     * そのとき開いているブラウザの中でユニークであればいいので厳密にやらなくても良い
     */
    sender_id = sender_id || (~~(new Date / 1000)) + Math.random();

    /**
     * Websocketに接続する
     */
    var conn = new WebSocketRails(url);

    // チャンネル
    var channel = conn.subscribe(theta_id);

    /**
     * シェイプ追加をサーバにリクエストする
     */
    This.append = function(sharps) {
        logger().log('request');
        logger().log(sharps);
        sharps.sender = sender_id;
        sharps.theta_id = theta_id;
        conn.trigger('append', JSON.stringify(sharps), function() {
            alert('faild');
        });
    };

    /**
     * 新しいシェイプが送られてきた
     */
    channel.bind('shape', function(response) {
        if (response.data.sender === sender_id) {
            logger().log('新しいシェイプを送信しました');
        } else {
            logger().log('新しいシェイプが送られてきました');
            logger().log(response);

			if (response.result == "OK") {
				theta.renderStroke(response.data);
			}
        }
    });

    /**
     * デバッガー
     */
    var logger = function() {
        if ($('#debug-write').size() > 0) {
            return {
                log: function(str) {
                    $('#debug-write').html($('#debug-write').html() + '[ID: ' + theta_id + ']' + str + '<br />');
                    window.console.log(str);
                }
            };
        } else {
            return window.console;
        }
    };
};
