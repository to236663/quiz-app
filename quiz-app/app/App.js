import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Question } from '../components/Question';
import { Summary } from '../components/Summary';

const Stack = createNativeStackNavigator();

const quizQuestions = [
    {
        prompt: "What color is the sky?",
        type: "multiple-choice", 
        choices: ["Red","Blue","Green","Pink"],
        correct: 1
    },
    {
        prompt: "What color's are apart of Spider-Man's suit? (2 choices)",
        type: "multiple-answer",
        choices: ["Yellow","Red","Purple","Blue"],
        correct: [1,3]
    },
    {
        prompt: "2025 is a leap year.",
        type: "true-false",
        choices: ["True","False"],
        correct: 1
    }
];

export default function App() {
    return (
        <Stack.Navigator initialRouteName='Question'>
            <Stack.Screen name='Question' component={Question} initialParams={{ data: quizQuestions, index: 0, answers: [] }} options={{ headerShown: false,}}/>
            <Stack.Screen name='Summary' component={Summary} options={{ headerLeft: () => null, }}/>
        </Stack.Navigator>
    )
}

export { Question,Summary };

