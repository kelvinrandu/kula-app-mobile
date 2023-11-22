import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { TOPNAVI_H, BANNER_H } from "./constants";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const TopNavigationOrder = (props) => {
  const safeArea = useSafeArea();

  const { active,items,title, scrollA ,setActive,search} = props;
  const isFloating = !!scrollA;
  const [isTransparent, setTransparent] = useState(isFloating);
  const [isShowing, setIsShowing ]= useState(false);

  useEffect(() => {
    console.log("scroll", scrollA);
    if (!scrollA) {
      return;
    }
    const listenerId = scrollA.addListener((a) => {
    

      // const topNaviOffset = BANNER_H - TOPNAVI_H - safeArea.top;
      // isTransparent !== a.value < topNaviOffset &&
      //   setTransparent(!isTransparent);
      //   a.value < 302 ? setIsShowing(false) : setIsShowing(true);
      //   console.log("show me", a.value, isShowing);

    });
    return () => scrollA.removeListener(listenerId);
  });

  return (
    <>
      <StatusBar
        barStyle={isTransparent ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.container(safeArea, isFloating, isTransparent)}>
     
        
      <View
        style={{
          flexDirection: "row",
          // justifyContent: "center",
          justifyContent: "space-between",
          paddingTop: 0,
          paddingBottom: 0,
      
        }}
      >
        <TouchableOpacity
          style={{
            marginTop: 10,
            padding: 5,
            paddingTop: 10,
            // paddingBottom: 20,
            marginBottom: 0,
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            width: 400,
            position: "relative",
          }}
          onPress={()=>props.setModal2Visible(true)}
        >
          <View
            style={{
              paddingTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 16, marginLeft: 2,  color:"#FFF" }}>
            Estimated arrival time: 30 min
            </Text>
          </View>

          <View>
            <AntDesign
              style={{
                marginRight:1,
                marginTop:3,
              }}
              name="right"
              size={21}
              color="#FFF"
            />
          </View>
        </TouchableOpacity>
      </View>       
      </View>
    </>
  );
};

const styles = {
  container: (safeArea, isFloating, isTransparent) => ({
    paddingTop: safeArea.top,
    height: TOPNAVI_H + safeArea.top,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: { y: 0 },
    backgroundColor: isTransparent ? "#0001" : "#6EBE76",
    shadowOpacity: isTransparent ? 0 : 0.5,
    elevation: isTransparent ? 0.01 : 5,
    zIndex: 100,
  }),
  title: (isTransparent) => ({
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: isTransparent ? "#FFF" : "#FFF",
  }),
  activeCategory: {
    backgroundColor: "green",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
  },
  textCategory: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
  },
  activeTextCategory: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  category: {
    backgroundColor: "white",
    color: "white",
    alignItems: "center",
    padding: 13,
    borderRadius: 30,
  },
};

export default TopNavigationOrder;
