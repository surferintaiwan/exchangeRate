## 專案說明
撰寫匯率轉換 API

## 套件使用
* 開發語言: node.js + typescript
* 框架: express
* 測試: mocha + should.js
* 覆蓋率檢查: nyc

## 目錄結構
* app.ts: 專案進入點
* /data: 測試資料
* /routes
* /helper
* /test: test cases


## 使用方式
1. `npm install` 安裝相依套件
2. `npm run dev` 即可於本地執行程式
3. `npm run test` 即可於本地執行 test cases
4. `npm run cover` 即可於本地執行 nyc 並獲得覆蓋率報表
5. 呼叫 API
```
method: POST
request body(json):  {
    "source": "TWD",
    "target": "JPY",
    "amount": "123456"
}
url: http://localhost/api/currency/convert
```

## API 文件
https://app.swaggerhub.com/apis-docs/surferintaiwan/exchangeRate/1.0.0#/default/currencyConvert