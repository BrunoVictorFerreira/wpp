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
export default IndividualMessage = (props) => {
    const [user, setUser] = useState(props?.route?.params?.user)
    const [msgs, setMsgs] = useState([])
    const [msg, setMsg] = useState("")
    const [isFirstStep, setIsFirstStep] = useState(true)
    const [users, setUsers] = useState([])
    const [getCountUsers, setGetCountUsers] = useState(0)
    const [isTyping, setIsTyping] = useState(false)

    const emitMessage = (obj) => {
        setMsg("")
        socket.emit("msg", obj)
    }

    socket.on("getAllMessages", (msgs) => {
        console.warn("msgs", msgs)
        setMsgs(msgs)
    })

    // socket.on("msg", (obj) => {
    //     setMsgs(obj)
    // })

    useEffect(() => {
        console.warn("user", user)
        socket.emit("getAllMessages", {userEmit: "Bruno", userReceived: user.name})
        // socket.emit("getCountAllUsers")
    }, [null])

    return (
        <>
            <View style={styles.sectionContainer}>

                <View style={{ flex: 1 }}>
                    <View
                        style={{ width: "100%", paddingVertical: 10, paddingHorizontal: 20, flexDirection: "row", backgroundColor: "lightgray" }}
                    >
                        <View style={{ flex: .5 }}>
                            <Image source={{ uri: user.photo }} style={{ width: 40, height: 40, resizeMode: "contain", borderRadius: 20 }} />
                        </View>
                        <View style={{ flex: 6, paddingBottom: 5 }}>
                            <Text style={{ marginLeft: 30, fontWeight: "600", fontSize: 16 }}>{user.name}</Text>
                            <Text style={{ marginLeft: 30, fontSize: 10, marginTop: 3 }}>Visto por último: 10/02/2021</Text>
                        </View>
                    </View>

                    {
                        msgs?.map(item => (
                            <View style={{ backgroundColor: "lightgray", alignSelf: item.users.userReceived == user.name ? "flex-end" : "flex-start", width: "80%", marginTop: 10, padding: 15, borderTopLeftRadius: item.users.userReceived == user.name ? 10 : 0, borderBottomLeftRadius: item.users.userReceived == user.name ? 10 : 0, borderBottomRightRadius: item.users.userReceived == user.name ? 0 : 10, borderTopRightRadius: item.users.userReceived == user.name ? 0 : 10 }}>
                                <Text>{item.message}</Text>
                            </View>

                        ))
                    }
                    {
                        isTyping && <Text style={{ textAlign: "right" }}>Algum usuário está digitando ...</Text>
                    }
                </View>





            </View>
            <View style={{ backgroundColor: "white", paddingBottom: 30, position: "absolute", bottom: 0, alignSelf: "center", width: "100%", paddingLeft: 10 }}>
                <TextInput placeholder="Mensagem" style={[styles.input, { width: "85%" }]} value={msg} onChangeText={(text) => setMsg(text)} />
                <TouchableOpacity onPress={() => { emitMessage({userEmit: "Bruno", userReceived: user.name, message: msg})}} style={{ position: "absolute", right: 10, bottom: 30, width: 40, backgroundColor: "lightgreen", padding: 10, borderRadius: 10 }}>
                    <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>></Text>
                </TouchableOpacity>
            </View>
        </>
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
    }
});