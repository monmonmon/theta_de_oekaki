// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

window.jQuery(function($) {
    var index_url = $('#index').data('index');
    var url = $('#url').data('url');
    var channel = $('#channel').data('channel');

    $.getJSON(index_url + '/' + channel, function(d) {
        window.client = new Yanoo.Client(url, channel);

        $('#debug-write').html('シェイプをすべて読み込みました<br />');
        $('#send').on('click', function() {
            window.client.append({
                "sender":  window.client.sender_id,
                "theta_id": channel,
                "type_id": 1,
                "image_id": 1,
                "shape_id": 1,
                "pos": [
                    {
                        "color": "#ff00ee",
                        "x": 10,
                        "y": 20,
                        "z": 30
                    }
                ]
            });
        });
    });
});
