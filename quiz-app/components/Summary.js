import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

export function Summary({ route }) {
    const { data, answers } = route.params;

    const isCorrect = (question, userAnswer) => {
        if (Array.isArray(question.correct)) {
            return (
                Array.isArray(userAnswer) &&
                question.correct.length === userAnswer.length &&
                question.correct.every(c => userAnswer.includes(c))
            );
        }
        return userAnswer === question.correct;
    };

    const  totalScore = data.reduce((score,question,i) => {
        return isCorrect(question, answers[i]) ? score + 1: score;
    }, 0);

    return (
        <View style={styles.content}>
            <Text testID="total" style={styles.score}>Total Score: {totalScore}/{data.length}</Text>
            {data.map((q, i) => {
                const user = answers[i];
                const correct = q.correct;
                return (
                    <View key={i} style={{ marginVertical: 10, }}>
                        <Text style={styles.questionText}>{q.prompt}</Text>
                        {q.choices.map((choice, idx) => {
                            const chosen = Array.isArray(user) ? user.includes(idx) : user === idx;
                            const isCorrectAnswer = Array.isArray(correct) ? correct.includes(idx) : correct === idx;
                            let choiceStyle = [styles.choiceText];
                            if (isCorrectAnswer && chosen) {
                                choiceStyle.push(styles.correctAnswer);
                            }
                            if (!isCorrectAnswer && chosen) {
                                choiceStyle.push(styles.incorrectAnswer);
                            }
                            return (
                                <Text key={idx} style={choiceStyle}>
                                    {choice}
                                </Text>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
}

const styles= StyleSheet.create({
    content: {
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center',  
        padding: 20,
    },
    score: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 30,
    },
    questionText: {
        fontSize: 30,
        fontWeight: '600',
    },
    choiceText: {
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
    },
    correctAnswer: {
        fontWeight: 'bold',
        color: 'green',
    },
    incorrectAnswer: {
        fontWeight: 'bold',
        color: 'red',
    },
})