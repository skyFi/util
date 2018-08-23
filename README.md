# util
JavaScript 非常规工具库

## Install

```shell
npm install leutil

// or
yarn add leutil
```

## CDN
```
https://unpkg.com/leutil@1.0.2/index.js
```

## Api

### isEmail(email: String): Boolean 校验邮箱格式

```javascript
import { isEmail } from 'leutil';

isEmail('abc@def.com');
// => true

isEmail('abcdef.com');
// => false
```

### isPhoneNum(phone: String): Boolean 国内手机号码格式简单校验

```javascript
import { isPhoneNum } from 'leutil';

isPhoneNum('18767565433');
// => true
isPhoneNum('1876756533');
// => false
```