<template>

    <div class="text-center m-3">На этой страничке вы можете сгенерировать случайную гексаграмму</div>
    <div class="m-auto" style="width:40%;height:134px;z-index: 5">
        <div class="d-flex">
            <button class="btn btn-secondary btn-sm p-0 m-auto"
                    style="width: 150px; height: 40px; padding: 2px"
                    @click="hexagramCreate">
                СГЕНЕРИРОВАТЬ
            </button>
        </div>
        <div v-if="hexagram" style="width:100px;height:110px;z-index: 5; margin-top: 10px" class="m-auto" v-html="hexagramImages[hexagram.binaryCod]"></div>
        <div v-if="hexagram" class="text-center m-3">{{hexagram.name}}</div>
        <div v-if="hexagram" class="text-center m-3">{{hexagram.description}}</div>
    </div>

</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
export default {
  name: "CreateHexagram",
  components: {
  },
  data() {
    return {
      binCod: '',
      hexagram: {},
    }
  },
  computed: {
    ...mapState({
      hexagramList: state => state.hexagram.hexagramList,
      loginIn: state => state.General.loginIn,
    }),
    ...mapGetters({
      hexagramImages: "hexagram/hexagramImages",
    }),
  },
  methods: {
    ...mapMutations({
      addSelectHexa: "hexagram/addSelectHexa",
    }),
    hexagramCreate() {
      let bin = []
      const day = new Date()
      for (let i =0; i < 6; i++) {
        bin.push(`${Math.round(Math.random())}`)
      }
      bin = bin.join('')
      this.hexagram = this.hexagramList.find( el => el.binaryCod === bin)
      if (this.hexagram) {
        if (this.loginIn.isLogin) {
          this.addSelectHexa(
              {
                binCod1: bin,
                timeCog: day.toString().split(' ').slice(2, 5).join(' '),
              }
          )
        }

      }
    },
  },
}
</script>

<style scoped>
</style>