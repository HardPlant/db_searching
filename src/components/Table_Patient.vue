<template>
    <v-card>
            <v-card-title>
                <h2>환자 현황</h2>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-data-table
                :headers="headers"
                :items="cars"
                :pagination.sync="pagination"
                select-all
                item-key="PatientID"
                class="elevation-1"
                >
                <template slot="headers" slot-scope="props">
                <tr>
                <th
                v-for="header in props.headers"
                :key="header.text"
                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                @click="changeSort(header.value)"
                >
                <v-icon small>arrow_upward</v-icon>
                {{ header.text }}
                </th>
                </tr>
                </template>
                <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="props.selected = !props.selected">
                <td>{{ props.item.PatientID }}</td>
                <td class="text-xs-right">{{ props.item.x }}</td>
                <td class="text-xs-right">{{ props.item.y }}</td>
                </tr>
                </template>
                </v-data-table>
            </v-card-text>
        </v-card>
</template>

<script>
export default {data : ()=>({
      pagination: {
        sortBy: 'PatientID'
      },
      headers: [
        {
          text: '환자 ID',
          align: 'left',
          value: 'PatientID'
        },
        { text: '현재 위도', value: 'x' },
        { text: '현재 경도', value: 'y' }
      ],
      cars: [
        {
          value: false,
          PatientID: '1',
          x : "100.1000",
          y : "215.3000",
        },
      ]
    }),
methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.cars.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      }
    }
}
</script>

<style>

</style>
