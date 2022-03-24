# coding: utf-8
# 重新產生 stem-words.json

import json
from glob import glob

STEM_WORDS = '../docs/s/stem-words.json'
CMN_MAX_LEN = 11

stems = {}
fnx = glob('../docs/s/*.json')
for fn in fnx:
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

print(f'There are {len(stems)} stems.')

with open(STEM_WORDS, 'w') as f:
    f.write(json.dumps(stems, ensure_ascii=False))
