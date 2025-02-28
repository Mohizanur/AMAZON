import { Type } from "./action.type";

// Define the initial state
export const initialState = {
  basket: [],
  user: null,
  // Initially, the basket is empty
};

// Reducer function
export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // Check if the item already exists in the basket
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (existingItem) {
        // If the item exists, update its quantity
        const updatedBasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 } // Increment amount if found
            : item; // Return the item unchanged if it's not the one we want to update
        });

        return {
          ...state,
          basket: updatedBasket, // Return the updated basket
        };
      } else {
        // If the item doesn't exist, add it to the basket with amount = 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      }

    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket]; // Clone array properly

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: newBasket,
      };

    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };
    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state; // Default return of the state if no action type matches
  }
};
