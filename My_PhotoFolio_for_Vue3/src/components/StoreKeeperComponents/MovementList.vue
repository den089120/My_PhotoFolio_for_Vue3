<template>
    <div class="container">
        <table class="table table-bordered border-success">
            <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Наименование</th>
                    <th scope="col">Количество</th>
                    <th scope="col">убыло со склада</th>
                    <th scope="col">прибыло на склад</th>
                    <th scope="col">дата</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="el in movementList" :key="el.id">
                    <th scope="row">{{ el.id }}</th>
                    <td>{{ el.nameProd }}</td>
                    <td>{{ el.countProd }}</td>
                    <td>{{ el.warehouseSource }}</td>
                    <td>{{ el.warehouseDist }}</td>
                    <td>{{ el.dateProd }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: "MovementList",
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      movementList: "Keeper/movementList",
    }),
  },
}
</script>

<style scoped>
</style>