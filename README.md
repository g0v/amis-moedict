這是阿美語萌典網站 <https://amis.moedict.tw> 線上及離線查詢 App 的源碼庫。

阿美語萌典團隊的 [hackfoldr 傳送門](https://beta.hackfoldr.org/11BRa7Ftnni8Q1NRdjwS378BgBz832UY4uIr-d0J0YpM)。

## About 'Amis moedict

’Amis/Pangcah Dictionary, an online ’Amis to Chinese / English / French dictionary, was established with the power of citizens to preserve the once considered soon-to-disappear indigenous language.

In Taiwan, there are 16 different indigenous nations. Though their languages never developed into writing system, detailed records have been made with the efforts of missionaries and cultural heritage inheritors.

The ’Amis/Pangcah Dictionary is the first example of an digitized, online indigenous language dictionary. We hope that others can develop their own online dictionaries, too.

# Web 開發

## 環境需求

* Node.js: > v12
* Gulp: v4

## 安裝開發環境

```sh
git clone git@github.com:g0v/amis-moedict.git
npm install
npm install gulp-cli --global
make amis
```

## 本機運行

```
make dev
```

相關設定檔案請看

* gulpfile.js
* webpack.config.js

## JSON 結構說明

json 檔案資料夾分類如下：

* s: 蔡中涵大辭典
* * prefix: `#:`
* p: 方敏英字典
* * prefix: `#~`
* m: 潘世光、博利亞阿法字典
* * prefix: `#!`

### JSON 完整欄位

以下兩段是等義的，因為維護者比較習慣看註解格式，但是 TypeScript 電腦可讀，所以兩種格式都附上。

#### 註解格式

    {
      h: [ # Array, required
        {
          name: 'String, optional',
          d: [ # Array, required
            {
              f: 'String, required',
              e: [ # Array, optional
                'String'
              ],
              s: [ # Array, optional
                'String'
              ],
              r: [ # Array, optional
                'String'
              ],
              type: 'String, optional'
            }
          ]
        }
      ],
      t: 'String, required',
      stem: 'String, optional',
      tag: 'String, optional'
    }

#### TypeScript 格式

    type Entry = {
      h: {
        name?: string,
        d: {
          f: string,
          e?: string[],
          s?: string[],
          r?: string[],
          type?: string
        }[]
      }[],
      t: string,
      stem?: string,
      tag?: string,
    };

### 欄位說明

* h：沿襲自萌典的 heteronym，本專案中為了盡量與萌典格式接近而保留。
* * name：字詞名稱，字詞含有大寫時，就會使用 name；若全小寫，則使用 t。
* * d：定義 definitions，一個詞 (t) 可能會有多個定義。
* * * f：解釋 description，一個定義 (d) 只會有一個解釋。
* * * e：範例 example，屬於解釋 (f)。
* * * s：同義詞 synonym 或 alternative，屬於解釋 (f)。
* * * r：參考詞 reference，屬於解釋 (f)，只有蔡中涵大辭典有使用。。
* * * type：（潘世光、博利亞的字典本來就有的標記，意義待確認，歡迎 PR），只有潘世光、博利亞阿法字典有使用。
* t：沿襲自萌典的 title，本專案中就是字詞。
* stem：詞幹，只有蔡中涵大辭典有使用。
* tag：重疊構詞 repetition，只有蔡中涵大辭典有使用。

## Deploy production 步驟

如果有改到 js 或 css

```
$ make manifest
$ git add .
$ git commit -m 'Run `make manifest` and rebuild deps.js'
$ git push
```

如果有改到字典檔案，如更新蔡中涵大辭典

```
$ make manifest
$ make amis-static
$ git add .
$ git commit -m 'Update amis-static'
$ git push
```

# 字典相關

## 重新編譯字典

### 編譯環境需求

* Node.js v6+
* Perl 5.8.0+
* Python
* Ruby

#### 編譯指令說明

全部字典重編：

* 方敏英字典
* 潘世光、博利亞阿法字典
* 蔡中涵大辭典

```
make amis-build
```

只重編方敏英字典

```
make amis-fey
```

只重編潘世光、博利亞阿法字典

```
make amis-poinsot
```

只重編蔡中涵大辭典

```
make amis-safolu
```

### Docker

```
$ docker-sync start
$ docker-compose up -d
$ docker-compose exec app bash
```

進入 docker 後

```
$ npm install gulp-cli --global # 沒有 gulp 指令可用時，跑這行
$ gulp static-here
```

# 授權

## 字典授權

* 蔡中涵阿美語大辭典，由蔡中涵博士提供 g0v 及阿美語萌典無償使用。
* 方敏英阿美語字典（Virginia Fey 編著），由台灣聖經公會提供紙本，並經由鄉民 OCR 電子化，採用 CC BY-NC 授權。
* 博利亞潘世光神父阿美語-法語、阿美語-漢語字典，由天主教巴黎外方會的潘世光神父（Maurice Poinsot）、博利亞神父（Louis Pourrias）提供，採用 CC BY-NC 授權。


## Logo 字型

目前 Logo 使用 [Century® Schoolbook](https://www.myfonts.com/fonts/bitstream/century-schoolbook/) 這個字體。

## CC0 1.0 公眾領域貢獻宣告

詳細宣告參見[LICENSE.txt](/LICENSE.txt)。
