<template>
    <div class="container">
        <form>
            <div class="mb-3">
                <label for="exampleInputTMS1" class="form-label">Наименование ТМЦ</label>
                <input type="text" class="form-control" id="exampleInputTMS1" :value="elementClick.nameProd" disabled>
            </div>


            <div v-if="elementClick.wareList.length > 1" class="mb-3 row justify-content-center">
                <div class="mt-1 mb-3">Выбрать с какого склада</div>
                <div v-for="(value, key, index) in elementClick.wareObjId" :key="index" class="form-check col-3">
                    <input v-if="value !== 0" class="form-check-input" type="checkbox" @click="checkedId" :value="key" :id="'flexCheckDefault' + index" :data-value="value" :ref="'check' + index">
                    <label v-if="value !== 0" class="form-check-label" :for="'flexCheckDefault' + index">
                        {{elementClick.wareList[index]}}.   кол-во товара: {{ value }}
                    </label>
                </div>
            </div>

            <div v-else class="mb-3">
                <label for="exampleInputTMS2" class="form-label">С какого склада</label>
                <input type="text" class="form-control" id="exampleInputTMS2" :value="elementClick.wareList[0]" disabled>
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
                <label for="exampleInputTMS" class="form-label">Количество ТМЦ (максимальное кол-во {{elementClick.countProd}})</label>
                <input v-model="countProd" type="number" class="form-control" id="exampleInputTMS" aria-describedby="exampleInputTMSHelp">
                <div v-if="isTextCount" id="exampleInputTMSHelp" class="form-text">Количество ТМЦ больше чем на выбранн{{ isText() ? 'ых' : 'ом'}} склад{{  isText() ? 'ах' : 'е' }}  </div>
            </div>

            <button :disabled="isDisabled" type="submit" class="btn btn-primary" @click.prevent="submitTMS">Submit</button>
        </form>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
  name: "T_M_S_Update",
  data() {
    return {
      nameId: 0,
      countProd: 0,
      countWareSum: 0,
      isSubmit: true,
      isTextCount: true,
      isDisabled: true,
      warehouseId: {},
    }
  },
  mounted() {
    if(this.elementClick.wareList.length <= 1) {
      let k = Object.keys(this.elementClick.wareObjId)

      this.countWareSum = this.elementClick.wareObjId[k]

      this.warehouseId[k] = this.elementClick.wareObjId[k]
    }
  },
  computed: {
    ...mapState({
      Warehouse: state => state.Keeper.Warehouse,
      elementClick: state => state.Keeper.elementClick,
    }),
  },
  watch: {
    countProd(newValue) {
      this.isSubmit = this.countWareSum < newValue
      this.isTextCount = this.countWareSum < newValue
      this.isDisabled = !(!this.isSubmit && this.nameId)
    },
    countWareSum(newValue) {
      this.isSubmit = this.countProd > newValue
      this.isTextCount = this.countProd > newValue
      this.isDisabled = !(!this.isSubmit && this.nameId)
    },
    nameId(newValue) {
      this.isDisabled = !(!this.isSubmit && newValue > 0)
    },
  },
  methods: {
    ...mapMutations({
      TMS_Update: "Keeper/TMS_Update",
    }),
    isText() {
      return Object.keys(this.warehouseId).length > 1
    },
    checkedId(event) {
      if (event.target.checked) {
        this.warehouseId[event.target.value] = event.target.dataset.value
        this.countWareSum = this.countWareSum + (+event.target.dataset.value)
      } else {
        delete(this.warehouseId[event.target.value])
        this.countWareSum = this.countWareSum - (+event.target.dataset.value)
      }
    },
    submitTMS() {
      const obj = {
        wareDist: this.nameId,
        idProd: this.elementClick.id,
        countProd: this.countProd,
        objWareCount: this.warehouseId,
      }
      this.TMS_Update(obj)
      this.$router.push({ name: 'T_M_S_List'})
    }
  },
}
</script>

<style scoped>
</style>