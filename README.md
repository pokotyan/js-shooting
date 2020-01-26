# js-game

https://naughty-davinci-839d5c.netlify.com/

javascript でコードを書いて、RPG のような戦闘ができるゲームです。

画面左側のエディタで書いたコードで行動が決まります。

以下のように controller を引数にとる関数を return してください。

```js
const script = controller => {
  controller.guard();
  controller.attack();
};
return script;
```

## Controller

### Method

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
