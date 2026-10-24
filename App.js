
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TARGET_DATE = new Date('2026-11-19T00:00:00+01:00').getTime();

export default function App() {
  const [remaining, setRemaining] = useState(
    Math.max(0, TARGET_DATE - Date.now())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(Math.max(0, TARGET_DATE - Date.now()));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GTA6 kommt in:</Text>
      <Text style={styles.days}>{days} Tage</Text>
      <Text style={styles.time}>
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </Text>
      {remaining === 0 && <Text>Es ist so weit!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
  },
  days: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: 20,
  },
  time: {
    color: '#8b9cff',
    fontSize: 44,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
