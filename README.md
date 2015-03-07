## UTF-8

すべての文字列は UTF-8 エンコーディングです。

## JSON

すべてのレスポンスは JSON 形式です。


## ページリクエスト

### パラメータ(QueryString)

| key      | 説明              |
|----------|-------------------|
| url_hash | URLのハッシュキー |


### レスポンス(JSON)

```JSON
{
  "result": "OK" || "error",
  "image_url": "http://xxxxxxxxx.com/#{theta_uploaded_url}.png", // THETAからアップロードされた画像
  "data": {
    "theta_id": 1,
    "type_id": 1, // 1=画像, 2=色
    "image_id": 1, // 画像ID
    "shape_id": 1, // 1固定
    "pos": [
      {
        "color": "#ff00ee",
        "y": 100,
        "x": 100,
        "z": 100
      },
      {
        "color": "#ff00ee",
        "y": 200,
        "x": 200,
        "z": 200
      },
      {
        "color": "#ff00ee",
        "y": 300,
        "x": 300,
        "z": 300
      }
    ]
  },
  "meta": {
    "requested": 1377003045,
    "exec_time": 0.089531    
  }
  
}
```

---


## シェイプ追加リクエスト(Websocket＆JSON)

### リクエスト(JSON)

websocketでJSONエンコードしたパラメータを渡します

```
{
  "theta_id": 1,
  "type_id": 1, // 1=画像, 2=色
  "image_id": 1, // 画像ID
  "shape_id": 1, // 1固定
  "pos": [
    {
      "color": "#ff00ee",
      "y": 100,
      "x": 100,
      "z": 100
    },
    {
      "color": "#ff00ee",
      "y": 200,
      "x": 200,
      "z": 200
    },
    {
      "color": "#ff00ee",
      "y": 300,
      "x": 300,
      "z": 300
    }
  ]
}
```

### レスポンス(JSON)

```JSON
{
  "result": "OK" || "error",
  "data": {
    "url_hash": "xxxxxxxx",
  },
  "meta": {
    "requested": 1377003045,
    "exec_time": 0.089531    
  }
  
}
```


## テーブル構造


### thetaテーブル

| キー      | 型      | 例 |
|-----------|---------|----|
| id        | integer | |
| url_hash  | string  | http://xxxxxxxxx.com/#{url_hash} |
| image_url | string  | http://xxxxxxxxx.com/#{theta_uploaded_url}.png |


### 操作テーブル(描画するオブジェクト)

| キー      | 型      | 例 |
|-----------|---------|----|
| theta_id | references | シータ画面ID
| type_id  | references | 1=画像、 2=色                 
| image_id | references | ヒヨコ画像ID 
| shape_id | reference  | シェイプID(とりあえず1固定)
| pos      | text       | 座標リスト JSON？


### 画像マスタ


| キー      | 型      | 例 |
|-----------|---------|----|
| id       | integer | ID                        |
| url      | text    | http://xxxxxxxxxx/yyy.png |
