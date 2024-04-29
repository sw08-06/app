import { timeParse } from 'd3';

const csv = `time,predictedStress
0,1
1,2
2,6.6
3,7.3
4,5.0
5,3.2
6,1.2
7,2.4
8,3.4
9,6.1
10,6.0
11,5.4
12,3.0
13,7.3
14,5.0
15,3.2
16,1.2
17,2.4
18,3.4
19,6.1
20,1
21,2
22,6.6
23,7.3`;

const data = csv
	.split('\n')
	.slice(1)
	.map((str) => {
		const [timeStr, stressStr] = str.trim().split(',');
		const parseTime = timeParse('%H');
		const time = parseTime(timeStr);
		const stress = parseFloat(stressStr);
		return { time, stress };
	});

export default data;
