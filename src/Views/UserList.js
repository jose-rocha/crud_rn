import React, { useContext } from 'react';
import { Avatar, Button, Icon, ListItem } from '@rneui/base';
import {View,  FlatList, Alert} from 'react-native';
import UsersContext from '../context/UsersContext';


export default props => {
//  const ctx = useContext(UsersContext);
//  console.warn(Object.keys(ctx.state));

 const { state, dispatch } = useContext(UsersContext);

  const confirmUserDeletion = user => (
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?',
    [
      {
        text: 'Sim',
        onPress() {
          // console.warn(`delete ${user.id}`);
          dispatch({
            type: 'deleteUser',
            payload: user,
          });
        }
      },
      {text: 'Não'},
    ]
    )
  );

  const getUserItem = ({ item: user }) => {
    return (
      <ListItem key={user.id} bottomDivider onPress={() => { props.navigation.navigate('UserForm')}} >
        <Avatar source={{uri: user.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <Button
          onPress={() => props.navigation.navigate('UserForm', user)}
          type='clear'
          icon={<Icon name='edit' size={25} color='orange'/>}
        />
        <Button
          onPress={() => confirmUserDeletion(user)}
          type='clear'
          icon={<Icon name='delete' size={25} color='red'/>}
        />
      </ListItem>
    )
  }
  
  return (
  // console.warn('error'),
    <View>
      <FlatList
        keyExtractor={user => user.id.toString()}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
)};