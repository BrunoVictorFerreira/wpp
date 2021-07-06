import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Image,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
export default Feed = (props) => {
    const [currentUser, setCurrentUser] = useState(props?.route?.params?.currentUser)
    const [user, setUser] = useState("")
    const [msg, setMsg] = useState("")
    const [isFirstStep, setIsFirstStep] = useState(true)
    const [users, setUsers] = useState([])

    const {navigation} = props

    const emitUser = (user) => {
        socket.emit("addUser", user)
        props.navigation.push("IndividualMessage", { user })
    }

    socket.on("getAllUsers", (users) => {
        // console.warn("users", users)
        setUsers(users)
    })

    const Card = (props) => {
        return (
            <TouchableOpacity 
                style={{ width: "100%", padding: 10, flexDirection: "row" }}
                onPress={() => {navigation.push("IndividualMessage", {user: props.item})}}
            >
                <View style={{ flex: .5 }}>
                    <Image source={{uri : props.photo}} style={{ width: 40, height: 40, resizeMode: "contain", borderRadius: 20 }} />
                </View>
                <View style={{ flex: 6, borderBottomWidth: .5, borderColor: "lightgray", paddingBottom: 5 }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ marginLeft: 30, fontWeight: "bold", fontSize: 16, flex: 1 }}>{props.user}</Text>
                        <Text style={{ textAlign: "right", flex: 1, fontSize: 10 }}>{props.data}</Text>
                    </View>
                    <Text style={{ marginLeft: 30, fontSize: 12 }}>{props.message}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        socket.emit("getAllUsers", props?.route?.params?.currentUser)
        
    }, [null])

    useEffect(() => {
        // console.warn("users", users)
    }, [users])

    return (
        <View style={styles.sectionContainer}>
            {
                users?.map(item => (
                    <Card item={item} user={item.name || item} photo={item.photo} message={item.message || "Nenhuma mensagem!"} data={item.data || ""} />
                ))
            }

            {/* <Text style={{ textAlign: "center", color: "lightgreen", fontWeight: "bold", fontSize: 20, marginBottom: 40 }}>Informe seu nome</Text> */}
            {/* <TextInput placeholder="Usuário" style={[styles.input, { position: "relative" }]} value={user} onChangeText={(text) => setUser(text)} /> */}
            <TouchableOpacity onPress={() => { props.navigation.push("AllUsers", {currentUser}) }} style={{ backgroundColor: "lightgreen", borderRadius: 50, justifyContent: "center", width: 70, height: 70, position: "absolute", bottom: 10, right: 10 }}>
                <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 40 }}>+</Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    input: {
        padding: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "lightgray",
        width: "100%",
        borderRadius: 10,
        position: "absolute",
        bottom: 30
    }
});