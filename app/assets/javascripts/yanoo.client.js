
var Yanoo = typeof Yanoo === 'object' || {};

/**
 * Websocketクライアント
 */
Yanoo.Client = function(url, theta_id, sender_id) {
    var This = this;

    /**
     * ブロードキャストした際に自分のリクエストか他人のリクエストか見分けるためのID
     */
    This.sender_id = sender_id || ~~(new Date);

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
        conn.trigger('append', JSON.stringify(sharps), function() {
            alert('faild');
        });
    };

    /**
     * 新しいシェイプが送られてきた
     */
    channel.bind('shape', function(response) {
        if (response.data.sender === This.sender_id) {
            logger().log('新しいシェイプを送信しました');
        } else {
            logger().log('新しいシェイプが送られてきました');
            logger().log(response);
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

