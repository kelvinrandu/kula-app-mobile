import React from 'react'
import { View, Text , TouchableOpacity} from 'react-native'
import { useSelector } from 'react-redux';

export default function ViewCart() {
  const items = useSelector((state)=> state.cartReducer.selectedItems.items);  
  console.log(items);
  const total = items
    .map((item) => Number(item.item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);
  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });
  console.log(totalUSD);

    return (
      <>
        {total ? (
          <View
            style={{
              flex: 2,
              alignItems: "center",
              flexDirection: "column",
              postion: "absolute",
              bottom: 0,
              zIndex: -100,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "gray",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  // alignItems: "center",
                  padding: 15,
                  borderRadius: 30,
                  width: 300,
                  height: 60,
                  position: "relative",
                }}
              >
                <Text style={{ color: "white", fontSize: 20, marginRight: 30 }}>
                  View cart
                </Text>
                <Text style={{ color: "white", fontSize: 20, marginRight: 30 }}>
                  ${totalUSD}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )}
      </>
    );
}
