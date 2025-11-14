// import React from 'react';
// import { View, Text, Image, TouchableOpacity } from 'react-native';
// import tw from 'twrnc';
// import {locations, newsletterCardItems} from "../assets/mockData/mockData.js"

// import newsletterBowl from '../assets/img/ChickenBeans.png'; 

// const NewsletterCard = () => {
    
//     const firstItem = newsletterCardItems[1];
//   return (
//     <TouchableOpacity style={tw`shadow-lg rounded-xl overflow-hidden`}>
      
//         <View style={tw`bg-[#F5F2EC] items-center`}>
//             <Image 
//             source={firstItem.image} 
//             style={tw`w-96 h-64`}
//             resizeMode="contain" 
//             />
//         </View>
//         <View style={tw`bg-white p-2`}>
//             <Text style={tw`text-center font-bold text-lg text-gray-800`}>
//                 {firstItem.title}
//             </Text>
//         </View>

//     </TouchableOpacity>
//   );
// };

// export default NewsletterCard;


import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const NewsletterCard = ({ item, onPress }) => {
  
  if (!item) {
    return null;
  }

return (
    <TouchableOpacity 
        style={tw`shadow-lg rounded-xl border border-gray-200 overflow-hidden`}
        onPress={onPress}
    >
        {/* remove the beige background so image fills without showing color */}
        <View style={tw`bg-transparent`}>
            <Image 
                source={item.image}
                style={tw`w-full h-56`}        
                resizeMode="cover"           
            />
        </View>

        <View style={tw`bg-white p-4`}>
            <Text style={tw`text-center font-bold text-lg text-gray-800`}>
                {item.title}
            </Text>
        </View>
    </TouchableOpacity>
);
};

export default NewsletterCard;