import React from "react";
import { View, StyleSheet, TextInput, Alert, Text, KeyboardAvoidingView } from "react-native";
import { addCardToDeck } from "../constants/Database";
import { TouchableOpacity } from "react-native-gesture-handler";

class AddQuestionScreen extends React.Component {

    state = {
        question: '',
        answer: '',
        title: ''
    }

    componentDidMount() {
        const { title } = this.props.route.params;
        this.setState(() => ({ title }));
    }

    onSubmitHandler = async () => {
        const { question, answer, title } = this.state;
        if (question !== "" && answer !== "") {
            const card = { question, answer };
            await addCardToDeck(title, card);
            this.props.navigation.navigate("deck-details", {title: title});
        }
        else {
            Alert.alert("Please all fields are required");
        }
    }

    onChangeHandler = (value, label) => {
        this.setState({
            [label]: value
        });
    }

    render() {
        const { question, answer } = this.state;

        return (
            <KeyboardAvoidingView style={styles.rootContainer}>
                <View style={styles.formContiner}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={(e) => this.onChangeHandler(e, 'question')}
                            value={question}
                            placeholder="Question here..."
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            onChangeText={(e) => this.onChangeHandler(e, 'answer')} 
                            value={answer}
                            placeholder="Your answer here..."
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn} onPress={this.onSubmitHandler}>
                            <Text style={styles.btnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    formContiner: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        marginBottom: 10,
        padding: 10
    },
    btnContainer: {
    },
    input: {
        width: 300,
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18
    },
    btn: {
        borderWidth: 2,
        backgroundColor: '#000',
        borderRadius: 5,
        padding: 20,
        width: 250
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default AddQuestionScreen;