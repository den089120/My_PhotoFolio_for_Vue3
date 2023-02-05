<template>

    <div class="text-center m-3">На этой страничке вы можете выбрать одну и гексаграмм</div>
    <div style="display: grid; grid-template-columns: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%; row-gap: 10px;">
        <div v-for="hexa in hexagramList" :key="hexa.id" class="m-auto" style="width:100px;height:134px;z-index: 1">
            <div style="width:100px;height:110px;z-index: 5" v-html="hexagramImages[hexa.binaryCod]"></div>
            <div class="d-flex">
                <button class="btn btn-secondary btn-sm p-0"
                        style="width: 100px; height: 20px; padding: 2px"
                        @click="DetailsHexa(hexa)">
                    Выбрать
                </button>
            </div>
        </div>
    </div>

    <PopupHexagram :hexagram-images="hexagramImages" :hexagram="hexaElem" :popup-open="openPop" @close="closePopup" />

</template>

<script>
import PopupHexagram from "@/components/PredictionComponents/PopupHexagram";

    import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: "SelectHexagram",
  components: {
    PopupHexagram,
  },
  data() {
    return {
      hexaElem: {},
      openPop: false,
    }
  },
  //mounted() {
  //    this.GetHexaList();
  //},
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
      addSelectHexa: 'hexagram/addSelectHexa',
    }),
      //...mapActions({
      //    GetHexaList: 'hexagram/GetHexaList',
      //}),
    closePopup() {
      this.openPop = false
    },
    DetailsHexa(hexam) {
      this.hexaElem = hexam
      this.openPop = true
      const day = new Date()

      if (this.loginIn.isLogin) {
        this.addSelectHexa({
          binCod1: hexam.binaryCod,
          timeCog: day.toString().split(' ').slice(2, 5).join(' ')
        })
      }
    },
  },
}
</script>

<style scoped>
</style>