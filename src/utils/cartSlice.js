import { createSlice } from '@reduxjs/toolkit'



export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
      },
    reducers: {
        addItem: (state,action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        const itemIndex = state.items.findIndex(
          (item) => item.card.info.id === action.payload.card.info.id
        );
        if (itemIndex < 0) {
          state.items.push(action.payload);
        } else {
          state.items[itemIndex].inStock = state.items[itemIndex].inStock + 1;
        }
      },
      removeItem: (state, action) => {
        state.items.pop();
      },
      clearCart: (state, action) => {
        state.items.length = 0
      },
      increaseQuantity: (state, action) => {
        const item = state.items.find(
          (element) => element.card.info.id === action.payload
        );
        item.inStock = item.inStock + 1;
      },
      decreaseQuantity: (state, action) => {
        const item = state.items.find(
          (element) => element.card.info.id === action.payload
        );
        item.inStock = item.inStock - 1;
        if (item.inStock === 0) {
          const index = state.items.findIndex((el) => el.inStock === 0);
          state.items.splice(index, 1);
        }
      },
     
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { addItem,removeItem,clearCart,increaseQuantity,decreaseQuantity } = cartSlice.actions
  
  export default cartSlice.reducer