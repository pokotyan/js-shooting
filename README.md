# js-game

https://naughty-davinci-839d5c.netlify.com/

javascript でコードを書いて、RPG のような戦闘ができるゲームです。

<img width="874" alt="app" src="https://user-images.githubusercontent.com/20484619/73130623-384e6300-403f-11ea-9320-1512d685e79c.png">

START を押すと戦闘準備のフェーズにうつります。
コードを書いて、「戦闘開始」を押すとバトルが始まります。

<img width="573" alt="スクリーンショット 2020-01-26 13 37 00" src="https://user-images.githubusercontent.com/20484619/73130714-00e0b600-4041-11ea-8fbb-907b3c575840.png">

ターンはプレイヤー => エネミー => プレイヤー ...と繰り返していきます。
プレイヤーの行動は画面左側のエディタで書いたコードで決まります。

コードは以下のように controller を引数にとる関数を return してください。

```js
const script = controller => {
  controller.guard();
  controller.attack();
};
return script;
```

## API 仕様

### Controller

#### attack()

```
攻撃します。
```

#### guard()

```
防御します。
```

## パラメータ

### HP

```
ライフポイントです。0になると負けです。
```

### MP

```
マジックポイントです。今は意味のないパラメータです。そのうち、MPを使うアクションも作る予定です。
```

### AP

```
アクションポイントです。attack(),guard()を実行するたびに1減ります。
```

## 行動の優先順位

`attack()` > `guard()`

防御より、攻撃が優先されます。
そのため、AP が 1 の状態だと下記コードは攻撃のみ行います。

```js
const script = controller => {
  controller.guard();
  controller.attack();
};
return script;
```

## ローカルで起動

```
npm i && npm start
```
