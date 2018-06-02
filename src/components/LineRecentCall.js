import {Line} from 'vue-chartjs'

export default {

  extends: Line,
  mounted () {
    this.renderChart({
      labels: ['3일', '2일', '1일'],
      datasets: [
        {
          label: '서울',
          backgroundColor: '#FC2525',
          data: [40, 39, 10]
        },{
          label: '부산',
          backgroundColor: '#05CBE1',
          data: [60, 55, 32]
        },{
          label: '대전',
          backgroundColor: '#05CBE1',
          data: [60, 55, 32]
        },{
          label: '대구',
          backgroundColor: '#05CBE1',
          data: [60, 55, 32]
        },{
          label: '강원',
          backgroundColor: '#05CBE1',
          data: [60, 55, 32]
        },{
          label: '광주',
          backgroundColor: '#05CBE1',
          data: [60, 55, 32]
        },{
          label: '전라',
          backgroundColor: '#05CBE1',
          data: [60, 55, 32]
        },{
          label: '충청',
          backgroundColor: '#05CBE1',
          data: [60, 55, 32]
        },{
          label: '경상',
          backgroundColor: '#05CBE1',
          data: [60, 55, 32]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
}
}
