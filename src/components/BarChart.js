import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    mounted() {
        // Overwriting base render method with actual data.
        this.renderChart({
            labels: ['5.27.', '5.28.', '5.29.', '5.30.', '5.31.', '6.1.', '6.2.'],
            datasets: [{
                label: '응급의료요청 응답 수',
                backgroundColor: '#000000',
                data: [Math.floor(Math.random(0.7, 1) * 100), Math.floor(Math.random(0.7, 1) * 100), Math.floor(Math.random(0.7, 1) * 100), Math.floor(Math.random(0.7, 1) * 100), Math.floor(Math.random(0.7, 1) * 100), Math.floor(Math.random(0.7, 1) * 100), Math.floor(Math.random(0.7, 1) * 100), Math.floor(Math.random(0.7, 1) * 100), Math.floor(Math.random(0.7, 1) * 100), ]
            }]
        })
    }
}