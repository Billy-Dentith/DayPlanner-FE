import { ScrollView, View, Text, StyleSheet, Dimensions } from "react-native"
import { london } from "../data/popularSights"

const { width } = Dimensions.get("window");

export default function PopularSights() {

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.textTitle}>Top 25 Sights</Text>
				{london.map((sight) => {
					return (
						<View style={styles.infoContainer} key={sight.name}>
							<Text style={[styles.text, styles.sightTitle]}>{sight.name}</Text>
							<Text style={styles.text}>{sight.category}</Text>
							<Text style={styles.text}>{sight.description}</Text>
							<Text style={styles.text}>{sight['opening times'].open} - {sight['opening times'].close}</Text>
						</View>
					)
				})}
			</View>
		</ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 10,
			paddingBottom: 25,
      backgroundColor: '#ccc'
    },
    // button: {
    //   backgroundColor: "dimgray",
    //   width: "90%",
    //   padding: 15,
    //   borderRadius: 10,
    //   alignItems: "center",
    //   marginTop: 5,
    //   marginBottom: 0,
    // },
    // buttonText: {
    //   color: "white",
    //   fontWeight: "700",
    //   fontSize: 16,
    // },
    textTitle: {
      paddingLeft: 10,
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
      alignSelf: "center",
      backgroundColor: "dimgray",
      marginBottom: 10,
      width: "100%",
      padding: 2,
    },
    text: {
      marginTop: 5,
      color: "dimgray",
      fontWeight: "600",
      fontSize: 16,
			textAlign: 'center',
    },
		sightTitle: {
			fontWeight: 'bold'
		},
    infoContainer: {
      backgroundColor: 'rgb(235,235,235)',
      alignSelf: "center",
      width: width - 20,
      marginBottom: 10,
      padding: 10,
			paddingHorizontal: 15,
      textAlign: "center",
      borderColor: 'dimgray',
      borderRadius: 15,
			zIndex: 1,
			elevation: 1
    },
  });