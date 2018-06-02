import { Line } from 'vue-chartjs'

export default {

    extends: Line,
    mounted() {
        this.renderChart({
            labels: ['5.27.', '5.28.', '5.29.', '5.30.', '5.31.', '6.1.', '6.2.'],
            datasets: [{
                label: '서울',
                fill: false,
                backgroundColor: '#B5B7C9',
                data: [Math.floor(Math.random(0.7, 1) * 6000), Math.floor(Math.random(0.7, 1) * 6000), Math.floor(Math.random(0.7, 1) * 6000), Math.floor(Math.random(0.7, 1) * 6000), Math.floor(Math.random(0.7, 1) * 6000), Math.floor(Math.random(0.7, 1) * 6000), Math.floor(Math.random(0.7, 1) * 6000), Math.floor(Math.random(0.7, 1) * 6000)]
            }, {
                label: '부산',
                fill: false,
                backgroundColor: '#8B91AD',
                data: [Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000)]
            }, {
                label: '대전',
                fill: false,
                backgroundColor: '#4E516B',
                data: [Math.floor(Math.random(0.7, 1) * 3000), Math.floor(Math.random(0.7, 1) * 3000), Math.floor(Math.random(0.7, 1) * 3000), Math.floor(Math.random(0.7, 1) * 3000), Math.floor(Math.random(0.7, 1) * 3000), Math.floor(Math.random(0.7, 1) * 3000), Math.floor(Math.random(0.7, 1) * 3000), Math.floor(Math.random(0.7, 1) * 3000)]
            }, {
                label: '대구',
                fill: false,
                backgroundColor: '#2E3347',
                data: [Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500)]
            }, {
                label: '강원',
                fill: false,
                backgroundColor: '#925D78',
                data: [Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500)]
            }, {
                label: '광주',
                fill: false,
                backgroundColor: '#F1C5B5',
                data: [Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500)]
            }, {
                label: '전라',
                fill: false,
                backgroundColor: '#404345',
                data: [Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500)]
            }, {
                label: '충청',
                fill: false,
                backgroundColor: '#5A484B',
                data: [Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500), Math.floor(Math.random(0.7, 1) * 2500)]
            }, {
                label: '경상',
                fill: false,
                backgroundColor: '#996760',
                data: [Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000), Math.floor(Math.random(0.7, 1) * 4000)]
            }]
        }, { responsive: true, maintainAspectRatio: false })
    }
}