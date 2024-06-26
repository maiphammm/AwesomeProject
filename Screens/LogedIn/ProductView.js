import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CartContext } from '../../contexts/CartContext';

const ProductView = ({ route, navigation }) => {
  const { wigDB, imagePath } = route.params;
  const { addItemToCart, updateTotalPriceAndItems } = useContext(CartContext);
  
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (text) => {
    const newQuantity = parseInt(text) || 1;
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    const newItem = { ...wigDB, quantity, totalItemPrice: wigDB.price * quantity };
    addItemToCart(newItem);
    updateTotalPriceAndItems();
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <View style={styles.TopView}>
        <Icon onPress={()=>{navigation.goBack()}} style={styles.Icons} name="chevron-left" />
      </View>
      <View style={styles.BottomView}>
        <Image source={imagePath ? imagePath : { uri: wigDB.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{wigDB.name}</Text>
          <Text style={styles.price}>AU$ {wigDB.price}</Text>
          <TextInput
            style={styles.quantityInput}
            placeholder="Quantity"
            keyboardType="numeric"
            value={quantity.toString()}
            onChangeText={handleQuantityChange}
          />
          <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <ScrollView style={styles.details}>
            <Text style={styles.text}>Description: {wigDB.description}</Text>
            <Text style={styles.text}>Roasted: {wigDB.roasted}</Text>
            <Text style={styles.text}>Ingredients: {wigDB.ingredients}</Text>
            <Text style={styles.text}>Size: {wigDB.size}</Text>
            <Text style={styles.text}>Type: {wigDB.type}</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BottomView: {
    width: '100%',
    height: '75%',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#AF005F',
    marginBottom: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 16,
    width: 50,
  },
  addToCartButton: {
    backgroundColor: '#AF005F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '50%',
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  TopView: {
    width: '100%',
    paddingBottom: 20,
  },
  Icons:{
    marginLeft: 5,
    color: '#000',
    fontSize: 40,
  },
  details: {
    marginTop: 5,
  },
});

export default ProductView;
