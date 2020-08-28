#!/usr/local/bin/python

import re
import json
import urllib.request

from collections import Counter

# Download big.txt file
urllib.request.urlretrieve("http://norvig.com/big.txt", "big.txt")


print("Processing big.txt for use in spellchecking...")

# Create dictionary of words and their counts from the downloaded file
def words(text): return re.findall(r'\w+', text.lower())
WORDS = Counter(words(open('./big.txt').read()))

# Write language model to file
with open('./word_counts.txt', 'w') as file:
    file.write(json.dumps(WORDS))  # use `json.loads` to do the reverse