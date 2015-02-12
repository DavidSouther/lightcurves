### You'll need to [sudo] pip install astropy, ~6mb
from astropy.io import fits

### Easiest way to run this is first do `load.sh`, then

'''
for D in KOI* ; do for F in ${D}/*.fits ; do python process.py $F > ${F/\-[0-9]*/}.json ; done ; done
'''

### A lot of processing later, you'll have all the data in the right places!

import json
import numpy
import math

def isfinite(n): return not (math.isnan(n) or math.isinf(n))
def cols(r): return [r[0], r[2], r[7]]
def numeric(r): return isfinite(r[0]) and isfinite(r[1]) and isfinite(r[2])

def doFile(filename): 
    a = fits.open(filename)
    points = numpy.array(filter(numeric, map(cols, a[1].data)))

    minimum = numpy.nanmin(points[0:,2])
    maximum = numpy.nanmax(points[0:,2])
    print json.dumps({
        'points': points.tolist(),
        'min': minimum,
        'max': maximum
    })

if __name__ == "__main__":
    from sys import argv
    doFile(argv[1])

