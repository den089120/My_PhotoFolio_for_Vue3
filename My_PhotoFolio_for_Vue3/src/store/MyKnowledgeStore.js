export const MyKnowledgeStore = {
    state: () => {
        return {
            KnowledgeList: [
                {
                    id: 1,
                    pathImage: 'images/ASP.NET_CoreMVC.NET 5_part_1.jpg',
                    description: 'Курс по созданию магазина на технологии ASP.NET Core (MVC)',
                },
                {
                    id: 2,
                    pathImage: 'images/ASP.NET_CoreMVC.NET 5_part_2.jpg',
                    description: 'Курс по созданию магазина на технологии ASP.NET Core (MVC)',
                },
                {
                    id: 3,
                    pathImage: 'images/For_JS.png',
                    description: 'Курс по javascript',
                },
                {
                    id: 4,
                    pathImage: 'images/For_node.js.png',
                    description: 'Курс по node.js',
                },
                {
                    id: 5,
                    pathImage: 'images/certificate_for_C_sharp.jpg',
                    description: 'Базовый курс по С#',
                },
                {
                    id: 6,
                    pathImage: 'images/certificate_for_nodeJS.jpg',
                    description: 'Дополнительный курс по node.js',
                },
                {
                    id: 7,
                    pathImage: 'images/Excel_JS.png',
                    description: 'Углубленный курс по Javascript',
                },
            ],
        }
    },
    getters: {},
    mutations: {},
    actions: {},
    namespaced: true,
}