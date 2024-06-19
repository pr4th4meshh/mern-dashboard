import { createSlice } from "@reduxjs/toolkit";
import { MODAL_STATE } from "../../common/states";

const initialState = {
  [MODAL_STATE.CREATE_PRODUCT_MODAL]: false,
  [MODAL_STATE.DELETE_PRODUCT_MODAL]: false,
  [MODAL_STATE.UPDATE_PRODUCT_MODAL]: false,
  product: null,
};

const slice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    toggleModal: (state, { payload: modalState }) => {
      switch (modalState) {
        case MODAL_STATE.CREATE_PRODUCT_MODAL:
          state[MODAL_STATE.CREATE_PRODUCT_MODAL] = !state[MODAL_STATE.CREATE_PRODUCT_MODAL];
          break;
        case MODAL_STATE.DELETE_PRODUCT_MODAL:
          state[MODAL_STATE.DELETE_PRODUCT_MODAL] = !state[MODAL_STATE.DELETE_PRODUCT_MODAL];
          break;
        case MODAL_STATE.UPDATE_PRODUCT_MODAL:
          state[MODAL_STATE.UPDATE_PRODUCT_MODAL] = !state[MODAL_STATE.UPDATE_PRODUCT_MODAL];
          break;
        default:
          break;
      }
    },
  },
});

export const { toggleModal } = slice.actions;
export const selectConfiguration = (state) => state.configuration;
export default slice.reducer;
