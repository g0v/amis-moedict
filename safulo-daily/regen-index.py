# coding: utf-8
# 重新產生 index.json

import json
from glob import glob
from tqdm import tqdm

INDEX = '../docs/s/index.json'
CMN_MAX_LEN = 11

index = {}
fnx = glob('../docs/s/*.json')
for fn in tqdm(fnx):
    try:
        j = json.load(open(fn))
    except:
        print('跳過:', fn)
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
