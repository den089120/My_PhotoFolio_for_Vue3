<template>
    <div class="container">
        <form>
            <div class="mb-3">
                <label for="exampleInputTMS1" class="form-label">Наименование ТМЦ</label>
                <input type="text" class="form-control" id="exampleInputTMS1" v-model="nameProd">
            </div>

            <div class="mb-3">
                <label for="exampleInputWarehouse1" class="form-label">На какой склад</label>
                <select v-model="nameId" id="exampleInputWarehouse1" class="form-select" aria-label="Default select example">
                    <option selected disabled>ВЫБРАТЬ СКЛАД</option>
                    <option v-for="el in Warehouse" :key="el.id" :value="el.id">{{el.name}}</option>
                </select>
                <div v-if="!nameId" id="exampleInputTMSHelp" class="form-text">Не выбран склад!</div>
            </div>

            <div class="mb-3">
                <label for="exampleInputTMS" class="form-label">Количество ТМЦ</label>
                <input v-model="countProd" type="number" class="form-control" id="exampleInputTMS" aria-describedby="exampleInputTMSHelp">
            </div>

            <button :disabled="isDisabled" type="submit" class="btn btn-primary" @click.prevent="submitTMS">Submit</button>
        </form>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
  name: "T_M_S_Add",
  data() {
    return {
      nameProd: '',
      nameId: 0,
      countProd: 0,
      isSubmit: true,
      isDisabled: true,
    }
  },
  computed: {
    ...mapState({
      Warehouse: state => state.Keeper.Warehouse,
    }),
  },
  watch: {
    countProd(newValue) {
      this.isSubmit = 0 < newValue
      this.isDisabled = !(this.isSubmit && this.nameId)
    },
    nameId(newValue) {
      this.isDisabled = !(this.isSubmit && newValue > 0)
    },
  },
  methods: {
    ...mapMutations({
      TMS_Add: "Keeper/TMS_Add",
    }),
    submitTMS() {
      const obj = {
        wareDist: this.nameId,
        nameProduct: this.nameProd,
        countProd: this.countProd,
      }
      this.TMS_Add(obj)
      this.$router.push({ name: 'T_M_S_List'})
    }
  },
}
</script>

<style scoped>
</style>