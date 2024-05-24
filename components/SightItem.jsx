import React, { memo } from "react"
import { TouchableOpacity, View } from "react-native"

export default SightItem = memo(({ item }) => {
    <TouchableOpacity
        onPress={() => {

        }}
    >
        <View style={styles.item}>
              <Text style={styles.nameCard}>{item.tags.name || 'Local Sight'}</Text>
        </View>
    </TouchableOpacity>
})