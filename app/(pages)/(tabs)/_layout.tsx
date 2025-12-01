import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";

import { IconSymbol } from "@/app/components/ui/icon-symbol";
import { useColor } from "@/theme/hooks/useColor";
import { Keyboard } from "react-native";

export default function TabLayout() {
  const color = useColor();
  const [tabsVisible, setTabsVisible] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setTabsVisible(false);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setTabsVisible(true);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarLabelPosition: "beside-icon",
        headerShown: false,
        tabBarStyle: {
          display: tabsVisible ? "flex" : "none",
          backgroundColor: color.background,
          borderTopWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Configuracion",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="c.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
