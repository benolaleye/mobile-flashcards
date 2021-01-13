import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, BackHandler } from "react-native";

class ScoreViewScreen extends React.Component {

    state = {
        title: '',
        correct: 0,
        incorrect: 0
    }

    syncData = async () => {
        this.setState({incorrect: 0, correct: 0});
        const { title, correct, inCorrect } = this.props.route.params;
        this.setState(() => ({ title, 
            correct,
            incorrect: inCorrect 
        }));
    }

    async componentDidMount() {
        this.syncData();
        this.props.navigation.addListener('focus', () => {
            this.syncData();
        });

        this.BackHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        this.BackHandler.remove();
    }

    handleBackButtonClick = () => {
        this.props.navigation.navigate("Decks");
        return true;
    };

    render() {
        const { navigation } = this.props;
        const { title, correct, incorrect } = this.state;

        return (
            <View style={styles.rootContainer}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.titleText}>Correct Answer: {correct}</Text>
                        <Text style={styles.titleText}>Incorrect Answer: {incorrect}</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("add-quiz", {title: title})}>
                            <Text style={styles.btnText}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnStart} onPress={() => navigation.navigate("deck-details", {title: title})}>
                            <Text style={styles.btnStartText}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    titleWrapper: {
        marginBottom: 10,
        textAlign: 'center'
    },
    counterWrapper: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#000',
    },
    countText: {
        color: '#c5c5c5',
        fontSize: 20
    },
    btnContainer: {
        padding: 20,
        marginTop: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
        color: '#000',
        padding: 20,
        width: 250
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    btnStart: {
        marginBottom: 10,
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: 5,
        padding: 20,
        width: 250
    },
    btnStartText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
});

export default ScoreViewScreen;