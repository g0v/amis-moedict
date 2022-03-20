# -*- coding: utf8 -*-
# 自動補充 ch-mapping.json
# 效果比較差，但是先這樣吧... (ry

import os
import json
from dailylib import *

mapping = json.load(open(CH_MAPPING))
words = {x.split('/')[-1][:-5] : 1 for x in list_vocabs(last=False)}

new_map = {}
for k, v in mapping.items():
    wx = [x.strip() for x in v.split(',')]
    for w in wx:
        if w in words:
            del words[w]
    new_map[k] = wx

print(f'{len(words)} 個詞不在中文搜尋檔中...')

def split_ch(s):
    """Split by Mandarin punctuations
"使之統領、集合、聚集了。" => ["使之統領", "集合", "聚集了"]
"""
    import re
    s = re.sub(r'[(（〈〔].+[）)〉〕]', '', s)
    s = re.split(r'[、。，；]', s)
    s = [x.strip().rstrip('了') for x in s if len(x) > 0]
    return s

for w in words:
    fn = os.path.join(DICT_DIR, w+'.json')
    if not os.path.exists(fn):
        print(f'找不到 {fn}')
        continue
    lex = json.load(open(fn))
    hdf = split_ch(lex['h'][0]['d'][0]['f'])
    for h in hdf:
        if h == '':                 # 奇怪的空白
            continue
        if not h in new_map:
            new_map[h] = []
        # print(f'{h} <- {w}')
        new_map[h].append(w)

output = {}
for k, v in new_map.items():
    if k.find('`') != -1 or k.find('~') != -1:  # 總之有問題
        continue
    output[k] = ','.join(v)

with open('ch-mapping.json', 'w') as f:
    json.dump(output, f, ensure_ascii=False, indent=2, sort_keys=True)
