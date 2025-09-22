import { conversations, matches, profiles } from '@/constants/dating';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function MessagesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const handleConversationPress = (conversation: any) => {
    setSelectedConversation(conversation);
    setChatModalVisible(true);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Ici on pourrait ajouter le message à la conversation
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: Colors[colorScheme].card }]}>
        <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
          Messages
        </Text>
        <Text style={[styles.subtitle, { color: Colors[colorScheme].icon }]}>
          {matches.length} matchs • {conversations.length} conversations
        </Text>
      </View>

      {/* Matches Section */}
      <View style={styles.matchesSection}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
          Nouveaux matchs
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {matches.map((match) => {
            const matchedProfile = profiles.find(p => p.id === match.userId);
            return matchedProfile ? (
              <TouchableOpacity key={match.id} style={styles.matchItem}>
                <Image source={matchedProfile.photos[0]} style={styles.matchAvatar} />
                <Text style={[styles.matchName, { color: Colors[colorScheme].text }]}>
                  {matchedProfile.name.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ) : null;
          })}
        </ScrollView>
      </View>

      {/* Conversations List */}
      <ScrollView style={styles.conversationsList}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme].text }]}>
          Conversations
        </Text>
        {conversations.map((conversation) => {
          const otherProfile = profiles.find(p => p.id === conversation.participants.find(id => id !== "1"));
          const lastMessage = conversation.messages[conversation.messages.length - 1];
          
          return otherProfile ? (
            <TouchableOpacity 
              key={conversation.id}
              style={[styles.conversationItem, { backgroundColor: Colors[colorScheme].card }]}
              onPress={() => handleConversationPress(conversation)}
            >
              <Image source={otherProfile.photos[0]} style={styles.conversationAvatar} />
              <View style={styles.conversationContent}>
                <View style={styles.conversationHeader}>
                  <Text style={[styles.conversationName, { color: Colors[colorScheme].text }]}>
                    {otherProfile.name}
                  </Text>
                  <Text style={[styles.conversationTime, { color: Colors[colorScheme].icon }]}>
                    {formatTime(lastMessage.timestamp)}
                  </Text>
                </View>
                <Text 
                  style={[styles.lastMessage, { color: Colors[colorScheme].icon }]}
                  numberOfLines={1}
                >
                  {lastMessage.content}
                </Text>
              </View>
              {!lastMessage.isRead && (
                <View style={[styles.unreadIndicator, { backgroundColor: Colors[colorScheme].primary }]} />
              )}
            </TouchableOpacity>
          ) : null;
        })}
      </ScrollView>

      {/* Chat Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={chatModalVisible}
        onRequestClose={() => setChatModalVisible(false)}
      >
        {selectedConversation && (
          <SafeAreaView style={[styles.chatContainer, { backgroundColor: Colors[colorScheme].background }]}>
            {/* Chat Header */}
            <View style={[styles.chatHeader, { backgroundColor: Colors[colorScheme].card }]}>
              <TouchableOpacity 
                onPress={() => setChatModalVisible(false)}
                style={styles.backButton}
              >
                <Text style={[styles.backText, { color: Colors[colorScheme].primary }]}>← Retour</Text>
              </TouchableOpacity>
              {(() => {
                const otherProfile = profiles.find(p => 
                  p.id === selectedConversation.participants.find((id: string) => id !== "1")
                );
                return otherProfile ? (
                  <View style={styles.chatHeaderProfile}>
                    <Image source={otherProfile.photos[0]} style={styles.chatHeaderAvatar} />
                    <Text style={[styles.chatHeaderName, { color: Colors[colorScheme].text }]}>
                      {otherProfile.name}
                    </Text>
                  </View>
                ) : null;
              })()}
            </View>

            {/* Messages */}
            <FlatList
              data={selectedConversation.messages}
              keyExtractor={(item) => item.id}
              style={styles.messagesList}
              renderItem={({ item }) => (
                <View style={[
                  styles.messageItem,
                  item.senderId === "1" ? styles.myMessage : styles.theirMessage
                ]}>
                  <Text style={[
                    styles.messageText,
                    { 
                      color: item.senderId === "1" ? 'white' : Colors[colorScheme].text,
                      backgroundColor: item.senderId === "1" 
                        ? Colors[colorScheme].primary 
                        : Colors[colorScheme].card
                    }
                  ]}>
                    {item.content}
                  </Text>
                  <Text style={[styles.messageTime, { color: Colors[colorScheme].icon }]}>
                    {formatTime(item.timestamp)}
                  </Text>
                </View>
              )}
            />

            {/* Message Input */}
            <View style={[styles.messageInputContainer, { backgroundColor: Colors[colorScheme].card }]}>
              <TextInput
                style={[styles.messageInput, { 
                  backgroundColor: Colors[colorScheme].background,
                  color: Colors[colorScheme].text 
                }]}
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Tapez votre message..."
                placeholderTextColor={Colors[colorScheme].icon}
                multiline
              />
              <TouchableOpacity 
                style={[styles.sendButton, { backgroundColor: Colors[colorScheme].primary }]}
                onPress={sendMessage}
              >
                <Text style={styles.sendButtonText}>➤</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  matchesSection: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  matchItem: {
    alignItems: 'center',
    marginLeft: 20,
    width: 70,
  },
  matchAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  matchName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  conversationsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  conversationAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
  },
  conversationTime: {
    fontSize: 12,
  },
  lastMessage: {
    fontSize: 14,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  // Chat Modal Styles
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  chatHeaderProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatHeaderAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  chatHeaderName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageItem: {
    marginVertical: 4,
  },
  myMessage: {
    alignItems: 'flex-end',
  },
  theirMessage: {
    alignItems: 'flex-start',
  },
  messageText: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    maxWidth: width * 0.75,
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
    paddingHorizontal: 8,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    gap: 12,
  },
  messageInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
