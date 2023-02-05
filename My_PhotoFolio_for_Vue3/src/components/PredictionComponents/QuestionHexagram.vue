<template>

    <div class="d-flex  mb-3" data-id="card_create">
        <form class="mx-auto p-2" style="width: 20rem;">
            <div class="text-center mb-3">На этой страничке вы можете задать вопрос о своем будущем</div>
            <div class="mb-3">
                <label for="exampleInputQuestion" class="form-label">Ваш вопрос</label>
                <input v-model="Question" type="text" class="form-control" id="exampleInputQuestion" aria-describedby="emailHelp" data-id="inputQuestion">
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="searchHexagram">получить ответ</button>
        </form>
        <div v-if="loginIn.isLogin" class="">
            <div class="text-center p-1">История вопросов.</div>
            <div class="p-2 d-flex flex-column" style="" data-id="stores">

                <div v-if="!questionStore" class="text-center">
                    У вас еще нет записей о предыдущих вопросах
                </div>

                <div v-for="ques in questionStore" :key="ques.id" class="card d-flex flex-row justify-content-around mb-2" style="width: 22rem;">
                    <div class="my-auto" style="width:100px;height:114px" v-html="hexagramImages[ques.binCod]"></div>
                    <div class="d-flex flex-column">
                        <h5 class="card-title text-center">Дата и время</h5>
                        <h5 class="card-title text-center">{{ques.theTime}}</h5>
                        <h5 class="card-title text-center d-inline-block text-truncate" style="max-width: 150px;">{{ques.question}}</h5>
                        <button type="button" class="btn btn-secondary btn-sm mb-1" @click="detailsQuestion(ques.binCod, ques.question, ques.theTime)">Подробнее...</button>
                    </div>
                </div>
            </div>
        </div>

        <PopupHexagram :popup-open="popupOpen" :hexagram="hexagram" :hexagram-images="hexagramImages" @close="popupClose" />

        <div v-if="popupQues" class="popup" :class="{'open': popupQues}">
            <div class="popup_body">
                <div class="popup_content" data-id="popup_content">
                    <div class="popup_close btn" @click="popupCloseQ">Закрыть</div>
                    <div v-if="hexagram" class="popup_img" v-html="hexagramImages[hexagram.binaryCod]"></div>
                    <div v-if="hexagram" class="popup_text">Ваш вопрос: {{questSto}}</div>
                    <div v-if="hexagram" class="popup_text">Дата и время: {{dateQues}}</div>
                    <div v-if="hexagram" class="popup_title">{{hexagram.name}}</div>
                    <div v-if="hexagram" class="popup_text">{{hexagram.description}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PopupHexagram from "@/components/PredictionComponents/PopupHexagram";

import {mapState, mapGetters, mapMutations} from 'vuex';
export default {
  name: "QuestionHexagram",
  components: {
    PopupHexagram,
  },
  data() {
    return {
      Question: '',
      hexagram: {},
      popupOpen: false,
      popupQues: false,
      questSto: '',
      dateQues: '',
    }
  },
  computed: {
    ...mapState({
      hexagramList: state => state.hexagram.hexagramList,
      questionStore: state => state.hexagram.questionStore,
      loginIn: state => state.General.loginIn,
    }),
    ...mapGetters({
      hexagramImages: 'hexagram/hexagramImages',
    })
  },
  methods: {
    ...mapMutations({
      addQuestion: 'hexagram/addQuestion',
    }),
    searchHexagram() {
      let bin = []
      const day = new Date()
      for (let i =0; i < 6; i++) {
        bin.push(`${Math.round(Math.random())}`)
      }
      bin = bin.join('')
      this.hexagram = this.hexagramList.find( el => el.binaryCod === bin)

      if (this.hexagram) {
        if (this.loginIn.isLogin) {
          this.addQuestion({
            question1: this.Question,
            binCod1: bin,
            timeCog: day.toString().split(' ').slice(2, 5).join(' ')
          })
        }

      }
      this.popupOpen = true
    },
    detailsQuestion(bin, ques, date) {
      this.questSto = ques
      this.dateQues = date
      this.hexagram = this.hexagramList.find( el => el.binaryCod === bin)
      this.popupQues = true
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
    .popup {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        top: 0;
        left: 0;
        opacity: 0;
        visibility: hidden;
        overflow-y: auto;
        overflow-x: hidden;
        transition: all 0.8s ease 0s;
    }

        .popup.open {
            opacity: 1;
            visibility: visible;
        }

            .popup.open .popup_content {
                transform: translate(0px, 0px);
                opacity: 1;
            }

    .popup_body {
        min-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px 10px;
        transition: all 0.8s ease 0s;
    }

    .popup_content {
        background-color: antiquewhite;
        color: #000;
        max-width: 800px;
        padding: 30px;
        position: relative;
        transition: all 0.8s ease 0s;
        opacity: 0;
        transform: translate(0px, -100%);
    }

    .popup_close {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 20px;
        color: #000;
        text-decoration: none;
    }

    .popup_img {
        width: 100px;
        height: 114px;
        margin: auto;
    }

    .popup_title {
        font-size: 30px;
        margin-bottom: 15px;
        margin-top: 15px;
    }
</style>