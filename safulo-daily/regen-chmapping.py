# coding: utf-8
# 重新產生 ch-mapping.json
# 請勿自動執行本程式 -- 產生出來的 mapping 可能會讓字典搜尋變得很難用。

import json
from dailylib import *
import jieba.posseg as pseg
import re

xxs = {}

old_mapping = json.load(open(CH_MAPPING))
for cmn, stems in old_mapping.items():
    for stem in stems.split(','):
        if cmn not in xxs:
            xxs[cmn] = {}
        xxs[cmn][stem] = 1 + xxs[cmn].get(stem, 0)

from copy import deepcopy
oldmap = deepcopy(xxs)

new_terms = []
for fn in list_vocabs():
    j = json.load(open(fn))
    if 'stem' not in j or j['stem'] == '': 
        continue
    stem = j['stem']
    for h in j['h']:
        for d in h['d']:
            cmn = d['f']
            tagged = [word for word, flag in pseg.cut(cmn) if flag != 'x' and len(word) > 1]
            for t in tagged:
                if t not in xxs:
                    new_terms.append(t)
                    xxs[t] = {}
                xxs[t][stem] = 1 + xxs[t].get(stem, 0)

nx = {}
for k, v in xxs:
    if re.search(r'[a-z]+', k):
        continue
    nx[k.strip()] = ','.join(sorted(v, key=lambda x:v[x], reverse=True))

with open('ch-mapping-new.json') as f:
    f.write(json.dumps(nx, indent=4, ensure_ascii=False))
