import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

const DeckCard = props => {
    const { title, cards } = props;
    let display_card = 'Card';
    if (cards && cards.length > 1) {
        display_card = 'Cards';
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.counterWrapper}>
                <Text style={styles.countText}>
                    {cards && cards.length}{" "}{display_card}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#000',
        padding: 30
    },
    titleWrapper: {
        textAlign: 'center'
    },
    counterWrapper: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
    },
    countText: {
        color: '#c5c5c5',
        fontSize: 20
    }
});

DeckCard.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired
};

export default DeckCard;