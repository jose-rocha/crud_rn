import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import UsersContext from '../context/UsersContext';

export default ({ route, navigation }) => {
 const [user, setUser] = useState(route.params ? route.params : {});
 const { dispatch } = useContext(UsersContext);
 return (
  // console.warn(Object.keys(props.route.params)),
  // console.warn(Object.keys(route.params.avatarUrl)),
    // <Text>{user.name}</Text>
    <View style={styles.form}>
      <Text>Nome:</Text>
      <TextInput
        style={styles.input}
        onChangeText={name => setUser({...user, name})}
        value={user.name}
        placeholder="Informe o Nome"
      />

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={email => setUser({...user, email})}
        value={user.email}
        placeholder="Informe seu e-mail"
        keyboardType='email-address'
      />

      <Text>URL do Avatar:</Text>
      <TextInput
        style={styles.input}
        onChangeText={avatarUrl => setUser({...user, avatarUrl})}
        value={user.avatarUrl}
        placeholder="Informe seu avatar"
      />

      <Button
        title='Salvar'
        onPress={() => {
          dispatch({
            type: user.id ? 'updateUser' : 'createUser',
            payload: user,
          })
          navigation.goBack()        
        }} 
      />
    </View>
  )
};

const styles = StyleSheet.create({
  form: { padding: 12 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom:10,
    paddingLeft:5,
    borderRadius: 5
  }
});
