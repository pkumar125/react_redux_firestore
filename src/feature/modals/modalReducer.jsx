import {MODAL_CLOSE,MODAL_OPEN} from './modalConstraints'
import {createReducer} from '../../app/common/util/reducerUtil'

const initialState = null

export const openM = (state,payload) => {
    const { modalType, modalProps} = payload
    return { modalType, modalProps}

}

export const closeM = (state, payload) => {
    return null
}

export default createReducer(initialState,{
    [MODAL_OPEN]:openM,
    [MODAL_CLOSE]:closeM
})