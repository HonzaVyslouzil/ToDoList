import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import Ukol from './komponenty/Ukoly';

export default function App() {

  const[ukol,setUkol] = useState();
  const[ukolPolozky, setUkolPolozky] = useState([]);

  const funkcePridejUkol = () => {
    Keyboard.dismiss();
    setUkolPolozky([...ukolPolozky, ukol])
    setUkol(null);
  }
  const dokoncenyUkol = (index) =>{
    let kopiePolozky = [...ukolPolozky];
    kopiePolozky.splice(index, 1);
    setUkolPolozky(kopiePolozky);
  }

  return (
    <View style={styles.container}>
      {/* Scrollování když bude seznam ukolu delší než stránka*/}
      <ScrollView
        contentContainerStyle = {{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps ='handled'
        >
      {/*Dnešní úkol*/}
      <View style={styles.ukolWrapper}>
          <Text style={styles.sectionTitle}>Dnešní úkoly</Text>
          <View style={styles.polozka}>
            {/*Sem se budou vkládat ukoly*/}
            {
              ukolPolozky.map((polozka, index) => {
                return (
                  <TouchableOpacity  klic={index}  onPress={() => dokoncenyUkol(index)}>
                    <Ukol text={polozka} />
                  </TouchableOpacity>
                )
              })
            }
          </View>
      </View>
      </ScrollView>

      {/*Vytvoří nový ukol*/}
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.napisUkolWrapper}
      >
      <TextInput style={styles.input} placeholder={'Napiš svůj úkol'}value={ukol} onChangeText={text => setUkol(text)}/>
      <TouchableOpacity onPress={() =>funkcePridejUkol()}>
        <View style={styles.pridatWrapper}>
          <Text style={styles.pridatText}>+</Text>
        </View>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
    tasksWrapper: {
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      paddingTop: 80,
      fontSize: 24,
      fontWeight:'bold'
    },
    polozka: {
     marginTop: 30, 
    },
    napisUkolWrapper:{
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    input:{
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
    },
    pridatWrapper:{
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent:'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    pridatText:{}, 
});
