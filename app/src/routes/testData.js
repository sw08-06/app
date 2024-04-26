import { timeParse } from 'd3';

const csv = `time,predictedStress
1,5.5
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
12,3.0`;

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
