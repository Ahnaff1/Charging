

import React, { useState ,useEffect,useCallback,useRef} from 'react';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  
  View,
  Dimensions,
  Alert,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import { locationPermission,getCurrentLocation } from './Screens/Helper/Permissions';
import ViewShot from "react-native-view-shot";
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import StationCard from './Screens/Components/StationCard';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Marker} from 'react-native-maps';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();






const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const data=
  {
    chargers:[
      {
      name:"Expressway charging - mariam enterprise",
      id:"a001",
      address:"Connaught place ,Delhi",
      distance:"2102",
      distance_matrics:"metres",
      latitude:"28.7031",
      longitude:"77.1025",
      connnector_types:['lvl1dc-2','lvl2dc-1','normalac-1']
    },
      {
      name:"Expressway charging - mariam enterprise",
      id:"a002",
      address:"Connaught place ,Delhi",
      distance:"2102",
      distance_matrics:"metres",
      latitude:"28.7541",
      longitude:"77.1015",
      connnector_types:['lvl1dc-2','lvl2dc-1','normalac-1']
    },
      {
      name:"Expressway charging - mariam enterprise",
      id:"a003",
      address:"Connaught place ,Delhi",
      distance:"2102",
      distance_matrics:"metres",
      latitude:"28.7021",
      longitude:"77.1235",
      connnector_types:['lvl1dc-2','lvl2dc-1','normalac-1']
    },
  ]
  }


const App=() => {
  const[flag,setFlag]=useState(false)
  const[search,setSearch]=useState('')
  const [curLoc,setCurLoc]=useState({
    latitude: 28.7041,
    longitude: 77.1025,
  })
  const mapRef = useRef();
  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 3000);
    return () => clearInterval(interval);
  });

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude} = await getCurrentLocation();
      setCurLoc({
        latitude:latitude,
        longitude:longitude
      })
    }
  };


  const ref = useRef();

  const capture=()=>{
    ref.current.capture().then(async uri => {
      console.log("do something with ",RNFetchBlob.wrap(uri.replace('file://', '')) )
      await axios.post('https://3.7.20.173:8503/api/upload/',{
        file:RNFetchBlob.wrap(uri.replace('file://', ''))
      }).then(r=>{
        console.log(r.data)
        setFlag(true)
      }).catch(e=>{
        console.log(e)
        setFlag(true)
        
      })
    
    })
  
  }


  return (
<ViewShot style={styles.root} ref={ref} options={{ fileName: "Your-File-Name", format: "webm", quality: 0.9 }}>
<View style={styles.root}>
 
<MapView
  ref={mapRef}
  style={StyleSheet.absoluteFill}
    initialRegion={{
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta:LONGITUDE_DELTA,
    }}
    
    followsUserLocation={true}
    showsMyLocationButton={false}
    userLocationUpdateInterval={5000}
    showsUserLocation={true}
    mapType="terrain"
  >
    {flag && data.chargers.map(x=>{
      return(
        <Marker coordinate={{latitude:parseFloat( x.latitude),longitude:parseFloat( x.longitude)}}>
            <Icon name="circle" color="green" size={25} />
        </Marker>
      )
    })}
  </MapView>
   {!flag &&
  
   <View style={styles.captureButton}>
    <TouchableOpacity onPress={capture}>
   <Icon name="plus" color="green" size={20} />
   </TouchableOpacity>
   </View>
}
   {!flag &&

   <View style={styles.location}>
    <TouchableOpacity onPress={()=>mapRef.current?.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,

    })}>
   <Icon name="location-arrow" color="green" size={20} />
   </TouchableOpacity>
   </View>
}
 {flag &&  <View>
  <FlatList
  style={{top:screen.height/1.4}}
  horizontal
  keyExtractor={(item)=>item.id}
  data={data.chargers}
  renderItem={({item})=><StationCard item={item}/>}/>
  </View>}
 
</View>
<View style={styles.search}>
    <View style={{marginHorizontal:15}}>
      <Icon name="bars" color="black" size={20} />
      </View>
      <View style={styles.searchInput}>
      <View style={{marginHorizontal:10}}>
      <Icon name="circle" color="green" size={15} />
      </View>
      <View style={{flex:1}}>
      <TextInput value={search} onChangeText={text=>setSearch(text)} placeholder='Search for compatible charger'  />
      </View>
      <View style={{right:10}}>
      <Icon name="repeat" color="green" size={15} />
    </View>
      </View>
      
  </View>
</ViewShot>
  );
};

const styles = StyleSheet.create({

  root:{
    flex:1
  },
  captureButton:{
    width:50,
    height:50,
    position:"absolute",
    right:20,
    bottom:20,
    backgroundColor:"black",
    justifyContent:"center",
    alignItems:'center',
    borderRadius:10
},
location:{
  width:50,
  height:50,
  position:"absolute",
  left:20,
  bottom:20,
  backgroundColor:"black",
  justifyContent:"center",
  alignItems:'center',
  borderRadius:10
},
search:{
  position:"absolute",
  top:25,
  width:"100%",
  flexDirection:"row",
  alignItems:"center"
},
searchInput:{
  flex:1,
  backgroundColor:'black',
  marginRight:15,
  borderRadius:10,
  flexDirection:"row",
  alignItems:'center'
}
});

export default App;
