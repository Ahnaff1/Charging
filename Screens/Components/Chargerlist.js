import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Chargerlist=({item})=> {
const quantity= item.split('-')[1]
const name= item.split('-')[0]
  return (
    <View style={styles.root}>
    <View>
      {name=='lvl1dc'?
      <>
      <View style={{flexDirection:"row"}}>
        <View style={{marginRight:3}}>
      <Icon name="plug" size={15} />
      </View>
      <Text style={{fontSize:12}}>Level 1 DC</Text>
      </View>
      <Text style={{fontSize:10,color:'green'}}>15KW Fast Charging</Text>
      </>
      :null}
      {name=='lvl2dc'?  <>
      
      <View style={{flexDirection:"row"}}>
        <View style={{marginRight:3}}>
      <Icon name="plug" size={15} />
      </View>
      <Text style={{fontSize:12}}>Level 2  DC</Text>
      </View>
   
      <Text style={{fontSize:10,color:'green'}}>50KW Fast Charging</Text>
      </>:null}
      {name=='normalac'?  <>
      <View style={{flexDirection:"row"}}>
        <View style={{marginRight:3}}>
      <Icon name="plug" size={15} />
      </View>
      <Text style={{fontSize:12}}>Normal AC</Text>
      </View>
      <Text style={{fontSize:10,color:'green'}}>3KW Fast Charging</Text>
      </>:null}
      </View>
      <Text style={{fontSize:12}}>x{quantity}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  root:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginVertical:1
}
})


export default Chargerlist