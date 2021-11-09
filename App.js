import React, { useState, useEffect } from 'react';
import { StyleSheet,Text, TextInput, View, Alert, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

let data = require('./sample_data.json');

export default function App() {
  const [result, setResult] = useState('');
  const [money, setMoney ] = useState('');
  const [multiplier, setMultiplier] = useState('');
  const [rates, setRates] = useState([]);
 
  useEffect(() => {
    fetch(`http://api.exchangeratesapi.io/latest?access_key=7848e807fe9e0f44dce5441232a9233a`)
    .then(response=>  response.json())
    .then(responseJson=>{ 
      if (responseJson.success === false) {
        setRates(data.rates)
      return;
      }
      setRates(responseJson);  
     console.log(data.rates);
    })
    .catch(error=> { Alert.alert('Error',error); });
  }, []); 
  const countRates = ()=> {
    setResult((Number(money) / Number(multiplier)).toFixed(2) +' €');
  }  

  return (
    <View style={styles.container}>
      <View style={{alignItems:'flex-end'}}>
        <Text>{result}</Text>
      </View>
      <View style={{width: 200,flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <View style={{flex:.5}}>
          <TextInput
            style={{width:100,borderWidth: 1}}
            onChangeText={money => setMoney(money)}
            value={money}
          />
        </View>
        <View style={{flex:.5}}>
          <Picker
            selectedValue={multiplier}
          
            onValueChange={(itemValue, itemIndex) => {
              if (itemIndex != 0) {
                setMultiplier(itemValue)
              }
            }}>
            <Picker.Item label="Valitse" value="" />
            {Object.entries(rates).map(([key,value]) => (<Picker.Item label={key} value={value} key={key} />))}
          </Picker>
        </View>
      </View>
      <View style={{alignItems:'center'}}>
        <Button title='Convert' onPress={countRates}/>
      </View>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

  