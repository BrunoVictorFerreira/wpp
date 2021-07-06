import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default ChangeACurrentUser = (props) => {
    const { navigation } = props
    return (
        <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: "center" }}>
            <Text style={{fontSize: 22, color: "lightgreen", fontWeight: "bold", textAlign: "center"}}>Selecione o usuário</Text>
            <TouchableOpacity
                style={{ width: "100%", padding: 20, marginTop: 20, backgroundColor: "white", borderRadius: 20 }}
                onPress={() => { navigation.push("Feed", {currentUser: "Bruno"}) }}
            >
                <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>Bruno</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ width: "100%", padding: 20, marginTop: 20, backgroundColor: "white", borderRadius: 20 }}
                onPress={() => { navigation.push("Feed", {currentUser: "Josi"}) }}
            >
                <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>Josi</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    
});