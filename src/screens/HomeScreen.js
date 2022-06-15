import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  TextInput, 
  ImageBackground, 
  Image,
  ScrollView, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";
import { dataMole } from "../assets/mole";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;



const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();
  const [number, onChangeNumber] = useState(null);
  const [modal, setModal] = useState(false);
  const [textModal, setTextModal] = useState(null);


 

  const onClickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    console.log(number);
    if(number === null || number > 26 || number < 1){
      Alert.alert('Please input Number Mole');
      return false;
    };
    dispatch(decrement());
    setTextModal(dataMole[number - 1].text);
    setModal(true);
    onChangeNumber(null);
  }

  const onClickCloseButton = () => {
    setModal(false);
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.buy} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image source={images.face} style={appStyle.scoreStyle} />
      <Image source={images.label} style={appStyle.labelImage} />
      <View style={appStyle.bottomView}>
        <View style={appStyle.valueMole}>
          <Image source={images.watchmole} style={appStyle.logoImage} />
          <TextInput
            style={appStyle.input}
            onChangeText={text => onChangeNumber(text)}
            value={number}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity onPress={() => onClickStartButton()}>
          <Image style={appStyle.createButton} source={images.start} />
        </TouchableOpacity>
      </View>
      { modal && <View style={appStyle.modalView}>
        <View style={appStyle.centerView}>
          <View style={appStyle.closeStyle}>
            <TouchableOpacity onPress={() => onClickCloseButton()}>
              <Image style={appStyle.buyImage} source={images.closeBtn} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{marginTop: windowWidth * 0.15}} contentContainerStyle={{ paddingHorizontal: 10}}>
            <Text style={appStyle.labelText}>{textModal}</Text>
          </ScrollView>
        </View>
      </View>}
    </ImageBackground>
  );
};




export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  modalView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0%',
    left: '0%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  closeStyle: {
    position: 'absolute',
    top: '2%',
    right: '3%',
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attributeView: {
    flex: 0.1,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  centerView: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.6,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 2,
  },
  labelImage:{
    width: windowWidth * 0.9,
    height: windowWidth * 0.05,
    resizeMode: 'contain',
  },
  logoImage: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
  },
  valueMole: {
    width: '100%',
    height: windowHeight * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  input: {
    height: windowWidth < 640 ? 40 : 60,
    width: windowWidth * 0.3,
    margin: 12,
    borderWidth: 5,
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  appBar: {
    width: '15%',
    position: 'absolute',
    top: '3%',
    right: '2%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  turnView: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  scoreStyle: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.7,
    resizeMode: 'contain',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'black',
  },
  labelText: {
    paddingTop : 20,
    fontSize: windowWidth > 640 ? 60 : 40,
    color: 'black',
    fontWeight: 'bold',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  bottomView: {
    height: windowHeight * 0.2,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  createButton: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    marginRight: 10,
    alignItems: 'flex-start',
    resizeMode: 'contain',
  },
  backStyle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
});

export default Home;