import { FlatList, StyleSheet, Text, View ,Dimensions, Button} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Chargerlist from './Chargerlist';

const screen = Dimensions.get('window');

const StationCard=({item})=> {
  return (
    <View style={styles.root}>
    <View style={{flexDirection:"row"}}>
    <View >
      <Text numberOfLines={1} style={{fontSize:13}}>{item.name}</Text>
      <View style={{flexDirection:"row"}}>
      <Text numberOfLines={1} style={{fontSize:10,color:"grey"}}>{item.address}</Text>
      <Text style={{fontSize:10,color:"#900",marginLeft:7}}>{(item.distance/1000).toFixed(1)}Km</Text>
      </View>
      </View>
      <View style={{marginLeft:5}}>
        <Icon name="location-arrow" size={25} color="#900" />
        </View>
      </View>
      <Text style={{fontSize:12,color:"green",marginVertical:5}}>SUPPORTED CONNECTORS</Text>
      <FlatList
      data={item.connnector_types}
      renderItem={({item})=><Chargerlist item={item}/>}
      />
      <View style={{alignItems:"center",marginVertical:2}}>
      <Icon name="chevron-down" size={20} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  root:{
  backgroundColor:"black",
  width:screen.width/1.9,
  borderRadius:10,
  elevation:10,
  padding:10,
  marginHorizontal:5
}
})

export default StationCard