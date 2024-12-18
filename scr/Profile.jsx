import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import bleach from '../images/bleach.png';
import star from '../images/star.png';
import side from '../images/hexagon.png';
import dry from '../images/dry-clean.png';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Themecontext from '../theme/Themecontext';

const Profile = ({ navigation }) => {
    const theme = useContext(Themecontext);

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            <SafeAreaView>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[styles.greetingText, { color: theme.textColor }]}>
                        Hi, Sankalp 🫡
                    </Text>
                </View>

                {/* Cards Section */}
                <View style={styles.cardContainer}>
                    {[
                        { title: 'Financial Freedom', image: bleach },
                        { title: 'Productive', image: dry },
                        { title: 'Feeling Well', image: side },
                        { title: 'Personal Life', image: star },
                    ].map((item, index) => (
                        <View
                            key={index}
                            style={[styles.card, { backgroundColor: theme.cardBackground }]}>
                            <Text style={[styles.cardTitle, { color: theme.textColor }]}>
                                {item.title}
                            </Text>
                            <View style={[styles.cardImageContainer, { backgroundColor: theme.boxBackground }]}>
                                <Image source={item.image} style={styles.cardImage} />
                            </View>
                        </View>
                    ))}
                </View>

                {/* Navigation Button */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.navigationButton}
                        onPress={() => navigation.navigate('Home')}>
                        <Text style={[styles.navigationButtonText, { color: theme.textColor }]}>
                            Go to Home
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
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
        padding: 10,
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
        textAlign: 'center',
    },
    cardImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
    },
    cardImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    footer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    navigationButton: {
        backgroundColor: '#6C63FF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    navigationButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
