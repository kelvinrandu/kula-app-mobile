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

const TopNavigation = (props) => {
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
    

      const topNaviOffset = BANNER_H - TOPNAVI_H - safeArea.top;
      isTransparent !== a.value < topNaviOffset &&
        setTransparent(!isTransparent);
        a.value < 302 ? setIsShowing(false) : setIsShowing(true);
        console.log("show me", a.value, isShowing);

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
        {!isTransparent ? (
          <>
            <Text style={styles.title(isTransparent)}>{title}</Text>
            {isShowing ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {items.map((item, index) => (
                  <View
                    onPress={() => console.log("here")}
                    key={index}
                    style={{
                      alignItems: "center",
                      marginRight: 30,
                      marginHorizontal: 2,
                      marginTop: 10,
                      // marginBottom: 5,
                    }}
                  >
                    <TouchableOpacity
                      style={
                        active == item.id
                          ? styles.activeCategory
                          : styles.category
                      }
                      onPress={() => {
                        setActive(item.id);
                        search(item.text);
                      }}
                    >
                      {/* <Image
                source={item.image}
                style={{ width: 50, height: 40, resizeMode: "contain" }}
              /> */}
                      <Text
                        style={
                          active == item.id
                            ? styles.activeTextCategory
                            : styles.textCategory
                        }
                      >
                        {item.text}
        
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <></>
            )}
           
          </>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

const styles = {
  container: (safeArea, isFloating, isTransparent) => ({
    paddingTop: safeArea.top,
    marginBottom: isFloating ? -TOPNAVI_H - safeArea.top : 0,
    height: TOPNAVI_H + safeArea.top,
    justifyContent: "center",
    shadowOffset: { y: 0 },
    backgroundColor: isTransparent ? "#0001" : "#FFF",
    shadowOpacity: isTransparent ? 0 : 0.5,
    elevation: isTransparent ? 0.01 : 5,
    zIndex: 100,
  }),
  title: (isTransparent) => ({
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: isTransparent ? "#FFF" : "#000",
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

export default TopNavigation;
