import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { fetchHsCodeList } from '../api/hsCode';
import { colors } from '../theme';

export default function HsCodeScreen() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    fetchHsCodeList(q)
      .then((r) => { setItems(r.items || []); setError(''); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [q]);

  useEffect(() => { load(); }, [load]);

  return (
    <View style={styles.container}>
      <TextInput style={styles.search} placeholder="Search HS Codes" value={q} onChangeText={setQ} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading && !items.length ? (
        <ActivityIndicator style={{ marginTop: 24 }} color={colors.primary} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i._id}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
          ListEmptyComponent={<Text style={styles.empty}>No records found</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.code}</Text>
              <Text style={styles.row}><Text style={styles.label}>Description: </Text>{String(item.description ?? '-')}</Text>
              <Text style={styles.row}><Text style={styles.label}>Duty Rate (%): </Text>{String(item.dutyRate ?? '-')}</Text>
              <Text style={styles.row}><Text style={styles.label}>GST Rate (%): </Text>{String(item.gstRate ?? '-')}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  search: { backgroundColor: '#fff', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: colors.border, marginBottom: 12 },
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  title: { fontSize: 16, fontWeight: '700', color: colors.primaryDark, marginBottom: 6 },
  row: { color: colors.text, marginTop: 2 },
  label: { color: colors.muted },
  error: { color: colors.danger, marginBottom: 8 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 24 },
});
