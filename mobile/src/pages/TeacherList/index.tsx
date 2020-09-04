import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Picker } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import TimePicker from 'react-native-simple-time-picker';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

interface Time{
    
    hours: number,
    minutes: number,
}

function TeacherList(){
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [ selectedTime, setSelectedTime ] = useState<Time>({hours:0, minutes:0});
    
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeacherIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })

                setFavorites(favoritedTeacherIds)
            }
        });
    }

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible);
    };

    async function handleFiltersSubmit(){

        loadFavorites();

        console.log(selectedTime);

        const time = `${selectedTime.hours}:${selectedTime.minutes}`;
        
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setIsFiltersVisible(false);
        setTeachers(response.data);
    };

    useFocusEffect(() => {
        loadFavorites();
    });

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff"/>
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        
                        <View style={styles.inputGroup}>


                            <View style={styles.inputBlock}>
                                <View >
                                        <Text style={styles.label}>Matéria</Text>
                                        <Picker 
                                            selectedValue={subject}
                                            style={styles.input}
                                            onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}
                                        >

                                            <Picker.Item label="Artes" value="Artes"/>
                                            <Picker.Item label="Biologia" value="Biologia"/>
                                            <Picker.Item label="Ciências" value="Ciências"/>
                                            <Picker.Item label="Educação Física" value="Educação Física"/>
                                            <Picker.Item label="Física" value="Física"/>
                                            <Picker.Item label="Geografia" value="Geografia"/>
                                            <Picker.Item label="História" value="História"/>
                                            <Picker.Item label="Matemática" value="Matemática"/>
                                            <Picker.Item label="Português" value="Português"/>
                                            <Picker.Item label="Química" value="Química"/>
                                        </Picker>
                                    </View>
                                <View >
                                    <Text style={styles.label}>Dia da Semana</Text>
                                    <Picker 
                                        selectedValue={week_day}
                                        style={styles.input}
                                        onValueChange={(itemValue, itemIndex) => setWeek_day(itemValue)}
                                    >

                                        <Picker.Item label="Domingo" value='0'/>
                                        <Picker.Item label="Segunda-feira" value='1'/>
                                        <Picker.Item label="Terça-feira" value='2'/>
                                        <Picker.Item label="Quarta-feira" value='3'/>
                                        <Picker.Item label="Quinta-feira" value='4'/>
                                        <Picker.Item label="Sexta-feira" value='5'/>
                                        <Picker.Item label="Sábado" value='6'/>
                                    </Picker>
                                </View>
                           
                            </View>                            
                            <View>
                                <Text style={styles.label}>Horário</Text>
                                <View style={styles.timeBlock}>
                                    <Text style={styles.timeText}>{selectedTime.hours}:{selectedTime.minutes}</Text>
                                    
                                    <TimePicker 
                                        selectedHour={selectedTime.hours}
                                        selectedMinutes={selectedTime.minutes}
                                        onChange={( hours: number, minutes:number ) => setSelectedTime({hours, minutes})}
                                    /> 
                                </View> 
                            </View>
                        </View>
                            

                        
                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>

                    </View>
                )}

            </PageHeader>
            
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id)}
                    />)      
                })}

                
            </ScrollView>
        </View>
    );
}

export default TeacherList;