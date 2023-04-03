
import * as React from "react";
import { Tab } from "@rneui/base";


export default function HeaderTabs ({color}) {
      const [index, setIndex] = React.useState(0);
  return (
    <Tab
      indicatorStyle={{
        backgroundColor: "green",
        height: 3,
      }}
      inactiveColor={"gray"}
      value={0}
      value={index}
      onChange={setIndex}
      dense
      variant="default"
    >
      <Tab.Item
        titleStyle={{
          color: "green",
          textDecoration: "underline",
          textDecorationColor: "black",
        }}
        title="Delivery"
      />
      <Tab.Item
        titleStyle={{
          color: "green",
          textDecoration: "underline",
          textDecorationColor: "green",
        }}
        title="Pickup"
      />
    </Tab>
  );
};
