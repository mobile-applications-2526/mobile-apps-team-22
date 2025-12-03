import React from 'react';
import { ScrollView, View } from 'react-native'; // Added View
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import TypeContainer from '../../components/menu/typeContainer.jsx'; 
import { menuItems } from '../../assets/mockData/mockData.js';

// 1. Import the new Floating Button
import CartSummaryButton from '../../components/cart/cartSummaryButton.jsx';

const MenuScreen = () => {
  const router = useRouter();

  const getItemsByType = (type) => {
    return menuItems.filter((item) => item.type === type);
  };

  const warmBowls = getItemsByType('WarmBowl');
  const saladBowls = getItemsByType('SaladBowl');
  const sides = getItemsByType('SideDish');
  const proteinDrinks = getItemsByType('ProteinDrink');
  const drinks = getItemsByType('Drink');
  const proteinSnacks = getItemsByType('ProteinSnack');
  const warmDrinks = getItemsByType('WarmDrink');

  const handleSeeMore = (type, title) => {
    router.push({
      pathname: "/categoryPage", 
      params: { 
        categoryType: type,
        categoryTitle: title
      }
    });
  };
  
  return (
    <SafeAreaView edges={["up"]} className="flex-1 bg-white">
      
      <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingBottom: 100 }}>
        
        <TypeContainer 
          title="Warm Bowls" 
          items={warmBowls} 
          onPressSeeMore={() => handleSeeMore('WarmBowl', 'Warm Bowls')}
        />

        <TypeContainer 
          title="Salad Bowls" 
          items={saladBowls} 
          onPressSeeMore={() => handleSeeMore('SaladBowl', 'Salad Bowls')}
        />

        <TypeContainer 
          title="Side Dishes" 
          items={sides} 
          onPressSeeMore={() => handleSeeMore('SideDish', 'Side Dishes')}
        />

        <TypeContainer 
          title="Drinks" 
          items={drinks} 
          onPressSeeMore={() => handleSeeMore('Drink', 'Drinks')}
        />

        <TypeContainer 
          title="Protein Drinks" 
          items={proteinDrinks} 
          onPressSeeMore={() => handleSeeMore('ProteinDrink', 'Protein Drinks')}
        />

        <TypeContainer 
          title="Protein Snacks" 
          items={proteinSnacks} 
          onPressSeeMore={() => handleSeeMore('ProteinSnack', 'Protein Snacks')}
        />

        <TypeContainer 
          title="Warm Drinks" 
          items={warmDrinks} 
          onPressSeeMore={() => handleSeeMore('WarmDrink', 'Warm Drinks')}
        />

      </ScrollView>

      {/* 2. Add the Floating Button Here */}
      <CartSummaryButton />

    </SafeAreaView>
  );
};

export default MenuScreen;