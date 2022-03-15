import React, { useContext } from "react";
import {FlatList, View, Alert} from 'react-native'
import { ListItem, Avatar, Button } from 'react-native-elements'
import UsersContext from "../context/UsersContext";



export default props => {

    const { state, dispatch } = useContext(UsersContext)

    function confirmUserDeleted(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text:"Sim",
                onPress(){
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text:"Não"
            }
        ])
    }


    function getUserItem({ item: user }) {

        return (
            <ListItem topDivider onPress={() => props.navigation.navigate('UserForm', user)} >
                <Avatar source={{uri: user.avatarUrl}}/>
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>                                        
                </ListItem.Content>                
                <Button 
                    containerStyle={{width: 40}}
                    type="clear"                     
                    icon={{name:'edit', color:'orange', size:15}}
                    onPress={() => props.navigation.navigate('UserForm', user)}
                />
                <Button 
                    containerStyle={{width: 40}} 
                    type="clear"                     
                    icon={{name:'delete', color:'red', size:15}}
                    onPress={() => confirmUserDeleted(user)}
                />
            </ListItem>
        )
    }

    return(
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}