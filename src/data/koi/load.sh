cat ./files | while read F ; do
    echo $F 
    IFS=', ' read -a P <<< "$F"
    curl http://archive.stsci.edu/pub/kepler/lightcurves/tarfiles/Exoplanet_KOI/${P[1]} > ${P[1]}
done
