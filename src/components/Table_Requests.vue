<template>
    <v-card>
            <v-card-title>
                <h2>요청 현황</h2>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-data-table
                :headers="headers"
                :items="cars"
                :pagination.sync="pagination"
                select-all
                item-key="transactionTimestamp"
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
                <td>{{ props.item.transactionTimestamp }}</td>
                <td class="text-xs-right">{{ props.item.Requester }}</td>
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
        sortBy: 'transactionTimestamp'
      },
      headers: [
        {
          text: '요청 시간',
          align: 'left',
          value: 'transactionTimestamp'
        },
        { text: '요청자 ID', value: 'Requester' },
      ],
      cars: [
        {
          value: false,
          transactionTimestamp: '1132',
          Requester : "1",
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
