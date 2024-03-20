import React from 'react';
import Soon from "../screens/soon";
import { Text,Image,View, TouchableOpacity, Dimensions } from 'react-native';
import Posts from "../screens/posts";
import Search from "../screens/search";
import Home from "../screens/home";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Form from '../screens/form';

const Tabs = createBottomTabNavigator();
const window = Dimensions.get("window");
export default function HomeStack() {
  const [focused,setFocused] = React.useState(1);
  const active = "red";
  const inactive = "white";

  function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: 'row',height:50 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return(
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
            onLongPress={onLongPress}
            style={{ flex: 1 ,backgroundColor:isFocused?"#52A6FF55":"white",justifyContent:"center",alignItems:"center",display:label == "form"?"none":"flex"}}
          >
            <Image source={options.icon} style={{height:30,width:30,marginTop:5}}/>
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>)
        })}
      </View>
    );
  }
  

  return (
    <Tabs.Navigator tabBar={(props) => <MyTabBar {...props}/>}>
      <Tabs.Screen  
        name="Home"   
        options={{headerShown:false,tabBarShowLabel:false,icon:require("../assets/images/house.png")}}
        component={Home} />
        <Tabs.Screen  
        name="Search"   
        options={{headerShown:false,tabBarShowLabel:false,icon:require("../assets/images/search.png")}}
        component={Search} />
      <Tabs.Screen  name="Settings"   
        options={{headerShown:false,tabBarShowLabel:false,icon:require("../assets/images/settings.png")}} 
        component={Posts} />
        <Tabs.Screen  name="form"   
        options={{headerShown:false,tabBarShowLabel:false,icon:require("../assets/images/settings.png"),}} 
        component={Form}
        tab />
    </Tabs.Navigator>
  )
}