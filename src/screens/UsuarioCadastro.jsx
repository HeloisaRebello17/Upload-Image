
import { useState } from "react"
import { View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore"
//importa  a aplicação em Firebase
import { app } from "../config/firebase"
import styles from "../config/styles"

 export default function UsuarioCadastro(){
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    async function handleRegister(){
        console.log(nome);
    //inicia o banco de dados
        const db = getFirestore(app);
        //addDoc é responsável pela inserção do dado em uma coleção "Tabela"
        const docRef = await addDoc(
            //Primeiro parâmetro é os dados que serão inseridos
            collection(db, "usuarios"),
            //Segundo parâmetro é os dados que serão inseridos
            {
                nome:nome, 
                email: "heloisarebellocabral.79@gmail.com"
            }
        ).then ((docRef)=> {
            console.log("Id do usuário: ", docRef.id)
            setNome('')
        });
    }
    return(
        <View style={styles.container}>
            <Text>Cadastro do Usuário</Text>
            <TextInput
            label="Nome"
            mode="outlined"
            onChangeText={setNome}
            />
             <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
            />
            <Button
            mode="contained"
            onPress={handleRegister}
            > Cadastrar Usuário</Button>
        </View>
    )
 }