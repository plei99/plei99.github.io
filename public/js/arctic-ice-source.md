# Arctic sea ice

The globe and fallback illustration use **August 2026 monthly sea-ice extent**
from [NSIDC Sea Ice Index, Version 4](https://nsidc.org/data/g02135/versions/4).
This is a fixed monthly snapshot, not a live map or an ice-shelf boundary.

Source data:
[extent_N_202608_polygon_v4.0.zip](https://noaadata.apps.nsidc.org/NOAA/G02135/north/monthly/shapefiles/shp_extent/08_Aug/extent_N_202608_polygon_v4.0.zip).
Visual reference:
[NSIDC August 2026 extent map](https://noaadata.apps.nsidc.org/NOAA/G02135/north/monthly/images/08_Aug/N_202608_extn_v4.0.png).
Accessed September 18, 2026.

Fetterer, F., Knowles, K., Meier, W. N., Savoie, M., Windnagel, A. K., and
Stafford, T. (2025). _Sea Ice Index_ (G02135, Version 4). National Snow and Ice
Data Center. [doi:10.7265/a98x-0f50](https://doi.org/10.7265/a98x-0f50). Subset:
Northern Hemisphere, August 2026, monthly extent polygons.

The original 126 shapefile features were converted to 144 polygons using
shapefile 0.6.6 and proj4 2.15.0. The 1,552 vertices were retained and rounded
to four decimal places after projection to geographic longitude and latitude.
Ring orientation was normalized for D3's spherical renderer. No invented
boundary or smoothing was added. Land is painted afterward using the site's
existing country map; Greenland uses the ordinary land color.

The source `.prj` identifies NSIDC Sea Ice Polar Stereographic North
(EPSG:3411). Conversion uses NSIDC's explicit projection parameters because the
shapefile's WKT does not explicitly specify a 90-degree projection center:

```text
+proj=stere +lat_0=90 +lat_ts=70 +lon_0=-45
+a=6378273 +rf=298.279411123064 +units=m +no_defs
```

Projection reference:
[NSIDC polar stereographic guide](https://nsidc.org/ru/node/52236). The origin
was checked against the North Pole, and the converted polygon contains the North
Pole while excluding the equator and South Pole.
