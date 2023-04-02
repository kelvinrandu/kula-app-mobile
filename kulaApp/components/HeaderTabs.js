
import * as React from "react";
import { Tab } from "@rneui/base";


export default function HeaderTabs () {
      const [index, setIndex] = React.useState(0);
  return (
    <Tab
      indicatorStyle={{
        backgroundColor: "black",
        height: 3,
      }}
      value={0}
      value={index}
      onChange={setIndex}
      dense
      variant="default"
    >
      <Tab.Item
        titleStyle={{
          color: "black",
          textDecoration: "underline",
          textDecorationColor: "black",
        }}
        title="Delivery"
      />
      <Tab.Item
        titleStyle={{
          color: "black",
          textDecoration: "underline",
          textDecorationColor: "black",
        }}
        title="Pickup"
      />
    </Tab>
  );
};
