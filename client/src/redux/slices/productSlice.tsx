import { createSlice } from '@reduxjs/toolkit'

interface EventState {
  product: any
}

const initialState: EventState = {
    product: null,
}

const productSlice = createSlice({
  initialState,
  name: 'product',
  reducers: {
    setProduct: (state, action) => {
      const { data } = action.payload
      return { ...state, product: data }
    },
  },
})

export const { setProduct } = productSlice.actions

export default productSlice.reducer

export const selectProduct = (state: any) => state.event.product
