import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Image,
    ScrollView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ProductView from './ProductView';

const wigDB = require("../../Api/db.json");

const Home = () => {
    const navigation = useNavigation();
    const [searchInput, setSearchInput] = useState('');
    const [post, setPost] = useState([]);

    function getFilteredPost() {
        return post.filter(item =>
            item.name.toLowerCase().includes(searchInput.toLowerCase()))
    }

    useEffect(() => {
        try {
            // Simulate fetching data from JSON file xxx
            setPost(wigDB.db);
        } catch (error) {
            console.error('Error setting data:', error);
        }
    }, []);


    const imagePaths = {
        "robusta_coffee_beans_square.png": require('../../assets/coffee_assets/robusta_coffee_beans/robusta_coffee_beans_square.png'),
        "arabica_coffee_beans_square.png": require('../../assets/coffee_assets/arabica_coffee_beans/arabica_coffee_beans_square.png'),
        "liberica_coffee_beans_square.png": require('../../assets/coffee_assets/liberica_coffee_beans/liberica_coffee_beans_square.png'),
        "excelsa_coffee_beans_square.png": require('../../assets/coffee_assets/excelsa_coffee_beans/excelsa_coffee_beans_square.png'),
        "americano_pic_1_square.png": require('../../assets/coffee_assets/americano/square/americano_pic_1_square.png'),
        "black_coffee_pic_1_square.png": require('../../assets/coffee_assets/black_coffee/square/black_coffee_pic_1_square.png'),
        "cappuccino_pic_1_square.png": require('../../assets/coffee_assets/cappuccino/square/cappuccino_pic_1_square.png'),
        "espresso_pic_1_square.png": require('../../assets/coffee_assets/espresso/square/espresso_pic_1_square.png'),
        "latte_pic_1_square.png": require('../../assets/coffee_assets/latte/square/latte_pic_1_square.png'),
        "macchiato_pic_1_square.png": require('../../assets/coffee_assets/macchiato/square/macchiato_pic_1_square.png'),
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Heading}>Coffee House</Text>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                placeholderTextColor="#000"
                value={searchInput}
                onChangeText={(val) => setSearchInput(val)}
            />
            <View style={styles.mainPostView}>

                <FlatList
                    ListEmptyComponent={<ActivityIndicator size="large" color="#AF005F"/>}
                    data={getFilteredPost()}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({item, index}) => {
                        //console.log("Navigating to ProductView with params:", navigation)
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('Product', {
                                wigDB: item,
                                imagePath: imagePaths[item.image]
                            })}>
                                <View style={styles.postView}>
                                    <Image source={imagePaths[item.image]} style={styles.image}/>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>{item.name}</Text>
                                        <Text style={styles.text}>AU$ {item.price}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    Heading: {
        fontSize: 32,
        marginTop: 60,
        marginLeft: 15,
        fontWeight: 'bold',
    },
    input: {
        width: '90%',
        height: 39,
        borderColor: '#AF005F',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        marginTop: 20,
        color: '#000',
        backgroundColor: '#EBEBEB',
    },
    mainPostView: {
        width: '90%',
    },
    postView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginVertical: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    image: {
        width: 120,
        height: 120,
        margin: 8,
        borderRadius: 8
    },
    textContainer: {
        flex: 1,
        padding: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});