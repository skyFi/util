# LESCROLL

名字由来: le + scroll = 乐控滚动(lescroll)。

让禁止/开启滚动变得轻松,让你不再担心去检查所有的滚动是不是都禁止了。

## Install

```Shell
npm install -g npm
npm install lescroll --save
```

## Usage

```JavaScript
const lescroll = require('lescroll');
// or
import lescroll from 'lescroll';

// 功能一:
// 禁止所有滚动;
lescroll.disableScroll();
// 取消禁止所有滚动
lescroll.enableScroll();

// 功能二:
// 解决移动端浮层输入框光标错位/抖动的问题
lescroll.disableScroll(true);
// 取消
lescroll.enableScroll(true);

```

PS: 禁止后记得在适当的时候取消禁止,如:在React的Component卸载的时候取消禁止
```JavaScript
componentWillUnmount() {
    lescroll.enableScroll();
    // or
    lescroll.enableScroll(true);
}
```