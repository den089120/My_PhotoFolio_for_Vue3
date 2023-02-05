<template>
    <div class="container">
        <table class="table table-bordered border-success">
            <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Наименование</th>
                    <th scope="col">Количество</th>
                    <th scope="col">Склад</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="el in TMS_List" :key="el.id">
                    <th scope="row">{{ el.id }}</th>
                    <td>{{ el.nameProd }}</td>
                    <td>{{ el.countProd }}</td>
                    <td>{{ getList(el.wareObjId) }}</td>
                    <td>
                        <RouterLink v-if="loginIn.isLogin" :to="{ name: 'T_M_S_Update'}" class="btn btn-outline-info btn-sm me-4" @click="setElement(el)">ПЕРЕМЕСТИТЬ</RouterLink>
                        <RouterLink v-if="loginIn.isLogin" :to="{ name: 'T_M_S_Remove'}" class="btn btn-outline-danger btn-sm" @click="setElement(el)">ВЫДАТЬ</RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
export default {
  name: "T_M_S_List",
  data() {
    return {
      wareStr: '',
    }
  },
  computed: {
    ...mapState({
      loginIn: state => state.General.loginIn,
      Warehouse: state => state.Keeper.Warehouse,
    }),
    ...mapGetters({
      TMS_List: "Keeper/TMS_List",
    }),
  },
  // mounted() {
  //   this.wareStr = this.getList()
  // }
  methods: {
    ...mapMutations({
      setElement: "Keeper/setElement",
    }),
    getList(obj) {
      let key = Object.keys(obj)
      let arr = []
      key.forEach( el => {
        if (parseInt(obj[el]) > 0) {
          arr.push(this.Warehouse.find( e => e.id === parseInt(el)).name)
        }
      })
      return arr.join(', ')
    },
  },
}
</script>

<style scoped>
</style>