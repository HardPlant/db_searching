<template>
    <v-card>
            <v-card-title>
                <h2>응급실 현황</h2>
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-data-table
                :headers="headers"
                :items="beds"
                :pagination.sync="pagination"
                select-all
                item-key="BedID"
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
                <td>{{ props.item.BedID }}</td>
                <td class="text-xs-right">{{ props.item.x }}</td>
                <td class="text-xs-right">{{ props.item.y }}</td>
                <td class="text-xs-right">{{ props.item.isOccupied }}</td>
                <td class="text-xs-right">{{ props.item.owner }}</td>
                </tr>
                </template>
                </v-data-table>
            </v-card-text>
        </v-card>
</template>

<script>
export default {data : ()=>({
      pagination: {
        sortBy: 'BedID'
      },
      headers: [
        {
          text: '차 ID',
          align: 'left',
          value: 'BedID'
        },
        { text: '위도', value: 'x' },
        { text: '경도', value: 'y' },
        { text: '점유중', value: 'isOccupied' },
        { text: '소유자', value: 'owner' },
      ],
      beds: [
        {
          value: false,
          BedID: '1',
          x : "100.1000",
          y : "215.3000",
          isOccupied : "대기 중",
          owner : "삼성서울병원"
        },
      ]
    }),
methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.beds.slice()
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
