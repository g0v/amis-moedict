# coding: utf-8
# Common code for daily routines

import os
from glob import glob

DICT_DIR = '../docs/'
STEM_WORDS = os.path.join(DICT_DIR, 'stem-words.json')
INDEX      = os.path.join(DICT_DIR, 'index.json')
CH_MAPPING = os.path.join(DICT_DIR, 'ch-mapping.json')
CMN_MAX_LEN = 11

def list_vocabs():
    fnx = set(glob('../docs/s/*.json')) - {STEM_WORDS, INDEX, CH_MAPPING}
    return fnx
