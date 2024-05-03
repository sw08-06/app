import Highcharts from 'highcharts';

// @ts-ignore
export default (node, config) => {
    const redraw = true;
    const oneToOne = true;
    const chart = Highcharts.chart(node, config);

    return {
        // @ts-ignore
        update(config) {
            chart.update(config, redraw, oneToOne);
        },
        destroy() {
            chart.destroy();
        }
    };
}