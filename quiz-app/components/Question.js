import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

export function Question({ route, navigation }) {
    const { data, index, answers } = route.params;
    if (!data || index == null || !data[index]) {
        return (
          <View style={{ padding: 20 }}>
            <Text>Error: Question data is missing.</Text>
          </View>
        );
      }      
    const question = data[index];
    const [selected, setSelected] = useState(question.type === 'multiple-answer' ? [] : null);

    const isMultipleAnswer = question.type === 'multiple-answer';

    const handleSelect = (i) => {
        if (isMultipleAnswer) {
            if (selected.includes(i)) {
                setSelected(selected.filter(x => x !== i));
            } else {
                setSelected([...selected, i]);
            }    
        } else {
            setSelected(i);
        }
    };

    const handleNext = () => {
        const newAnswers = [...answers, selected];
        if (index + 1 < data.length) {
            navigation.push('Question', {
                data,
                index: index + 1,
                answers: newAnswers
            });
        } else {
            navigation.navigate('Summary', { data, answers: newAnswers });
        }
    };

    return (
        <View style={styles.centered}>
            <Text style={styles.questionText}>{question.prompt}</Text>
            <ButtonGroup
                vertical
                testID="choices"
                buttons={question.choices}
                selectedIndexes={isMultipleAnswer ? selected : undefined}
                selectedIndex={!isMultipleAnswer ? selected : undefined}
                onPress={handleSelect}
                containerStyle={styles.buttonGroupContainer}
            />
            <View style={styles.nextbutton}>
            <Button
                testID="next-question"
                title={index + 1 === data.length ? "Finish Quiz" : "Next Question"}
                onPress={handleNext}
                disabled={selected === null || (isMultipleAnswer && selected.length === 0)}
                containerStyle={styles.nextbutton}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center',  
        padding: 20,  
    },
    questionText: {
        fontSize: 30,  
        marginBottom: 20,  
        textAlign: 'center',  
        paddingTop: 40,
        fontWeight: 'bold'
    },
    buttonGroupContainer: {
        width: '100%',
        maxWidth: 400,
    },
    nextbutton: {
        /*width: '100%',
        maxWidth: 250,*/
        paddingTop: 20,
    },
});