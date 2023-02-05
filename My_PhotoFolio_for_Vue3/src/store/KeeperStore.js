export const KeeperStore = {
    state: () => {
        return {
            elementClick: {},
            Product: [
                {
                    id: 1,
                    name: 'рубероид',
                },
                {
                    id: 2,
                    name: 'кирпич',
                },
                {
                    id: 3,
                    name: 'песок',
                },
                {
                    id: 4,
                    name: 'штукатурка',
                },
            ],
            Warehouse: [
                {
                    id: 1,
                    name: 'склад-1',
                },
                {
                    id: 2,
                    name: 'склад-2',
                },
                {
                    id: 3,
                    name: 'склад-3',
                },
            ],
            Movement: [
                {
                    id: 1,
                    DateTime: '01.10 13.23',
                    WarehouseSourceId: null,
                    WarehouseDestinationId: 1,
                },
                {
                    id: 2,
                    DateTime: '11.12 15.23',
                    WarehouseSourceId: null,
                    WarehouseDestinationId: 2,
                },
                {
                    id: 3,
                    DateTime: '13.12 13.23',
                    WarehouseSourceId: null,
                    WarehouseDestinationId: 3,
                },
                {
                    id: 4,
                    DateTime: '03.12 13.23',
                    WarehouseSourceId: null,
                    WarehouseDestinationId: 3,
                },
                {
                    id: 5,
                    DateTime: '01.12 13.23',
                    WarehouseSourceId: 1,
                    WarehouseDestinationId: 3,
                },
                {
                    id: 6,
                    DateTime: '01.12 15.43',
                    WarehouseSourceId: 2,
                    WarehouseDestinationId: 1,
                },
                {
                    id: 7,
                    DateTime: '01.10 11.13',
                    WarehouseSourceId: 3,
                    WarehouseDestinationId: 1,
                },
                {
                    id: 8,
                    DateTime: '01.12 13.23',
                    WarehouseSourceId: null,
                    WarehouseDestinationId: 1,
                },
                {
                    id: 9,
                    DateTime: '01.12 13.23',
                    WarehouseSourceId: null,
                    WarehouseDestinationId: 3,
                },
                {
                    id: 10,
                    DateTime: '01.10 13.55',
                    WarehouseSourceId: null,
                    WarehouseDestinationId: 3,
                },
            ],
            MovementItem: [
                {
                    id: 1,
                    MovementId: 1,
                    ProductId: 3,
                    Count: 45,
                },
                {
                    id: 2,
                    MovementId: 2,
                    ProductId: 1,
                    Count: 23,
                },
                {
                    id: 3,
                    MovementId: 3,
                    ProductId: 4,
                    Count: 23,
                },
                {
                    id: 4,
                    MovementId: 4,
                    ProductId: 2,
                    Count: 23,
                },
                {
                    id: 5,
                    MovementId: 5,
                    ProductId: 3,
                    Count: 23,
                },
                {
                    id: 6,
                    MovementId: 6,
                    ProductId: 1,
                    Count: 12,
                },
                {
                    id: 7,
                    MovementId: 7,
                    ProductId: 4,
                    Count: 15,
                },
                {
                    id: 8,
                    MovementId: 8,
                    ProductId: 2,
                    Count: 43,
                },
                {
                    id: 9,
                    MovementId: 9,
                    ProductId: 2,
                    Count: 211,
                },
                {
                    id: 10,
                    MovementId: 10,
                    ProductId: 1,
                    Count: 43,
                },
            ],
        }
    },
    getters: {
        TMS_List(state) {
            let list = []
            let prodList = {}

            state.Product.forEach(prod => {
                prodList[prod.id] = state.MovementItem.filter(el => el.ProductId === prod.id)
            })

            state.Product.forEach(el => {
                let countProduct = 0
                let warehouseList = {}

                prodList[el.id].forEach(el => {

                    let movEl = state.Movement.find(ele => ele.id === el.MovementId)

                    // поступление на склад
                    if (movEl.WarehouseSourceId === null) {
                        if (countProduct === 0) {

                            countProduct = el.Count
                            warehouseList[`${movEl.WarehouseDestinationId}`] = el.Count

                        } else if (warehouseList[`${movEl.WarehouseDestinationId}`] === undefined) {

                            countProduct = countProduct + el.Count
                            warehouseList[`${movEl.WarehouseDestinationId}`] = el.Count

                        } else {

                            countProduct = countProduct + el.Count
                            warehouseList[`${movEl.WarehouseDestinationId}`] = warehouseList[`${movEl.WarehouseDestinationId}`] + el.Count
                        }
                    }
                    // перемещение со склада на склад
                    if (movEl.WarehouseSourceId && movEl.WarehouseDestinationId) {

                        warehouseList[`${movEl.WarehouseSourceId}`] = warehouseList[`${movEl.WarehouseSourceId}`] - el.Count

                        if (warehouseList[`${movEl.WarehouseDestinationId}`]) {

                            warehouseList[`${movEl.WarehouseDestinationId}`] = warehouseList[`${movEl.WarehouseDestinationId}`] + el.Count

                        } else {
                            warehouseList[`${movEl.WarehouseDestinationId}`] = el.Count
                        }

                    }
                    // выдача товара
                    if (movEl.WarehouseDestinationId === null) {
                        countProduct = countProduct - el.Count
                        warehouseList[`${movEl.WarehouseSourceId}`] = warehouseList[`${movEl.WarehouseSourceId}`] - el.Count
                    }
                })

                if (countProduct !== 0) {
                    list.push(
                        {
                            id: el.id,
                            nameProd: el.name,
                            countProd: countProduct,
                            wareObjId: warehouseList,
                            wareList: Object.keys(warehouseList).map(el => state.Warehouse.find(e => e.id === +el).name)
                        }
                    )
                }

            })
            return list
        },

        movementList(state) {
            let list = []
            let id = 1
            state.MovementItem.forEach(el => {
                let waId = state.Movement.find(elem => elem.id === el.MovementId).WarehouseDestinationId
                let waSo = state.Movement.find(element => element.id === el.MovementId).WarehouseSourceId
                list.push(
                    {
                        id: id,
                        nameProd: state.Product.find(ele => ele.id === el.ProductId).name,
                        countProd: el.Count,
                        warehouseDist: waId === null ? '--//--' : state.Warehouse.find(e => e.id === parseInt(waId)).name,
                        warehouseSource: waSo === null ? '--//--' : state.Warehouse.find(obj => obj.id === waSo).name,
                        dateProd: state.Movement.find(elem => elem.id === el.MovementId).DateTime,
                    }
                )
                id++
            })

            return list
        },
    },
    mutations: {
        setElement(state, el) {
            state.elementClick = el
        },
        TMS_Update(state, obj) {
            const day = new Date()
            if (Object.keys(obj.objWareCount).length < 2) {
                const idMove = Date.now()
                let wareSourceId = Object.keys(obj.objWareCount)[0]
                state.Movement.push(
                    {
                        id: idMove,
                        DateTime: day.toString().split(' ').slice(2, 5).join(' '),
                        WarehouseSourceId: parseInt(wareSourceId),
                        WarehouseDestinationId: parseInt(obj.wareDist),
                    }
                )
                state.MovementItem.push(
                    {
                        id: Date.now() + 1,
                        MovementId: idMove,
                        ProductId: parseInt(obj.idProd),
                        Count: obj.countProd,
                    }
                )
            } else {
                let wareSourceIdList = Object.keys(obj.objWareCount)
                let countG = (+obj.countProd)
                wareSourceIdList.forEach(el => {
                    let count = obj.objWareCount[el]
                    if (count <= countG) {
                        let idM = Date.now()
                        state.Movement.push(
                            {
                                id: idM,
                                DateTime: day.toString().split(' ').slice(2, 5).join(' '),
                                WarehouseSourceId: parseInt(el),
                                WarehouseDestinationId: parseInt(obj.wareDist),
                            }
                        )
                        state.MovementItem.push(
                            {
                                id: Date.now() + 1,
                                MovementId: idM,
                                ProductId: parseInt(obj.idProd),
                                Count: parseInt(count),
                            }
                        )
                        countG = countG - (+count)
                    } else if (count > countG) {
                        let idM = Date.now() + 2
                        state.Movement.push(
                            {
                                id: idM,
                                DateTime: day.toString().split(' ').slice(2, 5).join(' '),
                                WarehouseSourceId: parseInt(el),
                                WarehouseDestinationId: parseInt(obj.wareDist),
                            }
                        )
                        state.MovementItem.push(
                            {
                                id: Date.now() + 3,
                                MovementId: idM,
                                ProductId: parseInt(obj.idProd),
                                Count: (+countG),
                            }
                        )
                    }

                })
            }
        },
        TMS_Remove(state, obj) {
            const day = new Date()
            if (Object.keys(obj.objWareCount).length < 2) {
                const idMove = Date.now()
                let wareSourceId = Object.keys(obj.objWareCount)[0]
                state.Movement.push(
                    {
                        id: idMove,
                        DateTime: day.toString().split(' ').slice(2, 5).join(' '),
                        WarehouseSourceId: parseInt(wareSourceId),
                        WarehouseDestinationId: null,
                    }
                )
                state.MovementItem.push(
                    {
                        id: Date.now() + 1,
                        MovementId: idMove,
                        ProductId: parseInt(obj.idProd),
                        Count: obj.countProd,
                    }
                )
            } else {
                let wareSourceIdList = Object.keys(obj.objWareCount)
                let countG = (+obj.countProd)
                wareSourceIdList.forEach(el => {
                    let count = obj.objWareCount[el]
                    if (count <= countG) {
                        let idM = Date.now()
                        state.Movement.push(
                            {
                                id: idM,
                                DateTime: day.toString().split(' ').slice(2, 5).join(' '),
                                WarehouseSourceId: parseInt(el),
                                WarehouseDestinationId: null,
                            }
                        )
                        state.MovementItem.push(
                            {
                                id: Date.now() + 1,
                                MovementId: idM,
                                ProductId: parseInt(obj.idProd),
                                Count: parseInt(count),
                            }
                        )
                        countG = countG - (+count)
                    } else if (count > countG) {
                        let idM = Date.now() + 2
                        state.Movement.push(
                            {
                                id: idM,
                                DateTime: day.toString().split(' ').slice(2, 5).join(' '),
                                WarehouseSourceId: parseInt(el),
                                WarehouseDestinationId: null,
                            }
                        )
                        state.MovementItem.push(
                            {
                                id: Date.now() + 3,
                                MovementId: idM,
                                ProductId: parseInt(obj.idProd),
                                Count: (+countG),
                            }
                        )
                    }

                })
            }
        },
        TMS_Add(state, obj) {
            const day = new Date()
            const idMove = Date.now()
            const idProd = Date.now() + 2

            state.Product.push(
                {
                    id: idProd,
                    name: obj.nameProduct,
                }
            )

            state.Movement.push(
                {
                    id: idMove,
                    DateTime: day.toString().split(' ').slice(2, 5).join(' '),
                    WarehouseSourceId: null,
                    WarehouseDestinationId: obj.wareDist,
                }
            )
            state.MovementItem.push(
                {
                    id: Date.now() + 1,
                    MovementId: idMove,
                    ProductId: idProd,
                    Count: obj.countProd,
                }
            )
        },
    },
    actions: {},
    namespaced: true,
}