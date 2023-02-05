import { createStore } from "vuex";
import { HexagramStore } from "@/store/HexagramStore.js";
import { MyKnowledgeStore } from "@/store/MyKnowledgeStore.js";
import { GeneralStore } from "@/store/GeneralStore.js";
import { KeeperStore } from "@/store/KeeperStore.js";


export default createStore({
    modules: {
        hexagram: HexagramStore,
        myKnowledge: MyKnowledgeStore,
        General: GeneralStore,
        Keeper: KeeperStore,
    }
})