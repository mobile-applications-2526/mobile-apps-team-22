import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { supabase } from "../utils/supabase";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!name || !email || !message) {
      Alert.alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    const { error } = await supabase.functions.invoke("contact", {
      body: { name, email, message },
    });
    setLoading(false);

    if (error) {
      Alert.alert("Error sending message", error.message);
    } else {
      Alert.alert("Message Sent!", "Thank you for contacting us.");
      router.back();
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-5`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Contact Us</Text>
      <TextInput
        style={tw`border border-gray-300 rounded-md p-3 mb-4`}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={tw`border border-gray-300 rounded-md p-3 mb-4`}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={tw`border border-gray-300 rounded-md p-3 mb-4 h-36`}
        placeholder="Your Message"
        value={message}
        onChangeText={setMessage}
        multiline
        textAlignVertical="top"
      />
      <TouchableOpacity
        style={tw`bg-[#E1503F] rounded-full py-4 items-center shadow-md`}
        // onPress={handleSend}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#EEDAB5" />
        ) : (
          <Text style={tw`text-[#EEDAB5] font-bold text-lg`}>Send Message</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ContactPage;
