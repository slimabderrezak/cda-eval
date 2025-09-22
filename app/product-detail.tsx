import { CustomButton } from '@/components/custom-button';
import { products } from '@/constants/products';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const colorScheme = useColorScheme() ?? 'light';

  // Utiliser le premier produit comme exemple (dans une vraie app, on passerait l'ID via les params)
  const product = products[0];

  const [selectedSize, setSelectedSize] = React.useState('41');
  const [selectedColor, setSelectedColor] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState(0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.headerButton, { backgroundColor: Colors[colorScheme].card }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.headerButtonText, { color: Colors[colorScheme].text }]}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.headerButton, { backgroundColor: Colors[colorScheme].card }]}
        >
          <Text style={styles.headerButtonText}>❤️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Images */}
        <View style={styles.imageContainer}>
          <Image 
            source={product.images?.[selectedImage] || product.image} 
            style={styles.productImage}
            resizeMode="cover"
          />
          <ScrollView 
            horizontal 
            style={styles.imageSelector}
            showsHorizontalScrollIndicator={false}
          >
            {product.images?.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.imageOption,
                  { backgroundColor: Colors[colorScheme].card },
                  selectedImage === index && { borderColor: Colors[colorScheme].primary, borderWidth: 2 }
                ]}
                onPress={() => setSelectedImage(index)}
              >
                <Image source={image} style={styles.imageOptionPreview} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Info */}
        <View style={[styles.productInfo, { backgroundColor: Colors[colorScheme].background }]}>
          <View style={styles.productHeader}>
            <Text style={[styles.productName, { color: Colors[colorScheme].text }]}>
              {product.name}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {product.rating}</Text>
              <Text style={[styles.reviews, { color: Colors[colorScheme].icon }]}>
                ({product.reviews || 0} avis)
              </Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: Colors[colorScheme].primary }]}>
              {product.price}€
            </Text>
            {product.originalPrice && (
              <Text style={[styles.originalPrice, { color: Colors[colorScheme].icon }]}>
                {product.originalPrice}€
              </Text>
            )}
            <View style={[styles.discountBadge, { backgroundColor: Colors[colorScheme].primary }]}>
              <Text style={styles.discountText}>-31%</Text>
            </View>
          </View>

          {/* Colors */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
              Couleurs
            </Text>
            <View style={styles.colorOptions}>
              {product.colors?.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === index && { borderColor: Colors[colorScheme].primary, borderWidth: 3 }
                  ]}
                  onPress={() => setSelectedColor(index)}
                />
              ))}
            </View>
          </View>

          {/* Sizes */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
              Tailles
            </Text>
            <View style={styles.sizeOptions}>
              {product.sizes?.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeOption,
                    { backgroundColor: Colors[colorScheme].card },
                    selectedSize === size && { backgroundColor: Colors[colorScheme].primary }
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[
                    styles.sizeText,
                    { color: selectedSize === size ? 'white' : Colors[colorScheme].text }
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
              Description
            </Text>
            <Text style={[styles.description, { color: Colors[colorScheme].icon }]}>
              {product.description || 'Description du produit non disponible.'}
            </Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
              Caractéristiques
            </Text>
            {product.features?.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={[styles.featureText, { color: Colors[colorScheme].icon }]}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomActions, { backgroundColor: Colors[colorScheme].background }]}>
        <CustomButton
          title="Ajouter au panier"
          onPress={() => {}}
          colorScheme={colorScheme}
          style={styles.addToCartButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonText: {
    fontSize: 20,
  },
  imageContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  productImage: {
    width: width - 40,
    height: 300,
    borderRadius: 20,
    marginBottom: 16,
  },
  imageSelector: {
    paddingHorizontal: 20,
  },
  imageOption: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
    padding: 4,
  },
  imageOptionPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  productInfo: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: height * 0.5,
  },
  productHeader: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    fontSize: 16,
  },
  reviews: {
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  colorOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sizeOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureBullet: {
    fontSize: 16,
    color: '#FF4757',
    marginRight: 12,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 16,
    flex: 1,
  },
  bottomActions: {
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  addToCartButton: {
    width: '100%',
  },
});