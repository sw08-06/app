import { writable } from 'svelte/store';
import type { DonutChartData } from '$lib/types';

export const donutChartStore = writable<DonutChartData[]>([]);

export const donutChartDateStore = writable<string>();
