# Light Curve and Exoplanets

*Manuals for the Kepler public data*
 - http://archive.stsci.edu/kepler/manuals/Data_Characteristics.pdf
 - http://archive.stsci.edu/kepler/manuals/archive_manual.pdf

![The Exoplanet Gold Rush](http://i.imgur.com/4S65Wo2.gif)

## Kepler Overview

- The Craft
	- Launched March 7, 2009 in operation (with some mission changes fixes) since.
	- Looks for exoplanets
		- Transit Method
			- sees the drop in light as a planet passes between the star and Kepler.
			- [Animation](https://www.youtube.com/watch?v=a4M4Es3aQ7M)
			- Minimum three passes to be a candidate, and then lots of processing.
	- The Field of View
		- 156,000 Target Stars
			- [Schematic](http://upload.wikimedia.org/wikipedia/commons/0/07/Kepler_FOV_hiRes.jpg)
			- [Wide angle](http://upload.wikimedia.org/wikipedia/commons/2/28/MilkywaykeplerfovbyCRoberts.jpg)
			- [Tight angle](http://upload.wikimedia.org/wikipedia/commons/0/02/329161main_fullFFIHot300.png)
			- [Volume](http://upload.wikimedia.org/wikipedia/commons/b/be/LombergA1024.jpg)
	- The Instruments
		- [CCD detectors](http://upload.wikimedia.org/wikipedia/commons/2/2a/Keplerspacecraft-FocalPlane-cutout.svg) with *very* careful calibration, 1 pixel per star.
	- The Data
		- Released Publicly
		- FITS - open format (Show .tbl)
- Angular & SVG
	- Loading Data
		- [Retrieve][retrieval_instructions]
		- Pre-massage
			- hah [bash](https://github.com/DavidSouther/lightcurves/blob/master/src/data/koi/load.sh) & [python](https://github.com/DavidSouther/lightcurves/blob/master/src/data/koi/process.py) :)
		- Small APIs and static JSON.
	- Scatter Plots
		- circle cx, cy, r
		- Scales
			- [Lots of d3 code.](https://github.com/davidsouther/d3-util)
			- Exposes d3’s scales on $scope.$scales
	- Paths, Fills, Colors
	- Animations - DrawPath
- SVG Glossary
	- circle, rect, line, path, text
	- cx, cy, r, x, y, height, width, d
	- fill, stroke
	- css


## Kepler Glossary
**TIME [64-bit floating point]** – The time at the mid-point of the cadence in BKJD. Kepler Barycentric Julian Day is Julian day minus 2454833.0 (UTC=January 1, 2009 12:00:00) and corrected to be the arrival times at the barycenter of the Solar System. The pipeline uses the right ascension and declination of the object (found in the primary header), along with the location of the spacecraft at the time of the cadence to perform this calculation.

**SAP_FLUX [32-bit floating point]** – The flux in units of electrons per second contained in the optimal aperture pixels collected by the spacecraft. This light curve is the output of the PA module in the SOC pipeline.

**PDCSAP_FLUX [32-bit floating point]** – The flux contained in the optimal aperture in electrons per second after the PDC module has applied its detrending algorithm to the PA light curve.

Date = YYYYDDDHHMMSS

*Cadence* A cadence is the frequency with which summed data are read out of the SDA. Short cadence is a 1-minute sum while long cadence is a 30-minute sum.
*SLC* Short Cadence (1 minute)
*LLC* Long Cadence (30 minutes)
*SDA* Science Data Accumulator (The camera)
*SAP* Simple Aperture Photometry
*PDC* Pre-search Data Conditioning Module
*PDC-LS* Least Squares Pre-search Data Conditioning Module


Candidate Systems:

*HTTP 419 Not a Planet*

Kepler-2b/HAT-P-7b (KIC 10666592)
Kepler-20 (KIC-6850504)
Kepler 444 - KIC 6278762

KOI-74 (KIC 6889235) (Not a planet)
