import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import modules from './registry';
import { logout } from '../api/client';
import { colors } from '../theme';

export default function HomeScreen({ navigation }) {
  const signOut = async () => {
    await logout();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={modules}
        numColumns={2}
        keyExtractor={(m) => m.name}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
        ListHeaderComponent={<Text style={styles.heading}>What would you like to manage?</Text>}
        ListEmptyComponent={<Text style={styles.muted}>No modules yet.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate(item.name)}>
            <Text style={styles.tileText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.logout} onPress={signOut}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  heading: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 12 },
  muted: { color: colors.muted },
  tile: { flex: 1, backgroundColor: colors.card, borderRadius: 12, padding: 20, borderWidth: 1, borderColor: colors.border, minHeight: 90, justifyContent: 'center' },
  tileText: { fontWeight: '700', color: colors.primaryDark, fontSize: 15 },
  logout: { padding: 14, alignItems: 'center' },
  logoutText: { color: colors.danger, fontWeight: '700' },
});
