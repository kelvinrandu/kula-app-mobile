let defaultState = {
  selectedItems: { items: [], restaurantName: "" },
};

let cartReducer = (state = defaultState, action) => {
   console.log(action.type);
  switch (action.type) {
   
    case "ADD_TO_CART": {
      let newState = { ...state };

      if (action.payload.checkboxValue) {
        console.log("ADD TO CART");

        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
        };
      } else {
        console.log("REMOVE FROM CART");
        // console.log('payload',action.payload.title);
        //  const index = state.findIndex(
        //    (item) => item.title === action.payload.title
        //  );
        //  console.log(index,"index")
        const index =   newState.selectedItems.items.findIndex(
              (item) => item.title === action.payload.title
            );
            // console.log(index)
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter((_, i) => i !== index),
          ],
          restaurantName: action.payload.restaurantName,
        };
      }
      console.log(newState, "👉");
      return newState;
    }

    default:
      return state;
  }
};

export default cartReducer;

