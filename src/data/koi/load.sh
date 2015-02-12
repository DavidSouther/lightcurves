### Run this file from this directory. You will get a *lot* of bandwidth.
### It will go through ./files, downloading each of the quarterly candidate results, ~800mp/quarter, 15 quarters.

cat ./files | while read F ; do
    echo $F 
    IFS=', ' read -a P <<< "$F"
    curl http://archive.stsci.edu/pub/kepler/lightcurves/tarfiles/Exoplanet_KOI/${P[1]} > ${P[1]}
done

### Extract each .tgz, and move it to where `st` expects to find them.

for F in $(ls *.tgz) ; do
  tar xf $F
  mv ${F%.tgz} ${${F#Exoplanet_}%_long.tgz}
done
