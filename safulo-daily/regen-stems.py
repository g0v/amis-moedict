# coding: utf-8
# 重新產生 stem-words.json

import json
from dailylib import *

stems = {}
for fn in list_vocabs():
    j = json.load(open(fn))
    if 't' not in j or 'stem' not in j or j['stem'] == '': 
        continue
    if j['stem'] not in stems:
        stems[j['stem']] = []
    t = j['t']
    cmn = ''
    try:
        cmn = j['h'][0]['d'][0]['f'][:CMN_MAX_LEN]
    except:
        pass
    stems[j['stem']].append(t + u'\ufffa' + cmn)

print(f'總共有 {len(stems)} 個詞幹.')

with open(STEM_WORDS, 'w') as f:
    f.write(json.dumps(stems, ensure_ascii=False))
