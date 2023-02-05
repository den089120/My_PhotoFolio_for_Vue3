<template>

    <div class="row">
        <div class="col">
            <div class="container text-center">
                <div class="text-center m-3">История ваших вопросов</div>

                <div v-for="el in questionStore" :key="el.id" class="card mb-3 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 d-flex align-items-center">
                            <div class="m-auto" style="width:100px;height:110px;z-index: 5" v-html="hexagramImages[el.bincod]"></div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{hexagramBin[el.bincod].name}}</h5>
                                <p class="card-text">Ваш вопрос : {{el.question}}</p>
                                <p class="card-text"><small class="text-muted">Время : {{el.theTime}}</small></p>
                            </div>
                            <div class="col-md-4 text-center m-auto btn btn-info" @click="detailQues(el.binCod, el.theTime, el.question)">Подробнее</div>
                        </div>

                    </div>
                </div>

            </div>
        </div>


        <div class="col">
            <div class="container text-center">
                <div class="text-center m-3">История ваших генерации и выбора из таблицы</div>

                <div v-for="el in selectHexaStore" :key="el.id" class="card mb-3 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 d-flex align-items-center">
                            <div class="m-auto" style="width:100px;height:110px;z-index: 5" v-html="hexagramImages[el.bincod]"></div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{hexagramBin[el.bincod].name}}</h5>
                                <p class="card-text d-inline-block text-truncate" style="max-width: 150px;">{{hexagramBin[el.bincod].description}}</p>
                                <p class="card-text"><small class="text-muted">Время : {{el.theTime}}</small></p>
                            </div>
                            <div class="col-md-4 text-center m-auto btn btn-info" @click="detailsHexa(el.binCod, el.theTime)">Подробнее</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <PopupHexagram :popup-open="popupOpen" :hexagram="hexagram" :hexagram-images="hexagramImages" @close="popupClose" />

</template>

<script>
import {mapState, mapGetters} from 'vuex';
import PopupHexagram from "@/components/PredictionComponents/PopupHexagram";

export default {
  name: "HistoryPrediction",
  components: {
    PopupHexagram,
  },
  data() {
    return {
      popupOpen: false,
      popupQues: false,
      hexagram: {},
    }
  },
  computed: {
    ...mapState({
      questionStore: state => state.hexagram.questionStore,
      selectHexaStore: state => state.hexagram.selectHexaStore,
      hexagramList: state => state.hexagram.hexagramList,
    }),
    ...mapGetters({
      hexagramImages: "hexagram/hexagramImages",
      hexagramBin: "hexagram/hexagramBin",
    }),
  },
  methods: {
    detailsHexa(bin, date) {
      let obj = this.hexagramList.find(el => el.binaryCod === bin)
      this.hexagram = {
        id: obj.id,
        name: obj.name,
        binaryCod: obj.binaryCod,
        description: obj.description,
        date: date,
      }
      this.popupOpen = true
    },
    detailQues(bin, date, question) {
      let obj = this.hexagramList.find(el => el.binaryCod === bin)
      this.hexagram = {
        id: obj.id,
        name: obj.name,
        binaryCod: obj.binaryCod,
        description: obj.description,
        date: date,
        question: question,
      }
      this.popupOpen = true
    },
    popupClose() {
      this.popupOpen = false
    },
    popupCloseQ() {
      this.popupQues = false
    },
  },
}
</script>

<style scoped>
</style>
