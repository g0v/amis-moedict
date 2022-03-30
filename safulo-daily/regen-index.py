# coding: utf-8
# 重新產生 index.json

import json
from dailylib import *

index = {}
for fn in list_vocabs():
    try:
        j = json.load(open(fn))
    except:
        print('錯誤的 json 檔:', fn)
        continue
    if 't' not in j:
        continue
    t = j['t']
    try:
        cmn = j['h'][0]['d'][0]['f'][:CMN_MAX_LEN]
    except:
        print('跳過:', t)
        continue
    index[t] = t + u'\ufffa' + cmn

print(f'共有 {len(index)} 個詞')
sorted_index = [index[k] for k in sorted(index, key=lambda x:-len(x))]

with open(INDEX, 'w') as f:
    f.write(json.dumps(sorted_index, ensure_ascii=False))
