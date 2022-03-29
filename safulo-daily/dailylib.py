# coding: utf-8
# Common code for daily routines

import os
from glob import glob
from subprocess import check_output

DICT_DIR = '../docs/s/'
STEM_WORDS = os.path.join(DICT_DIR, 'stem-words.json')
INDEX      = os.path.join(DICT_DIR, 'index.json')
CH_MAPPING = os.path.join(DICT_DIR, 'ch-mapping.json')
CMN_MAX_LEN = 11


def list_vocabs(last=False):
    if last:
        commit = open('./last').read().strip()
        out = check_output(['git', 'diff', '--name-only', f'{commit}..HEAD'])
        fnx = [os.path.join('..', fn) for fn in out.decode('utf-8').split('\n') if fn.startswith('docs/s/')]
    else:
        fnx = glob(os.path.join(DICT_DIR, '*.json'))
    return set(fnx) - {STEM_WORDS, INDEX, CH_MAPPING}

