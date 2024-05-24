import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { useContext } from "react";
// import RouteForm from '../components/RouteForm'
import { SightsContext } from "../context/SightsContext";
import SightItem from '../components/SightItem'

const RoutePlanner = () => {
  const { usersSights, setUsersSights } = useContext(SightsContext);

  return (
    <View contentContainerStyle={styles.container}>
      <Text style={styles.text}>Choose from the below sights to start planning your route:</Text>
      <FlatList 
          data={usersSights}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
                onPress={() => {
                    console.log(item);
                }}
            >
                <View style={styles.item}>
                    <Text style={styles.nameCard}>{item.tags.name || 'Local Sight'}</Text>
                </View>
            </TouchableOpacity>
          )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  nameCard: {
    textTransform: 'capitalize',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'left',
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 10,
    color: "dimgray",
},
})

export default RoutePlanner;
