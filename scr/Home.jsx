import { StyleSheet, Text, View, Image, Switch } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import bleach from '../images/bleach.png';
import star from '../images/star.png';
import side from '../images/hexagon.png';
import dry from '../images/dry-clean.png';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { EventRegister } from 'react-native-event-listeners';
import Themecontext from '../theme/Themecontext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const [darkmode, setdarkmode] = useState(false);
    const theme = useContext(Themecontext);

    const toggleDarkMode = async (value) => {
        setdarkmode(value);
        await AsyncStorage.setItem('darkmode', JSON.stringify(value));
        EventRegister.emit('changeTheme', value);
    };

    useEffect(() => {
        const fetchDarkMode = async () => {
            const savedmode = await AsyncStorage.getItem('darkmode');
            if (savedmode != null) {
                setdarkmode(JSON.parse(savedmode));
            }
        };
        fetchDarkMode();
        const listeners = EventRegister.addEventListener('changeTheme', (data) => {
            setdarkmode(data);
        });

        return () => {
            EventRegister.removeAllListeners(listeners);
        };
    }, []);

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            <SafeAreaView>
                <View style={styles.header}>
                    <Text style={[styles.greetingText, { color: theme.textColor }]}>
                        Hi, Aditya 🫡
                    </Text>
                    <Switch
                        value={darkmode}
                        onValueChange={toggleDarkMode}
                        thumbColor={darkmode ? '#f4f3f4' : '#767577'}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                    />
                </View>

                <View style={styles.cardContainer}>
                    {[
                        { title: 'Financial Freedom', image: bleach },
                        { title: 'Productive', image: dry },
                        { title: 'Feeling Well', image: side },
                        { title: 'Personal Life', image: star },
                    ].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.card, { backgroundColor: theme.cardBackground }]}
                            activeOpacity={0.8}>
                            <Text style={[styles.cardTitle, { color: theme.textColor }]}>
                                {item.title}
                            </Text>
                            <View
                                style={[styles.cardImageContainer, { backgroundColor: theme.boxBackground }]}>
                                <Image source={item.image} style={styles.cardImage} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.navigationButton}
                    onPress={() => navigation.navigate('Profile')}>
                    <Text style={[styles.navigationButtonText, { color: theme.textColor }]}>
                        View Productivity Details
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    greetingText: {
        fontSize: 26,
        fontWeight: '700',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    card: {
        width: 160,
        height: 160,
        borderRadius: 15,
        padding: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    cardImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    cardImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    navigationButton: {
        marginVertical: 20,
        marginHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: '#6C63FF',
        borderRadius: 10,
        alignItems: 'center',
    },
    navigationButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
