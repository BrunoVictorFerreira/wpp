import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    Button,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
    Alert,
} from 'react-native';
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
export default IndividualMessage = (props) => {
    const [user, setUser] = useState(props?.route?.params?.user)
    const [currentUser, setCurrentUser] = useState(props?.route?.params?.currentUser)
    const [msgs, setMsgs] = useState([])
    const [msg, setMsg] = useState("")
    const [isFirstStep, setIsFirstStep] = useState(true)
    const [users, setUsers] = useState([])
    const [getCountUsers, setGetCountUsers] = useState(0)
    const [isTyping, setIsTyping] = useState(false)

    const allUsers = [
        {
            name: "Bruno",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOs_nQgqQdmlC-UGX3BqlBy9Bn_TL425Grdw&usqp=CAU"
        },
        {
            name: "Fabricio",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkqnM3ajmrQOzyn8PIu2sCX77ZNT8PNpwKSQ&usqp=CAU"
        },
        {
            name: "Alana",
            photo: "https://img1.gratispng.com/20180917/bfe/kisspng-royalty-free-womans-profile-stock-photography-bla-5b9fece6e54937.2295423215372075269392.jpg"
        },
        {
            name: "Jaine",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-4gt9rrPUOZAdm49f4C_1vd1-31WaV1ibEspHYpLaunjIaAnD81qlLVpf3_tKWD-HCcw&usqp=CAU"
        },
        {
            name: "Josi",
            photo: "https://w7.pngwing.com/pngs/277/573/png-transparent-fashion-graphy-woman-woman.png"
        },
        {
            name: "Francisco",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoricCiKi0-wNXo1YdXcmMS8834xXj1-tYRg&usqp=CAU"
        },
        {
            name: "Diego",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-7w978MV__Gx1fHcZVXGQIa21M3eyADeRQw&usqp=CAU"
        },

    ]

    const Card = (props) => {
        return (
            <TouchableOpacity 
                style={{ width: "100%", padding: 10, flexDirection: "row" }}
                onPress={() => {
                    Alert.alert(
                        "Atenção", 
                        `deseja adicionar ${props.name} a sua lista de contatos?`,
                        [
                            {
                                text: "Sim",
                                onPress : () => {emitUser({name: props.name, photo: props.photo})}
                            },
                            {
                                text: "Não"
                            }
                        ]
                        )
                }}
            >
                <View style={{ flex: .5 }}>
                    <Image source={{uri : props.photo}} style={{ width: 40, height: 40, resizeMode: "contain", borderRadius: 20 }} />
                </View>
                <View style={{ flex: 6, borderBottomWidth: .5, borderColor: "lightgray", paddingBottom: 5 }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text style={{ marginLeft: 30, fontWeight: "bold", fontSize: 16, flex: 1 }}>{props.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const emitUser = (user) => {
        socket.emit("addUser", {user, currentUser: props?.route?.params?.currentUser})
        props.navigation.pop()
    }

    useEffect(() => {
    }, [null])

    return (

        <View style={styles.sectionContainer}>
            {
                allUsers.map(item => (
                    <Card name={item.name} photo={item.photo}/>
                ))
            }

            {/* <Text style={{ textAlign: "center", color: "lightgreen", fontWeight: "bold", fontSize: 20, marginBottom: 40 }}>Informe seu nome</Text> */}
            {/* <TextInput placeholder="Usuário" style={[styles.input, { position: "relative" }]} value={user} onChangeText={(text) => setUser(text)} /> */}
            <TouchableOpacity onPress={() => { props.navigation.push("AllUsers") }} style={{ backgroundColor: "lightgreen", borderRadius: 50, justifyContent: "center", width: 70, height: 70, position: "absolute", bottom: 10, right: 10 }}>
                <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 40 }}>+</Text>
            </TouchableOpacity>
        </View >

    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
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