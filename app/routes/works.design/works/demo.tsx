import svg from '../assets/work-1.svg'
import parse from 'style-to-object'

export default function Demo() {
  return (
    <div className='h-screen w-screen'>
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 3508 2481'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        style={parse(
          'fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;'
        )}
      >
        <path
          d='M1808,1210.63C1808,1210.63 2001.32,1442.21 2194,1349C2386.68,1255.79 2053.55,780.008 2332,836C2610.45,891.992 2672.93,1103.22 2746,991C2819.07,878.784 2542.39,549.169 2964,572'
          style={parse('fill:none;stroke:black;stroke-width:1px;')}
        />
        <path
          d='M1808,1210.63C1808,1210.63 1901.11,1789.02 1387,1612C872.891,1434.98 1118.5,1693.43 831,1807C543.505,1920.57 429.443,1606.17 237,1816C44.557,2025.83 587.279,2116.93 295.276,2259'
          style={parse('fill:none;stroke:black;stroke-width:1px;')}
        />

        <path
          transform='matrix(1,0,0,1,-11.6147,1.13687e-13)'
          d='M1808,1210.63C1896.77,1117.98 1645.43,479.031 1387,743C1128.57,1006.97 894.414,941.894 851,706C807.586,470.106 534.068,279.506 547,533'
          style={parse('fill:none;stroke:black;stroke-width:1px;')}
        />

        <path
          d='M1808,1210.63C1808,1210.63 1825.44,1805.35 2094,1617C2362.56,1428.65 2870.11,1205.8 2660,1562C2449.89,1918.2 2033,1825.26 2334,1993C2635,2160.74 2914.92,1674.12 2964,2019C3013.08,2363.89 2616.3,2101.11 2902,2294'
          style={parse('fill:none;stroke:black;stroke-width:1px;')}
        />
        <path
          d='M1808,1210.63C1808,1210.63 1789.11,984.533 1434,1114C1078.89,1243.47 1055.63,1479.58 872,1371.12C688.371,1262.65 508.392,723.37 295.276,1121C82.159,1518.63 549.676,1369.78 237,1560'
          style={parse('fill:none;stroke:black;stroke-width:1px;')}
        />
        <path
          d='M1808,1210.63C1808,1210.63 2172.72,972.541 2081,777C1989.28,581.459 1866.74,472.645 2203,473C2539.26,473.355 2539.3,475.266 2570,369'
          style={parse('fill:none;stroke:black;stroke-width:1px;')}
        />
      </svg>
    </div>
  )
}
