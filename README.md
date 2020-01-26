# js-game
javascriptでコードを書いて、RPGのような戦闘ができるゲームです。

画面左側のエディタで書いたコードで行動が決まります。

以下のようにcontrollerを引数にとる関数をreturnしてください。

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
そのため、APが1の状態だと下記コードは攻撃のみ行います。

```js
const script = controller => {
  controller.guard();
  controller.attack();
};
return script;
```