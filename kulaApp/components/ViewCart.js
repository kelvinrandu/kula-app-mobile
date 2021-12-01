import React,{ useState} from 'react'
import { View, Text , TouchableOpacity, Modal, StyleSheet} from 'react-native'
import { useSelector } from 'react-redux';
import OrderItem from './OrderItem';

export default function ViewCart() {
  const [modalVisible,setModalVisible] = useState(false);
  const {items, restaurantName} = useSelector((state)=> state.cartReducer.selectedItems);  
  console.log(items);
  const total = items
    .map((item) => Number(item.item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);
  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: 16,
      height: 500,
      borderWidth: 1,
    },
    restaurantName : {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 10,
    },
    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },
    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
    },
  });
  const checkoutModalContent =() =>{
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckoutContainer}>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          {items.map((item,index) =>(
            <OrderItem key={index} item={item} />

          )

          )}
        </View>
      </View>
    );
  }

    return (
      <>
      <Modal animationType='slide' visible={modalVisible}
      transparent={true}
      onRequestClose={()=> setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
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
                onPress={()=>setModalVisible(true)}
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
