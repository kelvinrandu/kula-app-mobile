let defaultState = {
  selectedItems: { items: [], restaurantName: "",quantity:1,total:0 },
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };
      console.log("ADD TO CART", action.payload.quantity);

      newState.selectedItems = {
        items: [...newState.selectedItems.items, action.payload],
        restaurantName: action.payload.restaurantName,
        quantity: action.payload.quantity,
        // total: action.payload.total,
      };
      


      return newState;
    }
    case "UPDATE_CART": {
      let newState = { ...state };
      console.log("UPDATE TO CART", action.payload.item);

        const index = newState.selectedItems.items.findIndex(
          (item) => item.item.title === action.payload.item.title
        );
        console.log("index", index, action.payload.item); 
      newState.selectedItems = {
        items: [...newState.selectedItems.items.filter((_, i) => _.item.quantity=5)],
        restaurantName: action.payload.restaurantName,
        quantity: action.payload.quantity,
      };

            console.log("new state", newState);


      return newState;
    }
    case "REMOVE_FROM_CART": {
      let newState = { ...state };

        const index =   newState.selectedItems.items.findIndex(
              (item) => item.item.title === action.payload.item.title
            );

        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter((_, i) => i !== index),
          ],
          restaurantName: action.payload.restaurantName,
        };

      return newState;
    }
    case "RESET_CART": {
      let newState = { ...state };
      console.log('reset')



        newState.selectedItems = { items: [], restaurantName: "",quantity:1,total:0 }

      return newState;
    }

    default:
      return state;
  }
};

export default cartReducer;

