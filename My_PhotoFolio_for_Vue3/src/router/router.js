import { createRouter, createWebHistory } from 'vue-router';
import HomeMy from '@/components/HomeMy';
import MyKnowledge from "@/components/MyKnowledge";
import AnimationCSS from "@/components/AnimationCSS";
import PredHome from "@/components/PredictionComponents/PredHome";
import KeeperHome from "@/components/StoreKeeperComponents/KeeperHome";
import SelectHexagram from "@/components/PredictionComponents/SelectHexagram";
import CreateHexagram from "@/components/PredictionComponents/CreateHexagram";
import QuestionHexagram from "@/components/PredictionComponents/QuestionHexagram";
import HistoryPrediction from "@/components/PredictionComponents/HistoryPrediction";
import LoginIn from "@/components/LoginIn";
import RegistrationUser from "@/components/RegistrationUser";
import T_M_S_List from "@/components/StoreKeeperComponents/T_M_S_List";
import MovementList from "@/components/StoreKeeperComponents/MovementList";
import T_M_S_Add from "@/components/StoreKeeperComponents/T_M_S_Add";
import T_M_S_Update from "@/components/StoreKeeperComponents/T_M_S_Update";
import T_M_S_Remove from "@/components/StoreKeeperComponents/T_M_S_Remove";

const routes = [
    {
        path: '/',
        name: "HomeMy",
        component: HomeMy,
    },
    {
        path: '/MyKnowledge',
        name: 'MyKnowledge',
        component: MyKnowledge,
    },
    {
        path: '/AnimationCSS',
        name: 'AnimationCSS',
        component: AnimationCSS,
    },
    {
        path: '/PredHome',
        name: 'PredHome',
        component: PredHome,
    },
    {
        path: '/PredHome/SelectHexagram',
        name: 'SelectHexagram',
        component: SelectHexagram,
    },
    {
        path: '/PredHome/CreateHexagram',
        name: 'CreateHexagram',
        component: CreateHexagram,
    },
    {
        path: '/PredHome/QuestionHexagram',
        name: 'QuestionHexagram',
        component: QuestionHexagram,
    },
    {
        path: '/PredHome/HistoryPrediction',
        name: 'HistoryPrediction',
        component: HistoryPrediction,
    },
    {
        path: '/KeeperHome',
        name: 'KeeperHome',
        component: KeeperHome,
    },
    {
        path: '/T_M_S_List',
        name: 'T_M_S_List',
        component: T_M_S_List,
    },
    {
        path: '/T_M_S_List/T_M_S_Update',
        name: 'T_M_S_Update',
        component: T_M_S_Update,
        props: true,
    },
    {
        path: '/T_M_S_List/T_M_S_Remove',
        name: 'T_M_S_Remove',
        component: T_M_S_Remove,
    },
    {
        path: '/MovementList',
        name: 'MovementList',
        component: MovementList,
    },
    {
        path: '/T_M_S_Add',
        name: 'T_M_S_Add',
        component: T_M_S_Add,
    },
    {
        path: '/LoginIn',
        name: 'LoginIn',
        component: LoginIn,
    },
    {
        path: '/RegistrationUser',
        name: 'RegistrationUser',
        component: RegistrationUser,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;