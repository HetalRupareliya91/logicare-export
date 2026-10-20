import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { fetchShipmentList } from '../api/shipment';
import { colors } from '../theme';

export default function ShipmentScreen() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    fetchShipmentList(q)
      .then((r) => { setItems(r.items || []); setError(''); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [q]);

  useEffect(() => { load(); }, [load]);

  return (
    <View style={styles.container}>
      <TextInput style={styles.search} placeholder="Search Shipments" value={q} onChangeText={setQ} />
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
              <Text style={styles.title}>{item.shipmentNo}</Text>
              <Text style={styles.row}><Text style={styles.label}>Order No: </Text>{String(item.orderNo ?? '-')}</Text>
              <Text style={styles.row}><Text style={styles.label}>Mode (Sea/Air/Road): </Text>{String(item.mode ?? '-')}</Text>
              <Text style={styles.row}><Text style={styles.label}>Origin Port: </Text>{String(item.originPort ?? '-')}</Text>
              <Text style={styles.row}><Text style={styles.label}>Destination Port: </Text>{String(item.destinationPort ?? '-')}</Text>
              <Text style={styles.row}><Text style={styles.label}>ETD: </Text>{item.etd ? new Date(item.etd).toLocaleDateString() : '-'}</Text>
              <Text style={styles.row}><Text style={styles.label}>ETA: </Text>{item.eta ? new Date(item.eta).toLocaleDateString() : '-'}</Text>
              <Text style={styles.row}><Text style={styles.label}>Status: </Text>{String(item.status ?? '-')}</Text>
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
