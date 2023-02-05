import axios from 'axios';

export const HexagramStore = {
    state: () => {
        return {
            hexagramList: [
                //{
                //    id: 1,
                //    name: '1. Цянь. Творчество',
                //    binaryCod: '111111',
                //    description: 'Символ состоит из шести черт ян. Добрый знак. Это мужская гексаграмма, означающая месяц апрель и весенние надежды. Но будьте осмотрительны! Вы на вершине горы, и возможности спуститься у вас нет. Так что будьте бдительны и рассудительны, пока находитесь наверху. Не позднее, чем через шесть месяцев ждите крупных перемен. Время благоприятствует вашим начинаниям. В личной жизни у вас известная неопределенность, необходимо внести в нее ясность. Если желание ваше разумно и скромно, оно непременно исполнится. Кто-то противостоит вам, но, если вы будете решительны и непреклонны, вас ожидает успех. Испытание вы выдержите.',
                //},
                //{
                //    id: 2,
                //    name: '2. Кунь. Исполнение',
                //    binaryCod: '000000',
                //    description: 'Боги пробудили мать-землю. Трудитесь усердно, и через два месяца усилия ваши увенчаются большим успехом. Вы культурный и жаждущий знаний человек, с любовью относитесь даже к самым малым плодам своего труда. Очень привязаны к матери. Сейчас не время давать волю корыстолюбию, так что не думайте слишком много о материальной выгоде. Желание ваше исполнится, хотя и не сразу. В ближайший период не рекомендуется отправляться в дорогу - ни одному, ни с кем-либо. Скоро в вашем окружении появится человек, питающий к вам сильный интерес.',
                //},
                //{
                //    id: 3,
                //    name: '3. Чжунь. Начальная трудность',
                //    binaryCod: '010001',
                //    description: 'Одна из самых злосчастных комбинаций. За что бы вы не брались, все будет валиться из рук, не давая результата. Не остается ничего другого, как ждать более благоприятного времени. По меньшей мере три месяца старайтесь вести замкнутый образ жизни, что вовсе не означает, что в этот период не следует пытаться продумывать планы на будущее. Будьте терпеливы, прислушайтесь к советам женщины. Об удачливости, везении в делах в данный момент не может быть и речи.',
                //},
                //{
                //    id: 4,
                //    name: '4. Мын. Ошибки молодости',
                //    binaryCod: '100010',
                //    description: 'Все вокруг вы видите, будто сквозь некую пелену, но она скоро спадет и мир вновь обретет для вас ясность. Однако, поскольку в настоящее время ваши нервы сильно расшатаны, не принимайте скоропалительных решений. Если хотите добиться успеха, не пренебрегайте советами начальства, вдумайтесь в них; скоро все изменится. Не унывайте. Побольше времени уделяйте общению с детьми. Новые планы, новые перспективы уже возникают, но даже близко нет новой любви. Сконцентрируйте волю на исполнение одного единственного желания.',
                //},
                //{
                //    id: 5,
                //    name: '5. Сюй. Ожидание',
                //    binaryCod: '010111',
                //    description: 'Ждите и собирайтесь с силами, очень скоро они вам понадобятся - когда наступит весна, сойдет снег и вновь зацветут цветы. Слишком торопливые действия сейчас могут принести только вред. Потерпите еще немного, месяца два, пока не явится некий человек, который поможет вам так, как вы и не ждете. Если же вы теперь решительно и энергично займетесь планированием дальнейших действий, то помощь и поддержка придут еще быстрее. Ваше материальное положение внезапно улучшится. Возможно, вы почувствуете влечение к человеку старше вас. Старайтесь не слишком обнаружить свой интерес к нему. Желание ваше исполнится, если вы будете действовать целеустремленно и в достаточной мере осмотрительно.',
                //},
            ],
            questionStore: [
                {
                    id: '1',
                    question: 'что будет завтра',
                    userLogin: 'Danil',
                    bincod: '000000',
                    theTime: '11.23 01.02.22',
                },
                {
                    id: '2',
                    question: 'что будет на неделе',
                    userLogin: 'Danil',
                    bincod: '111111',
                    theTime: '12.23 01.02.22',
                },
            ],
            selectHexaStore: [
                {
                    id: '1',
                    userLogin: 'Danil',
                    bincod: '000000',
                    theTime: '01.03.2022 13.23.12',
                },
                {
                    id: '2',
                    userLogin: 'Danil',
                    bincod: '010001',
                    theTime: '01.03.2022 13.34.12',
                },
                {
                    id: '3',
                    userLogin: 'Danil',
                    bincod: '010111',
                    theTime: '03.01.2022 14.34.12',
                },
            ],
        }
    },
    getters: {
        hexagramImages(state) {
            let images = {}
            let str = []
            state.hexagramList.forEach(el => {
                let bin = el.binaryCod.split('')
                for (let i = 0; i < bin.length; i++) {
                    if (bin[i] === '0') {
                        str.push(`
                            <div class="d-flex justify-content-between p-1">
                                <div class="btn btn-primary p-1" style="width: 40px; height: 10px"></div>
                                <div class="btn btn-primary p-1" style="width: 40px; height: 10px"></div>
                            </div>
                        `)
                    } else {
                        str.push(`
                            <div class="d-flex p-1">
                                <div class="btn btn-primary p-1" style="width: 95px; height: 10px"></div>
                            </div>
                        `)
                    }
                }
                images[el.binaryCod] = str.join('')
                str = []
            })
            return images
        },
        hexagramBin(state) {
            let obj = {}
            state.hexagramList.forEach(el => {
                obj[el.binaryCod] = {
                    name: el.name,
                    description: el.description,
                }
            })
            return obj
        },
    },
    mutations: {
        addQuestion(state, obj) {
            state.questionStore.push(
                {
                    id: Date.now().toString(),
                    question: obj.question1,
                    userLogin: 'Danil',
                    binCod: obj.binCod1,
                    theTime: obj.timeCog,
                }
            )
        },
        addSelectHexa(state, obj) {
            state.selectHexaStore.push(
                {
                    id: Date.now().toString(),
                    userLogin: 'Danil',
                    binCod: obj.binCod1,
                    theTime: obj.timeCog,
                }
            )
        },

        addHexagram(state, list) {
            state.hexagramList = list
        },

        addListQuestion(state, list) {
            state.questionStore = list
        },

        addListSelectHexagram(state, list) {
            state.selectHexaStore = list
        },
    },
    actions: {
        async GetHexaList({ commit }) {
            try {
                const response = await axios.get("https://localhost:5002/Hexagram")
                commit('addHexagram', response.data)
            } catch (err) {
                console.log(err)
            }
        },

        async GetQuestionList({ commit }) {
            try {
                const response = await axios.get("https://localhost:5002/Question")
                commit('addListQuestion', response.data)
            } catch (err) {
                console.log(err)
            }
        },

        async GetSelectHexagramList({ commit }) {
            try {
                const response = await axios.get("https://localhost:5002/SelectHexa", {
                    Authorization: {
                        'Bearer': {
                            'Token': JSON.parse(localStorage.getItem('DanilPetrov')).token
                        },
                    },
                    headers: {
                        'Name': JSON.parse(localStorage.getItem('DanilPetrov')).user
                    },
                    

                    //headers: {
                    //    'Authorization': {
                    //        'Bearer': {
                    //            'Token': JSON.parse(localStorage.getItem('DanilPetrov'))
                    //        }
                    //    }
                    //}
                })
                console.log(response.data)
                commit('addListSelectHexagram', response.data)
            } catch (err) {
                console.log(err)
            }
        }
    },
    namespaced: true,
}
